var SoundCloudSource = window.SoundCloudSource = new EmbedSource("SoundCloud", {
	videoIDForURL: function(url){
		var match = url.match(/soundcloud.com\/([^\/]+)\/([^\/]+)$/);
		var videoID = (match.length > 2 ? (match[1] + "___" + match[2]) : null);
		return videoID;
	},
	elementIDForVideoID: function(videoID){
		if(videoID){
			var oldVideoID = "" + videoID;
			videoID = videoID.replace(/[\.\-\+\/\\]/g, "_");
			console.log("SoundCloud: From " + oldVideoID + " to " + videoID);
		}
		return videoID;
	},
	
	setup: function(){
//		EmbedMonster.requireURL("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
	},
	isBrowserSupported: function(){
		return true;
	},
	checkIfURLSupported: function(url, cb){
		cb(url.match(/soundcloud\.com/i) == null ? true : undefined);
	},
	loadSource: function(url, element, cb){
		var elementID = element.getAttribute("id");
		if(!elementID){
			elementID = "__soundcloud_id_" + this.elementIDForVideoID(this.videoIDForURL(url));
			element.setAttribute("id", elementID);
		}
		
		this.playerState = {
			url: url,
			elementID: elementID,
			cb: cb
		};
	
		var flashvars = {
		  enable_api: true, 
		  object_id: elementID,
		  url: url
		};
		var params = {
		  allowscriptaccess: "always"
		};
		var attributes = {
		  id: elementID,
		  name: elementID
		};

		swfobject.embedSWF("http://player.soundcloud.com/player.swf", elementID, "100%", "100%", "9.0.0","expressInstall.swf", flashvars, params, attributes);
		
		var self = this;
		soundcloud.addEventListener('onPlayerReady', function onPlayerReady(){
			soundcloud.removeEventListener('onPlayerReady', onPlayerReady);
			var player = soundcloud.getPlayer(elementID);
			self.onPlayerReceived(player);
		});
	},
	onPlayerReceived: function(player){
		this.player = player;
		
		var self = this;
		soundcloud.addEventListener("onMediaStart", function(inPlayer, data){
			if(inPlayer === player){
				console.log("SoundCloud: onMediaStart! ", data);
				self.setPlaying(true);
			}
		});
		soundcloud.addEventListener("onMediaEnd", function(inPlayer, data){
			if(inPlayer === player){
				console.log("SoundCloud: onMediaEnd! ", data);
				self.setPlaying(false);
				if(self.onTrackFinished){
					self.onTrackFinished(self);
				}
			}
		});
		soundcloud.addEventListener("onMediaPlay", function(inPlayer, data){
			if(inPlayer === player){
				console.log("SoundCloud: onMediaPlay! ", data);
				self.setPlaying(true);
			}
		});
		soundcloud.addEventListener("onMediaPause", function(inPlayer, data){
			if(inPlayer === player){
				console.log("SoundCloud: onMediaPause! ", data);
				self.setPlaying(false);
			}
		});

		soundcloud.addEventListener("onMediaBuffering", function(inPlayer, data){
			if(inPlayer === player){
				var percent = data.percent || 0;
				self.playerState.percent = (percent / 100.);
			}
		});
		soundcloud.addEventListener("onMediaEndBuffering", function(inPlayer, data){
			if(inPlayer === player){
				var percent = data.percent || 100;
				self.playerState.percent = (percent / 100.);
			}
		});
		
		
		self.playerState.cb(null, self);
	},
	play: function(){
		this.player.api_play();
	},
	pause: function(){
		this.player.api_pause();		
	},
	getPercentLoaded: function(){
		return this.playerState.percent;
	},
	getDuration: function(){
		return this.player.api_getTrackDuration();
	},
	getCurrentTime: function(){
		return this.player.api_getTrackPosition();
	}
});