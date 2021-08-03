from rest_framework import serializers

from school.models import (
    Subject, Question, Tag, QUESTION_LEVEL,
    Institution, QuestionAlternative, Exam,
)

class SubjectSerializer(serializers.ModelSerializer):
    """
    A class that provides a serializer for Subject model.
    """
    class Meta:
        model = Subject
        fields = ('id', 'name', 'icon', )

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
        for lv in QUESTION_LEVEL:
            if (lv[0] == obj.level):
                return lv[1]
        return obj.level

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
    class Meta:
        model = QuestionAlternative
        fields = ('text', 'correct')

class CompleteQuestionSerializer(ResumedQuestionSerializer):
    """
    A class that provides a complete serializer for Question model.
    """
    alternatives = QuestionAlternativeSerializer(many = True)
    subject = SubjectSerializer()
    resolutions_count = serializers.SerializerMethodField()
    exam = ExamSerializer()

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
