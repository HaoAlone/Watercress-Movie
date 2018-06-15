
var index = 0
var isLoading = false
start()
NowIn()
//滚动更新
$('main').scroll(function () {
	if ($('main').scrollTop() + $('main').height() >= $('section').eq(0).height()-10){
		start()
	}
})
//tab切换
$('footer>div').click(function () {
	var index = $(this).index()
	$('section').hide().eq(index).fadeIn()
	$(this).addClass('active').siblings().removeClass('active')
})
//搜索
$('#search').find('button').on('click',function () {
	$('.searchResult').children('.item').remove()
	searchMovie();
})
//函数节流
// var clock
// // $('main').scroll(function () {
// if (clock){
// 	clearTimeout(clock)
// }
// clock = setTimeout(function () {
// 	if ($('main').scrollTop() + $('main').height() >= $('section').eq(0).height()-10){
// 		 	start()
// 	 	}
// },300)
//
// })

// top250
function start() {
	if (isLoading) return
	isLoading = true
	$('.loading').show()
	$.ajax({
		url:'https://api.douban.com/v2/movie/top250',
		type:'GET',
		data:{
			start:index,
			count:20
		},
		dataType:'jsonp'
	}).done(function (ret) {
		// console.log(ret)
		setData(ret)
		index += 20
	}).fail(function (error) {
		console.log(error)
	}).always(function () {
		isLoading = false
		$('.loading').hide()
	})
}
function setData(data) {
	data.subjects.forEach(function (movie) {
		var ele = `<div class="item">
			<a href="#">
				<div class="cover">
					<img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
				</div>
				<div class="detail">
					<h2>肖申克的救赎</h2>
					<div class="extra">
						<span class="score">9.6分</span>分/<span class="collect">1300313</span>收藏
					</div>
					<div class="extra"><span class="year"></span> / <span class="type"></span></div>
					<div class="extra">导演:<span class="director"></span></div>
					<div class="extra">主演:<span class="actor"></span></div>
				</div>
			</a>
		</div>`
		var $node = $(ele)
		$node.find('.cover img').attr('src',movie.images.medium)
		$node.find('.detail h2').text(movie.title)
		$node.find('.extra .score').text(movie.rating.average)
		$node.find('.extra .collect').text(movie.collect_count)
		$node.find('.extra .year').text(movie.year)
		$node.find('.extra .type').text(movie.genres.join('/'))
		$node.find('.extra .director').text(function () {
			var directors = []
			movie.directors.forEach(function (item) {
				directors.push(item.name)
			})
			return directors.join('、')
		})
		$node.find('.extra .actor').text(function () {
			var actors = []
			movie.casts.forEach(function (item) {
				actors.push(item.name)
			})
			return actors.join('、')
		})
		$('#top250').append($node)
	})
}
// 正在上映
function NowIn() {
	$.ajax({
		url:'https://api.douban.com/v2/movie/in_theaters',
		type:'GET',
		dataType:'jsonp'
	}).done(function (ret) {
		console.log(ret)
		inTheaters(ret)
	}).fail(function (error) {
		console.log(error)
	})
}
function inTheaters(data) {
	data.subjects.forEach(function (movie) {
		var ele = `<div class="item">
			<a href="#">
				<div class="cover">
					<img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
				</div>
				<div class="detail">
					<h2>肖申克的救赎</h2>
					<div class="extra">
						<span class="score">9.6分</span>分/<span class="collect">1300313</span>收藏
					</div>
					<div class="extra"><span class="year"></span> / <span class="type"></span></div>
					<div class="extra">导演:<span class="director"></span></div>
					<div class="extra">主演:<span class="actor"></span></div>
				</div>
			</a>
		</div>`
		var $node = $(ele)
		$node.find('.cover img').attr('src',movie.images.medium)
		$node.find('.detail h2').text(movie.title)
		$node.find('.extra .score').text(movie.rating.average)
		$node.find('.extra .collect').text(movie.collect_count)
		$node.find('.extra .year').text(movie.year)
		$node.find('.extra .type').text(movie.genres.join('/'))
		$node.find('.extra .director').text(function () {
			var directors = []
			movie.directors.forEach(function (item) {
				directors.push(item.name)
			})
			return directors.join('、')
		})
		$node.find('.extra .actor').text(function () {
			var actors = []
			movie.casts.forEach(function (item) {
				actors.push(item.name)
			})
			return actors.join('、')
		})
		$('#inTheaters').append($node)
	})
}
// 搜索
function searchMovie() {
	var searchData = $('.search-content').find('input')[0].value
	$('.loading').show()
	$.ajax({
		url:'https://api.douban.com//v2/movie/search',
		type:'GET',
		data:{
			q:searchData
		},
		dataType:'jsonp'
	}).done(function (ret) {
		console.log(ret)
		searchRet(ret)
	}).fail(function (error) {
		console.log(error)
	}).always(function () {
		$('.loading').hide()
	})
}
function searchRet(data) {
	data.subjects.forEach(function (movie) {
		var ele = `<div class="item">
			<a href="#">
				<div class="cover">
					<img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
				</div>
				<div class="detail">
					<h2>肖申克的救赎</h2>
					<div class="extra">
						<span class="score">9.6分</span>分/<span class="collect">1300313</span>收藏
					</div>
					<div class="extra"><span class="year"></span> / <span class="type"></span></div>
					<div class="extra">导演:<span class="director"></span></div>
					<div class="extra">主演:<span class="actor"></span></div>
				</div>
			</a>
		</div>`
		var $node = $(ele)
		$node.find('.cover img').attr('src',movie.images.medium)
		$node.find('.detail h2').text(movie.title)
		$node.find('.extra .score').text(movie.rating.average)
		$node.find('.extra .collect').text(movie.collect_count)
		$node.find('.extra .year').text(movie.year)
		$node.find('.extra .type').text(movie.genres.join('/'))
		$node.find('.extra .director').text(function () {
			var directors = []
			movie.directors.forEach(function (item) {
				directors.push(item.name)
			})
			return directors.join('、')
		})
		$node.find('.extra .actor').text(function () {
			var actors = []
			movie.casts.forEach(function (item) {
				actors.push(item.name)
			})
			return actors.join('、')
		})
		$('.searchResult').append($node)
	})
}
