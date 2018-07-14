var vid = document.getElementById("myVideo");

var seekb=document.getElementById("main");
var ply = document.getElementById("plyBtn");

var fillBar = document.getElementById("fill");
var currentTime = document.getElementById("currentTime");
var volslider = document.getElementById("volume");

function playOrPause(){
    if(vid.paused){
        vid.play();
        $("#plyBtn").attr("src","pause.png");
    }else{
        vid.pause();
        $("#plyBtn").attr("src","play.png");
    }
}

vid.addEventListener('timeupdate',function(){
    var position = vid.currentTime / vid.duration;
    fillBar.style.width = position * 100+'%';

    convertTime(Math.round(vid.currentTime));

    if(vid.ended){
        $("#plyBtn").attr("src","play.png");
    }
});

function convertTime(seconds){
    var min = Math.floor(seconds/60);
    var sec = seconds %60;

    min = (min <10) ? "0" + min: min;
    sec = (sec <10) ? "0" + sec:sec;

    currentTime.textContent = min + ":" + sec;
    totalTime(Math.round(vid.duration));
}

function totalTime(seconds){
    var min = Math.floor(seconds/60);
    var sec = seconds %60;

    min = (min<10) ? "0" + min : min;
    sec = (sec<10) ? "0" + sec: sec;
    currentTime.textContent += " / " + min + ":" + sec;
}

function changeVolume(){
    vid.volume = volslider.value;

    if(volslider.value==0){
        $("#speaker").attr("src","speakeroff.png");
    }else{
        $("#speaker").attr("src","speaker.png");
    }
}

var vidVol=0.4;
function muteVolume(){

    if(vid.volume!=0){
        vidVol=vid.volume;
        vid.volume=volslider.value=0;

        $("#speaker").attr("src","speakeroff.png");
    }else{
        vid.volume=volslider.value=vidVol;
        $("#speaker").attr("src","speaker.png");
    }
    
}

function changePos(){
    var x = event.clientX;
    var y = event.clientY;
    
    var seekp =$("#main").position();
    var multi= vid.duration/582;
    
    var newTime = (x-seekp.left)*multi;
    vid.currentTime= newTime;
}

function backwardSec(){
    if(vid.currentTime>10){
        vid.currentTime-=10;
    }else{
        vid.currentTime=0;
    }
}

function forwardSec(){
    if(vid.currentTime<vid.duration-10){
        vid.currentTime+=10;
    }else{
        vid.currentTime=vid.duration;
    }
}

$("#seek-bar").mousemove(function(){
    $("#displaytime").css("opacity","0.5");
    var x=event.clientX;
    
    var seekp =$("#main").position();
    var multi= vid.duration/582;
    var showTime = (x-seekp.left)*multi;

    $("#displaytime").css("left",x-25-seekp.left+"px");

    var min = Math.floor(showTime/60);
    var sec = showTime %60;

    min = (min<10) ? "0" + min : min;
    sec = (sec<10) ? "0" + sec: sec;

    sec=Math.round(sec);

    document.getElementById("showtime").innerHTML=min+":"+sec;

})

$("#seek-bar").mouseleave(function(){
    $("#displaytime").css("opacity","0.0");
})

