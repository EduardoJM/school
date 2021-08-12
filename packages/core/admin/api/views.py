from django.conf import settings

from rest_framework import generics
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView

from school.models import Subject, Question, Tag
from .serializers import (
    CompleteQuestionSerializer, SubjectSerializer, ResumedQuestionSerializer,
    TokenObtainSerializer,
)

class QuestionViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = Question.objects.filter(active = True)
    serializer_class = CompleteQuestionSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        if 'tag' in request.GET:
            try:
                id = int(request.GET['tag'])
                tags = Tag.objects.filter(pk = id)
                queryset = queryset.filter(tags__in = tags)
            except:
                pass

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ResumedQuestionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ResumedQuestionSerializer(queryset, many=True)
        return Response(serializer.data)

class SubjectViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = Subject.objects.filter(active = True)
    serializer_class = SubjectSerializer

    @action(detail = True, methods = ['get'])
    def questions(self, request, pk = None):
        """
        Get the paginated list of questions for this subject.
        """
        page_size = 10
        if settings.REST_FRAMEWORK is not None:
            if 'PAGE_SIZE' in settings.REST_FRAMEWORK:
                page_size = settings.REST_FRAMEWORK['PAGE_SIZE']
        self.pagination_class.page_size = page_size

        subject = self.queryset.filter(id = pk).first()
        if not subject:
            return Response({
                "detail": "Não encontrado."
            }, status = status.HTTP_404_NOT_FOUND)
            
        questions = Question.objects.filter(
            subject = subject,
            active = True
        )
        allowed_tags_str = self.request.query_params.get('tags')
        if allowed_tags_str:
            allowed_tags_splited = str(allowed_tags_str).split(',')
            ids = []
            for allowed in allowed_tags_splited:
                try:
                    id = int(str(allowed).strip())
                    ids += [id]
                except:
                    continue
            questions = questions.filter(tags__in = ids).distinct()
        page = self.paginate_queryset(questions)

        if page is not None:
            serializer = ResumedQuestionSerializer(page, many = True)
            return self.get_paginated_response(serializer.data)

        serializer = ResumedQuestionSerializer(questions, many = True)
        return Response(serializer.data)

class TokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainSerializer
