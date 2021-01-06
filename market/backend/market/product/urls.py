from django.conf.urls import url
from . import views


urlpatterns = [

	url(r'^$',views.product),
	url(r'^/(?P<productName>[\w]{1,64})$',views.product)
]

