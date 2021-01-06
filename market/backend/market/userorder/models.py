from django.db import models
from product.models import Product
from user.models import User
# Create your models here.


class Order(models.Model):
	id = models.AutoField(primary_key=True)
	orderno = models.CharField(max_length=255,verbose_name="訂單編號")
	productid = models.IntegerField(verbose_name="商品編號")
	userid = models.IntegerField(verbose_name="用戶編號")
	amount = models.IntegerField(verbose_name = "購買數量")
	product = models.ForeignKey(Product,on_delete=models.CASCADE)
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	created_time = models.DateTimeField(verbose_name = "建立時間",auto_now=True)
	address = models.CharField(max_length = 255,verbose_name = "地址",default="null")
	phone = models.CharField(max_length = 64,verbose_name = "電話號碼",default="null")

	class Meta:
		db_table = 'userorder'