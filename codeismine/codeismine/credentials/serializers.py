from rest_framework import serializers
from .models import Credential


class CredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Credential
        fields = ['id', 'name', 'username', 'password']


class CreateCredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Credential
        fields = ['name', 'username', 'password']

