

function login_check(){
	token = window.localStorage.getItem('token');
	username = window.localStorage.getItem('username');
	var show = '';
	if(token == null || username == null){
		$('.login_check').html(notLoginTemplate());
		return;
	}
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:"get",
		url:`http://${host}:${port}/usercart`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify({'username':username}),
		success:function(result){
			var totalamount = 0;
			if(result.status == 200){
				$('.login_check').html(loginTemplate(result,username));
			}
		}
	})
}

function logout(){
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('username');
	location.reload();
}



