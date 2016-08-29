window.onload = function() {
	addShotImgs();
	$('.swiper-container').width($(window).width());
	$('.swiper-container').height($(window).height() - $('header').height() - $('footer').height());
	addShotImgs();
}

function addShotImgs() {
	function getIntroductionInfor1() {
		var obj = {
			goodsID: localStorage.getItem('goodsID')
		}
		return obj;
	}
	addInfor();

	function addInfor() {
		$.getJSONP("http://datainfo.duapp.com/shopdata/getGoods.php", getIntroductionInfor1(), function(data) {
			var arr = JSON.parse(data[0].imgsUrl);
			var con = '';
			var con2 = '';
			for (var i = 0; i < arr.length; i++) {
				con += '<div class="swiper-slide"><img src="' + arr[i] + '"></div>';
			}
			$('.swiper-wrapper').get(0).innerHTML = con;
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay:3000,
				pagination : '.swiper-pagination',
				paginationClickable :true,
				
			})
		});
	}
}
