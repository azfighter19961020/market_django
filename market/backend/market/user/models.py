from django.db import models

# Create your models here.


class User(models.Model):
	id = models.AutoField(primary_key = True)
	username = models.CharField(max_length = 16,verbose_name = "用戶名稱")
	password = models.CharField(max_length = 255,verbose_name = "用戶密碼")
	email = models.CharField(max_length = 255,verbose_name = "用戶EMAIL")
	phone = models.CharField(max_length = 16,verbose_name = "用戶電話")
	address = models.CharField(max_length = 255,verbose_name = "用戶地址")
	

	class Meta:
		db_table = "user"