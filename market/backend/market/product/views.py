from .models import Product
from django.http import JsonResponse
import re


def product(request,productName = None):
	if request.method != "POST":
		return JsonResponse({'status':405,"error":"method not allowed"})
	if not productName:
		try:
			products = Product.objects.all()
		except Exception as e:
			return JsonResponse({'status':500,'error':'Internal server error'})
		data = []
		for product in products:
			pro = {}
			pro['id'] = product.id
			pro['productName'] = product.productName
			pro['price'] = product.price
			pro['sort'] = product.sort
			pro['image'] = str(product.avatar)
			data.append(pro)
		responsedata = {'status':200,'data':data}
		return JsonResponse(responsedata)
	else:
		try:
			product = Product.objects.filter(productName = productName)[0]
		except Exception as e:
			print(str(e))
			return JsonResponse({'status':500,'error':'Internal Server error'})
		data = [
			{
			'id':product.id,
			'productName':product.productName,
			'price':product.price,
			'sort':product.sort,
			'image':str(product.avatar),
			'event':product.event,
			'amount':product.amount,
			'describe':product.describe,
			}
		]
		print(data)
		responsedata = {'status':200,'data':data}
		return JsonResponse(responsedata)


