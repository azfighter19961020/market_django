function cartStaticTemplate(){
	return `
		<div class="row-xl">
			<h2 style="color:#009FCC;">
				購物車
			</h2>
		</div>
		<hr class="mb-4">
		<div class="row mb-4 mx-auto justify-content-center">
		<div class="col-md-4 col-lg-4 col-xl-2">
        	<input type="checkbox" id="all">
            <h6>全選</h6>
        </div>
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>圖片</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>商品名稱</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>數量</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1">
				<h5>金額</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1">
			</div>	
		</div>	
		<hr class="mb-4"> 
       	<div class="nulldiv" style="justify-content: center;margin:0 auto;width:20%;display:none;"> 
            	<h2> 
            		購物車為空 
            	</h2> 
            	<h3> 
            		快去選購吧! 
            	</h3> 
            </div> 
			 <div class="deldiv row mb-4 mx-auto justify-content-center" style="margin: 0 auto;display:none;"> 
            <h3>是否刪除商品?</h3> 
            <input type="button" value="是" class="btn btn-danger delyes"> 
            <input type="button" value="否" class="btn btn-primary delno"> 
        </div> 
	`;
}

function cartProductTemplate(product){
	return `
		<div class="row mb-4 mx-auto">
			<div class="col-md-4 col-lg-4 col-xl-1"> 
	            <input type="checkbox" class="itemcheck"> 
	        </div> 
	        <div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
	        	<img src="http://${host}:${port}/media/${product.image}" alt="" style="width:60%">
	        </div>
	        <div class="col-md-4 col-lg-4 col-xl-3 justify-content-center name" style="padding:40px">
	        	<a href="/product/${product.productName}">
	        		<h4>${product.productName}</h4>
	        	</a>
	        </div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center" style="padding:40px">
				<div class="input-group-prepend">
					<input type="button" value="-" class="input-group-text" onclick="changeAmount('${product.productName}','-')">
					<input type="text" value="${product.amount}" class="form-control ${product.productName}_amount amountField">
					<input type="button" value="+" class="input-group-text" onclick="changeAmount('${product.productName}','+')">
				</div>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1 justify-content-center ${product.productName}_price" style="padding:40px">
				<h5>$${product.totalPrice}</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1 justify-content-center" style="padding:40px">
				<input type="button" value="刪除" class="btn btn-danger" onclick="del('${product.productName}')">
			</div>
		</div>
		<hr class="mb-4">
	`
}

function lastTemplate(total){
	return `
		<div class="row mb-4 mx-auto">
			<div class="col-md-4 col-lg-4 col-xl-6">
				<h3>
					總計
				</h3>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-6 total" style="text-align: right;">
				<h3>
					$${total}
				</h3>
			</div>
		</div>
		<div class="row mb-4 mx-auto justify-content-end"> 
			<div class="d-flex"> 
				<input type="button" value="結帳" class="btn btn-primary" style="width:10em;" onclick="tocheckout()"> 
			</div> 
		</div>
		<div class="row mb-4 mx-auto">
			<div class="checkedvalue"> 
				<h3> 您總共選了 0 件商品</h3> 
				<hr>
				<h4> 總價格為 0 元</h4> 
			</div> 
		</div> 
	`
}


function notLoginTemplate(){
	return `
	  	<div class="log">
	  		<a href="/login" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">登入</a>
	  	</div>
	  	<div class="log">
	  		<a href="/Register" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">註冊</a>
	  	</div>
	`;
}

function loginTemplate(result,username){
	return `
		<div class="log">
			<a href="/self/${username}" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">
				歡迎${username}
			</a>
		</div>
		<div class="log">
			<a href="javascript:logout()" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">登出</a>
		</div>
		<div class="log">
			<a href="/cart" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">購物車(${result.data.amount})</a>
		</div>
		<div class="log">
			<a href="/order" onMouseOver="this.style.color='#0080FF'" onMouseOut="this.style.color='#000000'">訂單查詢</a>
		</div>
	`;
}

function indexProductTemplate(product){
	return ` 
		<li class="nav-item">
			<!-- 常數host -->
			<img src="http://${host}:${port}/media/${product.image}" alt="">
			<div class="productName">
			<a href="/product/${product.productName}"><p>${product.productName.replace(/_/g," ")} <span style="color:red">$${product.price}</span></p></a>

			<button class="btn btn-info" onclick="addcart('${product.productName}')">加入購物車</button>
			</div>
		</li>
	`;
}


