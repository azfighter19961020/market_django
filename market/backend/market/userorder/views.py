from django.shortcuts import render
from django.http import JsonResponse
from userorder.models import Order
from product.models import Product
from user.models import User
from cartchoose.models import Cartchoose
from usercart.models import usercart
from tools.login_check import logincheck
import json
import uuid
import datetime
from tools.genOrderNo import generateOrderNo
# Create your views here.

@logincheck(['POST'])
def order(request,orderno=None):
	if request.method == "POST":
		"""
		{username:charlieda,
		product:[
			"airpod",
			"ipad".....
		]},
		address:address,
		phone:phone,
		"""
		if not orderno:
			data = request.body
			jsondata = json.loads(data)
			username = jsondata['username']
			products = jsondata['product']
			choose = eval(jsondata['choose'])
			# 第四版UUID,以隨機亂數方式產商
			orderno = generateOrderNo(str(uuid.uuid4()))
			userdata = User.objects.filter(username = username)
			if not userdata:
				return JsonResponse({'status':404,'error':'user not found'})
			userdata = userdata[0]
			for product in products:
				productdata = Product.objects.filter(productName = product['productName'])[0]
				order = Order.objects.create(
						orderno = orderno,
						productid = productdata.id,
						amount = product['amount'],
						userid = userdata.id,
						product = productdata,
						user = userdata,
						address = jsondata['address'],
						phone = jsondata['phone'],
					)
				productdata.amount = productdata.amount - int(product['amount'])
				productdata.save()
				usercartdata = usercart.objects.filter(productName = product['productName']).filter(user = userdata)[0]
				usercartdata.delete()
				if choose:
					cartchoosedata = Cartchoose.objects.filter(product = productdata).filter(user = userdata)[0]
					cartchoosedata.delete()
			return JsonResponse({'status':200,'data':{'username':username,'orderno':orderno}})
		else:
			data = request.body
			jsondata = json.loads(data)
			username = jsondata['username']
			userdata = User.objects.filter(username = username)[0]
			print(userdata)
			products = []
			orderdata = Order.objects.filter(orderno = orderno).filter(user = userdata)
			if not orderdata:
				return JsonResponse({'status':404,'error':'無此訂單'})
			for product in orderdata:
				phone = product.phone
				address = product.address
				productdata = product.product
				products.append({'image':str(productdata.avatar),'productName':productdata.productName,'amount':product.amount,'price':productdata.price * product.amount})
			return JsonResponse({'status':200,'username':username,'phone':phone,'address':address,'products':products})


				