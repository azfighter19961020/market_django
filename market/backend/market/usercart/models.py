from django.db import models
from product.models import Product
from user.models import User

# Create your models here.

class usercart(models.Model):
	id = models.AutoField(primary_key=True)
	productName = models.CharField(max_length=64,verbose_name="商品名稱")
	productId = models.IntegerField(verbose_name = "商品編號")
	productPrice = models.IntegerField(verbose_name = "商品價格")
	amount = models.IntegerField(verbose_name = "商品數量")
	product = models.ForeignKey(Product,on_delete=models.CASCADE)
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	avatar = models.ImageField(upload_to = "productImage/")

	class Meta:
		db_table = "usercart"
