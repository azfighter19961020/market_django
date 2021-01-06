from django.conf.urls import url,include
from login.views import login_view


urlpatterns = [
	url(r'^$',login_view),
]