
' Module moofoo.stream
'
' Copyright 2011 Indiepath Ltd, all rights reserved.
' No warranty implied; use at your own risk.

Private
Import "native/moofoo.stream.${TARGET}.${LANG}"

Extern

Class moofooStream="moofooStream"
	Method getUrl( host$, query$)
	Method onRequestError()
	Method onConnectionEstablished()
	Method onRequestReceived()
	Method onRequestProcessing()
	Method onRequestComplete(response$)
	
	Method rbeSendSockMsg(x$,y$)
	Method rbeCheckenemyMove(x$,y$)
	Method rbeGetMayPlayerNum()
	Method rbeGetNumOfAllPlayers()
	
	Method rbeGetRocketX()
	Method rbeGetRocketY()
	Method get_rbe_selected_transport()
End

Public

Class asyncStream Extends moofooStream
	
	Method New()
	End
	Method onRequestError$()
		Return "error"
	End
	Method onConnectionEstablished$()
		Return "connection made"
	End
	Method onRequestReceived$()
		Return "request received"
	End
	Method onRequestProcessing$()
		Return "request processing"
	End
	Method onRequestComplete$(response$)
	End		
End

