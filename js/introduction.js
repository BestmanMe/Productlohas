window.onload = function() {
	$('.img').height($('.img').width());
	$('.goodsInfor').css('top', $('.img').height() + 100);
	$('section').height($('.img').height() + $('.timer').height() + $('.goodsInfor').height() + $('.bottom_infor').height() + 130);
	addIntroductionInfor();
}

//获取商品介绍数据
function addIntroductionInfor() {
	
	function getIntroductionInfor1() {
		var obj = {
			goodsID: localStorage.getItem('goodsID')
		}
		return obj;
	}
	addInfor();

	function addInfor() {
		$.getJSONP("http://datainfo.duapp.com/shopdata/getGoods.php", getIntroductionInfor1(), function(data) {
			$('.img').find('img').attr('src',data[0].goodsListImg);
			$('.price').get(0).innerHTML = data[0].price;
			$('.goodsName').get(0).innerHTML = data[0].goodsName;
			$('.prev_price').get(0).innerHTML = parseInt((data[0].price) * (1 + data[0].discount / 10));
			$('.count').get(0).innerHTML = data[0].discount;
			$('.byNumber').get(0).innerHTML = data[0].buynumber;
		});
	}
}