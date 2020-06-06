# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Video
from .serializers import VideoSerializer, PopulatedVideoSerializer

class VideoListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self, _request):
    videos = Video.objects.all()
    serialized_videos = PopulatedVideoSerializer(videos, many=True)
    return Response(serialized_videos.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id 
    new_video = VideoSerializer(data=request.data)
    if new_video.is_valid():
      new_video.save()
      return Response(new_video.data, status=status.HTTP_201_CREATED)
    return Response(new_video.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class VideoDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get_video(self, pk):
    try:
      return Video.objects.get(pk=pk)
    except Video.DoesNotExist:
      raise NotFound()

  def is_video_owner(self, video, user):
    if video.owner.id != user.id:
      raise PermissionDenied()

  def get(self, _request, pk):
    video = self.get_video(pk)
    serialized_video = PopulatedVideoSerializer(video)
    return Response(serialized_video.data, status=status.HTTP_200_OK)

  def put(self, request, pk):
    video_to_update = self.get_video(pk)
    self.is_video_owner(video_to_update, request.user)
    request.data['owner'] = request.user.id
    updated_video = VideoSerializer(video_to_update, data=request.data)
    if updated_video.is_valid():
      updated_video.save()
      return Response(updated_video.data, status=status.HTTP_202_ACCEPTED)
    return Response(updated_video.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    video_to_delete = self.get_video(pk)
    self.is_video_owner(video_to_delete, request.user)
    video_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)