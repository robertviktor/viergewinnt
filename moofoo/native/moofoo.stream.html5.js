
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
	socket.send('{"gid":"'+myGameId+'","x":"'+x+'","y":"'+y+'","num":"'+myPlayernum+'"}');
};

moofooStream.prototype.rbeCheckenemyMove=function(x,y){ 

	for  (var mySid in all_players_new)
	{
		if ( (all_players_new[mySid].x == x) && (all_players_new[mySid].y == y) && (all_players_new[mySid].num != myPlayernum) )
		{
			//alert ("Spieler:"+all_players_new[mySid].num)
			if(all_players_new[mySid].gid == myGameId)
			{
				var retval = all_players_new[mySid].num
				
				delete all_players_new[mySid];
				return (retval);
			}
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

moofooStream.prototype.rbeGetRocketX=function(){ 

	if (IsNumeric (Rocket_X))
		return Rocket_X;
	else 
		return 0.0;
};

moofooStream.prototype.rbeGetRocketY=function(){ 

	if (IsNumeric (Rocket_Y))
		return Rocket_Y;
	else 
		return 0.0;
};

moofooStream.prototype.get_rbe_selected_transport=function(){ 

		return "tr:"+ rbe_selected_transport+" Sid:"+mySessId+" Gid:"+myGameId;
};


function IsNumeric(input)
{
   return (input - 0) == input && input.length > 0;
}




