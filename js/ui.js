	function setCardFileNames(names,selectIndex)
	{
		for( var i=1; i<=8; i++ )
		{
			var id = "csel" + i;
			var obj = document.getElementById( id );
			obj.src = "Cards/" + names[i-1];
			id = "sel" + i;
			obj = document.getElementById( id );
			obj.style.backgroundColor = ( selectIndex == i - 1 ) ? "magenta" : "transparent";
		}
	}
	
	function changeDialogDivVisibility(state)
	{
		var obj = document.getElementById( "selectCardBackDialog" );
		obj.style.visibility = state;
	}
	
	function showCardBackSelector()
	{
		selectThemeOrBack = 0;
		setCardFileNames(cardBackNames,selectedCardBack);
		changeDialogDivVisibility("visible");

	}

	function showCardThemeSelector()
	{
		selectThemeOrBack = 1;
		setCardFileNames(cardThemeNames,selectedCardTheme);
		changeDialogDivVisibility("visible");
	}
	
	function dlgOK()
	{
		changeDialogDivVisibility("hidden");
		if( selectThemeOrBack == 0 )
		{
			selectedCardBack = selectedValue;
			changeBack();
		}
		else
		{
			selectedCardTheme = selectedValue;
			changeTheme();
		}
	}
	
	function dlgCancel()
	{
		changeDialogDivVisibility("hidden");
	}

	function selectWhich(value)
	{
		selectedValue = value;
		for( var i=1; i<=8; i++ )
		{
			var id = "sel" + i;
			var obj = document.getElementById( id );
			obj.style.backgroundColor = ( selectedValue == i - 1 ) ? "magenta" : "transparent";
		}
	}
