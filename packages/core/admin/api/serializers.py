from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer as BaseTokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from peoples.models import User
from school.models import (
    Subject, Question, Tag, QUESTION_LEVEL,
    Institution, QuestionAlternative, Exam,
)

class SubjectSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for Subject model.
    """
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = ('id', 'name', 'icon')
    
    def get_icon(self, obj):
        return obj.icon.url

class TagSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for Tag model.
    """
    class Meta:
        model = Tag
        fields = ('id', 'name')

class ResumedQuestionSerializer(serializers.ModelSerializer):
    """
    A class that provides a resumed serializer for Question model.
    """
    tags = TagSerializer(many = True)
    level = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = (
            'id',
            'short_description',
            'level',
            'tags'
        )

    def get_level(self, obj):
        return obj.display_level()

class InstitutionSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for Institution.
    """
    class Meta:
        model = Institution
        fields = ('name', 'site')

class ExamSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for Exam model.
    """
    institution = InstitutionSerializer()

    class Meta:
        model = Exam
        fields = ('name', 'institution', 'year', 'link', 'access_date', 'uf')

class QuestionAlternativeSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for QuestionAlternative model.
    """
    text = serializers.SerializerMethodField()

    class Meta:
        model = QuestionAlternative
        fields = ('text', 'correct')

    def get_text(self, obj):
        return obj.text_rendered

class CompleteQuestionSerializer(ResumedQuestionSerializer):
    """
    A class that provides a complete serializer for Question model.
    """
    alternatives = QuestionAlternativeSerializer(many = True)
    subject = SubjectSerializer()
    resolutions_count = serializers.SerializerMethodField()
    exam = ExamSerializer()
    text = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = (
            'id',
            'short_description',
            'text',
            'level',
            'exam',
            'subject',
            'tags',
            'alternatives',
            'resolutions_count',
        )
    
    def get_resolutions_count(self, obj):
        return obj.resolutions.count()
    
    def get_text(self, obj):
        return obj.text_rendered

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']

class TokenObtainSerializer(BaseTokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['token'] = str(refresh.access_token)
        data['user'] = UserSerializer(self.user).data
        return data

