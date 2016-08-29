window.onload = function() {
	$('section').css('min-height', $(window).height() - 80);
	checkShoppingCar();
}

function getUserInfor() {
	var obj = {
		userID: localStorage.getItem('userName'),
	}
	return obj;
}
//查看购物车商品
function checkShoppingCar() {
	var userName = localStorage.getItem('userName');
	if (userName == null) {
		$('b').html(0);
		return false;
	} else {
		$.getJSONP("http://datainfo.duapp.com/shopdata/getCar.php", getUserInfor(), function(data) {
			if (data != 0) {
				var con = '';
				var arr1 = [];
				var num = 0;
				var money = 0;
				var goods = document.getElementById("goods");
				$('.infor').css('display', 'block');
				for (var i in data) {
					arr1.push(data[i].goodsID);
					con += '<li goodsID="'+data[i].goodsID+'"><img src="' + data[i].goodsListImg + '"/><p>' + data[i].goodsName + '</p><span class="span1">单价：￥' + data[i].price + '</span><p><span style="float:left">数量：</span><button class="sub" type="button"><i>&#xea0b</i></button><input class="text" type="text" value="' + data[i].number + '"/><button class="plus" type="button"><i>&#xea0a</i></button></p><i class="car"></i></li>';
					money += parseInt(data[i].price) * parseInt(data[i].number);
				}
				$(goods).html(con);
				$('section').html($(goods));
				$('section').css('background', '#F7F7F7');
				deleteCar($('.car'), arr1);
				subNumber($('.sub'), $('.text'), arr1);
				addNumber($('.plus'), $('.text'), arr1);
				detailInfor(goods, arr1);
			}
			$('.text').each(function(index) {
				num += parseInt($('.text').eq(index).val());
			});
			$('#money').html(money);
			$('#count').html(num);
			$('b').html(num);
		});
	}
}

//点击购物车商品减少
function subNumber(obj1, obj2, arr1) {
	$(obj1).each(function(index) {
		$(this).click(function(event) {
			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			var i = $(obj2).eq(index).val()
			i--;
			if (i <= 0) {
				upDateShoppingCar(arr1[index], 0);
				$(this).parent().parent().remove();
			}
			else{
				$(obj2).eq(index).val(i);
				upDateShoppingCar(arr1[index], $(obj2).eq(index).val());
			}
		})
	})
}
//点击购物车商品增加
function addNumber(obj1, obj2, arr1) {
	$(obj1).each(function(index) {
		$(this).click(function(event) {
			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			var i = $(obj2).eq(index).val()
			i++;
			
			$(obj2).eq(index).val(i)
			upDateShoppingCar(arr1[index], $(obj2).eq(index).val());
		})
	})
}

//刷新购物车
function upDateShoppingCar(id, num) {
	addShoppingCar(id, num);
	function getUserInfor(id, num) {
		var obj = {
			userID: localStorage.getItem('userName'),
			goodsID: id,
			number: num
		}
		return obj;
	}
	function addShoppingCar(id, num) {
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php", getUserInfor(id, num), function(data) {
			checkShoppingCar();
		})
	}
}
//点击删除购物车商品
function deleteCar(obj, arr) {
	$(obj).each(function(index) {
		$(this).click(function(event) {
			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			upDateShoppingCar(arr[index], 0);
			$(this).parent().remove();
		})
	})
}

//点击查看商品详情
function detailInfor(ul, arr) {
	$(ul).find('li').each(function(index) {
		$(this).click(function() {
			window.location = 'introduction.html?goodsID='+$(this).attr("goodsID");
		})
	})
}


