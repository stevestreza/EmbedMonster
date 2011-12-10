var YouTubeSource = new EmbedSource("YouTube", {
	// YouTube tools
	videoIDForURL: function(url){
		var match = url.match(/^http:\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=(\w+))(?:\S+)?$/i);
		return (match && match.length > 1	 ? match[1] : null);
	},
	
	// EmbedSource APIs
	setup: function(){
		EmbedMonster.requireURL("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
	},
	
	browserSupported: function(){
		return true;
	},
	
	checkIfURLSupported: function(url, cb){
		var videoID = this.videoIDForURL(url);
		if(videoID == null){
			cb("URL did not match YouTube regex");
		}else{
			cb();
		}
	},
	
	loadSource: function(url, element, cb){
		var videoID = this.videoIDForURL(url);
		
		if(!element){
			element = document.createElement("div");
		}
		
		var elementID = element.getAttribute("id");
		if(!elementID){
			elementID = "__youtube_id__" + videoID;
			element.setAttribute("id", elementID);
		}
		
		this.playerState = {
			url: url,
			videoID: videoID,
			element: element,
			cb: cb
		};
		
		YouTubeSource._loadedElementID = elementID;

		if(!YouTubeSource.player){
			var params = { allowScriptAccess: "always", wmode: "transparent" };
			var atts = { "id": elementID };
			swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1", 
		                   	elementID, "100%", "100%", "8", null, null, params, atts);
		}else{
			this.loadSourceIntoPlayer();
		}
	},
	
	loadSourceIntoPlayer: function(){
		this.player.cueVideoById(this.playerState.videoID);
	},
	
	play: function(){
		this.player.playVideo();
		this.setPlaying(true);
	},
	pause: function(){
		this.player.pauseVideo();
		this.setPlaying(false);
	},
	
	getPercentLoaded: function(){
		var totalSize  = this.player.getVideoBytesTotal();
		var loadedSize = this.player.getVideoBytesLoaded();
		var loadedOffset = (loadedSize / totalSize);
		return loadedOffset;
	},
	getDuration: function(){
		return this.player.getDuration();
	},
	getCurrentTime: function(){
		return this.player.getCurrentTime();
	},

	// YouTube Embed Controls
	onPlayerReady: function(){
		var self = this;

		var player = this.player = document.getElementById(YouTubeSource._loadedElementID);
		player.addEventListener("onStateChange", "onytplayerStateChange");

		this.playerIsReady = true;
		this.loadSourceIntoPlayer();

	},
	
	playerChangedState: function(level){
		console.log("Player changed state " + level);
		if(level == 0){
//			playVideoAtRandom();
			this.setPlaying(false);
		}else if(level == 5){
			var self = this;
			setTimeout(function(){
				console.log("Player ready!");
				self.playerState.cb(null, self);
//				getPlayer().playVideo();
//				updatePlayerStateInterval();
//				updateTwitterSharing();

//				hideInterstitial();			

//				$("#playPause").addClass("playing");
			}, 1);
		}
	}
	
});

function onYouTubePlayerReady(playerID){
	YouTubeSource.onPlayerReady();
};

function onytplayerStateChange(level){
	YouTubeSource.playerChangedState(level);
}