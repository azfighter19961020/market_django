from django.shortcuts import render
from tools.login_check import logincheck
from user.models import User
import json
import re
from django.http import JsonResponse
import hashlib
import time
import jwt
from random import randint

@logincheck(['GET','PUT'])
def users(request,username = None):
	if request.method == 'GET':
		if not username:
			return JsonResponse({'status':400,'error':'no username'})
		userdata = User.objects.filter(username = username)
		if not userdata:
			return JsonResponse({'status':404,'error':'user not found'})
		userdata = userdata[0]
		data = {}
		data['username'] = userdata.username
		data['email'] = userdata.email
		data['address'] = userdata.address
		data['phone'] = userdata.phone
		return JsonResponse({'status':200,'data':data})
	elif request.method == 'POST':
		data = request.body
		print(data)
		jsondata = json.loads(data)
		print(jsondata)
		emailpattern = re.compile('[A-Za-z0-9_]+[@][A-Za-z0-9.]+')
		if [i for i in jsondata.items() if not i]:
			return JsonResponse({'status':400,'error':'有欄位未填寫!'})
		if jsondata['pwd1'] != jsondata['pwd2']:
			return JsonResponse({'status':400,'error':'密碼不一致!'})
		if not emailpattern.findall(jsondata['email']):
			return JsonResponse({'status':400,'error':'E-mail填寫錯誤!'})
		try:
			userdata = User.objects.filter(username = jsondata['name'])
		except Exception as e:
			return JsonResponse({'status':500,'error':'Internal Server Error'})
		
		if userdata:
			return JsonResponse({'status':400,'error':'此用戶名已存在'})

		md5 = hashlib.md5()
		md5.update(jsondata['pwd1'].encode())
		try:
			User.objects.create(username = jsondata['name'], \
								password = md5.hexdigest(), \
								email = jsondata['email'], \
								address = jsondata['address'], \
								phone = jsondata['phone'])
		except Exception as e:
			print(str(e))
			return JsonResponse({'status':500,'error':'internal server error'})
		else:
			tokenResult = token(jsondata['name'])
			return JsonResponse({'status':200,'error':'測試成功!','username':jsondata['name'],'data':tokenResult.decode()})
	elif request.method == "PUT":
		data = request.body
		jsondata = json.loads(data)
		username = jsondata['username']
		if not username:
			return JsonResponse({'status':400,'error':'no user name'})
		key = jsondata['key']
		value = jsondata['value']
		userdata = User.objects.filter(username = username)
		if not userdata:
			return JsonResponse({'status':404,'error':'user not found'})
		try:
			userdata = userdata[0]
			evalString = "userdata." + key + "=" + '"' + value + '"'
			c = exec(evalString)
			userdata.save()
		except Exception as e:
			return JsonResponse({'status':500,'error':"Internal Server Error"})
		else:
			return JsonResponse({'status':200,'error':'success'})
		


def token(username):
	now = time.time()
	expiretime = 60 * 60
	key = '123456789'
	payload = {'username':username,'expire':now+expiretime}
	return jwt.encode(payload,key,algorithm = 'HS256')
