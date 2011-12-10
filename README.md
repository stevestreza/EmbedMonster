EmbedMonster
============

EmbedMonster is a JavaScript microframework for controlling embeddable media on the web. Whether you're hosting the media yourself, or taking it from a source such as YouTube, you can use one easy and consistent JavaScript API to load and control embeddable media. It has a plugin-based architecture, letting developers implement new sources or prune unneeded sources from apps they build. The purpose of this project is to enable developers to build web applications that make great use of audio/video media, whether hosted on their own server, or provided through a third party service.

Features
========

* Modular architecture
* Small footprint
* Simple API
* No major framework dependencies (e.g. you can use jQuery, Prototype, Dojo, YUI, Cappuccino, whatever)
* Graceful failures for unsupported browsers or plugins

Sources
=======

Sources are EmbedMonster's idea of ways of accessing audio and video. A Source represents one service, such as YouTube or SoundCloud.

* YouTube
* SoundCloud
* Vimeo *unimplemented*
* Netflix *unimplemented*
* AudioTag *unimplemented*
* VideoTag *unimplemented*

To create a new Source, add a new file to lib/sources, create it as seen in other Source plugins, and implement the methods at the bottom of EmbedSource.js, and the code necessary to load the player into the DOM element.

Running the Test
================

Due to plugin restrictions for security, you can't load most Flash objects through file:/// URLs. You have to load them through a web server. So toss them behind nginx or Apache or something before trying to run the tests.

Once you have this running, you should see a super-ugly page with placeholders for Sources. The test page will iterate through a piece of media for each Source. See the Sources section for available Sources. Sources which are playable will attempt to play, one at a time, in order. When the track finishes, the next track will begin. When a track is successfully played through, its background will turn green; if it failed, it will turn red. There is also a global controller at the top of the screen, which shows the loaded/playback progress (no scrubbing yet!), a timer with duration, and a play/pause button. The test.html file itself shows basic usage of the APIs.

Setup
=====

Eventually there will be a build process to make one JavaScript file for the project, but until now, you have to include a number of JavaScript files. See test.html in the test folder for an example.

Usage
=====

To load media:

`EmbedMonster.load(url, domElement, function(error, source){})`

This will attempt to find a Source capable of playing the content at `url`. It will try rendering that object into the domElement if supplied (or will place it offscreen if undefined). It will callback when:

* the media is ready to be played (error will be null, and source will be defined)
* EmbedMonster cannot find an appropriate Source for the url (error will be defined, source will not be defined)
* the Source returns an error for the URL (error will be defined, source will not be defined)

Once you have a Source object returned, you can call these APIs on it:

* play() - starts playing
* pause() - pauses the media
* playPause() - if the media is playing, pause it; otherwise, play it.
* isPlaying() - returns true if the media is playing, false otherwise

You can also add listeners for these events:

* onUpdateState - notifies when the player state changes. It gets supplied an object containing metadata about the state of the player. This can get called very frequently, so make sure your use here is minimal!
* onTrackFinished - notifies when the player finishes playing.

Contributors
============

* [Steve Streza](https://twitter.com/SteveStreza)

License
=======

The MIT license. tl;dr: Do whatever you like, but you must supply attribution. Suggested attribution format: Includes "EmbedMonster" code by Steve Streza. https://github.com/amazingsyco/EmbedMonster

Copyright (c) 2011 Steve Streza, EmbedMonster contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

Attribution
===========

This project includes [SWFObject](http://code.google.com/p/swfobject/) licensed under the MIT License.

This project includes [soundcloud.player.api.js](https://github.com/soundcloud/Widget-JS-API/) from SoundCloud, licensed under the MIT license.

The test video for YouTube is licensed under the Creative Commons Attribution license from [YouTube user muscma01](http://www.youtube.com/user/muscma01).

The test video for Vimeo is licensed under the Creative Commons license from [Vimeo user beeple](http://vimeo.com/beeple).

The test audio for SoundCloud is licensed under the Creative Commons Attribution-ShareAlike 3.0 license from <span xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/" about="http://soundcloud.com/tibocut/fridayfolly-ringtone1"><span property="dct:title">"FridayFolly-Ringtone1"</span> (<a rel="cc:attributionURL" property="cc:attributionName" href="http://soundcloud.com/tibocut">tibocut</a>) / <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></span>.

The test file testaudiotag.mp3 is licensed under the Creative Commons Sampling+ license from [Fressound](http://www.freesound.org/people/petenice/sounds/9508/) user [petenice](http://www.freesound.org/people/petenice/).

The test file testvideotag.mp4 is licensed under the Creative Commons Attribution 2.5 Generic license from [Archive.org users](http://www.archive.org/details/Maker_Faire_VJ_Clips) ([original file](http://www.archive.org/download/Maker_Faire_VJ_Clips/lucyfer3_mjpg_qvga_512kb.mp4)).