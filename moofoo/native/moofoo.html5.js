
// HTML5 moofoo runtime.
//
// Copyright 2011 Indiepath Ltd, all rights reserved.
// No warranty implied; use at your own risk.


//***** moofooStream class *****
function mfStrm(){};

mfStrm.prototype.getUrl=function( host, query ){
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


mfStrm.prototype.onRequestError=function(){};
mfStrm.prototype.onConnectionEstablished=function(){};
mfStrm.prototype.onRequestReceived=function(){};
mfStrm.prototype.onRequestProcessing=function(){};
mfStrm.prototype.onRequestComplete=function( response ){};
