from django.contrib.auth import authenticate

from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from .models import User
from .permissions import IsUserOrCreatingAccountOrReadOnly
from .serializers import CreateUserSerializer, UserSerializer

class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrCreatingAccountOrReadOnly,)

    def get_serializer_class(self):
        is_creating_a_new_user = self.action == 'create'

        if is_creating_a_new_user:
            return CreateUserSerializer

        return self.serializer_class

    @action(detail=False, methods=['POST'], permission_classes=[AllowAny], authentication_classes=[])
    def login(self, request):
        user = authenticate(username=request.data['email'], password=request.data['password'])

        if user:
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)
            return Response({ 'token': token.key })

        return Response({
            'error': {
                'message': 'Invalid credentials'
            }
        }, status=401)

    @action(detail=False, methods=['GET'])
    def me(self, request):
        serialized = UserSerializer(request.user, context={ 'request': request })

        return Response(serialized.data)
