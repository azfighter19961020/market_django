from django.db import models
from product.models import Product
from user.models import User
# Create your models here.


class Cartchoose(models.Model):
	id = models.AutoField(primary_key=True)
	productId = models.IntegerField(verbose_name = "產品ID")
	userId = models.IntegerField(verbose_name = "用戶ID")
	amount = models.IntegerField(verbose_name = "數量")
	product = models.ForeignKey(Product,on_delete=models.CASCADE)
	user = models.ForeignKey(User,on_delete=models.CASCADE)

	class Meta:
		db_table = 'cart_choose'
