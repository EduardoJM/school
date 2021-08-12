import secrets

from django import template

register = template.Library()

@register.simple_tag(name = 'random_id')
def random_id():
    return secrets.token_hex(10)
