from rest_framework import serializers
from dashboard.models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "full_name", "has_elec_heat", "has_anomaly"]