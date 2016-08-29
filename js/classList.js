window.onload = function() {
	addClassList(GetQueryString("classID"));
	
	$('header p').text(GetQueryString("className"))
}

//根据指定的类名获取数据
function addClassList(a) {
	$.getJSONP("http://datainfo.duapp.com/shopdata/getGoods.php", getClassInfor1(a), function(data) {
		var ul = document.getElementById("classList");
		var con = '';
		var arr = [];
		if (data == 0) {
			var dialog1 = new dialog({
				width: 200,
				height: 200,
				top: 240,
				text: "sorry～～暂无商品"
			});
			dialog1.show();
		} else {
			for (var i in data) {
				arr.push(data[i].goodsID);
				//			console.log(arr)
				con += '<li><img src="' + data[i].goodsListImg + '"/><p>' + data[i].goodsName + '</p><span class="span1">￥' + data[i].price + '</span><s class="span2">￥' + parseInt((data[i].price) * (1 + data[i].discount / 10)) + '</s><p class="p1">' + data[i].discount + '折</p><span class="span3"><i>&#xe93a</i></span></li>';
			}
		}
		ul.innerHTML = con;
		classDetailInfor(ul, arr);
		classAddShoppingCar(ul, arr);
	});
}

function getClassInfor1(a) {
	var obj = {
		classID: a,
	}
	return obj;
}

//点击查看商品详情
function classDetailInfor(ul, arr) {
	$(ul).find('li').each(function(index) {
		$(this).click(function() {
			localStorage.setItem('goodsID', arr[index]);
			window.location = 'introduction.html';
		})
	})
}


var dialog2 = new dialog({
	width: 200,
	height: 200,
	top: 240,
	text: "请登录！"
});
//点击加入(刷新)购物车
function classAddShoppingCar(ul, arr) {
	var i = 1;
	$(ul).find('.span3').each(function(index) {
		$(this).click(function(event) {
			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			var userName = localStorage.getItem('userName');
			if (userName == null) {
				dialog2.show();
			} else {
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php", getClassInfor2(arr[index]), function(data) {
					
				})
			}
		})
	})
}

function getClassInfor2(goodsID) {
	var obj = {
		userID:localStorage.getItem('userName'),
		goodsID:goodsID,
		number:1
	}
	return obj;
}



