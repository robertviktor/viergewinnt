

//jQuery.noConflict();

//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;
var socket = new io.Socket("spearwolf.no.de", { port: 80, transports: ['websocket', 'flashsocket']  }); 

var mySessId = '0';
var myPlayernum = 0;
var numOfAllPlayers = 0;
var all_players_new = new Array();
var all_players_old = new Array();

var Rocket_X = 0.0;
var Rocket_Y = 0.0;


//Start us up!
//
jQuery(document).ready(function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}
	
	
	
	// SOCKET STUFF!!!

    socket.connect();
    
	socket.on('connect', function() { 
		//console.info("connect ",arguments); 
		
	});
	  
	  
	  
    socket.on('message', function(data) {
	

	
		var msg = JSON.parse(data);
        if ("exception" in msg) {
          alert(msg.exception.description+msg.exception.exception);
        } else {
		
			if (("count" in msg) && (myPlayernum == 0)) {
				myPlayernum = msg.count;
				//alert (myPlayernum);
			}
		
			if ("hello" in msg) {
				//console.info("session ID: "+msg.hello.sessionId);
				mySessId = msg.hello.sessionId;
			}
		  
		  
		  
		  else {
		  
			if (("count" in msg) ) {
				numOfAllPlayers = msg.count;
			}
		  
			for  (var i=0; i< msg.shared_objects.length; i++)
			{
				var sId = msg.shared_objects[i].sessionId+"";
				var playerobj = new Object(); 
				playerobj.update=msg.shared_objects[i].updatedAt;
				playerobj.x=msg.shared_objects[i].x;
				playerobj.y=msg.shared_objects[i].y;
				playerobj.num=msg.shared_objects[i].num;
				playerobj.sId=sId;
				all_players_new[sId] = playerobj;
				
				//alert (all_players_new[sId].num);
				
				if(msg.shared_objects[i].sessionId != mySessId)
				{
					// for Rocket test
					Rocket_X = msg.shared_objects[i].x;
					Rocket_Y = msg.shared_objects[i].y;
				
				}
				
				
			}
		  
		  
			//console.info("data:",data);
		  }
        }
        
		//if ("count" in msg) {
        //  jQuery(".client-count").html("[ <strong>"+msg.count+"</strong> client"+(msg.count == 1 ? '' : 's')+" currently connected .. ]");
        //}
		
      });
	  
	  
      socket.on('disconnect', function() { 
			//console.error("disconnect ",arguments); 
	  });

      
	 // ENd Socket Stuff
	
	
	
	var canvas=document.getElementById( "GameCanvas" );
	GameMain( canvas );
});

//${METADATA_BEGIN}
//${METADATA_END}
function getMetaData( path,key ){	
	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

function loadString( path ){
	if( path=="" ) return "";
//${TEXTFILES_BEGIN}
//${TEXTFILES_END}
}

//This is generally redefined by mojo.
//
function GameMain( canvas ){
	bb_Init();
	bb_Main();
}

//${TRANSCODE_BEGIN}
//${TRANSCODE_END}

//This overrides print in 'std.lang/lang.js'
//
function print( str ){

	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
	}
	
	if( window.console!=undefined ){
		window.console.log( str );
	}
}

