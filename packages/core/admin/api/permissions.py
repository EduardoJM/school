from rest_framework import permissions

class IsTheUser(permissions.IsAuthenticated):
    """
    Custom permission to only allow the user access your data.
    """
    def has_object_permission(self, request, view, obj):
        return obj == request.user
