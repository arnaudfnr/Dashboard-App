from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path
from django.views.generic.list import ListView
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from dashboard.models import Client, Consumption
from .serializer import ClientSerializer

import logging

logger = logging.getLogger(__name__)

class CustomPagination(PageNumberPagination):
    page_size = 15

    def get_paginated_response(self, data):
        logger.debug(f"Paginated data: {data}")
        return Response({
            'count': self.page.paginator.count,
            'page_number': self.page.paginator.num_pages,
            'has_next': self.page.has_next(),
            'has_previous': self.page.has_previous(),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            })

class AdminClientsView(generics.ListAPIView):
    queryset = Client.objects.all().annotate_has_elec_heating().annotate_anomaly()
    serializer_class = ClientSerializer
    pagination_class = CustomPagination


class DashboardAdminSite(admin.sites.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        urls = [
                   path("clients", staff_member_required(AdminClientsView.as_view())),
               ] + urls
        return urls
