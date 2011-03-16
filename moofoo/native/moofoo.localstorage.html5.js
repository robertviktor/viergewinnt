
// Copyright 2011 Indiepath Ltd, all rights reserved.
// No warranty implied; use at your own risk.

//***** moofooLocalStorage class *****
function moofooLocalStorage(){};

moofooLocalStorage.prototype.save = function( key, data){
	localStorage.setItem( "moofooLocalStorage@"+key, data );
};

moofooLocalStorage.prototype.load = function( key ){
	var data=localStorage.getItem( "moofooLocalStorage@"+key );
	return data?data:"";
};

moofooLocalStorage.prototype.remove = function( key ){
	localStorage.removeItem( "moofooLocalStorage@"+key);
};