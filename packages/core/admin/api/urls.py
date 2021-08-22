from django.conf import settings
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import SimpleRouter
from rest_framework.schemas import get_schema_view

from .views import (
    QuestionImageViewset, SubjectViewSet, QuestionViewSet, AuthenticatedUserRetrieveView, TokenObtainPairView
)

router = SimpleRouter()
router.register('subjects', SubjectViewSet)
router.register('questions', QuestionViewSet)
router.register('image_list', QuestionImageViewset)

urlpatterns = [
    path('auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/user/', AuthenticatedUserRetrieveView.as_view(), name='retrieve_authenticated_user'),
    path('docs/openapi/', get_schema_view(
        title="Your Project",
        description="API for all things...",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs/swagger/', TemplateView.as_view(
        template_name = 'swagger-ui.html',
        extra_context = {'schema_url' : 'openapi-schema'}
    ), name='swagger-ui'),
]
if settings.DEBUG:
    urlpatterns += [
        path('/auth/session/', include('rest_framework.urls'))
    ]
