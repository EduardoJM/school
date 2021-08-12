def register(*models):
    """
    Registra as classes de Models fornecidas criando um wrapper para a classe
    ModelAdmin com o admin_site provido pelo projeto CSA Educacional.

    @register(Author)
    class AuthorAdmin(admin.ModelAdmin):
        pass
    """
    from django.contrib.admin import ModelAdmin
    from django.contrib.admin.sites import AdminSite, site as default_site
    from .admin import admin_site

    def _model_admin_wrapper(admin_class):
        if not models:
            raise ValueError('At least one model must be passed to register.')

        if not isinstance(admin_site, AdminSite):
            raise ValueError('site must subclass AdminSite')

        if not issubclass(admin_class, ModelAdmin):
            raise ValueError('Wrapped class must subclass ModelAdmin.')

        admin_site.register(models, admin_class=admin_class)

        return admin_class
    return _model_admin_wrapper
