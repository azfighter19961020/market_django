from django.conf.urls import url, include
from django.contrib import admin

from market import settings
from user.views import users

from django.conf.urls.static import static

urlpatterns = [
	url(r'^$',users),
	url(r'^/(?P<username>[\w]{1,11})$', users),
]