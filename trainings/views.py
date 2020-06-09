# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Training
from .serializers import TrainingSerializer, PopulatedTrainingSerializer

class TrainingListView(APIView):

  # permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self, _request):
    trainings = Training.objects.all()
    serialized_trainings = PopulatedTrainingSerializer(trainings, many=True)
    return Response(serialized_trainings.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id 
    new_training = TrainingSerializer(data=request.data)
    if new_training.is_valid():
      new_training.save()
      return Response(new_training.data, status=status.HTTP_201_CREATED)
    return Response(new_training.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TrainingDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_training(self, pk):
    try:
      return Training.objects.get(pk=pk)
    except Training.DoesNotExist:
      raise NotFound()

  def is_training_owner(self, training, user):
    if training.owner.id != user.id:
      raise PermissionDenied()

  def get(self, _request, pk):
    training = self.get_training(pk)
    serialized_training = PopulatedTrainingSerializer(training)
    return Response(serialized_training.data, status=status.HTTP_200_OK)


# Make Booking/ if bookings are = training limit capacity, then show training isFull/ and add student user who made a booking to the student list in the training model
  def put(self, request, pk):
    training_to_update = self.get_training(pk)
    serialized_training = PopulatedTrainingSerializer(data=training_to_update)
    training_to_update.students.add( request.user.id )
    training_to_update.bookings = training_to_update.bookings + 1
    if training_to_update.bookings == training_to_update.limit:
        training_to_update.isFull = True

    training_to_update.save(update_fields=["bookings", "isFull"])
    if serialized_training.is_valid():
        serialized_training.save(update_fields=["students"])
    return Response( status=status.HTTP_202_ACCEPTED)


  def delete(self, request, pk):
    training_to_delete = self.get_training(pk)
    self.is_training_owner(training_to_delete, request.user)
    training_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
