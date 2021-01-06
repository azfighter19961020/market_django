
function cart(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("請登入!");
		return;
	}
	data = {'username':username,'token':token};
	$.ajax({
		type:'post',
		url:`http://${host}:${port}/usercart`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(result){
			if(result.status == 200){
				var cartall = $('.cartall');
				var total = 0;
				cartall.append(cartStaticTemplate());
				$.each(result.data,function(index,product){
					cartall.append(cartProductTemplate(product));
					total += parseInt(product.totalPrice);
				});
				cartall.append(lastTemplate(total));
				field();
				console.log(total);
				if(total == 0){
					$('.nulldiv').css('display','block');
				}
			}
			else{
				alert(result.error);
			}
		}

	})


}



function changeAmount(productName,type){
	if(type == '-'){
		if(parseInt($('.' + productName + '_amount').val()) - 1 == 0){
			$('.deldiv').css('display','flex');
			$('.delyes').click(function(){
				del(productName);
			});
			$('.delno').click(function(){
				$('.deldiv').css('display','none');
			})
			return;
		}
			
	}
	var amountField = $('.' + productName + '_amount');
	if(type == '-'){
		var amount = parseInt($('.' + productName + '_amount').val()) - 1;
	}
	if(type == '+'){
		var amount = parseInt($('.' + productName + '_amount').val()) + 1;
	}
	if(type == 'input'){
		var amount = parseInt($('.' + productName + '_amount').val());
		if(isNaN(amount)){
			return;
		}
	}
	
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	if(username == null || token == null){
		alert("請重新登入!");
		return;
	}
	putdata = {'username':username,'amount':amount,'productName':productName};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'put',
		url:`http://${host}:${port}/usercart`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(putdata),
		success:function(result){
			if(result.status == 200){
				$('.' + productName + '_amount').val(amount);
				var priceString = '<h5>$' + result.data.totalPrice.toString() + '</h5>';
				$('.' + productName + '_price').html(priceString);
				var totalString = '<h3>$' + result.data.total.toString() + '</h3>';
				$('.total').html(totalString);
				cartsign = $('a[href="/cart"]');
				cartsign.empty();
				var cartsignString = "購物車(" + result.data.totalAmount.toString() + ")";
				cartsign.html(cartsignString);
			}
			else{
				alert(result.error);
			}
		}

	})
}



function del(productName){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	var deldata = {'username':username,'productName':productName};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'delete',
		url:`http://${host}:${port}/usercart`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(deldata),
		success:function(result){
			if(result.status == 200){
				var cartall = $('.cartall');
				cartall.empty();
				var total = 0;
				var cartsign = $('a[href="/cart"]');
				var totalamount = 0;
				cartall.append(cartStaticTemplate());
				$.each(result.data,function(index,product){
					cartall.append(cartProductTemplate(product));
					total += parseInt(product.totalPrice);
					totalamount += product.amount;
				});
				cartall.append(lastTemplate(total));
				cartsign.empty();
				var cartsignString = "購物車(" + totalamount.toString() + ")";
				cartsign.html(cartsignString);
				if(totalamount == 0){
					$('.nulldiv').css('display','block');
				}
			}
			else{
				alert(result.error);
			}
		}
	})
}


function deletechoose(choose,token,username){
		var productName = choose.parent().parent().children('div[class*=name]').html();
		productName = productName.match('<h4>(.*?)</h4>')[1];
		var price = choose.parent().parent().children('div[class*=price]').html();
		price = price.match('<h5>(.*)</h5>')[1].replace('$','');
		var amount = choose.parent().parent().children();
		amount = $(amount.get(3)).children().children('input[class*=amount]').val();
		var checkedvalue = $('.checkedvalue').html();
		var oldamount = parseInt(checkedvalue.match('您總共選了(.*?)件商品')[1]);
		var oldprice = parseInt(checkedvalue.match('總價格為(.*?)元')[1]);
		oldamount -= parseInt(amount);
		oldprice -= parseInt(price);
		data = {'username':username,'product':productName}
		$.ajax({
			beforeSend:function(request){
				request.setRequestHeader('Authorization',token);
			},
				type:'put',
				url:`http://${host}:${port}/cartchoose/delete`,
				contentType:'application/json',
				dataType:'json',
				data:JSON.stringify(data),
				success:function(result){
					if(result.status != 200){
						alert(result.error);
					}
				}

		})
		return {'oldamount':oldamount,'oldprice':oldprice};

}

