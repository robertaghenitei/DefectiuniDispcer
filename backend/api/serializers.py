from pyexpat import model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Sesizare, Observatie, Region, Address

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user



class SesizareSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username",  read_only=True) 
    cine_inchide_defectiunea_name = serializers.CharField(source="cine_inchide_defectiunea.username", read_only=True)

    class Meta:
        model = Sesizare
        fields = ["id", "sector", "data_emiterii", "emitent", "author_name", "comunicat_la", "punct_termic", "adresa", "acm_inc", "localizare", "distributie_transport", "scara_inchisa", "remediat", "data_remedierii", "cine_inchide_defectiunea", "cine_inchide_defectiunea_name"]
        extra_kwargs = {"author": {"read_only": True},
                        "cine_inchide_defectiunea": {"allow_null": True, "required": False}}
        

class ObservatieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observatie
        fields = ["id", "continut", "sesizare"]
        extra_kwargs = {"sesizare": {"read_only": True}}




class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ["id", "name"]

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "name", "region"]
