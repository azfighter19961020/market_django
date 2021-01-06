from django.shortcuts import render
import json
from user.models import User
from django.http import JsonResponse
import hashlib
import time
from random import randint
from user.views import token
# Create your views here.

def login_view(request):
	if request.method != "POST":
		return JsonResponse({"status":405,"error":'method not allowed'})
	else:
		data = request.body
		jsondata = json.loads(data)
		print(jsondata)
		if not jsondata['username'] or not jsondata['password']:
			return JsonResponse({'status':400,"error":'data incomplete'})
		try:
			userdata = User.objects.filter(username = jsondata['username'])
		except Exception as e:
			print(str(e))
			return JsonResponse({'status':500,'error':'internal server error'})
		else:
			if not userdata:
				return JsonResponse({'status':404,'error':'User not found'})
			username = jsondata['username']
			password = jsondata['password']
			md5 = hashlib.md5()
			md5.update(password.encode())
			if md5.hexdigest() != userdata[0].password:
				return JsonResponse({'status':400,'error':'password not correct!'})
			usertoken = token(username)
			responsedata = {'status':200,"error":'success',"data":usertoken.decode(),"username":username}
			return JsonResponse(responsedata)


