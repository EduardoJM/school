from peoples.models import Teacher
from django.contrib import admin

from peoples.models import Teacher
from school.models import Exam, Institution, Question, QuestionTag, Tag

class InstitutionFilter(admin.SimpleListFilter):
    title = 'Instituição'
    parameter_name = 'institution'

    def lookups(self, request, model_admin):
        institution = Institution.objects.all()
        lookup = ()
        for institute in institution:
            lookup += (
                (institute.id, institute.name),
            )
        return lookup
    
    def queryset(self, request, queryset):
        try:
            id = int(self.value())
            return queryset.filter(institution__id = id)
        except:
            return queryset

class ExamFilter(admin.SimpleListFilter):
    title = 'Prova'
    parameter_name = 'exam'

    def lookups(self, request, model_admin):
        exams = Exam.objects.all()
        lookup = ()
        for exam in exams:
            lookup += (
                (exam.id, exam.name + ' (' + str(exam.year) + ')'),
            )
        return lookup
    
    def queryset(self, request, queryset):
        try:
            id = int(self.value())
            return queryset.filter(exam__id = id)
        except:
            return queryset

class TagFilter(admin.SimpleListFilter):
    title = 'Marcador'
    parameter_name = 'tag'

    def lookups(self, request, model_admin):
        lookup = ()
        tags = QuestionTag.objects.all()
        lookuped = []
        for tag_relation in tags:
            tag = tag_relation.tag
            if tag in lookuped:
                continue
            lookuped += [tag]
            lookup += (
                (tag.id, tag.name),
            )
        return lookup

    def queryset(self, request, queryset):
        try:
            id = int(self.value())
            tags = Tag.objects.filter(pk = id)
            return queryset.filter(tags__in = tags)
        except:
            return queryset

class TeacherFilter(admin.SimpleListFilter):
    title = 'Professor'
    parameter_name = 'teacher'

    def lookups(self, request, model_admin):
        teachers = Teacher.objects.all()
        lookup = ()
        for teacher in teachers:
            lookup += (
                (teacher.id, str(teacher)),
            )
        return lookup
    
    def queryset(self, request, queryset):
        try:
            id = int(self.value())
            return queryset.filter(teacher__id = id)
        except:
            return queryset

class QuestionFilter(admin.SimpleListFilter):
    title = 'Questão'
    parameter_name = 'question'

    def lookups(self, request, model_admin):
        questions = Question.objects.all()
        lookup = ()
        for question in questions:
            lookup += (
                (question.id, str(question)),
            )
        return lookup
    
    def queryset(self, request, queryset):
        try:
            id = int(self.value())
            return queryset.filter(question__id = id)
        except:
            return queryset
