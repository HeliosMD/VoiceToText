
//Called when application is started. 
function OnStart() 
{ 
	//Create a layout with objects vertically centered. 
	lay = app.CreateLayout( "linear", "VCenter,FillXY" )  
	
	//Create an edit box. 
	edt = app.CreateTextEdit( "", 0.96, 0.8 ) 
	edt.SetBackColor( "#333333" )
	lay.AddChild( edt ) 
	
	//Create a horizontal layout for buttons. 
	layBut = app.CreateLayout("Linear", "Horizontal") 
	lay.AddChild( layBut ) 

	//Create an Load button. 
	btnLoad = app.CreateButton( "Load", 0.23, 0.1 ) 
	btnLoad.SetOnTouch( btnLoad_OnTouch ) 
	layBut.AddChild( btnLoad ) 
	
	//Create a button.
	btn = app.CreateButton( "Rec", 0.23, 0.1 )
	//btn.SetMargins( 0, 0.05, 0, 0 )
	btn.SetOnTouch( btn_OnTouch )
	lay.AddChild( btn )

	//Create an save button. 
	btnSave = app.CreateButton( "Save", 0.23, 0.1 ) 
	btnSave.SetOnTouch( btnSave_OnTouch ) 
	layBut.AddChild( btnSave ) 
	
	//Create a new button
	btnNew = app.CreateButton( "New" , 0.23, 0.1 )
	btnNew.SetOnTouch( btnNew_OnTouch )
	layBut.AddChild( btnNew )

	//Add layout to app.	 
	app.AddLayout( lay ) 
	
	//Create recognition object and set callbacks.
	speech = app.CreateSpeechRec()
	speech.SetOnReady( speech_OnReady )
	speech.SetOnResult( speech_OnResult )
	speech.SetOnError( speech_OnError )
} 

//Called when user touches Load button. 
function btnLoad_OnTouch() 
{ 
   var txt = app.ReadFile( "/sdcard/testfile.txt" )
   edt.SetText( txt )
} 

//Called when user touches save button. 
function btnSave_OnTouch() 
{ 
    var T="/sdcard/"+Date()+".txt"
    var txt = edt.GetText()
    //var datex = date()
	app.WriteFile( T, txt )
} 

//Called when user touches new button
function btnNew_OnTouch() 
{ 
    edt.SetText( "" )
} 

//Called when user touches our button.
function btn_OnTouch()
{
    //Start recognizing.
	speech.Recognize()
}

//Called when speech engine is ready.
function speech_OnReady()
{
    app.ShowPopup( "Listening...", "Short" )
}

//Called with the recognition result(s).
function speech_OnResult( results )
{
    //An array of recognition results is returned
    //here, with the most probable at the front
    //of the array.
    
    //Show the top result.
    //app.ShowPopup( results[0] )
    var txt = edt.GetText()
    var txt = txt +  results[0]
    edt.SetText( txt )
}

//Called if recognition fails.
function speech_OnError()
{
    app.ShowPopup( "Please speak more clearly!" )
}