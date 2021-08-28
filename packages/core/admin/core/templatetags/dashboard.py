import secrets
from django import template
from django.contrib.admin.templatetags.admin_list import result_list
from django.contrib.admin.templatetags.base import InclusionAdminNode

register = template.Library()

@register.simple_tag(name = 'random_id')
def random_id():
    return secrets.token_hex(10)

@register.tag(name='result_list_image')
def result_list_image(parser, token):
    return InclusionAdminNode(
        parser, token,
        func=result_list,
        template_name='change_list_images_results.html',
        takes_context=False,
    )
