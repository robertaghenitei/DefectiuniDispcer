from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User



class Sesizare(models.Model):
    sector= models.CharField(max_length=20)
    data_emiterii = models.DateTimeField(auto_now_add=True)
    emitent = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="dispecer")
    comunicat_la = models.CharField(max_length=100)
    punct_termic = models.CharField(max_length=30)
    adresa = models.CharField(max_length=100)
    acm_inc = models.CharField(max_length=5)
    localizare = models.CharField(max_length=20)
    distributie_transport = models.CharField(max_length=20)
    scara_inchisa = models.BooleanField()
    remediat=models.BooleanField(default=False)
    data_remedierii = models.DateTimeField(null=True)
    cine_inchide_defectiunea = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, blank=True, related_name="rezolvatSector")

    def __str__(self, ):
        return f"Defectiunea {self.id} in zona {self.__class__.__name__}"
    @property
    def author_name(self):
        self.author.username

    

class Observatie(models.Model):
    continut = models.TextField(blank=True, null=True)
    sesizare = models.ForeignKey(Sesizare, on_delete=models.CASCADE, related_name="sesizare", null=True)

    def __str__(self):
        return  f"Observatie la {self.continut}"
    





class Region(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Address(models.Model):
    region = models.ForeignKey(Region, related_name="addresses", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}, {self.region.name}"
