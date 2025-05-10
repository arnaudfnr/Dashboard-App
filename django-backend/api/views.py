from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics, filters
from dashboard.models import Client
from .serializer import ClientSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_client(request, pk):
    try:
        logger.debug("Fetching client with ID: %s", pk)
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ClientListView(generics.ListAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'full_name', 'has_elec_heat', 'has_anomaly']
    search_fields = ['full_name']
