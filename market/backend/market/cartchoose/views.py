from django.shortcuts import render
from .models import Cartchoose
from django.http import JsonResponse
import json
from tools.login_check import logincheck
from user.models import User
from product.models import Product
# Create your views here.

@logincheck(['POST','GET','PUT'])
def cartchoose(request,delete=None):
	if delete:
		data = request.body
		jsondata = json.loads(data)
		username = jsondata['username']
		productName = jsondata['product']
		userdata = User.objects.filter(username = username)
		if not userdata:
			return JsonResponse({'status':404,'error':'User not found'})
		userdata = userdata[0]
		productdata = Product.objects.filter(productName = productName)
		if not productdata:
			return JsonResponse({'status':404,'error':'product not found'})
		productdata = productdata[0]
		choosedata = Cartchoose.objects.filter(product = productdata).filter(user = userdata)
		if not choosedata:
			return JsonResponse({'status':404,'error':'checked data not found'})
		choosedata.delete()
		return JsonResponse({'status':200,'username':username})
	if request.method == "GET":
		data = request.body
		username = eval(list(request.GET.keys())[0])['username']
		user = User.objects.filter(username = username)
		if not user:
			return JsonResponse({'status':404,'error':'user not found'})
		chooseList = Cartchoose.objects.filter(user = user[0])
		data = []
		for choose in chooseList:
			cdict = {}
			product = choose.product
			user = choose.user
			cdict['image'] = str(product.avatar)
			cdict['productName'] = product.productName
			cdict['price'] = product.price
			cdict['amount'] = choose.amount
			data.append(cdict)
		return JsonResponse({'status':200,'username':username,'data':data})
	else:
		data = request.body
		jsondata = json.loads(data)
		username = jsondata['username']
		if not username:
			return JsonResponse({'status':401,'error':'Login again'})
		userdata = User.objects.filter(username = username)
		if not userdata:
			return JsonResponse({'status':404,'error':'no user'})
		userdata = userdata[0]
		productName = jsondata['product']
		productdata = Product.objects.filter(productName = productName)
		if not productdata:
			return JsonResponse({'status':404,'error':'product not found'})
		productdata = productdata[0]
		productid = productdata.id
		userid = userdata.id
		amount = jsondata['amount']
		choose = Cartchoose.objects.create(
				productId = productid,
				userId = userid,
				amount = amount,
				product = productdata,
				user = userdata
			)
		return JsonResponse({'status':200})
