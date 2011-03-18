
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
	Global PieceRot:Int[]
	
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
	Field anim_StartDelta:Int = 10
	Field anim_Ddelta:Int = 10
	Field anim_CurrentDelta:Int = 1

	Field board_image:Image
	Field player_image:Image[]
	Field bg_image:Image
	Field youwin_image:Image
	Field youlose_image:Image

	Field mou_x:Int								' Player x-position
	Field mou_y:Int								' Player y-position
	Field mousediv:Int = 16	
	Field mou_rotate = 0
	
	Field wonlost = 0
	Field Startdelay_Value = 50
	Field Startdelay_active = 1
	Field Startdelay_counter = 50
	
	
	'==========================================
	'==========================================
	Method OnCreate ()
		ClearBoard ()
		streams = New asyncStream()
		
		player_image = player_image.Resize(3)
		
		bg_image = LoadImage ("bg_kies2.jpg", 1, Image.MidHandle)
		board_image = LoadImage ("fourgame_board2.png", 1, Image.MidHandle)
		player_image[1] = LoadImage ("murmel1.png", 1, Image.MidHandle)
		player_image[2] = LoadImage ("murmel2.png", 1, Image.MidHandle)
		youwin_image = LoadImage ("youwin.jpg", 1, Image.MidHandle)
		youlose_image = LoadImage ("youlose.jpg", 1, Image.MidHandle)

		Startdelay_counter = Startdelay_Value
		
		SetUpdateRate 30
			
	End 'OnCreate
	'==========================================
	'==========================================

	
	
	'==========================================
	'==========================================	
	Method OnUpdate ()
	
		If Startdelay_active <> 0
			
			Startdelay_counter = Startdelay_counter - 1
			If Startdelay_counter <= 0
				Startdelay_active = 0
			Endif
			
		Else
	
			mx = MouseX ()	
		  	my = MouseY ()	
	
			If TouchHit()
			
				mx = TouchX()
				my = TouchY()
			
			Endif
	
		
			mou_rotate = mou_rotate + 1
			If mou_rotate >= 360
				mou_rotate = 0
			Endif
		
			thisplayer = streams.rbeGetMayPlayerNum()
	
			If wonlost = 0
	
				If MouseDown() Or TouchHit()
					four_move_me( getBoardColumnByMouse(mx,my) )
				Endif 
				four_move_enemy()
				MovePlayer mx, my	
			
			Else
				If MouseDown() Or TouchHit()
					ClearBoard ()
					lastMove = -1
					wonlost = 0
					streams = New asyncStream()
					Startdelay_active = 1
					Startdelay_counter = Startdelay_Value
	
				Endif		
			Endif
		Endif
			
	End 'OnUpdate
	'==========================================
	'==========================================



	'==========================================
	'==========================================
	Method OnRender ()
	
		Cls 255, 255, 255
		DrawImage bg_image, 320, 240, 0, 1, 1
		Animate()
		showBoard ()
		If lastMove <> thisplayer And thisplayer <> 0
			DrawImage player_image[2-(thisplayer Mod 2)], mou_x, mou_y, mou_rotate, 1, 1
		Endif

		If wonlost <> 0
		
			If wonlost = -1
				DrawImage youlose_image, 320, 240, mou_rotate, 1, 1
			Else
				DrawImage youwin_image, 320, 240, mou_rotate, 1, 1
			Endif
		
		Endif
		

		
	End 'OnRender
	'==========================================
	'==========================================





	'==========================================
	Method ClearBoard ()
		Board = Board.Resize(MaxX*MaxX)
		PieceRot = PieceRot.Resize(MaxX*MaxX)

		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				set_Board(x,y,0,0)
			Next
		Next
	End
	
	
	
	'==========================================
	Method showBoard ()
	
		DrawImage board_image, 320, 240, 0, 1, 1

		For Local x=0 To MaxX-1
			For Local y=0 To MaxY-1
				put_piece(x,y,get_Board(x,y),get_Rot(x,y))
			Next
		Next
		DrawText "_Players online: " + streams.rbeGetNumOfAllPlayers()+" "+streams.get_rbe_selected_transport, G_Offset_X , 460
		DrawText "Player "+streams.rbeGetMayPlayerNum(), 530, 20

		If lastMove = thisplayer
			DrawText "Please wait " , 530, 40
		Else
			DrawText "Your turn", 530, 40
		Endif
		
	End
	
	
	'==========================================
	Method get_Board_Loc(x,y)
		Return (x*MaxX)+y
	End


	'==========================================
	Method set_Board(x,y,p,rot)
		Board[get_Board_Loc(x,y)] = p
		PieceRot[get_Board_Loc(x,y)] = rot
	End


	'==========================================
	Method get_Board(x,y)
		Return Board[get_Board_Loc(x,y)]
	End
	
	
	'==========================================
	Method get_Rot(x,y)
		Return PieceRot[get_Board_Loc(x,y)]
	End


	'==========================================
	Method put_piece(x,y,p,rot)
		
		Local gx = G_Offset_X+(x*(G_CircleSize+G_CircleGap))
		Local gy = G_Offset_Y+(y*(G_CircleSize+G_CircleGap))
		draw_piece(gx,gy,p,rot)

	End


	'==========================================
	Method draw_piece(gx,gy,p,rot)
		
		If p = 0
			'setPlayerColor(p)
			'DrawCircle gx,gy,G_CircleSize
		Else
  			DrawImage player_image[2-(p Mod 2)], gx, gy, rot, 1, 1
		Endif
	End


	'==========================================
	Method setPlayerColor(player)
		Local R:Int[] = [255,050,050,150,200,250,050]
		Local G:Int[] = [255,250,100,050,100,250,050]
		Local B:Int[] = [255,050,100,150,050,000,255]
   		SetColor R[player],G[player],B[player]
		
	End


	'==========================================
	Method checkPlayerClick(mx,my)  ' OBSOLETE!!!!

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
						startAnimation(x, 0, y, result)
						lastMove = result
						'Print thisplayer+" "+x+" "+y+" "+result 
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
				anim_CurrentY = anim_CurrentY + anim_CurrentDelta
				anim_CurrentDelta = anim_CurrentDelta + anim_Ddelta
				draw_piece(anim_CurrentX,anim_CurrentY,anim_player,mou_rotate)
			Else
				anim_Running = 0
				set_Board(anim_column,anim_row,anim_player,mou_rotate)
				
				Local winner = CheckIfWon (anim_column,anim_row)
				
				If  winner <> 0
				
					If winner = thisplayer
						wonlost = 1
					Else
						wonlost = -1
					Endif
				
					'Print "Spieler "+winner+" hat gewonnen!!"
				Endif
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
		anim_CurrentDelta = anim_StartDelta
		anim_Ddelta = 1
	End


	'==========================================
	Method MovePlayer (towardsx:Int, towardsy:Int)
		Local xdist = towardsx - mou_x			' Distance from mouse position to current player position
		Local ydist = towardsy - mou_y			' Ditto
		Local xstep = xdist / mousediv		' Distance divided by value in mousediv field
		Local ystep = ydist / mousediv		' Ditto
		
		mou_x = mou_x + xstep						' Move player by this distance
		mou_y = mou_y + ystep						' Ditto
	
		If mou_y > G_CircleGap
			mou_y = G_CircleGap
		Endif
		
		If mou_x < G_Offset_X
			mou_x = G_Offset_X
		Endif

		If mou_x > G_Offset_X+((MaxX-1)*(G_CircleSize+G_CircleGap))
			mou_x = G_Offset_X+((MaxX-1)*(G_CircleSize+G_CircleGap))
		Endif
		
	End
	


	'==========================================
	Method CheckIfWon (x,y)
	
		Local p = get_Board(x,y)
		Local i = x
		Local count = 0
		
		'----------------------------------
		' waagerecht
		'----------------------------------
		'finde linke Grenze
		While i >= 0 And get_Board(i,y) = p
			i = i-1
		Wend
		i = i+1
		'jetzt zählen
   		While i < MaxX And get_Board(i,y) = p
			i = i + 1
			count = count + 1
		Wend 
		If count >= 4
			Return p
		Endif
		
		'----------------------------------
		' senkrecht
		'----------------------------------
		 i = y
		 count = 0

		'finde obere Grenze
		While i >= 0 And get_Board(x,i) = p
			i = i-1
		Wend
		i = i+1
		'jetzt zählen
   		While i < MaxY And get_Board(x,i) = p
			i = i + 1
			count = count + 1
		Wend 
		If count >= 4
			Return p
		Endif

		'----------------------------------
		' diagonal 1
		'----------------------------------
		 Local ix = x
		 Local iy = y
		 count = 0

		'finde linke untere Grenze
		While ix >= 0 And iy >=0  And get_Board(ix,iy) = p
			ix = ix-1
			iy = iy-1
		Wend
		ix = ix+1
		iy = iy+1
		'jetzt zählen
   		While ix < MaxX And iy < MaxY And get_Board(ix,iy) = p
			ix = ix + 1
			iy = iy + 1
			count = count + 1
		Wend 
		If count >= 4
			Return p
		Endif

		'----------------------------------
		' diagonal 2
		'----------------------------------
		 ix = x
		 iy = y
		 count = 0

		'finde rechte untere Grenze
		While ix < MaxX And iy >=0  And get_Board(ix,iy) = p
			ix = ix+1
			iy = iy-1
		Wend
		ix = ix-1
		iy = iy+1
		'jetzt zählen
   		While ix >= 0 And iy < MaxY And get_Board(ix,iy) = p
			ix = ix - 1
			iy = iy + 1
			count = count + 1
		Wend 
		If count >= 4
			Return p
		Endif

		Return 0
		
	End


End ' Class FourGame




Function Main ()
	New FourGame								
End
