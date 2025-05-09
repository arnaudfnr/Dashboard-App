from datetime import date

from django.shortcuts import render
import plotly.express as px
from dashboard.models import Consumption, Client
import logging

logger = logging.getLogger(__name__)

def consumption_view(request, client_id):
    consumption = Consumption.objects.filter(client_id=client_id)[:12:-1]
    client = Client.objects.get(id=client_id)
    logger.debug("Consumption details for client" + client.__str__() + ": " + consumption.__str__())
    chart = px.bar(
        x=[date(month=c.month, year=c.year, day=1) for c in consumption],
        y=[c.kwh_consumed for c in consumption],
        title='Consommation Electrique des 12 derniers mois',
        labels={'x': 'Date', 'y': 'Consommation (en kWh)'}
    ).to_html()
    context = {'chart': chart}
    return render(request, "dashboard/consumption_detail.html", context)


def search_client_view(request):
    """
    Search clients

    TODO client.has_elec_heating should be set
    TODO client.has_anomaly should be set
    """
    return render(request, "dashboard/search_client.html")

def clients_list(request):
    """
    A list of clients
    """
    clients = Client.objects.all()[:5]
    context = {"clients_list": clients}
    template_name = "dashboard/clients_list.html"
    return render(request, template_name, context)