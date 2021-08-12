from functools import update_wrapper

from django.contrib import admin
from django.urls.base import reverse
from django.http.response import HttpResponseRedirect
from django.contrib.admin.options import csrf_protect_m

app_orders = ['peoples', 'school']
models_orders = [
    # peoples
    'Group', 'Teacher',
    # school
    'Subject', 'Tag', 'Institution', 'Exam', 'Question', 'QuestionResolution'
]

class AdminSite(admin.AdminSite):
    def sort_models(self, models):
        result = []
        for model_to_sort in models_orders:
            for model in models:
                if model['object_name'] == model_to_sort:
                    result += [model]
        return result

    def sort_apps(self, apps):
        result = []
        for app_to_sort in app_orders:
            for app in apps:
                name = app['app_label']
                if name == app_to_sort:
                    app['models'] = self.sort_models(app['models'])
                    result += [app]
        return result
    
    def get_app_list(self, request):
        original = super().get_app_list(request)
        sorted_list = self.sort_apps(original)
        return sorted_list

admin_site = AdminSite()

class ModelAdminToggleViewMixin(admin.ModelAdmin):
    def get_urls(self):
        from django.urls import path

        def wrap(view):
            def wrapper(*args, **kwargs):
                return self.admin_site.admin_view(view)(*args, **kwargs)
            wrapper.model_admin = self
            return update_wrapper(wrapper, view)

        info = self.model._meta.app_label, self.model._meta.model_name

        urls = super().get_urls()
        urls.insert(1, path('toggle/<int:id>', wrap(self.toggle_status_view), name='%s_%s_toggle_active' % info))
        return urls

    @csrf_protect_m
    def toggle_status_view(self, request, id):
        info = self.model._meta.app_label, self.model._meta.model_name
        try:
            referer = request.referer
        except:
            referer = reverse('admin:%s_%s_changelist' % info)
        
        item = self.model.objects.filter(pk = id).first()
        if item:
            item.active = False if item.active else True
            item.save()
        
        return HttpResponseRedirect(referer)
