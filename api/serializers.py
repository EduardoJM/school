from rest_framework import serializers

from school.models import Subject, Question, Tag, QUESTION_LEVEL

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'name', 'icon', )

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class SubjectQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many = True)
    level = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = (
            'id',
            'short_description',
            'exam',
            'text',
            'level',
            'tags'
        )

    def get_level(self, obj):
        for lv in QUESTION_LEVEL:
            if (lv[0] == obj.level):
                return lv[1]
        return obj.level
