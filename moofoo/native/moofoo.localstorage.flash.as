
class moofooLocalStorage{

	function moofooLocalStorage(){}
	
	internal function save( key:String, data:String ):int{
		var file:SharedObject=SharedObject.getLocal( "moofooLocalStorage@"+key );
		file.data.data=data;
		file.close();
		return 0;
	}
	
	internal function load(key:String):String{
		var file:SharedObject=SharedObject.getLocal( "moofooLocalStorage@"+key );
		var data:String=file.data.data;
		file.close();
		return data?data:"";
	}
	
	internal function remove( key:String ):int{
		var file:SharedObject=SharedObject.getLocal( "moofooLocalStorage@"+key );
		file.clear();
		file.close();
		return 0;
	}
}
