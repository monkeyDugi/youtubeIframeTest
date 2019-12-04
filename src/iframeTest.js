var videoId;
var tag;
var nextSong;
var preSong;
var currentSongIndex;
var songList = [
	{
		'url' : '0clr0fJhCRM'
	,	'img' : 'https://i.ytimg.com/vi/0clr0fJhCRM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBgMnrRAHc3J1-R8dVwq-WTP6vJBg'
	, 	'title' : 'fall away'
	,   'singer' : '김범수, 에일리'
	}
,
	{
		'url' : '59c7v-ioUno'
	,	'img' : 'https://i.ytimg.com/vi/59c7v-ioUno/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBgwmeusiv5Y8so0eYZeBJhy9N7FA'
	, 	'title' : '안아줘'
	,   'singer' : '정준일'
	}
,
	{
		'url' : 'XcbEM7j_ARQ'
	,	'img' : 'https://i.ytimg.com/vi/XcbEM7j_ARQ/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWFOjoIltTgUe2LKR_vIfWNt5ODA'
	, 	'title' : '술이 문제야'
	,   'singer' : '윤민수, 장혜진'
	}
];

/**
 * Youtube API Load
 */
tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * 필수
 * 플레이어 API에 대한 JavaScript 다운로드 완료 시 API가 이 함수 호출한다.
 * 페이지 로드 시 표시할 플레이어 개체를 만들어야 한다.
 */
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '200',
		width: '200',
		videoId: '',
		events: {
			'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
			'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
		}
	});
}

function onPlayerReady(event) {
	// 재생
	// 커스텀 펑션으로 뺀다면 player.playVideo()로 사용.
	event.target.playVideo();
}

function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED) {
		onclickVideoIdSet();
	}
}

songListSet();

// 음악 목록 Set
function songListSet() {
	for(var i=0; i<songList.length; i++) {
		$('.url').eq(i).val(songList[i].url);
		$('.index').eq(i).val(i);
		$('.vd_title').eq(i).text(songList[i].title);
		$('.play').eq(i).attr('src', songList[i].img);
		$('.vd_singer').eq(i).text(songList[i].singer);
	}
}

// 마지막 곡인지 체크
function lastSongChk() {
	if(++currentSongIndex ==  songList.length) {
		console.log('lastSongChk');
		return false;
	}

	return true;
}

// 재상완료 후 다음곡 or 1번 곡 idSet
function endedVideoIdSet() {
	if(lastSongChk()) {
		return $('.url').eq(currentSongIndex).val();
	}

	currentSongIndex = 0;
	return $('.url').eq(0).val();
}

// Album Click
$('.play').click(function() {
	onclickVideoIdSet($(this));
});

// onClick 시 VideoId, 현재노래 index Set
function onclickVideoIdSet(obj) {
	if(obj != null && obj != '') {
		videoId = obj.parent().children().eq(0).val();          // url
		currentSongIndex = obj.parent().children().eq(1).val();	// no
	} else {
		videoId = endedVideoIdSet();
	}
	
	videoLoad(videoId);
}

// 지정한 동영상 로드
function videoLoad(videoId) {
	player.loadVideoById(videoId, 0, 'small');
}