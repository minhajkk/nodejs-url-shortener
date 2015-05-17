/*************************************
//
// url-shortener app
//
**************************************/
// connect to our socket server
var socket = io('https://node-us.herokuapp.com/');

// shortcut for document.ready
$(function(){
    $("#flasher-div").css("display","none")

	//setup some common vars
	var $submitButton = $('#submitBtn'),
        $urlTxt = $('#url'),
        $flasher = $('#url-flasher');

	//SOCKET STUFF
	socket.on("url.changed", function(data){
        $("#flasher-div").show();
        $flasher.html("Just Created: " + data.url);
        $flasher.removeClass('animated rubberBand');
        setTimeout(function(){$flasher.addClass('animated rubberBand')}, 1);
	});
});
