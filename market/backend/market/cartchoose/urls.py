from django.conf.urls import url
from . import views


urlpatterns = [
	url(r'^$',views.cartchoose),
	url(r'^/(?P<delete>[\w]{1,6})',views.cartchoose)
]