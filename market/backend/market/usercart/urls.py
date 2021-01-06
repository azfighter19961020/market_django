from django.conf.urls import url,include
from django.contrib import admin

from usercart.views import userCartView

urlpatterns = [
	url(r'^$',userCartView),
	url(r'^/(?P<productName>[\w]{1,64})$',userCartView),

]


