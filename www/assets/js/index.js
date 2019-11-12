$(function() {
    $.getJSON("/json/musique", (data)=>{
        audio.prop("src", "file://"+data.music[0]);
        audio.trigger("play");
    })
});
//zotero0