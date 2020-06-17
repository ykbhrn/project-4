# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from jwt_auth.serializers import PopulatedUserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


from .models import Chat
from .serializers import PopulatedChatSerializer, ChatSerializer

class ChatListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_user(self, pk):
      try:
        return User.objects.get(pk=pk)
      except User.DoesNotExist:
        raise NotFound()

    def get(self, request, pk):
      chats = Chat.objects.filter(users=request.user.id).filter(users=pk)
      
      # here functionality to show just chats which you have with specific user
      serialized_chats = PopulatedChatSerializer(chats, many=True)
      return Response(serialized_chats.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        first_user = self.get_user(request.user.id)
        second_user = self.get_user(pk)
        request.data['users'] = [request.user.id, pk]
        request.data['text_list'] = [request.data]
        created_chat = ChatSerializer(data=request.data)
        if created_chat.is_valid():
            created_chat.save()
            return Response(created_chat.data, status=status.HTTP_201_CREATED)
        return Response(created_chat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ContinueChat(APIView):

    permission_classes = (IsAuthenticated, )

    def get_chat(self, pk):
        try:
            return Chat.objects.get(pk=pk)
        except Chat.DoesNotExist:
            raise NotFound()

    def is_chat_owner(self, chat, user):
        if chat.owner.id != user.id:
            raise PermissionDenied()

    def put(self, request, pk):
      chat_to_update = self.get_chat(pk)
      serialized_chat = PopulatedChatSerializer(data=chat_to_update)
      chat_to_update.text_list.add(request.data.text)

      chat_to_update.save(update_fields=["text"])
      
      return Response(chat_to_update.data, status=status.HTTP_202_ACCEPTED)


    def delete(self, request, pk):
        chat_to_delete = self.get_chat(pk)
        self.is_chat_owner(chat_to_delete, request.user)
        chat_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
