function self(){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	var selfdata = $('.selfdata');
	var column = {
		'username':'用戶名稱',
		'email':'E-mail',
		'phone':'連絡電話',
		'address':'收貨地址',
	}
	if(username == null || token == null){
		alert("請先登入!");
		return;
	}
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:"GET",
		url:`http://${host}:${port}/user/` + username,
		contentType:'application/json',
		dataType:'json',
		success:function(result){
			if(result.status == 200){
				var data = result.data;
				var cvalue = '';
				$.each(data,function(key,value){
					cvalue = column[key];
					selfdata.append(selfTemplate(cvalue,value,key));
				});
			}
			else{
				alert(result.error);
			}
		}
	})
}


function change(value){
	var username = window.localStorage.getItem('username');
	var token = window.localStorage.getItem('token');
	var changevalue = $('input[aria-label="' + value + '"]');
	var putdata = {'username':username,'key':value,'value':changevalue.val()};
	$.ajax({
		beforeSend:function(request){
			request.setRequestHeader('Authorization',token);
		},
		type:'put',
		url:`http://${host}:${port}/user`,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(putdata),
		success:function(result){
			if(result.status == 200){
				alert("修改成功");
				location.reload();
			}
			else{
				alert(result.error);
			}
		}
	})
}