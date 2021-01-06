# Generated by Django 3.1.2 on 2020-12-30 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0002_remove_user_avatar'),
        ('product', '0002_auto_20201219_2206'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('orderno', models.CharField(max_length=16, verbose_name='訂單編號')),
                ('productid', models.IntegerField(verbose_name='商品編號')),
                ('userid', models.IntegerField(verbose_name='用戶編號')),
                ('amount', models.IntegerField(verbose_name='購買數量')),
                ('created_time', models.DateTimeField(auto_now=True, verbose_name='建立時間')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
            options={
                'db_table': 'userorder',
            },
        ),
    ]
