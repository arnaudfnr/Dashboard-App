from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse


class Client(models.Model):
    full_name = models.CharField("full name", max_length=50)

    def __str__(self):
        return f"Client {self.pk}"


class Consumption(models.Model):
    """
    Store the electricity consumption of a client over a month
    """
    month = models.PositiveSmallIntegerField(
        "month", validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    year = models.PositiveSmallIntegerField("year")

    client = models.ForeignKey(
        "dashboard.Client", verbose_name="client", on_delete=models.CASCADE
    )
    kwh_consumed = models.FloatField("kwh consumed")

    class Meta:
        verbose_name = "Consumption"
        verbose_name_plural = "Consumptions"
        unique_together = ("client", "month", "year")
        ordering = ('-year', '-month')

    def __str__(self):
        return f"Conso of {self.client} ({self.month}/{self.year}): {self.kwh_consumed}"

    def get_absolute_url(self):
        return reverse("dashboard:consumption_details", kwargs={"client_id": self.pk})
