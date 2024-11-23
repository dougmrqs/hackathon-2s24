from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Credential
from .serializers import CredentialSerializer, CreateCredentialSerializer

class CredentialViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        is_creating_a_new_credential = self.action == 'create'
        if is_creating_a_new_credential:
            return CreateCredentialSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
