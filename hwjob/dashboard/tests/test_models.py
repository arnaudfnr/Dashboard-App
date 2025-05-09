from django.test import TestCase
from dashboard.models import Client, Consumption


class ClientTestCase(TestCase):
    def setUp(self):
        Client.objects.create(full_name="Martin Durand")
        Client.objects.create(full_name="Emelyne Carre")

    def test_str(self):
        martin = Client.objects.get(full_name="Martin Durand")
        self.assertEqual(str(martin),
                         "Client 1, Full Name: Martin Durand, Has Electrical Heating: False, Has Anomaly: False")

    def test_detect_anomaly_true(self):
        martin = Client.objects.get(full_name="Martin Durand")
        Consumption.objects.create(client_id=1, year=2025, month=1, kwh_consumed=144)
        Consumption.objects.create(client_id=1, year=2024, month=1, kwh_consumed=50)
        self.assertTrue(martin.detect_anomaly(Consumption.objects.all()))

    def test_detect_anomaly_false(self):
        emelyne = Client.objects.get(full_name="Emelyne Carre")
        Consumption.objects.create(client_id=2, year=2025, month=1, kwh_consumed=144)
        Consumption.objects.create(client_id=2, year=2024, month=1, kwh_consumed=145)
        (self.assertFalse(emelyne.detect_anomaly(Consumption.objects.all())))

    def test_detect_anomaly_no_cons(self):
        martin = Client.objects.get(full_name="Martin Durand")
        Consumption.objects.create(client_id=2, year=2025, month=1, kwh_consumed=144)
        Consumption.objects.create(client_id=2, year=2024, month=1, kwh_consumed=145)
        (self.assertFalse(martin.detect_anomaly(Consumption.objects.all())))

    def test_detect_elec_heat_true(self):
        emelyne = Client.objects.get(full_name="Emelyne Carre")
        Consumption.objects.create(client_id=2, year=2025, month=1, kwh_consumed=548)
        Consumption.objects.create(client_id=2, year=2025, month=2, kwh_consumed=612)
        Consumption.objects.create(client_id=2, year=2024, month=7, kwh_consumed=144)
        Consumption.objects.create(client_id=2, year=2024, month=8, kwh_consumed=145)
        (self.assertTrue(emelyne.detect_elec_heat(Consumption.objects.all())))

    def test_detect_elec_heat_false(self):
        martin = Client.objects.get(full_name="Martin Durand")
        Consumption.objects.create(client_id=1, year=2025, month=1, kwh_consumed=548)
        Consumption.objects.create(client_id=1, year=2025, month=2, kwh_consumed=612)
        Consumption.objects.create(client_id=1, year=2024, month=7, kwh_consumed=845)
        Consumption.objects.create(client_id=1, year=2024, month=8, kwh_consumed=978)
        (self.assertFalse(martin.detect_elec_heat(Consumption.objects.all())))

    def test_detect_elec_heat_no_cons(self):
        martin = Client.objects.get(full_name="Martin Durand")
        Consumption.objects.create(client_id=2, year=2025, month=1, kwh_consumed=548)
        Consumption.objects.create(client_id=2, year=2025, month=2, kwh_consumed=612)
        Consumption.objects.create(client_id=2, year=2024, month=7, kwh_consumed=144)
        Consumption.objects.create(client_id=2, year=2024, month=8, kwh_consumed=145)
        (self.assertFalse(martin.detect_elec_heat(Consumption.objects.all())))
