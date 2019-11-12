/*function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
	
    if (secs < 10) {
        secs = "0" + secs;
    }
	
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
		
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}*//*
$(function() {
    $.fn.playPause = function() {
        if (!this.prop('paused')) {
            this.trigger("pause");
        } else {
            this.trigger("play");
        }
    };

    $.fn.chng = function(attr, val) {
        if (attr == 'val') {
            this.val(val);
            this.attr("value", val);
        } else {
            this.attr(attr, val);
        }
    };
    $.fn.readyState = function(state, fn) {
        if (arguments.length === 0) {
            return this.readyState;
        }

        if (arguments.length === 1) {
            return (this.readyState >= state) ? true : false;
        }

        if (this.readyState >= state) {
            $.proxy(fn, this)();
        } else {
            var that = this;

            setTimeout(function() {
                that.readyState(state, fn);
            }, 100);
        }

        return this;
    };
    $.fn.seek = function(fn) {
        if ($.isFunction(fn)) {
            return this.on('seeked', fn);
        }

        var time = fn;

        this.readyState(1, function() {
            time = this.time(time);

            if (this.currentTime !== time) {
                var element = this;
                var fn = function() {
                    try {
                        element.currentTime = time;
                    } catch (err) {
                        window.setTimeout(fn, 100);
                    }
                };

                fn();
            }
        });

        return this;
    };

    /*************************************************************** *//*

    var audio = $("#audio");
    $(document).ready(function(){
        $(".time").chng('min', 0);
        $(".time").chng('val', 0);
        $(".time").chng('max', 225);
        $(".speed").chng('min', 0);
        $(".speed").chng('val', 1);
        $(".speed").chng('max', 2);
        $(".vol").chng('min', 0);
        $(".vol").chng('val', 80);
        $(".vol").chng('max', 100);
    })

    /*************************************************************** *//*

    $("#open").change(function(e) {
        var file = e.currentTarget.files[0];
        if (file) {
            var objectUrl = URL.createObjectURL(file);
            $("#audio").prop("src", objectUrl);
        }
        //$(".time").chng('max', this.duration * 100);
    });
    $("#playpause").on('click', function() { audio.playPause(); });

    $("input[type=range].time").on('click dragover input', function() {
        audio.trigger("pause");
        var time = this.value / 100000;
            audio.seek(time);
            audio.trigger("play");
    });
    $("input[type=range]").on('change hover click beforeunloader dragover input', function() {
        var value = $(this).val();
        var clas = $(this).attr('class');
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        $("progress." + clas).val(value);
        $("progress." + clas).attr("min", min);
        $("progress." + clas).attr("max", max);
    });
    audio.on('play timeupdate', function() {
        var duration = Math.ceil(this.duration * 100000); // Durée totale
        var time = Math.ceil(this.currentTime * 100000); // Temps écoulé
        $('.time').chng('val', time);
        $('.time').chng('max', duration);
    });
});*/
//zotero0