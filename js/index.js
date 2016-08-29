window.onload = function() {

	$('#text').keyup(function() {
		$('#ul2').css('display', 'block');
		$('#ul2').click(function(event) {
//			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			event.stopPropagation();
		})
		addSearchList(); //搜索框信息
	})

	$('body').click(function() {
		$('#ul2').css('display', 'none');
	})



	addList(); //获取商品列表数据
	addBannerInfor(); //获取banner信息与banner切换
}

//获取商品列表数据
function addList() {
	$.getJSONP("http://datainfo.duapp.com/shopdata/getGoods.php", function(data) {
		var ul = document.getElementById("ul1");
		var con = '';
		var arr = [];
		for (var i in data) {
			arr.push(data[i].goodsID);
			//			console.log(arr)
			con += '<li><img src="' + data[i].goodsListImg + '"/><p>' + data[i].goodsName + '</p><span class="span1">￥' + data[i].price + '</span><s class="span2">￥' + parseInt((data[i].price) * (1 + data[i].discount / 10)) + '</s><p class="p1">' + data[i].discount + '折</p><span class="span3"><i>&#xe93a</i></span></li>';
		}
		ul.innerHTML = con;
		detailInfor(ul, arr);
		addShoppingCar(ul, arr);
	});
}
//点击列表改变搜索框内容
function content(ul) {
	$(ul).find('li').each(function(index) {
		$(this).click(function() {
			$('#text').val($(this).html());
			$(ul).css('display', 'none');
		})
	})
	$('#text').focus(function() {
		$(this).val('');
	})
}

//点击查看商品详情
function detailInfor(ul, arr) {
	$(ul).find('li').each(function(index) {
		$(this).click(function() {
			localStorage.setItem('goodsID', arr[index]);
			window.location = 'introduction.html';
		})
	})
}

//点击加入购物车，更新购物车状态
function getUserInfor(id, i) {
	var obj = {
		userID: localStorage.getItem('userName'),
		goodsID: id,
		number: i
	}
	return obj;
}
var dialog1 = new dialog({
	width: 200,
	height: 200,
	top: 240,
	text: "请登录！"
});
//点击加入购物车
function addShoppingCar(ul, arr) {
	var i = 1;
	$(ul).find('.span3').each(function(index) {
		$(this).click(function(event) {

//			window.event ? window.event.cancelBubble = true : event.stopPropagation();
			event.stopPropagation();
			var userName = localStorage.getItem('userName');
			if (userName == null) {
				dialog1.show();
			} else {
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php", getUserInfor(arr[index], i), function(data) {
					
				})
			}
		})
	})
}


//获取搜索框数据
function getUserInfor1() {
	var obj = {
		selectText: $('#text').val(),
		pageCode: "0",
		linenumber: "10"
	}
	return obj;
}

function addSearchList() {
	$.getJSONP("http://datainfo.duapp.com/shopdata/selectGoodes.php", getUserInfor1(), function(data) {
		var ul = document.getElementById("ul2");
		var con = '';
		for (var i in data) {
			con += '<li>' + data[i].goodsName + '</li>';
		}
		ul.innerHTML = con;
		content(ul)
	});
}


//加载banner数据
function addBannerInfor() {
	$.getJSONP("http://datainfo.duapp.com/shopdata/getBanner.php", function(data) {
		var ul = document.getElementById("ul3");
		var con = '';
		for (var i in data) {
			var arr = JSON.parse(data[i].goodsBenUrl);
			con += '<li><img src="' + arr[0] + '"/></li>';
		}
		ul.innerHTML = con;
		bannerChange(ul);
	});
}

//banner切换
function bannerChange(ul) {
	var $index = 0;
	var $qianIndex = 0;
	var $timer = null;
	var $l = $(ul).find('li').size();
	$('#ul4 > li').click(function() {
		clearInterval($timer);
		$(this).addClass('current').siblings().removeClass('current');
		$index = $(this).index();
		if ($index > $qianIndex) {
			next();
		} else if ($index < $qianIndex) {
			prev();
		}
		$qianIndex = $index;
		$timer = setInterval(autoPlay, 4000);
	})

	$timer = setInterval(autoPlay, 4000);

	function autoPlay() {
		$index++;
		next();
		if ($index >= $l) {
			$index = 0;
			$(ul).find('li').eq($index).css('left', '100%').stop(true, true).animate({
				'left': '0'
			});
		}
		$('#ul4 > li').eq($index).addClass('current').siblings().removeClass('current');
		$qianIndex = $index;
	}

	function prev() {
		$(ul).find('li').eq($qianIndex).stop(true, true).animate({
			'left': '100%'
		});
		$(ul).find('li').eq($index).css('left', '-100%').stop(true, true).animate({
			'left': '0'
		});
	}
	
	function next() {
		$(ul).find('li').eq($qianIndex).stop(true, true).animate({
			'left': '-100%'
		});
		$(ul).find('li').eq($index).css('left', '100%').stop(true, true).animate({
			'left': '0'
		});
	}
}



