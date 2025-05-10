from django.urls import path

from .views import consumption_view, get_client, SearchClientView

app_name = "dashboard"
urlpatterns = [
    path('api/clients/', SearchClientView.as_view()),
    path('api/clients/<int:pk>/', get_client, name='get_client'),
    path(
        f"consumption/<int:client_id>",
        consumption_view,
        name="consumption_details",
    ),
]
