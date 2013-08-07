/*
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
*/


$(
	function(){
		$( document ).mousedown(
			function () { 
				Typer.addText( press3 ); 
				Typer.addText( press2 ); 	
}
		);
		
	}
);

$(
	function(){
		$( document ).keydown(
			function ( event ) { 
				Typer.addText( event); //Capture the keydown event and call the addText, this is executed on page load
			}
		);
		
	}
);

var intervalID = setInterval(function()
{ Typer.addText(press); }, 20);


var Typer={
	text: null,
	accessCountimer:null,
	index:0, // current cursor position
	speed:3, // speed of the Typer
	file:"", //file, must be setted
	accessCount:0, //times alt is pressed for Access Granted
	deniedCount:0, //times caps is pressed for Access Denied
	init: function(){// inizialize Hacker Typer
		accessCountimer=setInterval(function(){Typer.updLstChr();},500); // inizialize timer for blinking cursor
		$.get(Typer.file,function(data){// get the text file
			Typer.text=data;// save the textfile in Typer.text
		});
	},
	
	content:function(){
		return $("#console").html();// get console content
	},
	
	write:function(str){// append to console content
		$("#console").append(str);
		return false;
	},
	
	makeAccess:function(){//create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.accessCount=0; //reset count
		var ddiv=$("<div id='gran'>").html(""); // create new blank div and id "gran"
		ddiv.addClass("accessGranted"); // add class to the div
		ddiv.html("<h1>ACCESS GRANTED</h1>"); // set content of div
		$(document.body).prepend(ddiv); // prepend div to body
		return false;
	},
	makeDenied:function(){//create Access Denied popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.deniedCount=0; //reset count
		var ddiv=$("<div id='deni'>").html(""); // create new blank div and id "deni"
		ddiv.addClass("accessDenied");// add class to the div
		ddiv.html("<h1>ACCESS DENIED</h1>");// set content of div
		$(document.body).prepend(ddiv);// prepend div to body
		return false;
	},
	
	hidepop:function(){// remove all existing popups
		$("#deni").remove();
		$("#gran").remove();
	},
	
	addText:function(key){//Main function to add the code
		if(key.keyCode==18){// key 18 = alt key
			Typer.accessCount++; //increase counter 
			if(Typer.accessCount>=3){// if it's presed 3 times
				Typer.makeAccess(); // make access popup
			}
		}else if(key.keyCode==20){// key 20 = caps lock
			Typer.deniedCount++; // increase counter
			if(Typer.deniedCount>=3){ // if it's pressed 3 times
				Typer.makeDenied(); // make denied popup
			}
		}else if(key.keyCode==27){ // key 27 = esc key
			Typer.hidepop(); // hide all popups
		}else if(Typer.text){ // otherway if text is loaded
			var cont=Typer.content(); // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
			if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0 
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			var text=$("<div/>").text(Typer.text.substring(0,Typer.index)).html();// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex
			var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
			$("#console").html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0,50); // scroll to make sure bottom is always visible
		}
		/*if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault()
		};  */
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
	
	updLstChr:function(){ // blinking cursor
		var cont=this.content(); // get console 
		if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
			$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
		else
			this.write("|"); // else write it
	}
}

var press = jQuery.Event("keypress");
press.altGraphKey = false;
press.altKey = false;
press.bubbles = true;
press.cancelBubble = false;
press.cancelable = true;
press.charCode = 13;
press.clipboardData = undefined;
press.ctrlKey = false;
press.currentTarget = $("#myTextBox")[0];
press.defaultPrevented = false;
press.detail = 0;
press.eventPhase = 2;
press.keyCode = 13;
press.keyIdentifier = "";
press.keyLocation = 0;
press.layerX = 0;
press.layerY = 0;
press.metaKey = false;
press.pageX = 0;
press.pageY = 0;
press.returnValue = true;
press.shiftKey = false;
press.srcElement = $("#myTextBox")[0];
press.target = $("#myTextBox")[0];
press.type = "keypress";
press.view = Window;
press.which = 13;

var press2 = jQuery.Event("keypress");
press2.altGraphKey = false;
press2.altKey = false;
press2.bubbles = true;
press2.cancelBubble = false;
press2.cancelable = true;
press2.charCode = 13;
press2.clipboardData = undefined;
press2.ctrlKey = false;
press2.currentTarget = $("#myTextBox")[0];
press2.defaultPrevented = false;
press2.detail = 0;
press2.eventPhase = 2;
press2.keyCode = 20;
press2.keyIdentifier = "";
press2.keyLocation = 0;
press2.layerX = 0;
press2.layerY = 0;
press2.metaKey = false;
press2.pageX = 0;
press2.pageY = 0;
press2.returnValue = true;
press2.shiftKey = false;
press2.srcElement = $("#myTextBox")[0];
press2.target = $("#myTextBox")[0];
press2.type = "keypress";
press2.view = Window;
press2.which = 13;

var press3 = jQuery.Event("keypress");
press3.altGraphKey = false;
press3.altKey = false;
press3.bubbles = true;
press3.cancelBubble = false;
press3.cancelable = true;
press3.charCode = 27;
press3.clipboardData = undefined;
press3.ctrlKey = false;
press3.currentTarget = $("#myTextBox")[0];
press3.defaultPrevented = false;
press3.detail = 0;
press3.eventPhase = 2;
press3.keyCode = 27;
press3.keyIdentifier = "";
press3.keyLocation = 0;
press3.layerX = 0;
press3.layerY = 0;
press3.metaKey = false;
press3.pageX = 0;
press3.pageY = 0;
press3.returnValue = true;
press3.shiftKey = false;
press3.srcElement = $("#myTextBox")[0];
press3.target = $("#myTextBox")[0];
press3.type = "keypress";
press3.view = Window;
press3.which = 13;