function addchoose(choose,token,username){
		var productName = choose.parent().parent().children('div[class*=name]').html();
		productName = productName.match('<h4>(.*?)</h4>')[1];
		var price = choose.parent().parent().children('div[class*=price]').html();
		price = price.match('<h5>(.*)</h5>')[1].replace('$','');
		var amount = choose.parent().parent().children();
		amount = $(amount.get(3)).children().children('input[class*=amount]').val();
		var checkedvalue = $('.checkedvalue').html();
		var oldamount = parseInt(checkedvalue.match('您總共選了(.*?)件商品')[1]);
		var oldprice = parseInt(checkedvalue.match('總價格為(.*?)元')[1]);
		oldamount += parseInt(amount);
		oldprice += parseInt(price);
		$(this).attr('checked',true);
		data = {'username':username,'product':productName,'amount':amount}
		$.ajax({
			beforeSend:function(request){
				request.setRequestHeader('Authorization',token);
			},
			type:'post',
			url:`http://${host}:${port}/cartchoose`,
			contentType:'application/json',
			dataType:'json',
			data:JSON.stringify(data),
			success:function(result){
				if(result.status != 200){
					alert(result.error);
				}
			}

		})
		return {'oldamount':oldamount,'oldprice':oldprice};
}


function field(){
	$('.amountField').each(function(){
		console.log($(this).val());
		$(this).on('input propertychange',function(e){
			var classList = $(this).attr('class').split(" ");
			var productName = classList[1].replace("_amount","");
			console.log(productName);
			var valueChanged = false;
			if(e.type == 'propertychange'){
				valueChanged = e.originalEvent.propertyName=='value';
			}
			else{
				valueChanged = true;
			}
			if(valueChanged){
				changeAmount(productName,'input');
			}
			
		});
	})
	$('#all').click(function(){
		var username = window.localStorage.getItem('username');
		var token = window.localStorage.getItem('token');
		if(username == null || token == null){
			alert("Login again!");
			return;
		}
		if($(this).is(':checked')){
			var totalamount = 0;
			var totalprice = 0;
			$('.itemcheck').each(function(){
				$(this).attr('checked',true);
				addchoose($(this),token,username);
			})
			$('.amountField').each(function(){
				totalamount += parseInt($(this).val());
			})
			
			$('div[class*="price"]').each(function(){
				pString = $(this).html();
				price = pString.match('<h5>(.*)</h5>')[1].replace('$','');
				totalprice += parseInt(price);
			})
			$('.checkedvalue').empty();
			var show = '';
			show = show + '<h3> 您總共選了' + totalamount.toString() + '件商品 </h3>';
			show += '<hr>';
			show = show + '<h4> 總價格為' + totalprice.toString() + '元</h4>';
			$('.checkedvalue').html(show);
		}
		else{
			$('.itemcheck').each(function(){
				$(this).attr('checked',false);
				deletechoose($(this),token,username);
			})
			$('.checkedvalue').empty();
			var show = '';
			show = show + '<h3> 您總共選了' + '0' + '件商品 </h3>';
			show += '<hr>';
			show = show + '<h4> 總價格為' + '0' + '元</h4>';
			$('.checkedvalue').html(show);
		}
	})
	$('.itemcheck').each(function(){
		$(this).click(function(){
			var token = window.localStorage.getItem('token');
			var username = window.localStorage.getItem('username');
			if(token == null || username == null){
				alert("login again!");
				return;
			}
			if($(this).is(':checked')){
				$(this).attr('checked',true);
				old = addchoose($(this),token,username);
			}
			else{
				$(this).attr('checked',false);
				old = deletechoose($(this),token,username);
			}
			$('checkedvalue').empty();
			var show = '';
			show = show + '<h3> 您總共選了' + old['oldamount'].toString() + '件商品 </h3>';
			show += '<hr>';
			show = show + '<h4> 總價格為' + old['oldprice'].toString() + '元</h4>';
			$('.checkedvalue').html(show);
		})
	})
}



function tocheckout(){
	var selected = false;
	$('.itemcheck').each(function(){
		if($(this).is(':checked')){
			selected = true;
		}
	})
	if(selected){
		window.location = '/checkout/true';
	}
	else{
		window.location = '/checkout/false';
	}
	
}