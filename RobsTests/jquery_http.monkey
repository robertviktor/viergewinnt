
Import mojo
Import moofoo.stream


Class MyGame Extends App

	  Field streams:asyncStream

	  Method OnCreate ()
  		 SetUpdateRate 60

		streams = New asyncStream()
		streams.getUrl("http://www.kidstick.de", "?q=1234&b=2&c=3" )

	  End

	  Method OnUpdate ()

	  End

	  Method OnRender ()
		Cls 32, 64, 128
	  End

End

Function Main ()
	New MyGame	
End
