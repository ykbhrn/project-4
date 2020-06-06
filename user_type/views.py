from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK
from rest_framework import status
from .models import UserType
from .serializers import PopulatedUserTypeSerializer, UserTypeSerializer

class UserTypeListView(APIView):

    # permission_classes = (IsAuthenticated, )

    def get(self, _request):
        user_type = UserType.objects.all()
        serialized_types = PopulatedUserTypeSerializer(user_type, many=True)
        return Response(serialized_types.data, status=HTTP_200_OK)

    def post(self, request):
        new_type = UserTypeSerializer(data=request.data)
        if new_type.is_valid():
            new_type.save()
            return Response(new_type.data, status=status.HTTP_201_CREATED)
        return Response(new_type.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)