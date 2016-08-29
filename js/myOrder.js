window.onload = function() {

checkShoppingCar();


}



function getUserInfor() {
	var obj = {
		userID: localStorage.getItem('userName'),
	}
	return obj;
}
//查看浏览记录
function checkShoppingCar() {
		$.getJSONP("http://datainfo.duapp.com/shopdata/getCar.php",getUserInfor(), function(data) {
			var ul = document.getElementById("myOrderUl");
			var con = '';
			var arr = [];
			console.log(data)
			for (var i in data) {
				con += '<li><img src="' + data[i].goodsListImg + '"/><p>' + data[i].goodsName + '</p><span class="span1">单价：￥' + data[i].price + '</span><p>数量：' + 1 + '</p><a href="###" class="cancle">取消订单</a></li>';
			}
			ul.innerHTML = con;
			$('.cancle').each(function() {
				$(this).click(function() {
					$(this).parent().remove();
				})
			})
		});
	
}