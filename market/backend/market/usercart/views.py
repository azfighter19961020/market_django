from django.shortcuts import render
from tools.login_check import logincheck
from usercart.models import usercart
from user.models import User
from product.models import Product
from django.http import JsonResponse
import json

@logincheck(['PUT','DELETE','GET'])
def userCartView(request,productName=None):
	if request.method != "POST" and request.method != "PUT" and request.method != "DELETE" and request.method != "GET":
		return JsonResponse({'status':405,'error':'method not allowed'})
	if request.method == 'GET':
		username = eval(list(request.GET.keys())[0])['username']
		print(username)
		user = User.objects.filter(username = username)[0]
		products = usercart.objects.filter(user = user)
		totalamount = 0
		for product in products:
			totalamount += product.amount
		return JsonResponse({'status':200,'data':{'amount':totalamount}})
	if request.method == "POST":
		if not productName:
			data = request.body
			print(data)
			jsondata = json.loads(data)
			username = jsondata['username']

			userdata = User.objects.filter(username = username)
			if not userdata:
				return JsonResponse({'status':404,'error':'user not found'})
			userdata = userdata[0]
			allproduct = usercart.objects.filter(user=userdata)
			prodata = []
			for product in allproduct:
				pro = {}
				pro['image'] = str(product.avatar)
				pro['productName'] = product.productName
				pro['amount'] = product.amount
				pro['totalPrice'] = product.amount * product.productPrice
				pro['price'] = product.productPrice
				pro['userid'] = product.user.id
				prodata.append(pro)
			print(prodata)
			return JsonResponse({'status':200,'data':prodata})

		else:
			data = request.body
			print(data)
			jsondata = json.loads(data)
			username = jsondata['username']
			productData = Product.objects.filter(productName = productName)
			userData = User.objects.filter(username = username)
			if not productData:
				return JsonResponse({'status':404,'error':'product not found'})
			if not userData:
				return JsonResponse({'status':404,'error':'user not found'})
			amount = jsondata['amount']
			productId = productData[0].id
			price = productData[0].price
			if amount > productData[0].amount:
				return JsonResponse({'status':400,'error':'超過存貨數量!'})
			userProduct = usercart.objects.filter(productName = productName).filter(user = userData[0])
			print(userProduct)
			if userProduct:
				userProduct = userProduct[0]
				userProduct.amount += amount
				userProduct.save()
			else:
				try:
					addcart = usercart.objects.create(productName = productName, \
											productId = productId, \
											productPrice = price, \
											amount = amount, \
											product = productData[0], \
											user = userData[0], \
											avatar = str(productData[0].avatar),
											)
				except Exception as e:
					print(str(e))
					return JsonResponse({'status':107,'error':'Internal Server error'})
				else:
					addcart.save()
			
			products = usercart.objects.filter(user = userData[0])
			totalamount = 0
			for product in products:
				totalamount += product.amount
			return JsonResponse({'status':200,'error':'success','data':{'total':totalamount}})
	if request.method == "PUT":
		data = request.body
		jsondata = json.loads(data)
		username = jsondata['username']
		amount = jsondata['amount']
		productName = jsondata['productName']
		userdata = User.objects.filter(username = username)[0]
		productdata = usercart.objects.filter(productName = productName).filter(user = userdata)
		if not productdata:
			return JsonResponse({'status':404,'error':'no product'})
		productdata = productdata[0]
		price = productdata.productPrice
		print(productdata.amount)
		pdata = Product.objects.filter(productName = productName)
		if amount > pdata[0].amount:
			return JsonResponse({'status':400,'error':'超過存貨數量!'})
		productdata.amount = amount
		productdata.save()
		totalPrice = price * amount
		products = usercart.objects.filter(user = userdata)
		total = 0
		totalAmount = 0
		for product in products:
			total += product.amount * product.productPrice
			totalAmount += product.amount
		return JsonResponse({'status':200,'error':'success','data':{'totalPrice':totalPrice,'total':total,'totalAmount':totalAmount}})
	if request.method == "DELETE":
		data = request.body
		jsondata = json.loads(data)
		username = jsondata['username']
		productName = jsondata['productName']
		print(productName)
		userdata = User.objects.filter(username = username)
		if not userdata:
			return JsonResponse({'status':404,'error':'no user found'})
			print(usercart.objects.filter(productName = productName)[0])
		productdata = usercart.objects.filter(productName = productName).filter(user = userdata[0])
		if not productdata:
			return JsonResponse({'status':404,'error':'no product found'})
		productdata[0].delete()
		allproduct = usercart.objects.filter(user = userdata[0])
		prodata = []
		for product in allproduct:
			pro = {}
			pro['image'] = str(product.avatar)
			pro['productName'] = product.productName
			pro['amount'] = product.amount
			pro['totalPrice'] = product.amount * product.productPrice
			pro['price'] = product.productPrice
			pro['userid'] = product.user.id
			prodata.append(pro)
		print(prodata)
		return JsonResponse({'status':200,'data':prodata})



