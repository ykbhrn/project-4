from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK

from .models import Sport
from .serializers import PopulatedSportSerializer

class SportListView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, _request):
        sports = Sport.objects.all()
        serialized_sports = PopulatedSportSerializer(sports, many=True)
        return Response(serialized_sports.data, status=HTTP_200_OK)