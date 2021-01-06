



function indexProduct(){
	$.ajax({
		url:`http://${host}:${port}/product`,
		type:"post",
		contentType:"application/json",
		dataType:"json",
		success:function(result){
			data = result.data;
			$.each(data,function(index,product){
				$(".product").append(indexProductTemplate(product));
			});
		}
	})
}

function addcart(productName){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("請重新登入!");
		return;
	}
	else{
		data = {
			'username':username,
			'token':token,
			'productName':productName,
			'amount':1,
		}
		$.ajax({
			type:"post",
			url:`http://${host}:${port}/usercart/` + productName,
			contentType:'application/json',
			dataType:'json',
			data:JSON.stringify(data),
			success:function(result){
				if(result.status == 200){
					alert("加入成功!");
					// window.location.href = '/cart';
					var cartsign = $('a[href="/cart"]');
					// console.log(cartsign.html());
					var totalamount = result.data.total;
					var cartsignString = '購物車(' + totalamount.toString() + ')';
					cartsign.html(cartsignString);
				}
				else{
					alert(result.error);
				}
			}

		})
	}


}




function singleProduct(){
	var url = window.location.href;
	var productName = url.match('http:.*?product\/(.*)')[1];
	$.ajax({
		type:'post',
		url:`http://${host}:${port}/product/` + productName,
		success:function(result){
			// alert(result.data[0]['productName']);
			var product = result.data[0];
			var inf = $('.productInf');
			var des = $('.pro_des');
			var pimg = $('.pimg');
			pimg.html(singleimgTemplate(product));
			inf.append(titleTemplate(product));
			var eventArray = product.event.split(';');
			$.each(eventArray,function(index,event){
				inf.append(eventTemplate(event));
			})
			inf.append(singleDownTemplate(product));
			des.html(product.describe);
		}
	})
}


function plus(){
	$('.amount').val(parseInt($('.amount').val()) + 1);
}

function minus(){
	if(parseInt($('.amount').val()) - 1 == 0){
		alert("商品數不可為零或負");
	}
	else{
		$('.amount').val(parseInt($('.amount').val()) - 1);
	}
}







