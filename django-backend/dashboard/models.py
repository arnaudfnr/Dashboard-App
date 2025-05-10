from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import F, Subquery, Sum
from django.urls import reverse

import logging

logger = logging.getLogger(__name__)


class MonthMixin(models.Model):
    month = models.PositiveSmallIntegerField(
        "month", validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    year = models.PositiveSmallIntegerField("year")

    def __str__(self):
        return str(self.month) + '/' + str(self.year)

    class Meta:
        abstract = True


class Client(models.Model):
    """
    Store the client information
    """
    full_name = models.CharField("full name", max_length=50)
    has_elec_heat = models.BooleanField("has electrical heating", default=False)
    has_anomaly = models.BooleanField("has anomaly", default=False)

    class Meta:
        ordering = ('id',)

    def detect_anomaly(self, consumption):
        anomalies = consumption.filter(
            client_id=self.id,
            client__consumption__month=F('month'),
            client__consumption__year=F('year') - 1,
            client__consumption__kwh_consumed__lte=F('kwh_consumed') / 1.9,
            client__consumption__client_id=F('client_id')
        ).order_by("-year", "-month")

        logger.debug(f"SQL Query of anomalies: [START] {anomalies.query} [END]")
        self.has_anomaly = anomalies.count() > 0

        if self.has_anomaly:
            anomaly_year = Subquery(anomalies.values("year")[:1])
            anomaly_month = Subquery(anomalies.values("month")[:1])
            anomaly = Anomaly.objects.create(client_id=self.id, year=anomaly_year, month=anomaly_month)
            logger.info(f"New Anomaly detected: {anomaly}")

        return self.has_anomaly

    def get_cons_for_months(self, consumption, months):
        cons = (consumption
                .filter(client_id=self.id, month__in=months)
                .order_by('-year').values("client_id")
                .annotate(total_kwh_consumed=Sum('kwh_consumed')))
        return 0 if len(cons) == 0 else cons.get()['total_kwh_consumed']

    def detect_elec_heat(self, consumption):
        winter_cons = self.get_cons_for_months(consumption, [1, 2])
        summer_cons = self.get_cons_for_months(consumption, [7, 8])

        logger.debug(f"winter cons: {winter_cons}")
        logger.debug(f"summer cons: {summer_cons}")

        self.has_elec_heat = winter_cons > 2 * summer_cons
        return self.has_elec_heat

    def __str__(self):
        return (f"Client {self.id}, "
                f"Full Name: {self.full_name}, "
                f"Has Electrical Heating: {self.has_elec_heat}, "
                f"Has Anomaly: {self.has_anomaly}")


class Consumption(MonthMixin):
    """
    Store the electricity consumption of a client over a month
    """
    client = models.ForeignKey(
        "dashboard.Client", verbose_name="client", on_delete=models.CASCADE
    )
    kwh_consumed = models.FloatField("kwh consumed")

    class Meta:
        verbose_name = "Consumption"
        verbose_name_plural = "Consumptions"
        unique_together = ("client", "month", "year")
        ordering = ('client_id', '-year', '-month')

    def __str__(self):
        return f"Conso of {self.client.id} ({self.month}/{self.year}): {self.kwh_consumed}"

    def get_absolute_url(self):
        return reverse("dashboard:consumption_details", kwargs={"client_id": self.pk})


class Anomaly(MonthMixin):
    """
    Store the detected anomaly on a client's consumption for a given year and month
    """
    client = models.ForeignKey(
        "dashboard.Client", verbose_name="client", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("client", "month", "year")
        ordering = ('client_id', '-year', '-month')

    def __str__(self):
        return f"Detected Anomaly: {self.client.id} ({self.month}/{self.year})"
