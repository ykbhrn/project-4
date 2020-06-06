# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Image
from .serializers import ImageSerializer, PopulatedImageSerializer

class ImageListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self, _request):
    images = Image.objects.all()
    serialized_images = PopulatedImageSerializer(images, many=True)
    return Response(serialized_images.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id 
    new_image = ImageSerializer(data=request.data)
    if new_image.is_valid():
      new_image.save()
      return Response(new_image.data, status=status.HTTP_201_CREATED)
    return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ImageDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get_image(self, pk):
    try:
      return Image.objects.get(pk=pk)
    except Image.DoesNotExist:
      raise NotFound()

  def is_image_owner(self, image, user):
    if image.owner.id != user.id:
      raise PermissionDenied()

  def get(self, _request, pk):
    image = self.get_image(pk)
    serialized_image = PopulatedImageSerializer(image)
    return Response(serialized_image.data, status=status.HTTP_200_OK)

  def put(self, request, pk):
    image_to_update = self.get_image(pk)
    self.is_image_owner(image_to_update, request.user)
    request.data['owner'] = request.user.id
    updated_image = ImageSerializer(image_to_update, data=request.data)
    if updated_image.is_valid():
      updated_image.save()
      return Response(updated_image.data, status=status.HTTP_202_ACCEPTED)
    return Response(updated_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    image_to_delete = self.get_image(pk)
    self.is_image_owner(image_to_delete, request.user)
    image_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)