function singleimgTemplate(product){
	return `<img src="http://${host}:${port}/media/${product.image}" alt="">`;
}

function titleTemplate(product){
	return `<h1>${product.productName.replace(/_/g," ")}</h1>`;
}

function singleDownTemplate(product){
	return `
		<h2 style="color:#0066FF;">$${product.price}</h2>
		<div class="input-group-prepend">
		<input type="button" value="-" class="input-group-text">
		<input type="text" value="1" class="form-control">
		<input type="button" value="+" class="input-group-text">
		</div>
		<button type="button" class="btn btn-info">立即購買</button>
		<button type="button" class="btn btn-info" onclick="addcart('${product.productName}')">
			加入購物車
		</button>		
		<h5 style="color:red">商品還剩下${product.amount}件</h5>
	`;
}

function eventTemplate(event){
	return `<p style="color:red;font-size:1.3em;">${event}</p>`;
}


function selfTemplate(cvalue,value,key){
	return `
		<div class="input-group mb-4"> 
			<div class="input-group-prepend"> 
				<span class="input-group-text"> 
					${cvalue}
				</span>
			</div>
			<input type="text" class="form-control" value="${value}" aria-label="${key}">
			<input type="button" value="修改" class="btn btn-primary" onclick="change('${key}')">
		</div>
	`;
}


function checkoutProductTemplate(product){
	return `
		<div class="row mb-4 mx-auto product">
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<img src="http://${host}:${port}/media/${product.image}" alt="" style="width:60%">
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center" style="padding:40px">
				<a href="/product/${product.productName}">
					<h4>${product.productName}</h4>
				</a>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center" style="padding:40px">
				<h4>${product.amount}</h4>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1 justify-content-center" style="padding:40px">
				<h5>${product.amount * product.price}</h5>
			</div>
		</div>
	`;
}


function informationTemplate(phone,address){
	return `
		<div class="row mx-auto">
			<div class="col-md-4 col-lg-4 col-xl-1 justify-content-center">
				<h5>
					電話
				</h5>
			</div>
			<div class="input-group mb-4 col-xl-3">
				<input type="text" class="phone form-control" aria-label="phone" value="${phone}">
			</div>				
			<div class="col-md-4 col-lg-4 col-xl-2 justify-content-center">
				<h5>
					收貨地址
				</h5>
			</div>
			<div class="input-group mb-4 col-xl-5">
				<input type="text" class="address form-control" aria-label="address" value="${address}">
			</div>
			<div class="row mb-4 mx-auto justify-content-end">
				<div class="d-flex">
					<button class="btn btn-info" onclick="checkout()">結帳</button>
				</div>
			</div>
		</div>
	`;
}



function checkOrderTopTemplate(orderno){
	return `
		<h3>
			訂單編號: <span> ${orderno} </span>
		</h3>
		<hr class="mb-10">
		<h3>
			商品列表
		</h3>
		<hr class="mb-10">
		<div class="row mb-4 mx-auto justify-content-center">
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>圖片</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>商品名稱</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3">
				<h5>數量</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1">
				<h5>金額</h5>
			</div>
		</div>
		<hr class="mb-4">
	`;	
}

function checkOrderProductTemplate(product){
	return `
		<div class="row mb-4 mx-auto">
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<img src="http://${host}:${port}/media/${product.image}" alt="" style="width:60%">
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center" style="padding:40px">
				<a href="/product/${product.productName}">
					<h4>${product.productName}</h4>
				</a>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center" style="padding:40px">
				<h4>${product.amount}</h4>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-1 justify-content-center" style="padding:40px">
				<h5>$${product.price}</h5>
			</div>
		</div>

	`
}

function checkOrderInfoTemplate(phone,address){
	return `
		<div class="orderinfo row mb-4 mx-auto">
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<h5>
					電話
				</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<h5>
					 ${phone}
				</h5>
			</div>				
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<h5>
					收貨地址
				</h5>
			</div>
			<div class="col-md-4 col-lg-4 col-xl-3 justify-content-center">
				<h5>
					${address}
				</h5>
			</div>
		</div>
	`;

}


function checkoutSuccessTemplate(orderno){
	return `
		<div class="row mb-4 mx-auto justify-content-center">
			<h1>訂購完成!</h1>
			
		</div>
		<div class="row mb-4 mx-auto justify-content-center">
			<h3>訂單編號為:${orderno}</h3>
		</div>

	`;

}