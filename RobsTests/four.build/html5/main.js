

//jQuery.noConflict();

//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;
var socket = new io.Socket("spearwolf.no.de", { port: 80 }); 

var mySessId = '0';
var myPlayernum = 0;
var numOfAllPlayers = 0;
var all_players_new = new Array();
var all_players_old = new Array();



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
		console.info("connect ",arguments); 
		
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
				console.info("session ID: "+msg.hello.sessionId);
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
				
			}
		  
		  
			console.info("data:",data);
		  }
        }
        
		//if ("count" in msg) {
        //  jQuery(".client-count").html("[ <strong>"+msg.count+"</strong> client"+(msg.count == 1 ? '' : 's')+" currently connected .. ]");
        //}
		
      });
	  
	  
      socket.on('disconnect', function() { console.error("disconnect ",arguments); });

      
	 // ENd Socket Stuff
	
	
	
	var canvas=document.getElementById( "GameCanvas" );
	GameMain( canvas );
});

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=448;height=52;\n";

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
		return "";

//${TEXTFILES_END}
}

//This is generally redefined by mojo.
//
function GameMain( canvas ){
	bb_Init();
	bb_Main();
}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var err_info="";
var err_stack=[];

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	var str="";
	push_err();
	err_stack.reverse();
	for( var i=0;i<err_stack.length;++i ){
		str+=err_stack[i]+"\n";
	}
	err_stack.reverse();
	pop_err();
	return str;
}

function print( str ){
	if( window.console!=undefined ){
		window.console.log( str );
	}
}

function error( err ){
	throw err;
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index>=0 && index<arr.length ) return arr;
	error( "Array index out of range" );
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=false;
   return res;
}

function resize_number_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=0;
   return res;
}

function resize_string_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]='';
   return res;
}

function resize_array_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=[];
   return res;
}

function resize_object_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=null;
   return res;
}

function string_join( sep,bits ){
	if( bits.length==0 ) return '';
	var str=bits[0];
	for( var i=1;i<bits.length;++i ) str+=sep+bits[i];
	return str;
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_starts_with( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_ends_with( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}



// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

var dead=0;

var KEY_LMB=1;
var KEY_RMB=2;
var KEY_MMB=3;
var KEY_TOUCH0=0x180;

function die( ex ){
	dead=1;
	alert( ex+"\n"+stackTrace() );
	throw ex;
}

function eatEvent( e ){
	if( e.stopPropagation ){
		e.stopPropagation();
		e.preventDefault();
	}else{
		e.cancelBubble=true;
		e.returnValue=false;
	}
}

function keyToChar( key ){
	switch( key ){
	case 8:
	case 9:
	case 13:
	case 27:
	case 32:
		return key;
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
		return key | 0x10000;
	case 46:
		return 127;
	}
	return 0;
}

function GameMain( canvas ){

	_app=null;
	_canvas=canvas;

	try{
		bb_Init();
		bb_Main();
	}catch( ex ){
		die( ex );
	}
	
	if( !_app ) return;
	
	var theApp=_app;

	_app=null;
	_canvas=null;
		
	canvas.onkeydown=function( e ){
		theApp.input.OnKeyDown( e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) theApp.input.PutChar( chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<124) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		theApp.input.OnKeyUp( e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			theApp.input.PutChar( e.charCode );
		}else if( e.which ){
			theApp.input.PutChar( e.which );
		}
	}
	
	canvas.onmousedown=function( e ){
		theApp.input.OnKeyDown( KEY_LMB );
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		theApp.input.OnKeyUp( KEY_LMB );
		eatEvent( e );
	}
	
	canvas.onmouseout=function( e ){
		theApp.input.OnKeyUp( KEY_LMB );
		eatEvent( e );
	}

	canvas.onmousemove=function( e ){
		var x=e.clientX+document.body.scrollLeft;
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		theApp.input.OnMouseMove( x,y );
		eatEvent( e );
	}

	canvas.focus();

	theApp.InvokeOnCreate();
	theApp.InvokeOnRender();
}

//***** gxtkApp class *****

function gxtkApp(){

	_app=this;
	
	this.graphics=new gxtkGraphics( this,_canvas );
	this.input=new gxtkInput( this );
	this.audio=new gxtkAudio( this );

	this.loading=0;
	this.maxloading=0;

	this.updateRate=0;
	this.intervalObj=this.SetUpdateTimer( 100.0 );
	
	this.startMillis=(new Date).getTime();
}

gxtkApp.prototype.SetUpdateTimer=function( millis ){
	var theApp=this;
	function timerFired(){ 
		theApp.UpdateTimerFired(); 
	}
	return setInterval( timerFired,millis );
}

gxtkApp.prototype.UpdateTimerFired=function(){
	this.InvokeOnUpdate();
	this.InvokeOnRender();
}	

gxtkApp.prototype.IncLoading=function(){

	++this.loading;

	if( this.loading>this.maxloading ) this.maxloading=this.loading;

	if( this.loading!=1 ) return;

	if( this.updateRate ){
		clearInterval( this.intervalObj );
		this.intervalObj=this.SetUpdateTimer( 100.0 );
	}
}

gxtkApp.prototype.DecLoading=function(){

	--this.loading;

	if( this.loading!=0 ) return;

	this.maxloading=0;

	if( this.updateRate ){
		clearInterval( this.intervalObj );
		this.intervalObj=this.SetUpdateTimer( 1000.0/this.updateRate );
	}
}

gxtkApp.prototype.GetMetaData=function( path,key ){
	return getMetaData( path,key );
}

//***** GXTK API *****

gxtkApp.prototype.GraphicsDevice=function(){
	return this.graphics;
}

gxtkApp.prototype.InputDevice=function(){
	return this.input;
}

gxtkApp.prototype.AudioDevice=function(){
	return this.audio;
}

gxtkApp.prototype.AppTitle=function(){
	return document.URL;
}

gxtkApp.prototype.LoadState=function(){
	var state=localStorage.getItem( "gxtkapp@"+document.URL );
	if( state ) return state;
	return "";
}

gxtkApp.prototype.SaveState=function( state ){
	localStorage.setItem( "gxtkapp@"+document.URL,state );
}

gxtkApp.prototype.LoadString=function( path ){
	return loadString( path );
}

gxtkApp.prototype.SetUpdateRate=function( hertz ){

	this.updateRate=hertz;

	if( this.loading ) return;

	clearInterval( this.intervalObj );

	if( this.updateRate ){
		this.intervalObj=this.SetUpdateTimer( 1000.0/this.updateRate );
	}else{
		this.intervalObj=this.SetUpdateTimer( 100.0 );
	}
}

gxtkApp.prototype.MilliSecs=function(){
	return ((new Date).getTime()-this.startMillis)|0;
}

gxtkApp.prototype.Loading=function(){
	return this.loading;
}

gxtkApp.prototype.OnCreate=function(){
}

gxtkApp.prototype.OnUpdate=function(){
}

gxtkApp.prototype.OnRender=function(){
}

gxtkApp.prototype.OnLoading=function(){
}

gxtkApp.prototype.InvokeOnCreate=function(){
	if( dead ) return;
	try{
		this.OnCreate();
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnUpdate=function(){
	if( dead ) return;
	try{
		this.input.BeginUpdate();
		if( this.updateRate && !this.loading ){
			this.OnUpdate();
		}
		this.input.EndUpdate();
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnRender=function(){
	if( dead ) return;
	try{
		this.graphics.BeginRender();
		if( this.loading ){
			this.OnLoading();
		}else{
			this.OnRender();
		}
		this.graphics.EndRender();
	}catch( ex ){
		die( ex );
	}
}

//***** gxtkGraphics class *****

function gxtkGraphics( app,canvas ){
	this.app=app;
	this.canvas=canvas;
	this.gc=canvas.getContext( '2d' );
	this.color="rgb(255,255,255)"
	this.alpha=1.0;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.gc.save();
}

gxtkGraphics.prototype.EndRender=function(){
	this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.canvas.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.canvas.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var surface=new gxtkSurface( this );
	surface.Load( path );
	return surface;
}

gxtkGraphics.prototype.DestroySurface=function( surface ){
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width && h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
  	this.gc.beginPath();
  	this.gc.moveTo( x1,y1 );
  	this.gc.lineTo( x2,y2 );
  	this.gc.stroke();
  	this.gc.closePath();
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( surface.loaded ) this.gc.drawImage( surface.image,x,y );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( srcw<=0 || srch<=0 ) return;	//Safari Kludge!
	if( surface.loaded ) this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
}

//***** gxtkSurface class *****

function gxtkSurface( graphics ){
	this.graphics=graphics;
	this.swidth=0;
	this.sheight=0;
	this.image=null;
	this.loaded=0;
}

gxtkSurface.prototype.Load=function( path ){

	var ty=this.graphics.app.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return;

	this.swidth=parseInt( this.graphics.app.GetMetaData( path,"width" ) );
	this.sheight=parseInt( this.graphics.app.GetMetaData( path,"height" ) );

	this.image=new Image();
	
	var surface=this;
	this.image.onload=function(){
		//executes in scope of HTML Image
		surface.loaded=1;
		surface.graphics.app.DecLoading();
	};

	this.graphics.app.IncLoading();

	this.image.src="data/"+path;
}

//***** GXTK API *****

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.loaded;
}

//***** Class gxtkInput *****

function gxtkInput( app ){
	this.app=app;
	this.keyStates=new Array( 512 );
	this.charQueue=new Array( 32 );
	this.charPut=0;
	this.charGet=0;
	this.mouseX=0;
	this.mouseY=0;
	this.joyX=0;
	this.joyY=0;
	this.joyZ=0;
	this.accelX=0;
	this.accelY=0;
	this.accelZ=0;
	for( var i=0;i<512;++i ){
		this.keyStates[i]=0;
	}
}

gxtkInput.prototype.BeginUpdate=function(){
}

gxtkInput.prototype.EndUpdate=function(){
	for( var i=0;i<512;++i ){
		this.keyStates[i]&=0x100;
	}
	this.charGet=0;
	this.charPut=0;
}

gxtkInput.prototype.OnKeyDown=function( key ){
	if( (this.keyStates[key]&0x100)==0 ){
		this.keyStates[key]|=0x100;
		++this.keyStates[key];	
	}
}

gxtkInput.prototype.OnKeyUp=function( key ){
	this.keyStates[key]&=0xff;
}

gxtkInput.prototype.PutChar=function( char ){
	if( this.charPut-this.charGet<32 ){
		this.charQueue[this.charPut & 31]=char;
		this.charPut+=1;
	}
}

gxtkInput.prototype.OnMouseMove=function( x,y ){
	this.mouseX=x;
	this.mouseY=y;
}

//***** GXTK API *****

gxtkInput.prototype.KeyDown=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] >> 8;
	}
	return 0;
}

gxtkInput.prototype.KeyHit=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] & 0xff;
	}
	return 0;
}

