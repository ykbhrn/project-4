# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Article
from .serializers import ArticleSerializer, PopulatedArticleSerializer

class ArticleListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self, _request):
    articles = Article.objects.all()
    serialized_articles = PopulatedArticleSerializer(articles, many=True)
    return Response(serialized_articles.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id 
    new_article = ArticleSerializer(data=request.data)
    if new_article.is_valid():
      new_article.save()
      return Response(new_article.data, status=status.HTTP_201_CREATED)
    return Response(new_article.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ArticleDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get_article(self, pk):
    try:
      return Article.objects.get(pk=pk)
    except Article.DoesNotExist:
      raise NotFound()

  def is_article_owner(self, article, user):
    if article.owner.id != user.id:
      raise PermissionDenied()

  def get(self, _request, pk):
    article = self.get_article(pk)
    serialized_article = PopulatedArticleSerializer(article)
    return Response(serialized_article.data, status=status.HTTP_200_OK)

  def put(self, request, pk):
    article_to_update = self.get_article(pk)
    self.is_article_owner(article_to_update, request.user)
    request.data['owner'] = request.user.id
    updated_article = ArticleSerializer(article_to_update, data=request.data)
    if updated_article.is_valid():
      updated_article.save()
      return Response(updated_article.data, status=status.HTTP_202_ACCEPTED)
    return Response(updated_article.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    article_to_delete = self.get_article(pk)
    self.is_article_owner(article_to_delete, request.user)
    article_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)