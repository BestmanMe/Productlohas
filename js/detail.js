window.onload = function(){
	$('.detailImg').height($('.detailImg').width()*0.9);
	addDetailInfor();
}

function addDetailInfor(){
	function getIntroductionInfor1() {
		var obj = {
			goodsID: localStorage.getItem('goodsID')
		}
		return obj;
	}
	addInfor();

	function addInfor() {
		$.getJSONP("http://datainfo.duapp.com/shopdata/getGoods.php", getIntroductionInfor1(), function(data) {
			var arr = JSON.parse(data[0].goodsBenUrl);
			$('.detailImg').find('img').attr('src',arr[0]);
			$('.detailInfor').find('p').get(0).innerText = data[0].detail;
		});
	}
}


