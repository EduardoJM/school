"""
Management utility to create superteacher.
"""
from django.contrib.auth.management.commands import createsuperuser
from peoples.models import Teacher

class Command(createsuperuser.Command):
    help = 'Used to create a superteacher.'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.UserModel = Teacher
        self.username_field = self.UserModel._meta.get_field(self.UserModel.USERNAME_FIELD)
