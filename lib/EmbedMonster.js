var EmbedMonster = window.EmbedMonster = {};

var EmbedExtend = window.EmbedExtend = function(source, opts){
	for(var key in opts){
		source[key] = opts[key];
	}
}

EmbedMonster.requireURL = function(url){
	var urls = (EmbedMonster.requiredURLs = EmbedMonster.requiredURLs || {});
	if(!urls[url]){
		var node =document.createElement('script');
		node.src=url;
		document.getElementsByTagName('head')[0].appendChild(node);
		
		urls[url] = node;
	}
};

EmbedMonster.load = function(url, element, cb){
	var sources = EmbedSource.sources || [];
	var idx = -1;
	
	var next = function(){
		idx++;
		if(idx < sources.length){
			var source = sources[idx];
			source.checkIfURLSupported(url, function(err){
				if(err){
					console.log("Source " + source.name + " failed: ", err);
					next();
				}else{
					source.loadSource(url, element, cb);
				}
			});
		}else{
			cb("No supported source");
		}
	};
	
	next();
};
