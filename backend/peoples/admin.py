from django.contrib import admin

from core.decorators import register

from .models import Teacher, Group

@register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['name']

@register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active']