gxtkInput.prototype.GetChar=function(){
	if( this.charPut!=this.charGet ){
		var char=this.charQueue[this.charGet & 31];
		this.charGet+=1;
		return char;
	}
	return 0;
}

gxtkInput.prototype.MouseX=function(){
	return this.mouseX;
}

gxtkInput.prototype.MouseY=function(){
	return this.mouseY;
}

gxtkInput.prototype.JoyX=function( index ){
	return this.joyX;
}

gxtkInput.prototype.JoyY=function( index ){
	return this.joyY;
}

gxtkInput.prototype.JoyZ=function( index ){
	return this.joyZ;
}

gxtkInput.prototype.TouchX=function( index ){
	return this.mouseX;
}

gxtkInput.prototype.TouchY=function( index ){
	return this.mouseY;
}

gxtkInput.prototype.AccelX=function(){
	return 0;
}

gxtkInput.prototype.AccelY=function(){
	return 0;
}

gxtkInput.prototype.AccelZ=function(){
	return 0;
}


//***** gxtkChannel class *****
function gxtkChannel(){
	this.audio=null;
	this.sample=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
}

//***** gxtkAudio class *****
function gxtkAudio( app ){
	this.app=app;
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.channels=new Array(32);
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return new gxtkSample( null );
	
	var audio=new Audio( "data/"+path );
	return new gxtkSample( audio );
}

gxtkAudio.prototype.DestroySample=function( sample ){
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];
	
	if( chan.sample==sample && chan.audio ){	//&& !chan.audio.paused ){
		chan.audio.loop=(flags&1)!=0;
		chan.audio.volume=chan.volume;
		try{
			chan.audio.currentTime=0;
		}catch(ex){
		}
		chan.audio.play();
		return;
	}

	if( chan.audio ) chan.audio.pause();
	
	var audio=sample.AllocAudio();
	
	if( audio ){
		for( var i=0;i<32;++i ){
			if( this.channels[i].audio==audio ){
				this.channels[i].audio=null;
				break;
			}
		}
		audio.loop=(flags&1)!=0;
		audio.volume=chan.volume;
		audio.play();
	}
	
	chan.audio=audio;
	chan.sample=sample;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.pause();
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio && !chan.audio.paused && !chan.audio.ended ) return 1;
	return 0;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.insts=new Array( 8 );
}

gxtkSample.prototype.AllocAudio=function(){
	for( var i=0;i<8;++i ){
		var audio=this.insts[i];
		if( audio ){
			//Ok, this is ugly but seems to work best...no idea how/why!
			if( audio.paused ){
				if( audio.currentTime==0 ) return audio;
				audio.currentTime=0;
			}else if( audio.ended ){
				audio.pause();
			}
		}else{
			audio=new Audio( this.audio.src );
			this.insts[i]=audio;
			return audio;
		}
	}
	return null;
}

// Copyright 2011 Indiepath Ltd, all rights reserved.
// No warranty implied; use at your own risk.


//***** moofooStream class *****
function moofooStream(){};

moofooStream.prototype.getUrl=function( host, query ){
	var self = this;
	var xhr	= new XMLHttpRequest();
	xhr.open('GET', host + query, true);
	
	xhr.onreadystatechange = function() {
		
		switch (xhr.readyState){
		case 0:
			self.onRequestError();
			break;
		case 1:
			self.onConnectionEstablished();
			break;
		case 2:
			self.onRequestReceived();
			break;
		case 3:
			self.onRequestProcessing();
			break;
		case 4:
			if (xhr.status == 200){
				self.onRequestComplete(xhr.responseText);
			} else {
				self.onRequestError();
			}
			break;
		}
	};
	
	xhr.send();
};


moofooStream.prototype.onRequestError=function(){alert("Error");};
moofooStream.prototype.onConnectionEstablished=function(){alert("established");};
moofooStream.prototype.onRequestReceived=function(){alert("received");};
moofooStream.prototype.onRequestProcessing=function(){alert("processing");};
moofooStream.prototype.onRequestComplete=function( response ){ alert(response); };


