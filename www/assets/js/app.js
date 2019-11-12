$(function() {
    var socket = io()
    socket.emit('mp3', null)
    socket.on('mp3', (msg) => {
        $('#repeat-song').html('')
        let json = JSON.parse(msg)
        console.log(typeof json)
        for(var i=0;i<json.length;i++){
            var tr = $("<tr></tr>"),
                td_play = $("<td></td>").attr('data-playsong', json[i].name).html('<i id="icon" class="fas fa-play"></i>'),
                td_num = $("<td></td>").html((i+1)),
                td_title = $("<td></td>").html(json[i].title),
                td_artist = $("<td></td>").attr('data-filter', "artist").html(json[i].artist),
                td_album = $("<td></td>").attr('data-filter', "album").html(json[i].album),
                td_year = $("<td></td>").attr('data-filter', "year").html(json[i].year),
                td_gente = $("<td></td>").attr('data-filter', "genre").html(json[i].genre)
            tr.append(td_play, td_num, td_title, td_artist, td_album, td_year, td_gente)
            $('#repeat-song').append(tr)
            $("[data-playsong]").on("click", function () {
				console.log($( this ).attr("data-playsong"))
				switchTrack("http://localhost:10/assets/mp3/"+$( this ).attr("data-playsong"))
			})
        }
    })
    /*************************************************/
	// INT CODE
	var audio, agent, seeking=false, timetime;

	// Navigateur
	agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
	    //ext = ".ogg";
	}

	// Set object references
	range  = document.querySelector("input[type=range]");
	open = document.querySelector("#open");						// open file
	replay = document.querySelector("#replay5s");				// replay 5s
	playbtn = document.querySelector("#playpause");				// play/pause
	playbtnico = document.querySelector("#playpause>#icon");	// play/pause icon
	forward = document.querySelector("#forward5s");				// forward 5s
	curtimetext = document.querySelector("#curtimetext");		// time en chifr
	durtimetext = document.querySelector("#durtimetext");		// duree en chifre
	timerange = document.querySelector("input#time");			// time range %
	timeprogress = document.querySelector("progress#time");		// time range % progress
	speedbtn = document.querySelector("#speedbtn");				// button de speed
	speedbtnico = document.querySelector("#speedbtn>#icon");	// button de speed icon
	speedrenge = document.querySelector("input#speed");			// speed range
	speedprogress = document.querySelector("progress#speed");	// speed range progress
	volbtn = document.querySelector("#volbtn");					// button de volume
	volbtnicon = document.querySelector("#volbtn>#icon");		// button de volume icon
	volumerenge = document.querySelector("input#vol");			// volume range
	volumeprogress = document.querySelector("progress#vol");	// volume range progress

	// INT LECTEUR
	playlist = ["/assets/audio/Imagine Dragons - Natural.mp3"];
	// Audio Object
	int()
	audio = new Audio();
	switchTrack(playlist[0]);
	audio.loop = false;

	// Event
	open.addEventListener("change", switchTrack);
	audio.addEventListener('loadeddata', function() {
		audio.play();
		timemax(audio.duration * 1000000);
		iconplayPause();
	}/*, false*/);
	audio.addEventListener("timeupdate", function(){
		seektimeupdate();
	});
	audio.addEventListener("ratechange", function(){
		speedupdate();
	});
	audio.addEventListener("volumechange", function(){
		volupdate();
	});
    audio.addEventListener("ended", function(){
        switchTrack(audio.src);
		iconplayPause();
    });
	playbtn.addEventListener("click", playPause);
	speedbtn.addEventListener("click", function(){
        audio.playbackRate = 1;
    });
	replay.addEventListener("click", function(){
        audio.currentTime = audio.currentTime - 5;
    });
	forward.addEventListener("click", function(){
        audio.currentTime = audio.currentTime + 5;
    });
    volbtn.addEventListener("click", mute);
    timerange.addEventListener("mousedown", function(event){
        seeking=true;
        seek(event);
    });
    timerange.addEventListener("mousemove", function(event){
        seek(event);
    });
    timerange.addEventListener("change", function(event){
        seeking=true;
        seek(event);
        seeking=false;
    });
    timerange.addEventListener("mouseup",function(){
        seeking=false;
    });
    volumerenge.addEventListener("mousemove", setvolume);
    speedrenge.addEventListener("mousemove", setspeed);

	// Func
	function int(){
		time(0);
		timemin(0);
		timemax(225);
		vol(80);
		volmin(0);
		volmax(100);
		speed(1);
		speedmin(0);
		speedmax(2);
	}
	function switchTrack(e){
		var file, objectUrl;
		if(typeof e === "object"){
			file = e.currentTarget.files[0];
			if (file) {
				objectUrl = URL.createObjectURL(file);
			}
		} else {
			file = e;
			objectUrl = file;
		}
		if (file) {
			audio.src = objectUrl;
		}
		iconplayPause();
	}
	function playPause(){
		var icon = $(playbtnico);
		if(audio.paused){
			audio.play();
			iconplayPause();
		} else {
			audio.pause();
			iconplayPause();
		}
	}
	function seektimeupdate(){
		time(audio.currentTime * 1000000);
		var curmins = Math.floor(audio.currentTime / 60);
		var cursecs = Math.floor(audio.currentTime - curmins * 60);
		var durmins = Math.floor(audio.duration / 60);
		var dursecs = Math.floor(audio.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
		if(dursecs < 10){ dursecs = "0"+dursecs; }
		if(curmins < 10){ curmins = "0"+curmins; }
		if(durmins < 10){ durmins = "0"+durmins; }
		curtimetext.innerHTML = curmins+":"+cursecs;
		durtimetext.innerHTML = durmins+":"+dursecs;
	}
	function speedupdate(){
		speed(audio.playbackRate);
		$("#speedtxt").html(audio.playbackRate);
	}
	function volupdate(){
		vol(audio.volume * 100);
		iconvol()
	}
	function seek(event){
		if(seeking){
			timerange.value = (timerange.value) - 0;
			seekto = timerange.value/1000000;
			audio.currentTime = seekto;
		}
	}
	function mute(){
		var icon = $(volbtnicon)
		if(audio.muted){
			audio.muted = false;
			iconvol()
		} else {
			audio.muted = true;
			iconvol()
		}
	}
	function setvolume(){
		audio.volume = volumerenge.value / 100;
	}
	function setspeed(){
		audio.playbackRate = speedrenge.value;
	}
	function iconplayPause(){
		icon = $(playbtnico);
		icon.removeClass("fa-play")
			.removeClass("fa-pause");
		if(audio.paused) {
			icon.addClass("fa-play");
		} else {
			icon.addClass("fa-pause");
		}
	}
	function iconvol(){
		icon = $(volbtnicon);
		icon.removeClass("fa-volume-mute")
			.removeClass("fa-volume-off")
			.removeClass("fa-volume-down")
			.removeClass("fa-volume-up");
		if(audio.muted) {
			icon.addClass("fa-volume-mute");
		} else if (audio.volume > 0.6) {
			icon.addClass("fa-volume-up");
		} else if (audio.volume > 0.05) {
			icon.addClass("fa-volume-down");
		} else {
			icon.addClass("fa-volume-off");
		}
	}
	function time(x){
		if(!seeking){
			timerange.value = x;
		}
		timeprogress.value = x;
	}
	function timemax(x){
		timerange.max = x;
		timeprogress.max = x;
	}
	function timemin(x){
		timerange.min = x;
		timeprogress.min = x;
	}
	function vol(x){
		volumerenge.value = x;
		volumeprogress.value = x;
	}
	function volmax(x){
		volumerenge.max = x;
		volumeprogress.max = x;
	}
	function volmin(x){
		volumerenge.min = x;
		volumeprogress.min = x;
	}
	function speed(x){
		speedrenge.value = x;
		speedprogress.value = x;
	}
	function speedmax(x){
		speedrenge.max = x;
		speedprogress.max = x;
	}
	function speedmin(x){
		speedrenge.min = x;
		speedprogress.min = x;
	}
})