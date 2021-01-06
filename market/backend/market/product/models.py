from django.db import models

# Create your models here.

class Product(models.Model):
	id = models.AutoField(primary_key=True)
	productName = models.CharField(max_length=64,verbose_name="商品名稱")
	price = models.IntegerField(verbose_name="商品價格")
	amount = models.IntegerField(verbose_name="商品數量")
	sort = models.CharField(max_length=32,verbose_name="類別")
	avatar = models.ImageField(upload_to="productImage/")
	event =  models.TextField(blank=True,null=True,verbose_name="活動")
	describe = models.TextField(blank=True,null=True,verbose_name = "描述")
	class Meta:
		db_table = 'product'
