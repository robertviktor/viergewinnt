
' Module moofoo.localstorage
'
' Copyright 2011 Indiepath Ltd, all rights reserved.
' No warranty implied; use at your own risk.

Private
Import "native/moofoo.localstorage.${TARGET}.${LANG}"

Extern

Class moofooLocalStorage="moofooLocalStorage"
	Method save( key$, data$)
	Method load$( key$ )
	Method remove( key$ )
End

Public

Class localStorage Extends moofooLocalStorage

	Method New()
	End
	
End
