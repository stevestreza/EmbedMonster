var EmbedSource = window.EmbedSource = function(name, opts){
	this.name = name;

	EmbedExtend(this, opts);
	
	if(this.isBrowserSupported()){
		EmbedSource.sources.push(this);
	}
	
	this.setup();
};

EmbedSource.sources = [];

EmbedSource.create = function(name, opts){
	return new EmbedSource(name, opts);
};

// Source control API
EmbedExtend(EmbedSource.prototype, {
	play: function(){
		
	},
	pause: function(){
		
	},
	isPlaying: function(){
		return (this._playing === true);
	},
	playPause: function(){
		if(this.isPlaying()){
			this.pause();
		}else{
			this.play();
		}
	}
});

// Source extension control API

EmbedExtend(EmbedSource.prototype, {
	setPlaying: function(playing){
		var self = this;
		
		this._playing = playing;
		if(this._playing && !this._stateInterval) {
			this._stateInterval = setInterval(function(){
				self.updateState();
			}, 500);
		}else if(!this._playing && this._stateInterval){
			clearInterval(this._stateInterval);
			this._stateInterval = undefined;
		}
		
		this.updateState();
	},
	updateState: function(){
		this.state = {
			percentLoaded: this.getPercentLoaded(),
			duration: this.getDuration(),
			currentTime: this.getCurrentTime(),
			percentTime: this.getPercentTime()
		};

		if(this.onUpdateState){
			this.onUpdateState(this.state);
		}
	},
	getPercentTime: function(){
		return (this.getCurrentTime() / this.getDuration());
	}
});

// Source extend API (intended for people making EmbedSources, not using them)
EmbedExtend(EmbedSource.prototype, {
	setup: function(){},
	isBrowserSupported: function(){
		return true;
	},
	checkIfURLSupported: function(url, cb){
		cb("Base plugin does not support any URLs");
	},
	loadSource: function(url, cb){
		cb("Base plugin does not load any URLs");
	},
	play: function(){},
	pause: function(){},
	getPercentLoaded: function(){
		return 1.0;
	},
	getDuration: function(){
		
	},
	getCurrentTime: function(){
		
	}
});