
Import mojo
Import moofoo.stream


Class FourGame Extends App

	Const MaxX := 7
	Const MaxY := 6
	Const G_CircleSize = 30
	Const G_CircleGap = G_CircleSize + 10
	Const G_Offset_X = G_CircleSize/2 + 40 
	Const G_Offset_Y = G_CircleSize/2 + 40 

	Field mx:Float								
	Field my:Float	
	Field streams:asyncStream
	
	Field lastMove:Int = -1
	Field thisplayer:Int = -1
	
	Global Board:Int[]
	
	Field lastEnemyX:Int = -1
	Field lastEnemyY:Int = -1
	
	
	Field anim_column:Int
	Field anim_row:Int
	Field anim_startY: Int
	Field anim_endY:Int
	Field anim_Running:Int = 0
	Field anim_CurrentY:Int = 0
	Field anim_CurrentX:Int = 0
	Field anim_player:Int = 0


	
	'==========================================
	'==========================================
	Method OnCreate ()
		ClearBoard ()
		streams = New asyncStream()
		SetUpdateRate 60
		
		
	

		
				
	End 'OnCreate
	'==========================================
	'==========================================

	
	
	'==========================================
	'==========================================	
	Method OnUpdate ()
		mx = MouseX ()	
	  	my = MouseY ()	
	
	
			thisplayer= streams.rbeGetMayPlayerNum()

	
		If MouseDown()
		
			'checkPlayerClick(mx,my)
			four_move_me( getBoardColumnByMouse(mx,my) )
			

		Endif 
		
		'checkEnemyMoves()
		four_move_enemy()
		
			
		
		
	End 'OnUpdate
	'==========================================
	'==========================================



	'==========================================
	'==========================================
	Method OnRender ()
	
		Cls 32, 64, 128
		
		showBoard ()
		
		Animate()
	

		
	End 'OnRender
	'==========================================
	'==========================================





	'==========================================
	Method ClearBoard ()
		Board = Board.Resize(MaxX*MaxX)
		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				set_Board(x,y,0)
			Next
		Next
	End
	
	
	
	'==========================================
	Method showBoard ()
		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
			
				put_piece(x,y,get_Board(x,y))
			
				'setPlayerColor(get_Board(x,y))
				'DrawCircle G_Offset_X+(x*(G_CircleSize+G_CircleGap)),G_Offset_Y+(y*(G_CircleSize+G_CircleGap)),G_CircleSize
			Next
		Next
		DrawText "Players online: " + streams.rbeGetNumOfAllPlayers(), G_Offset_X , 460
		
		If lastMove = thisplayer
		
			DrawText streams.rbeGetMayPlayerNum()+ " Please wait " +lastMove , 530, 20
			
		Else
		
			DrawText streams.rbeGetMayPlayerNum()+ "Your turn "+lastMove, 530, 20

		Endif
		
	End
	
	
	'==========================================
	Method get_Board_Loc(x,y)
		Return (x*MaxX)+y
	End


	'==========================================
	Method set_Board(x,y,p)
		Board[get_Board_Loc(x,y)] = p
	End

	'==========================================
	Method get_Board(x,y)
		Return Board[get_Board_Loc(x,y)]
	End


	'==========================================
	Method put_piece(x,y,p)
		
		Local gx = G_Offset_X+(x*(G_CircleSize+G_CircleGap))
		Local gy = G_Offset_Y+(y*(G_CircleSize+G_CircleGap))
		draw_piece(gx,gy,p)

	End


	'==========================================
	Method draw_piece(gx,gy,p)
		setPlayerColor(p)
		DrawCircle gx,gy,G_CircleSize

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
					If (get_Board(x,y) = 0)
						set_Board(x,y,streams.rbeGetMayPlayerNum())	
						streams.rbeSendSockMsg(x,y)
					Endif
				Endif
			Next
		Next
	End
	
	'==========================================
	Method four_move_me(x)
	
		Local iy:Int = MaxY-1
		Local yRes:Int = -1
		
		
		If lastMove <> thisplayer
		
			While iy > -1
				If get_Board (x,iy) = 0
				
					yRes = iy
					iy = -1 'end loop	
				Endif 
				iy = iy-1
			Wend
			
			'move possible?
			If yRes <> -1
			
				streams.rbeSendSockMsg(x,yRes)
				startAnimation(x, 0, yRes, thisplayer)

				'set_Board(x,yRes,thisplayer)
				lastMove = thisplayer	
				
				
			Endif
		
		Endif
		
	End
	
	
	

	
	
	

	'==========================================
	'Method checkEnemyMoves()
	Method four_move_enemy()

		

			For Local x=0 To MaxX-1
				For Local y=0 To MaxY-1
					Local result = streams.rbeCheckenemyMove(x,y)
					If result <> 0 And result <> thisplayer
					
						If lastEnemyX <> x Or lastEnemyY <>y
					
							'set_Board(x,y,result)
							startAnimation(x, 0, y, result)
							
							lastMove = result
							
							Print thisplayer+" "+x+" "+y+" "+result 
							
							lastEnemyX = x
							lastEnemyY = y
						Endif
						
					Endif
				Next
			Next
	
		
	
	End






	'==========================================
	Method getBoardColumnByMouse(mx,my)

		For Local x=0 To MaxX-1
			Local leftborder  = G_Offset_X+(x*(G_CircleSize+G_CircleGap))-G_CircleSize
			Local rightborder = G_Offset_X+(x*(G_CircleSize+G_CircleGap))+G_CircleSize
				
			If (mx >= leftborder) And (mx <= rightborder) 
				
					Return x
				
			Endif
		
		Next
	End




	'==========================================
	Method Animate()

	
	
		If anim_Running <> 0
		
			If anim_CurrentY < anim_endY
			
				anim_CurrentY = anim_CurrentY + 10
				
				draw_piece(anim_CurrentX,anim_CurrentY,anim_player)
				
				'Print anim_CurrentY 
				

			Else
			
				anim_Running = 0
				set_Board(anim_column,anim_row,anim_player)

			
			Endif
			
		Endif
		
	End


	'==========================================
	Method startAnimation(column, startRow, endRow, player)

		anim_column   = column
		anim_row   = endRow
		anim_startY = 0 'G_Offset_Y+(startRow*(G_CircleSize+G_CircleGap))
		anim_endY = G_Offset_Y+(endRow*(G_CircleSize+G_CircleGap))
		anim_Running = 1
		anim_CurrentY = anim_startY
		anim_CurrentX = G_Offset_X+(column*(G_CircleSize+G_CircleGap))
		anim_player = player

	End








End ' Class FourGame




Function Main ()
	New FourGame								
End
