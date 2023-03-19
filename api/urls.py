from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('quiz.urls')),
    re_path(r'^$', TemplateView.as_view(template_name='index.html')),
    # match all other pages
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^media/(?P<path>.*)$', serve,
            {'document_root':       settings.MEDIA_ROOT}),
    re_path(r'^assets/(?P<path>.*)$', serve,
            {'document_root': settings.STATIC_ROOT}),
]
