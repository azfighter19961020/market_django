function login(){
	username = $('input[name="username"]').val();
	password = $('input[name="password"]').val();
	data = {'username':username,'password':password};
	$.ajax({
		type:'post',
		url:`http://${host}:${port}/login`,
		contentType:"application/json",
		dataType:"json",
		data:JSON.stringify(data),
		success:function(result){
			if(result.status == 200){
				window.localStorage.setItem('token',result.data);
				window.localStorage.setItem('username',result.username);
				window.location = '/index';
			}
			else{
				alert(result.error);
			}
		}
	})
}