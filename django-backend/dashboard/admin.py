from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path
from django.views.generic.list import ListView
from dashboard.models import Client, Consumption

import logging

logger = logging.getLogger(__name__)


class ClientsListView(ListView):
    """
    A list of clients

    TODO client.has_elec_heating should be set
    TODO client.has_anomaly should be set
    """
    model = Client
    paginate_by = 15

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        clients = context['object_list']
        cons = Consumption.objects.filter(client_id__in=clients.values_list('id', flat=True))

        logger.debug(f"{context['page_obj']}")
        logger.debug(f"clients: {clients}")
        logger.debug(f"cons: {cons.count()}: {cons[:24]}")

        for client in clients:
            heat = client.detect_elec_heat(cons)
            anomaly = client.detect_anomaly(cons)
            logger.debug(f"client: {client} has elec heat {heat}, has anomaly {anomaly}")

        context["meta"] = {
            "title": "Liste des clients",
            "description": "Browse which clients has an electrical heating or an anomaly",
        }
        return context


class DashboardAdminSite(admin.sites.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        urls = [
                   path("clients", staff_member_required(ClientsListView.as_view())),
               ] + urls
        return urls
