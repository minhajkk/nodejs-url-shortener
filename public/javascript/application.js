/*************************************
//
// url-shortener app
//
**************************************/
// connect to our socket server
var socket = io('https://node-us.herokuapp.com/');

// shortcut for document.ready
$(function(){
    $("#flasher-div").css("display","none");

	//setup some common vars
	var $flasher = $('#url-flasher');

	//SOCKET STUFF
	socket.on("url.changed", function(data){
        setTimeout(function(){
            $flasher.removeClass('animated fadeInLeftBig');
            $("#flasher-div").show();
            $flasher.html("Newly shorten: " + data.url);
            setTimeout(function(){$flasher.addClass('animated fadeInLeftBig')}, 1);
        }, 2000);

	});
});
