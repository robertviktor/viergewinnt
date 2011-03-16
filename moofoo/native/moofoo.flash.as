
class mfStrm{

	internal var self:mfStrm;
	
	function mfStrm(){}
	
	internal function getUrl( host:String, query:String ):void{
		self = this;
		var loader:URLLoader = new URLLoader();
		loader.dataFormat = URLLoaderDataFormat.TEXT;
		loader.addEventListener(Event.OPEN, 				onConnectionEstablished);
		loader.addEventListener(ProgressEvent.PROGRESS, 	onRequestProcessing);
		loader.addEventListener(Event.COMPLETE, 			onCompleted);
		loader.addEventListener(IOErrorEvent.IO_ERROR, 		onRequestError);
		loader.load(new URLRequest(host + query));
	}
	
	internal function onRequestError():int{
		return 0;
	}
	internal function onConnectionEstablished():int{
		return 0;
	}
	internal function onRequestReceived():int{
		return 0;
	}
	internal function onRequestProcessing():int{
		return 0;
	}
	internal function onCompleted(e:Event):void{
		onRequestComplete(e.target.data);
	}
	internal function onRequestComplete(response:String):int{
		return 0;
	}
	
}
