from django.conf import settings

from rest_framework import generics
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from school.models import Subject, Question
from .serializers import SubjectSerializer, SubjectQuestionSerializer

class SubjectViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    @action(detail = True, methods = ['get'])
    def questions(self, request, pk = None):
        page_size = 10
        if settings.REST_FRAMEWORK is not None:
            if 'PAGE_SIZE' in settings.REST_FRAMEWORK:
                page_size = settings.REST_FRAMEWORK['PAGE_SIZE']
        self.pagination_class.page_size = page_size
        
        questions = Question.objects.filter(subject__id = pk)
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
            serializer = SubjectQuestionSerializer(page, many = True)
            return self.get_paginated_response(serializer.data)

        serializer = SubjectQuestionSerializer(questions, many = True)
        return Response(serializer.data)
