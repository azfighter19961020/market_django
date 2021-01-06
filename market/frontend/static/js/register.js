function register(){
	var name = $('input[name="username"]').val();
	var pwd1 = $('input[name="pwd1"]').val();
	var pwd2 = $('input[name="pwd2"]').val();
	var email = $('input[name="email"]').val();
	var address = $('input[name="add1"]').val();
	var phone = $('input[name="phone"]').val();
	var data = {'name':name,'pwd1':pwd1,'pwd2':pwd2,'email':email,'address':address,'phone':phone};
	$.ajax({
			type:"post",
			url:`http://${host}:${port}/user`,
			data:JSON.stringify(data),
			contentType:"application/json",
			dataType:"json",
			success:function(result){
				if(result.status == 200){
					console.log(result.data);
					window.localStorage.setItem('token',result.data);
					window.localStorage.setItem('username',result.username);
					$('.success').css('display','block');

				}
				else{
					alert(result.error);
				}
			}


	})
}

function toIndex(){
	window.location = '/index';
}