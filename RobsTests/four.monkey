
Import mojo
Import moofoo.stream


Class FourGame Extends App

	Const MaxX := 10
	Const MaxY := 7
	Const G_CircleSize = 25
	Const G_CircleGap = G_CircleSize + 10
	Const G_Offset_X = G_CircleSize/2 + 40 
	Const G_Offset_Y = G_CircleSize/2 + 40 

	Field mx:Float								
	Field my:Float	
	Field streams:asyncStream
	
	Global Board:Int[]

	
	'==========================================
	Method OnCreate ()
		ClearBoard ()
		streams = New asyncStream()
		SetUpdateRate 60
	End 'OnCreate
	
	
	
	
	'==========================================	
	Method OnUpdate ()
		mx = MouseX ()	
	  	my = MouseY ()	
	
		If MouseDown()
			'Print "click"
			checkPlayerClick(mx,my)
		Endif 
		checkEnemyMoves()
	End 'OnUpdate



	'==========================================
	Method OnRender ()
		Cls 32, 64, 128
		showBoard ()
	End 'OnRender



	'==========================================
	Method ClearBoard ()
		Board = Board.Resize(MaxX*MaxX)
		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				Board[get_Board_Loc(x,y)] = 0
			Next
		Next
	End
	
	
	
	'==========================================
	Method showBoard ()
		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				setPlayerColor(Board[get_Board_Loc(x,y)])
				DrawCircle G_Offset_X+(x*(G_CircleSize+G_CircleGap)),G_Offset_Y+(y*(G_CircleSize+G_CircleGap)),G_CircleSize
			Next
		Next
		DrawText "Players online: " + streams.rbeGetNumOfAllPlayers(), G_Offset_X , 460
	End
	
	
	'==========================================
	Method get_Board_Loc(x,y)
		Return (x*MaxX)+y
	End


	'==========================================
	Method setPlayerColor(player)
		Local R:Int[] = [255,050,050,150,200,250,050]
		Local G:Int[] = [255,250,100,050,100,250,050]
		Local B:Int[] = [255,050,100,150,050,000,255]
		SetColor R[player],G[player],B[player]
		
	End


	'==========================================
	Method checkPlayerClick(mx,my)

		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				setPlayerColor(Board[get_Board_Loc(x,y)])
				Local leftborder  = G_Offset_X+(x*(G_CircleSize+G_CircleGap))-G_CircleSize
				Local rightborder = G_Offset_X+(x*(G_CircleSize+G_CircleGap))+G_CircleSize
				Local upperborder = G_Offset_Y+(y*(G_CircleSize+G_CircleGap))-G_CircleSize
				Local lowerborder = G_Offset_Y+(y*(G_CircleSize+G_CircleGap))+G_CircleSize
				If (mx >= leftborder) And (mx <= rightborder) And (my >= upperborder) And (my <= lowerborder)
					If (Board[get_Board_Loc(x,y)] = 0)
						Board[get_Board_Loc(x,y)] = streams.rbeGetMayPlayerNum()	
						streams.rbeSendSockMsg(x,y)
					Endif
				Endif
			Next
		Next
	End

	'==========================================
	Method checkEnemyMoves()
		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				Local result = streams.rbeCheckenemyMove(x,y)
				If (result <> 0)
					Board[get_Board_Loc(x,y)] = result
				Endif
			Next
		Next
	End





End ' Class FourGame




Function Main ()
	New FourGame								
End
