import json
from django.test.testcases import TestCase

from django.urls.base import reverse
from rest_framework.test import APITestCase

from peoples.models import User

class ApiAuthTestCase(APITestCase):
    url = reverse('token_obtain_pair')
    url_refresh = reverse('token_refresh')

    def setUp(self):
        self.username = "john"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(self.username, self.email, self.password)

    def test_auth_and_refresh(self):
        """
        Test the JWT authentication and refresh JWT token.
        """
        response_auth = self.client.post(self.url, {
            "username": self.username,
            "password": self.password,
        })
        self.assertEqual(response_auth.status_code, 200, "Api authentication must be return a 200 status code.")
        data_auth = json.loads(response_auth.content)
        if not "refresh" in data_auth:
            raise self.failureException("Api authentication must be return a refresh token.")
        if not "access" in data_auth:
            raise self.failureException("Api authentication must be return a access token.")
        response = self.client.post(self.url_refresh, {
            "refresh": data_auth["refresh"]
        })
        self.assertEqual(response.status_code, 200, "Api refresh authentication must be return a 200 status code.")
        data = json.loads(response.content)
        if not 'access' in data:
            raise self.failureException("Api refresh authentication must be return a access token.")
