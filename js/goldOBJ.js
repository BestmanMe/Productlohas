/*金币对象*/

function golds(opt) {
	this.config = {
		id: 0,
		width: 30,
		height: 30,
		top: 0,
		left: 0,
		speed: 10,
		score: 10,
		class: "gold"
	}
	$.extend(this.config, opt);
	this.$element = null;
	/*获取随机ID*/
	this.id=getrandomID();
	this.create();
}
golds.prototype = {
	create: function() {
		var $gold = $('<div class="' + this.config.class + '">');
		$gold.css({
			width: this.config.width,
			height: this.config.height,
			top: this.config.top,
			left: this.config.left
		});
		$("body").append($gold);
		this.$element = $gold;
	},
	move: function() {
		this.config.top += this.config.speed;
		if (this.config.top >= 800) {
		    this.$element.remove();
		}else{
			this.$element.css("top", this.config.top);
		}
		this.crashlisenter();
	},
	_delete: function() {		
		this.$element.css('display','none');
		globalOBJ.removejoin(this.id);
	},
	
	crashlisenter: function() {
		var that = this;
		var ppl = {
			top: globalOBJ.ppl.offset().top,
			left: globalOBJ.ppl.offset().left,
			width: globalOBJ.ppl.width(),
			height: globalOBJ.ppl.height()
		};
		crashListener({
			top: this.config.top,
			left: this.config.left,
			width: this.config.width,
			height: this.config.height
		}, ppl, function() {
			that._delete();	
		});
	}
}