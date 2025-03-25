from django.urls import path
from . import views

urlpatterns = [
    path("sesizari/", views.SesizareListCreate.as_view(), name="lista-sesizari"),
    path("sesizari/update/<int:id>/", views.InchideSesizareView.as_view(), name="inchide-sesizare"),
    path("observatii/<int:sesizare_id>/", views.ObservatieListCreate.as_view(), name="observatii_sesizare"),
    path("vremea/", views.vremea, name="vremea"),
    path("regions/", views.RegionListView.as_view(), name="region-list"),
    path("addresses/", views.AddressListView.as_view(), name="address-list"),
    path("sesizari-adresa/<str:adresa>", views.SesizariAdresa.as_view(), name="lista-sesizari-adresa"),
]