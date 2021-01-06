function load_checkoutProduct(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("Login again!");
		return;
	}
	data = {'username':username}
	var url = ``;
	var method = "";
	var choose = window.location.href.split('/')[window.location.href.split('/').length - 1];
	if(choose == 'true'){
		url = `http://${host}:${port}/cartchoose`;
		method = "get";
	}
	else{
		url = `http://${host}:${port}/usercart`;
		method = "post";
	}
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:method,
		url:url,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(result){
			if(result.status == 200){
				var orderinfo = $('.order');
				var products = result.data;
				console.log(products);
				$.each(products,function(index,product){
					console.log(product);
					orderinfo.append(checkoutProductTemplate(product));
				})
			}
			else{
				alert(result.error);
			}
		}
	})

}

function load_checkoutInformation(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("login again!");
		return;
	}
	data = {'username':username};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'get',
		url:`http://${host}:${port}/user/` + username,
		contentType:'application/json',
		dataType:'json',
		success:function(result){
			if(result.status == 200){
				var userdata = result.data;
				var phone = userdata.phone;
				var address = userdata.address;
				var orderinfo = $('.orderinfo');
				orderinfo.append(informationTemplate(phone,address));
			}
			else{
				alert(result.error);
			}
		}
	})
}

function checkout(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("Login again!");
		return;
	}
	var choose = window.location.href.split('/')[window.location.href.split('/').length - 1];
	var c = "";
	if(choose == 'true'){
		c = "True";
	}
	else{
		c = "False";
	}
	var phone = $('.phone').val();
	var address = $('.address').val();
	var products = [];

	$('.product').each(function(){
		var node = $(this).children();
		var productName = $(node.get(1)).children().children().html();
		var amount = $(node.get(2)).children().html();
		products.push({'productName':productName,'amount':amount});
	})
	var data = {'username':username,'phone':phone,'address':address,'product':products,'choose':c};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'post',
		url:`http://${host}:${port}/userorder`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(result){
			if(result.status == 200){
				//alert("下訂成功!訂單編號為:" + result.data.orderno);
				$('.order').empty();
				$('.orderinfo').empty();
				$('.order').append(checkoutSuccessTemplate(result.data.orderno));

			}
			else{
				alert(result.error);
			}
		}
	})

}

function checkOrder(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	var orderno = $('.orderno').val();
	if(username == null || token == null){
		alert('Login again!');
		return;
	}
	var data = {'username':username};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'post',
		url:`http://${host}:${port}/userorder/` + orderno,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(result){
			if(result.status == 200){
				var phone = result.phone;
				var address = result.address;
				var ordertop = $('.order');
				var orderinfo = $('.orderinfo');
				ordertop.empty();
				orderinfo.empty();
				ordertop.append(checkOrderTopTemplate(orderno));
				var products = result.products;
				$.each(products,function(index,product){
					ordertop.append(checkOrderProductTemplate(product));
				})
				
				
				orderinfo.append(checkOrderInfoTemplate(phone,address));
			}
			else{
				alert(result.error);
			}
		}
	})
}