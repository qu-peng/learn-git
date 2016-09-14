$(function() {
	$.ajax({
		type: "get",
		url: "data/1.json",
		dataType:'json',
		async: true,
		success: function(res) {
			setData(res.data.gallery);
		}
	});

	function setData(arr) {
		//console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];

			$('.section_second .img').eq(i).attr('src', obj.img_url);
		}
		$('.section_second .img').eq(5).attr('src', arr[0].img_url);
		//console.log(a);

		//轮播图
		var timer;
		var num = 0;
		$('.section_second li').eq(0).css({
			background: 'red'
		})

		function gun() {
			timer = setInterval(function() {

				num++;
				if (num == 6) {
					num = 1;
					$('.allImg').css('left', 0);
				}

				$('.allImg').animate({
					left: num * -document.documentElement.clientWidth
				}, 1000, function() {
					for (var i = 0; i < 5; i++) {
						$('.section_second li').css({
							background: '#E5E5E5'
						})
					}

					//红点轮播
					var point = num;
					if (point == 5) {
						point = 0;
					}
					$('.section_second li').eq(point).css({
						background: 'red'
					})
				})

			}, 2000)

		}

		gun();
	}

	//请求6个图数据
	$.ajax({
		type: "get",
		url: "data/1.json",
		async: true,
		dataType:'json',
		success: function(res) {
			setData_second(res.data.sections[0].body.items);
		}
	});

	function setData_second(arr) {
		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];
			$('.section_third .img').eq(i).attr('src', obj.img_url);
		}
	}

	//请求图文列表数据
	$.ajax({
		type: "get",
		url: "data/1.json",
		async: true,
		dataType:'json',
		success: function(res) {
			//console.log(res);
			setData_third(res.data.sections);
		}
	});

	function setData_third(arr) {
		for (var i = 1; i < arr.length - 1; i++) {
			var obj = arr[i].body.items[0];
			var liObj = $('<li class="list_li"><img src="" class="max_img"/><img src="" class="min_img"/><div><p></p><p></p><p></p></div></li>');
			liObj.find('img').eq(0).attr('src', obj.img_url);
			liObj.find('img').eq(1).attr('src',obj.product_tag);
			liObj.find('p').eq(0).text(obj.product_name);
			liObj.find('p').eq(1).text(obj.product_brief);
			liObj.find('p').eq(2).text(obj.product_price);
			$('.list').append(liObj);
		}

		var arr1 = arr[arr.length - 1].body.items;
		$('.section_five .left_img').attr('src', arr1[0].img_url);
		$('.section_five .right_img').attr('src', arr1[1].img_url);

	}

	//正文内容完全显示出来
	var k = document.documentElement.clientHeight - 2 * innerWidth / 16;
	$('.one').height(k);

	//two
	$.ajax({
		type: "get",
		url: "data/2.json",
		async: true,
		dataType:'json',
		success: function(res) {

			setData_four(res.data.list);
		}
	});

	function setData_four(arr) {

		for (var i = 0; i < arr.length; i++) {
			var obj1 = arr[i];
			console.log(obj1);
			var arr2 = obj1.list;

			var maxObj = $('<div class="max_div"><p class="pTop"></p><div class="div_imgs"></div></div>');
			maxObj.find('.pTop').text(obj1.name);
			$('.two_two').append(maxObj);
			console.log( arr2.length);
			for (var k = 0; k < arr2.length; k++) {
				
				var obj = arr2[k];

				var divObj = $('<div class="min_div"><img src="" /><p></p></div>');
				divObj.find('img').attr('src', obj.img_url);
				divObj.find('p').text(obj.name);
				maxObj.find('.div_imgs').append(divObj);
			}

		}
	}
	
	//初始第一个橘色
	$('footer section').eq(0).css('color','orange');

	//tab切换
	$('footer section').on('touchstart', function() {
		for (var i = 0; i < $('footer section').length; i++) {
			$('.main').eq(i).hide();
			$('footer section').eq(i).css('color', 'black');

		}
		var j = $(this).index();
		$('.main').eq(j).show();
		$('footer section').eq(j).css('color', 'orange');

	})
})