moofooStream.prototype.rbeSendSockMsg=function(x,y){ 

	//alert("Dat jeht!"); 
	socket.send('{"x":"'+x+'","y":"'+y+'","num":"'+myPlayernum+'"}');
};

moofooStream.prototype.rbeCheckenemyMove=function(x,y){ 

	for  (var mySid in all_players_new)
	{
		if ( (all_players_new[mySid].x == x) && (all_players_new[mySid].y == y) )
		{
			//alert ("Spieler:"+all_players_new[mySid].num)
			return (all_players_new[mySid].num);
		}
	}
	return 0;
};


moofooStream.prototype.rbeGetMayPlayerNum=function(){ 

	return myPlayernum;
};

moofooStream.prototype.rbeGetNumOfAllPlayers=function(){ 

	return numOfAllPlayers;
};


function bb_app_App(){
	Object.call(this);
}
function bb_app_App_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<84>";
	bb_app_device=bb_app_AppDevice_new.call(new bb_app_AppDevice,this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<83>";
	var bb=this;
	pop_err();
	return bb;
}
bb_app_App.prototype.bbOnCreate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<87>";
	pop_err();
	return 0;
}
bb_app_App.prototype.bbOnUpdate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<90>";
	pop_err();
	return 0;
}
bb_app_App.prototype.bbOnRender=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<93>";
	pop_err();
	return 0;
}
bb_app_App.prototype.bbOnLoading=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<96>";
	pop_err();
	return 0;
}
function bb_four_FourGame(){
	bb_app_App.call(this);
	this.bbstreams=null;
	this.bbmx=0;
	this.bbmy=0;
}
bb_four_FourGame.prototype=extend_class(bb_app_App);
function bb_four_FourGame_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<6>";
	bb_app_App_new.call(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<6>";
	var bb=this;
	pop_err();
	return bb;
}
var bb_four_FourGame_Board;
bb_four_FourGame.prototype.bbget_Board_Loc=function(bbx,bby){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<80>";
	var bb=bbx*10+bby;
	pop_err();
	return bb;
}
bb_four_FourGame.prototype.bbClearBoard=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<56>";
	bb_four_FourGame_Board=resize_number_array(bb_four_FourGame_Board,100);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<57>";
	for(var bbx=0;bbx<=9;bbx=bbx+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<58>";
		for(var bby=0;bby<=6;bby=bby+1){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<59>";
			var bb=this.bbget_Board_Loc(bbx,bby);
			dbg_array(bb_four_FourGame_Board,bb)[bb]=0
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<55>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbOnCreate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<24>";
	this.bbClearBoard();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<25>";
	this.bbstreams=bb_stream_asyncStream_new.call(new bb_stream_asyncStream);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<26>";
	bb_app_SetUpdateRate(60);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<23>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbsetPlayerColor=function(bbplayer){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<86>";
	var bbR=[255,050,050,150,200,250,050];
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<87>";
	var bbG=[255,250,100,050,100,250,050];
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<88>";
	var bbB=[255,050,100,150,050,000,255];
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<89>";
	bb_graphics_SetColor((dbg_array(bbR,bbplayer)[bbplayer]),(dbg_array(bbG,bbplayer)[bbplayer]),(dbg_array(bbB,bbplayer)[bbplayer]));
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<85>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbcheckPlayerClick=function(bbmx,bbmy){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<97>";
	for(var bbx=0;bbx<=9;bbx=bbx+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<98>";
		for(var bby=0;bby<=6;bby=bby+1){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<99>";
			var bb=this.bbget_Board_Loc(bbx,bby);
			this.bbsetPlayerColor(dbg_array(bb_four_FourGame_Board,bb)[bb]);
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<100>";
			var bbleftborder=52+bbx*60-25;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<101>";
			var bbrightborder=52+bbx*60+25;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<102>";
			var bbupperborder=52+bby*60-25;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<103>";
			var bblowerborder=52+bby*60+25;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<104>";
			if(bbmx>=bbleftborder && bbmx<=bbrightborder && bbmy>=bbupperborder && bbmy<=bblowerborder){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<105>";
				var bb2=this.bbget_Board_Loc(bbx,bby);
				if(dbg_array(bb_four_FourGame_Board,bb2)[bb2]==0){
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<106>";
					var bb3=this.bbget_Board_Loc(bbx,bby);
					dbg_array(bb_four_FourGame_Board,bb3)[bb3]=this.bbstreams.rbeGetMayPlayerNum()
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<107>";
					this.bbstreams.rbeSendSockMsg(String(bbx),String(bby));
				}
			}
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<95>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbcheckEnemyMoves=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<116>";
	for(var bbx=0;bbx<=9;bbx=bbx+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<117>";
		for(var bby=0;bby<=6;bby=bby+1){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<118>";
			var bbresult=this.bbstreams.rbeCheckenemyMove(String(bbx),String(bby));
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<119>";
			if(bbresult!=0){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<120>";
				var bb=this.bbget_Board_Loc(bbx,bby);
				dbg_array(bb_four_FourGame_Board,bb)[bb]=bbresult
			}
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<115>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbOnUpdate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<34>";
	this.bbmx=bb_input_MouseX();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<35>";
	this.bbmy=bb_input_MouseY();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<37>";
	if((bb_input_MouseDown(0))!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<39>";
		this.bbcheckPlayerClick(((this.bbmx)|0),((this.bbmy)|0));
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<41>";
	this.bbcheckEnemyMoves();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<33>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbshowBoard=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<68>";
	for(var bbx=0;bbx<=9;bbx=bbx+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<69>";
		for(var bby=0;bby<=6;bby=bby+1){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<70>";
			var bb=this.bbget_Board_Loc(bbx,bby);
			this.bbsetPlayerColor(dbg_array(bb_four_FourGame_Board,bb)[bb]);
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<71>";
			bb_graphics_DrawCircle((52+bbx*60),(52+bby*60),25.000000);
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<74>";
	bb_graphics_DrawText("Players online: "+String(this.bbstreams.rbeGetNumOfAllPlayers()),52.000000,460.000000,0.000000,0.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<67>";
	pop_err();
	return 0;
}
bb_four_FourGame.prototype.bbOnRender=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<48>";
	bb_graphics_Cls(32.000000,64.000000,128.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<49>";
	this.bbshowBoard();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<47>";
	pop_err();
	return 0;
}
function bb_app_AppDevice(){
	gxtkApp.call(this);
	this.bbapp=null;
}
bb_app_AppDevice.prototype=extend_class(gxtkApp);
function bb_app_AppDevice_new(bbapp){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<45>";
	dbg_object(this).bbapp=bbapp;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<46>";
	bb_graphics_SetGraphicsContext(bb_graphics_GraphicsContext_new.call(new bb_graphics_GraphicsContext,this.GraphicsDevice()));
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<47>";
	bb_input_SetInputDevice(this.InputDevice());
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<48>";
	bb_audio_SetAudioDevice(this.AudioDevice());
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<44>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_app_AppDevice_new2(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<42>";
	var bb=this;
	pop_err();
	return bb;
}
bb_app_AppDevice.prototype.OnCreate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<52>";
	var bb=this.bbapp.bbOnCreate();
	pop_err();
	return bb;
}
bb_app_AppDevice.prototype.OnUpdate=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<56>";
	var bb=this.bbapp.bbOnUpdate();
	pop_err();
	return bb;
}
bb_app_AppDevice.prototype.OnRender=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<60>";
	bb_graphics_BeginRender();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<61>";
	var bbr=this.bbapp.bbOnRender();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<62>";
	bb_graphics_EndRender();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<59>";
	pop_err();
	return 0;
}
bb_app_AppDevice.prototype.OnLoading=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<66>";
	bb_graphics_BeginRender();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<67>";
	var bbr=this.bbapp.bbOnLoading();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<68>";
	bb_graphics_EndRender();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<65>";
	pop_err();
	return 0;
}
function bb_graphics_GraphicsContext(){
	Object.call(this);
	this.bbdevice=null;
	this.bbmatrixSp=0;
	this.bbix=1.000000;
	this.bbiy=0;
	this.bbjx=0;
	this.bbjy=1.000000;
	this.bbtx=0;
	this.bbty=0;
	this.bbtformed=0;
	this.bbmatDirty=0;
	this.bbcolor_r=0;
	this.bbcolor_g=0;
	this.bbcolor_b=0;
	this.bbalpha=0;
	this.bbblend=0;
	this.bbscissor_x=0;
	this.bbscissor_y=0;
	this.bbscissor_width=0;
	this.bbscissor_height=0;
	this.bbfont=null;
	this.bbdefaultFont=null;
	this.bbfirstChar=0;
	this.bbmatrixStack=new_number_array(192);
}
function bb_graphics_GraphicsContext_new(bbdevice){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<69>";
	dbg_object(this).bbdevice=bbdevice;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<68>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_GraphicsContext_new2(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<66>";
	var bb=this;
	pop_err();
	return bb;
}
var bb_graphics_context;
function bb_graphics_SetGraphicsContext(bbgc){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<196>";
	bb_graphics_context=bbgc;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<195>";
	pop_err();
	return 0;
}
var bb_input_device;
function bb_input_SetInputDevice(bbdev){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/input.monkey<38>";
	bb_input_device=bbdev;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/input.monkey<37>";
	pop_err();
	return 0;
}
var bb_audio_device;
function bb_audio_SetAudioDevice(bbdev){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/audio.monkey<47>";
	bb_audio_device=bbdev;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/audio.monkey<46>";
	pop_err();
	return 0;
}
var bb_app_device;
function bb_Main(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<136>";
	bb_four_FourGame_new.call(new bb_four_FourGame);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/RobsTests/four.monkey<135>";
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<290>";
	dbg_object(bb_graphics_context).bbix=bbix;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<291>";
	dbg_object(bb_graphics_context).bbiy=bbiy;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<292>";
	dbg_object(bb_graphics_context).bbjx=bbjx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<293>";
	dbg_object(bb_graphics_context).bbjy=bbjy;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<294>";
	dbg_object(bb_graphics_context).bbtx=bbtx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<295>";
	dbg_object(bb_graphics_context).bbty=bbty;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<296>";
	dbg_object(bb_graphics_context).bbtformed=((bbix!=1.000000 || bbiy!=0.000000 || bbjx!=0.000000 || bbjy!=1.000000 || bbtx!=0.000000 || bbty!=0.000000)?1:0);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<297>";
	dbg_object(bb_graphics_context).bbmatDirty=1;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<289>";
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(bbm){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<286>";
	bb_graphics_SetMatrix(dbg_array(bbm,0)[0],dbg_array(bbm,1)[1],dbg_array(bbm,2)[2],dbg_array(bbm,3)[3],dbg_array(bbm,4)[4],dbg_array(bbm,5)[5]);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<285>";
	pop_err();
	return 0;
}
function bb_graphics_SetColor(bbr,bbg,bbb){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<222>";
	dbg_object(bb_graphics_context).bbcolor_r=bbr;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<223>";
	dbg_object(bb_graphics_context).bbcolor_g=bbg;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<224>";
	dbg_object(bb_graphics_context).bbcolor_b=bbb;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<225>";
	dbg_object(bb_graphics_context).bbdevice.SetColor(bbr,bbg,bbb);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<221>";
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(bbalpha){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<233>";
	dbg_object(bb_graphics_context).bbalpha=bbalpha;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<234>";
	dbg_object(bb_graphics_context).bbdevice.SetAlpha(bbalpha);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<232>";
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(bbblend){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<242>";
	dbg_object(bb_graphics_context).bbblend=bbblend;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<243>";
	dbg_object(bb_graphics_context).bbdevice.SetBlend(bbblend);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<241>";
	pop_err();
	return 0;
}
function bb_graphics_DeviceWidth(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<200>";
	var bb=dbg_object(bb_graphics_context).bbdevice.Width();
	pop_err();
	return bb;
}
function bb_graphics_DeviceHeight(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<204>";
	var bb=dbg_object(bb_graphics_context).bbdevice.Height();
	pop_err();
	return bb;
}
function bb_graphics_SetScissor(bbx,bby,bbwidth,bbheight){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<251>";
	dbg_object(bb_graphics_context).bbscissor_x=bbx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<252>";
	dbg_object(bb_graphics_context).bbscissor_y=bby;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<253>";
	dbg_object(bb_graphics_context).bbscissor_width=bbwidth;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<254>";
	dbg_object(bb_graphics_context).bbscissor_height=bbheight;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<255>";
	dbg_object(bb_graphics_context).bbdevice.SetScissor(((bbx)|0),((bby)|0),((bbwidth)|0),((bbheight)|0));
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<250>";
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<274>";
	dbg_object(bb_graphics_context).bbmatrixSp=0;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<275>";
	bb_graphics_SetMatrix(1.000000,0.000000,0.000000,1.000000,0.000000,0.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<276>";
	bb_graphics_SetColor(255.000000,255.000000,255.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<277>";
	bb_graphics_SetAlpha(1.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<278>";
	bb_graphics_SetBlend(0);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<279>";
	bb_graphics_SetScissor(0.000000,0.000000,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<273>";
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<282>";
	pop_err();
	return 0;
}
function bb_stream_asyncStream(){
	moofooStream.call(this);
}
bb_stream_asyncStream.prototype=extend_class(moofooStream);
function bb_stream_asyncStream_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<30>";
	var bb=this;
	pop_err();
	return bb;
}
bb_stream_asyncStream.prototype.bbonRequestError=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<33>";
	pop_err();
	return "error";
}
bb_stream_asyncStream.prototype.bbonConnectionEstablished=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<36>";
	pop_err();
	return "connection made";
}
bb_stream_asyncStream.prototype.bbonRequestReceived=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<39>";
	pop_err();
	return "request received";
}
bb_stream_asyncStream.prototype.bbonRequestProcessing=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<42>";
	pop_err();
	return "request processing";
}
bb_stream_asyncStream.prototype.bbonRequestComplete=function(bbresponse){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/moofoo/stream.monkey<44>";
	pop_err();
	return "";
}
function bb_app_SetUpdateRate(bbhertz){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/app.monkey<118>";
	var bb=bb_app_device.SetUpdateRate(bbhertz);
	pop_err();
	return bb;
}
function bb_input_MouseX(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/input.monkey<82>";
	var bb=bb_input_device.MouseX();
	pop_err();
	return bb;
}
function bb_input_MouseY(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/input.monkey<86>";
	var bb=bb_input_device.MouseY();
	pop_err();
	return bb;
}
function bb_input_MouseDown(bbbutton){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/input.monkey<90>";
	var bb=bb_input_device.KeyDown(1+bbbutton);
	pop_err();
	return bb;
}
function bb_graphics_Cls(bbr,bbg,bbb){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<208>";
	dbg_object(bb_graphics_context).bbdevice.Cls(bbr,bbg,bbb);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<207>";
	pop_err();
	return 0;
}
function bb_graphics_ValidateMatrix(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<265>";
	if((dbg_object(bb_graphics_context).bbmatDirty)!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<266>";
		dbg_object(bb_graphics_context).bbdevice.SetMatrix(dbg_object(bb_graphics_context).bbix,dbg_object(bb_graphics_context).bbiy,dbg_object(bb_graphics_context).bbjx,dbg_object(bb_graphics_context).bbjy,dbg_object(bb_graphics_context).bbtx,dbg_object(bb_graphics_context).bbty);
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<267>";
		dbg_object(bb_graphics_context).bbmatDirty=0;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<264>";
	pop_err();
	return 0;
}
function bb_graphics_DrawCircle(bbx,bby,bbr){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<364>";
	bb_graphics_ValidateMatrix();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<365>";
	dbg_object(bb_graphics_context).bbdevice.DrawOval(bbx-bbr,bby-bbr,bbr*2.000000,bbr*2.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<363>";
	pop_err();
	return 0;
}
function bb_resource_Resource(){
	Object.call(this);
	this.bbnode=null;
	this.bbrefs=1;
}
function bb_resource_Resource_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<16>";
	var bb=this;
	pop_err();
	return bb;
}
bb_resource_Resource.prototype.bbRegister=function(bbtype){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<37>";
	var bblist=object_downcast((bb_resource_resources.bbValueForKey(bb_boxes_StringObject_new3.call(new bb_boxes_StringObject,bbtype))),bb_list_List);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<38>";
	if(!((bblist)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<39>";
		bblist=bb_list_List_new.call(new bb_list_List);
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<40>";
		bb_resource_resources.bbInsert((bb_boxes_StringObject_new3.call(new bb_boxes_StringObject,bbtype)),bblist);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<42>";
	this.bbnode=bblist.bbAddLast(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<36>";
	pop_err();
	return 0;
}
bb_resource_Resource.prototype.bbRetain=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<19>";
	this.bbrefs+=1;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/resource.monkey<18>";
	pop_err();
	return 0;
}
function bb_graphics_Image(){
	bb_resource_Resource.call(this);
	this.bbsurface=null;
	this.bbwidth=0;
	this.bbheight=0;
	this.bbflags=0;
	this.bbframes=[];
	this.bbtx=0;
	this.bbty=0;
	this.bbsource=null;
}
bb_graphics_Image.prototype=extend_class(bb_resource_Resource);
var bb_graphics_Image_DefaultFlags;
bb_graphics_Image.prototype.bbSetHandle=function(bbtx,bbty){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<126>";
	dbg_object(this).bbtx=bbtx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<127>";
	dbg_object(this).bbty=bbty;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<128>";
	dbg_object(this).bbflags=dbg_object(this).bbflags&-2;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<125>";
	pop_err();
	return 0;
}
function bb_graphics_Image_new(bbpath,bbnframes,bbiflags){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<140>";
	bb_resource_Resource_new.call(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<141>";
	this.bbsurface=dbg_object(bb_graphics_context).bbdevice.LoadSurface(bbpath);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<142>";
	if(!((this.bbsurface)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<142>";
		error("Failed to load image "+bbpath);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<144>";
	this.bbRegister("mojo.graphics.Image");
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<146>";
	this.bbwidth=((this.bbsurface.Width()/bbnframes)|0);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<147>";
	this.bbheight=this.bbsurface.Height();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<148>";
	this.bbflags=bbiflags;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<149>";
	this.bbframes=new_object_array(bbnframes);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<150>";
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<151>";
		dbg_array(this.bbframes,bbi)[bbi]=bb_graphics_Frame_new.call(new bb_graphics_Frame,bbi*this.bbwidth,0)
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<153>";
	if(bbnframes==1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<153>";
		this.bbflags|=65536;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<154>";
	if((this.bbflags&1)!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<154>";
		this.bbSetHandle((this.bbwidth)/2.0,(this.bbheight)/2.0);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<140>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_Image_new2(bbx,bby,bbiwidth,bbiheight,bbnframes,bbiflags,bbsource){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<157>";
	bb_resource_Resource_new.call(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<159>";
	this.bbRegister("mojo.graphics.Image");
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<161>";
	bbsource.bbRetain();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<162>";
	dbg_object(this).bbsource=bbsource;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<163>";
	this.bbsurface=dbg_object(bbsource).bbsurface;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<164>";
	this.bbwidth=bbiwidth;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<165>";
	this.bbheight=bbiheight;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<166>";
	this.bbflags=bbiflags;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<167>";
	this.bbframes=new_object_array(bbnframes);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<168>";
	var bbix=bbx+dbg_object(dbg_array(dbg_object(bbsource).bbframes,0)[0]).bbx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<169>";
	var bbiy=bby+dbg_object(dbg_array(dbg_object(bbsource).bbframes,0)[0]).bby;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<170>";
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<171>";
		if(bbix+this.bbwidth>dbg_object(bbsource).bbwidth){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<172>";
			bbix=dbg_object(dbg_array(dbg_object(bbsource).bbframes,0)[0]).bbx;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<173>";
			bbiy+=this.bbheight;
		}
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<175>";
		dbg_array(this.bbframes,bbi)[bbi]=bb_graphics_Frame_new.call(new bb_graphics_Frame,bbix,bbiy)
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<176>";
		bbix+=this.bbwidth;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<178>";
	if(bbnframes==1 && bbx==0 && bby==0 && this.bbwidth==this.bbsurface.Width() && this.bbheight==this.bbsurface.Height()){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<178>";
		this.bbflags|=65536;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<179>";
	if((this.bbflags&1)!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<179>";
		this.bbSetHandle((this.bbwidth)/2.0,(this.bbheight)/2.0);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<157>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_Image_new3(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<86>";
	bb_resource_Resource_new.call(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<86>";
	var bb=this;
	pop_err();
	return bb;
}
bb_graphics_Image.prototype.bbGrabImage=function(bbx,bby,bbwidth,bbheight,bbframes,bbflags){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<121>";
	if(dbg_object(this).bbframes.length!=1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<121>";
		pop_err();
		return null;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<122>";
	var bb=bb_graphics_Image_new2.call(new bb_graphics_Image,bbx,bby,bbwidth,bbheight,bbframes,bbflags,this);
	pop_err();
	return bb;
}
bb_graphics_Image.prototype.bbLoaded=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<101>";
	var bb=this.bbsurface.Loaded();
	pop_err();
	return bb;
}
bb_graphics_Image.prototype.bbWidth=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<93>";
	pop_err();
	return this.bbwidth;
}
bb_graphics_Image.prototype.bbHeight=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<97>";
	pop_err();
	return this.bbheight;
}
bb_graphics_Image.prototype.bbFrames=function(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<105>";
	var bb=this.bbframes.length;
	pop_err();
	return bb;
}
function bb_list_List(){
	Object.call(this);
	this.bb_head=bb_list_Node_new.call(new bb_list_Node);
}
function bb_list_List_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<13>";
	var bb=this;
	pop_err();
	return bb;
}
bb_list_List.prototype.bbAddLast=function(bbdata){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<49>";
	var bb=bb_list_Node_new2.call(new bb_list_Node,this.bb_head,dbg_object(this.bb_head).bb_pred,bbdata);
	pop_err();
	return bb;
}
function bb_boxes_StringObject(){
	Object.call(this);
	this.bbvalue="";
}
function bb_boxes_StringObject_new(bbvalue){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<59>";
	dbg_object(this).bbvalue=String(bbvalue);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<58>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_boxes_StringObject_new2(bbvalue){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<63>";
	dbg_object(this).bbvalue=String(bbvalue);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<62>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_boxes_StringObject_new3(bbvalue){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<67>";
	dbg_object(this).bbvalue=bbvalue;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<66>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_boxes_StringObject_new4(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/boxes.monkey<55>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_map_Map(){
	Object.call(this);
	this.bbroot=null;
}
function bb_map_Map_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<13>";
	var bb=this;
	pop_err();
	return bb;
}
bb_map_Map.prototype.bbCompare=function(bblhs,bbrhs){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<99>";
	pop_err();
	return 0;
}
bb_map_Map.prototype.bbFindNode=function(bbkey){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<124>";
	var bbnode=this.bbroot;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<126>";
	while((bbnode)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<127>";
		var bbcmp=this.bbCompare((bbkey),(dbg_object(bbnode).bbkey));
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<128>";
		if(bbcmp>0){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<129>";
			bbnode=dbg_object(bbnode).bbright;
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<130>";
			if(bbcmp<0){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<131>";
				bbnode=dbg_object(bbnode).bbleft;
			}else{
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<133>";
				pop_err();
				return bbnode;
			}
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<136>";
	pop_err();
	return bbnode;
}
bb_map_Map.prototype.bbGet=function(bbkey){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<65>";
	var bbnode=this.bbFindNode(bbkey);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<66>";
	if((bbnode)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<66>";
		var bb=dbg_object(bbnode).bbvalue;
		pop_err();
		return bb;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<64>";
	pop_err();
	return null;
}
bb_map_Map.prototype.bbValueForKey=function(bbkey){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<95>";
	var bb=this.bbGet(bbkey);
	pop_err();
	return bb;
}
bb_map_Map.prototype.bbRotateLeft=function(bbnode){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<212>";
	var bbchild=dbg_object(bbnode).bbright;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<213>";
	dbg_object(bbnode).bbright=dbg_object(bbchild).bbleft;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<214>";
	if((dbg_object(bbchild).bbleft)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<215>";
		dbg_object(dbg_object(bbchild).bbleft).bbparent=bbnode;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<217>";
	dbg_object(bbchild).bbparent=dbg_object(bbnode).bbparent;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<218>";
	if((dbg_object(bbnode).bbparent)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<219>";
		if(bbnode==dbg_object(dbg_object(bbnode).bbparent).bbleft){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<220>";
			dbg_object(dbg_object(bbnode).bbparent).bbleft=bbchild;
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<222>";
			dbg_object(dbg_object(bbnode).bbparent).bbright=bbchild;
		}
	}else{
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<225>";
		this.bbroot=bbchild;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<227>";
	dbg_object(bbchild).bbleft=bbnode;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<228>";
	dbg_object(bbnode).bbparent=bbchild;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<211>";
	pop_err();
	return 0;
}
bb_map_Map.prototype.bbRotateRight=function(bbnode){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<232>";
	var bbchild=dbg_object(bbnode).bbleft;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<233>";
	dbg_object(bbnode).bbleft=dbg_object(bbchild).bbright;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<234>";
	if((dbg_object(bbchild).bbright)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<235>";
		dbg_object(dbg_object(bbchild).bbright).bbparent=bbnode;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<237>";
	dbg_object(bbchild).bbparent=dbg_object(bbnode).bbparent;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<238>";
	if((dbg_object(bbnode).bbparent)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<239>";
		if(bbnode==dbg_object(dbg_object(bbnode).bbparent).bbright){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<240>";
			dbg_object(dbg_object(bbnode).bbparent).bbright=bbchild;
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<242>";
			dbg_object(dbg_object(bbnode).bbparent).bbleft=bbchild;
		}
	}else{
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<245>";
		this.bbroot=bbchild;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<247>";
	dbg_object(bbchild).bbright=bbnode;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<248>";
	dbg_object(bbnode).bbparent=bbchild;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<231>";
	pop_err();
	return 0;
}
bb_map_Map.prototype.bbInsertFixup=function(bbnode){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<173>";
	while(((dbg_object(bbnode).bbparent)!=null) && dbg_object(dbg_object(bbnode).bbparent).bbcolor==-1 && ((dbg_object(dbg_object(bbnode).bbparent).bbparent)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<174>";
		if(dbg_object(bbnode).bbparent==dbg_object(dbg_object(dbg_object(bbnode).bbparent).bbparent).bbleft){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<175>";
			var bbuncle=dbg_object(dbg_object(dbg_object(bbnode).bbparent).bbparent).bbright;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<176>";
			if(((bbuncle)!=null) && dbg_object(bbuncle).bbcolor==-1){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<177>";
				dbg_object(dbg_object(bbnode).bbparent).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<178>";
				dbg_object(bbuncle).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<179>";
				dbg_object(dbg_object(bbuncle).bbparent).bbcolor=-1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<180>";
				bbnode=dbg_object(bbuncle).bbparent;
			}else{
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<182>";
				if(bbnode==dbg_object(dbg_object(bbnode).bbparent).bbright){
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<183>";
					bbnode=dbg_object(bbnode).bbparent;
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<184>";
					this.bbRotateLeft(bbnode);
				}
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<186>";
				dbg_object(dbg_object(bbnode).bbparent).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<187>";
				dbg_object(dbg_object(dbg_object(bbnode).bbparent).bbparent).bbcolor=-1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<188>";
				this.bbRotateRight(dbg_object(dbg_object(bbnode).bbparent).bbparent);
			}
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<191>";
			var bbuncle2=dbg_object(dbg_object(dbg_object(bbnode).bbparent).bbparent).bbleft;
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<192>";
			if(((bbuncle2)!=null) && dbg_object(bbuncle2).bbcolor==-1){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<193>";
				dbg_object(dbg_object(bbnode).bbparent).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<194>";
				dbg_object(bbuncle2).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<195>";
				dbg_object(dbg_object(bbuncle2).bbparent).bbcolor=-1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<196>";
				bbnode=dbg_object(bbuncle2).bbparent;
			}else{
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<198>";
				if(bbnode==dbg_object(dbg_object(bbnode).bbparent).bbleft){
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<199>";
					bbnode=dbg_object(bbnode).bbparent;
					err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<200>";
					this.bbRotateRight(bbnode);
				}
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<202>";
				dbg_object(dbg_object(bbnode).bbparent).bbcolor=1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<203>";
				dbg_object(dbg_object(dbg_object(bbnode).bbparent).bbparent).bbcolor=-1;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<204>";
				this.bbRotateLeft(dbg_object(dbg_object(bbnode).bbparent).bbparent);
			}
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<208>";
	dbg_object(this.bbroot).bbcolor=1;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<172>";
	pop_err();
	return 0;
}
bb_map_Map.prototype.bbSet=function(bbkey,bbvalue){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<32>";
	var bbnode=this.bbroot;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<33>";
	var bbparent=null;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<33>";
	var bbcmp=0;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<35>";
	while((bbnode)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<36>";
		bbparent=bbnode;
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<37>";
		bbcmp=this.bbCompare((bbkey),(dbg_object(bbnode).bbkey));
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<38>";
		if(bbcmp>0){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<39>";
			bbnode=dbg_object(bbnode).bbright;
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<40>";
			if(bbcmp<0){
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<41>";
				bbnode=dbg_object(bbnode).bbleft;
			}else{
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<43>";
				dbg_object(bbnode).bbvalue=bbvalue;
				err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<44>";
				pop_err();
				return 0;
			}
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<48>";
	bbnode=bb_map_Node_new.call(new bb_map_Node,bbkey,bbvalue,-1,bbparent);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<50>";
	if(!((bbparent)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<51>";
		this.bbroot=bbnode;
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<52>";
		pop_err();
		return 0;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<55>";
	if(bbcmp>0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<56>";
		dbg_object(bbparent).bbright=bbnode;
	}else{
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<58>";
		dbg_object(bbparent).bbleft=bbnode;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<61>";
	this.bbInsertFixup(bbnode);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<31>";
	pop_err();
	return 0;
}
bb_map_Map.prototype.bbInsert=function(bbkey,bbvalue){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<90>";
	var bb=this.bbSet(bbkey,bbvalue);
	pop_err();
	return bb;
}
function bb_map_StringMap(){
	bb_map_Map.call(this);
}
bb_map_StringMap.prototype=extend_class(bb_map_Map);
function bb_map_StringMap_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<510>";
	bb_map_Map_new.call(this);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<510>";
	var bb=this;
	pop_err();
	return bb;
}
bb_map_StringMap.prototype.bbCompare=function(bblhs,bbrhs){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<513>";
	var bbl=dbg_object(object_downcast((bblhs),bb_boxes_StringObject)).bbvalue;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<514>";
	var bbr=dbg_object(object_downcast((bbrhs),bb_boxes_StringObject)).bbvalue;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<515>";
	if(bbl<bbr){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<515>";
		pop_err();
		return -1;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<516>";
	var bb=((bbl>bbr)?1:0);
	pop_err();
	return bb;
}
var bb_resource_resources;
function bb_map_Node(){
	Object.call(this);
	this.bbkey=null;
	this.bbright=null;
	this.bbleft=null;
	this.bbvalue=null;
	this.bbcolor=0;
	this.bbparent=null;
}
function bb_map_Node_new(bbkey,bbvalue,bbcolor,bbparent){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<318>";
	dbg_object(this).bbkey=bbkey;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<319>";
	dbg_object(this).bbvalue=bbvalue;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<320>";
	dbg_object(this).bbcolor=bbcolor;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<321>";
	dbg_object(this).bbparent=bbparent;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<317>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_map_Node_new2(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/map.monkey<315>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_list_Node(){
	Object.call(this);
	this.bb_succ=null;
	this.bb_pred=null;
	this.bb_data=null;
}
function bb_list_Node_new(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<91>";
	this.bb_succ=this;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<92>";
	this.bb_pred=this;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<90>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_list_Node_new2(bbsucc,bbpred,bbdata){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<97>";
	this.bb_succ=bbsucc;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<98>";
	this.bb_pred=bbpred;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<99>";
	dbg_object(this.bb_succ).bb_pred=this;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<100>";
	dbg_object(this.bb_pred).bb_succ=this;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<101>";
	this.bb_data=bbdata;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/monkey/list.monkey<96>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_Frame(){
	Object.call(this);
	this.bbx=0;
	this.bby=0;
}
function bb_graphics_Frame_new(bbx,bby){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<55>";
	dbg_object(this).bbx=bbx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<56>";
	dbg_object(this).bby=bby;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<54>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_Frame_new2(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<50>";
	var bb=this;
	pop_err();
	return bb;
}
function bb_graphics_LoadImage(bbpath,bbframeCount,bbflags){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<212>";
	var bb=bb_graphics_Image_new.call(new bb_graphics_Image,bbpath,bbframeCount,bbflags);
	pop_err();
	return bb;
}
function bb_graphics_LoadImage2(bbpath,bbframeWidth,bbframeHeight,bbframeCount,bbflags){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<217>";
	var bbatlas=bb_graphics_Image_new.call(new bb_graphics_Image,bbpath,1,0);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<218>";
	if((bbatlas)!=null){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<218>";
		var bb=bbatlas.bbGrabImage(0,0,bbframeWidth,bbframeHeight,bbframeCount,bbflags);
		pop_err();
		return bb;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<216>";
	pop_err();
	return null;
}
function bb_graphics_SetFont(bbfont,bbfirstChar){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<463>";
	if(!((bbfont)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<464>";
		if(!((dbg_object(bb_graphics_context).bbdefaultFont)!=null)){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<465>";
			dbg_object(bb_graphics_context).bbdefaultFont=bb_graphics_LoadImage2("mojo_font.png",7,13,256,0);
		}
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<467>";
		bbfont=dbg_object(bb_graphics_context).bbdefaultFont;
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<468>";
		bbfirstChar=32;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<470>";
	dbg_object(bb_graphics_context).bbfont=bbfont;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<471>";
	dbg_object(bb_graphics_context).bbfirstChar=bbfirstChar;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<462>";
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<305>";
	var bbsp=dbg_object(bb_graphics_context).bbmatrixSp;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<306>";
	var bb=bbsp+0;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb)[bb]=dbg_object(bb_graphics_context).bbix
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<307>";
	var bb2=bbsp+1;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb2)[bb2]=dbg_object(bb_graphics_context).bbiy
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<308>";
	var bb3=bbsp+2;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb3)[bb3]=dbg_object(bb_graphics_context).bbjx
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<309>";
	var bb4=bbsp+3;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb4)[bb4]=dbg_object(bb_graphics_context).bbjy
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<310>";
	var bb5=bbsp+4;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb5)[bb5]=dbg_object(bb_graphics_context).bbtx
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<311>";
	var bb6=bbsp+5;
	dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb6)[bb6]=dbg_object(bb_graphics_context).bbty
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).bbmatrixSp=bbsp+6;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<304>";
	pop_err();
	return 0;
}
function bb_graphics_Transform(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<322>";
	var bbix2=bbix*dbg_object(bb_graphics_context).bbix+bbiy*dbg_object(bb_graphics_context).bbjx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<323>";
	var bbiy2=bbix*dbg_object(bb_graphics_context).bbiy+bbiy*dbg_object(bb_graphics_context).bbjy;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<324>";
	var bbjx2=bbjx*dbg_object(bb_graphics_context).bbix+bbjy*dbg_object(bb_graphics_context).bbjx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<325>";
	var bbjy2=bbjx*dbg_object(bb_graphics_context).bbiy+bbjy*dbg_object(bb_graphics_context).bbjy;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<326>";
	var bbtx2=bbtx*dbg_object(bb_graphics_context).bbix+bbty*dbg_object(bb_graphics_context).bbjx+dbg_object(bb_graphics_context).bbtx;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<327>";
	var bbty2=bbtx*dbg_object(bb_graphics_context).bbiy+bbty*dbg_object(bb_graphics_context).bbjy+dbg_object(bb_graphics_context).bbty;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<328>";
	bb_graphics_SetMatrix(bbix2,bbiy2,bbjx2,bbjy2,bbtx2,bbty2);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<321>";
	pop_err();
	return 0;
}
function bb_graphics_Transform2(bbcoords){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<505>";
	var bbout=new_number_array(bbcoords.length);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<506>";
	for(var bbi=0;bbi<bbcoords.length-1;bbi=bbi+2){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<507>";
		var bbx=dbg_array(bbcoords,bbi)[bbi];
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<507>";
		var bb=bbi+1;
		var bby=dbg_array(bbcoords,bb)[bb];
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<508>";
		dbg_array(bbout,bbi)[bbi]=bbx*dbg_object(bb_graphics_context).bbix+bby*dbg_object(bb_graphics_context).bbjx+dbg_object(bb_graphics_context).bbtx
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<509>";
		var bb2=bbi+1;
		dbg_array(bbout,bb2)[bb2]=bbx*dbg_object(bb_graphics_context).bbiy+bby*dbg_object(bb_graphics_context).bbjy+dbg_object(bb_graphics_context).bbty
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<511>";
	pop_err();
	return bbout;
}
function bb_graphics_Translate(bbx,bby){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<332>";
	bb_graphics_Transform(1.000000,0.000000,0.000000,1.000000,bbx,bby);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<331>";
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<316>";
	var bbsp=dbg_object(bb_graphics_context).bbmatrixSp-6;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<317>";
	var bb=bbsp+0;
	var bb2=bbsp+1;
	var bb3=bbsp+2;
	var bb4=bbsp+3;
	var bb5=bbsp+4;
	var bb6=bbsp+5;
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb)[bb],dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb2)[bb2],dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb3)[bb3],dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb4)[bb4],dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb5)[bb5],dbg_array(dbg_object(bb_graphics_context).bbmatrixStack,bb6)[bb6]);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).bbmatrixSp=bbsp;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<315>";
	pop_err();
	return 0;
}
function bb_graphics_DrawImage(bbimage,bbx,bby,bbframe){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<374>";
	var bbf=dbg_array(dbg_object(bbimage).bbframes,bbframe)[bbframe];
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<376>";
	if((dbg_object(bb_graphics_context).bbtformed)!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<377>";
		bb_graphics_PushMatrix();
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<379>";
		bb_graphics_Translate(bbx-dbg_object(bbimage).bbtx,bby-dbg_object(bbimage).bbty);
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<381>";
		bb_graphics_ValidateMatrix();
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<383>";
		if((dbg_object(bbimage).bbflags&65536)!=0){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<384>";
			dbg_object(bb_graphics_context).bbdevice.DrawSurface(dbg_object(bbimage).bbsurface,0.000000,0.000000);
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<386>";
			dbg_object(bb_graphics_context).bbdevice.DrawSurface2(dbg_object(bbimage).bbsurface,0.000000,0.000000,dbg_object(bbf).bbx,dbg_object(bbf).bby,dbg_object(bbimage).bbwidth,dbg_object(bbimage).bbheight);
		}
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<389>";
		bb_graphics_PopMatrix();
	}else{
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<391>";
		bb_graphics_ValidateMatrix();
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<393>";
		if((dbg_object(bbimage).bbflags&65536)!=0){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<394>";
			dbg_object(bb_graphics_context).bbdevice.DrawSurface(dbg_object(bbimage).bbsurface,bbx-dbg_object(bbimage).bbtx,bby-dbg_object(bbimage).bbty);
		}else{
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<396>";
			dbg_object(bb_graphics_context).bbdevice.DrawSurface2(dbg_object(bbimage).bbsurface,bbx-dbg_object(bbimage).bbtx,bby-dbg_object(bbimage).bbty,dbg_object(bbf).bbx,dbg_object(bbf).bby,dbg_object(bbimage).bbwidth,dbg_object(bbimage).bbheight);
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<373>";
	pop_err();
	return 0;
}
function bb_graphics_Rotate(bbangle){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<340>";
	bb_graphics_Transform(Math.cos((bbangle)*0.0174532925),-Math.sin((bbangle)*0.0174532925),Math.sin((bbangle)*0.0174532925),Math.cos((bbangle)*0.0174532925),0.000000,0.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<339>";
	pop_err();
	return 0;
}
function bb_graphics_Scale(bbx,bby){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<336>";
	bb_graphics_Transform(bbx,0.000000,0.000000,bby,0.000000,0.000000);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<335>";
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(bbimage,bbx,bby,bbrotation,bbscaleX,bbscaleY,bbframe){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<402>";
	var bbf=dbg_array(dbg_object(bbimage).bbframes,bbframe)[bbframe];
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<404>";
	bb_graphics_PushMatrix();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<406>";
	bb_graphics_Translate(bbx,bby);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<407>";
	bb_graphics_Rotate(bbrotation);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<408>";
	bb_graphics_Scale(bbscaleX,bbscaleY);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<409>";
	bb_graphics_Translate(-dbg_object(bbimage).bbtx,-dbg_object(bbimage).bbty);
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<411>";
	bb_graphics_ValidateMatrix();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<413>";
	if((dbg_object(bbimage).bbflags&65536)!=0){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<414>";
		dbg_object(bb_graphics_context).bbdevice.DrawSurface(dbg_object(bbimage).bbsurface,0.000000,0.000000);
	}else{
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<416>";
		dbg_object(bb_graphics_context).bbdevice.DrawSurface2(dbg_object(bbimage).bbsurface,0.000000,0.000000,dbg_object(bbf).bbx,dbg_object(bbf).bby,dbg_object(bbimage).bbwidth,dbg_object(bbimage).bbheight);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<419>";
	bb_graphics_PopMatrix();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<401>";
	pop_err();
	return 0;
}
function bb_graphics_DrawText(bbtext,bbx,bby,bbxalign,bbyalign){
	push_err();
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<487>";
	if(!((dbg_object(bb_graphics_context).bbfont)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<487>";
		bb_graphics_SetFont(null,32);
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<489>";
	if(!((dbg_object(bb_graphics_context).bbfont)!=null)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<489>";
		pop_err();
		return 0;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<490>";
	if(!((dbg_object(bb_graphics_context).bbfont.bbLoaded())!=0)){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<490>";
		pop_err();
		return 0;
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<492>";
	bbx=bbx-(dbg_object(bb_graphics_context).bbfont.bbWidth()*bbtext.length)*bbxalign;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<493>";
	bby=bby-(dbg_object(bb_graphics_context).bbfont.bbHeight())*bbyalign;
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<495>";
	for(var bbi=0;bbi<bbtext.length;bbi=bbi+1){
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<496>";
		var bbch=bbtext.charCodeAt(bbi)-dbg_object(bb_graphics_context).bbfirstChar;
		err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<497>";
		if(bbch>=0 && bbch<dbg_object(bb_graphics_context).bbfont.bbFrames()){
			err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<498>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).bbfont,bbx+(bbi*dbg_object(bb_graphics_context).bbfont.bbWidth()),bby,bbch);
		}
	}
	err_info="C:/Dokumente und Einstellungen/rbe/Desktop/MonkeyDemo30/modules/mojo/graphics.monkey<486>";
	pop_err();
	return 0;
}
function bb_Init(){
	bb_graphics_context=null;
	bb_input_device=null;
	bb_audio_device=null;
	bb_app_device=null;
	bb_four_FourGame_Board=[];
	bb_graphics_Image_DefaultFlags=0;
	bb_resource_resources=bb_map_StringMap_new.call(new bb_map_StringMap);
}
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

