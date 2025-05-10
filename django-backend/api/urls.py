from django.urls import path

from .views import get_client, ClientListView

app_name = "api"
urlpatterns = [
    path('clients/', ClientListView.as_view()),
    path('clients/<int:pk>/', get_client, name='get_client'),
]