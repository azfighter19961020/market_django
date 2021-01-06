from django.conf.urls import url
from . import views


urlpatterns = [
	url(r'^$',views.order),
	url(r'^/(?P<orderno>[\w]{1,255})$',views.order),
]