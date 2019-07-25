var myhand = [];
var theMiddle = [];
var dealerhand = [];
var dealt = false;
var resetPressed = false;
var turn = 0;
var currentCard = 0;
var placeCounter = 0;
var looserFlag = 0;

var deck = [];
function shuffle()
{
	deck = [];
	var count = []; for( var i=0; i<52; i++ ) count.push( 0 );
			
	for( var i=0; i<52; i++ )
	{
		var card = 0;
		do
		{
			card = Math.floor( Math.random() * 52 );
		}
		while( count[card] > 0 );
		count[card]++;
		deck.push( card );
	}
			
}
		
function clearBoard()
{
	for( var i=0; i<52; i++ )
	{
		scene.remove( cardShapes[i] );
	}
}
		
function reset()
{
	dealt = false;
	turn = 0;
	clearBoard();
	myhand = [];
	dealerhand = [];
	looserFlag = 0;
	placeCounter = 0;
}

// Step 4
function deal()
{
	dealt = true;
	turn = 0;
	
	myhand = [];
	dealerhand = [];
	
	clearBoard();
	shuffle();
			
	for( var i=0; i<4; i++ )
	{
		var x = Math.floor( i % 2 ) * 20;
		var y = -35 + Math.floor( i / 2 ) * 70;
		var z = 3 + Math.floor( i % 2 ) * .01;
		
		var card = deck.pop();
		cardShapes[card].position.x = x;
		cardShapes[card].position.y = y;
		cardShapes[card].position.z = z;
		cardShapes[card].rotation.x = ( i != 3 ? Math.PI : 0 );//This is what makes the the cards visibles
		scene.add( cardShapes[card] );
				
		if( i == 0 || i == 1 ) myhand.push( card );
		else dealerhand.push( card );
	}

}
function deal2()
{
	dealt = true;
	turn = 0;
	
	myhand = [];
	dealerhand = [];
	
	clearBoard();
	shuffle();
			
	for( var i=0; i<52; i++ )
	{
		var x = -i*1/2;
		if(i%2==0)
		{
			var positioner = 2;
			var y = -10 + Math.floor( positioner / 2 ) * 70;
		}
		else
		{
			var positioner = 1;
			var y = -60 + Math.floor( positioner / 2 ) * 70;
		}
		var z = 3 + Math.floor( i % 2 ) * .01;
		
		var card = deck.pop();
		cardShapes[card].position.x = x;
		
		cardShapes[card].position.y = y;
		
		cardShapes[card].position.z = z;
		cardShapes[card].rotation.x = 0;//( i != 3 ? Math.PI : 0 );
		scene.add( cardShapes[card] );
				
		if( i%2 != 0  ) myhand.push( card );
		else dealerhand.push( card );
	}

}

function place()
{
	
	var length = 0;
	var card = 0;
	if( turn == 0 ) 
	{
		card = myhand.pop();
		theMiddle.push( card );
		length = myhand.length;
		if (length == 0)
			looserFlag = 2;
		turn = 1;
		
	}
/*	else
	{
		
		card = dealerhand.pop();
		theMiddle.push( card );
		length = dealerhand.length;
		turn = 0;
	}
*/
	var x = placeCounter/3;
	var y = turn+2;
	
	var z = placeCounter/3;
	
	placeCounter++;
	cardShapes[card].position.x = x;
	//cardShapes[card].rotation.z = Math.PI/4;
	cardShapes[card].position.y = y;
	cardShapes[card].position.z = z;
	cardShapes[card].rotation.x = Math.PI;
	if(card%13 == 12)
	{
		currentCard = 1;
	}
	else
	{
		currentCard = (card%13)+2;
	}
	scene.add( cardShapes[card] );
	
 
	
}

function place2()
{
	
	var length = 0;
	var card = 0;
	
	
	if(turn==1){
		card = dealerhand.pop();
		theMiddle.push( card );
		length = dealerhand.length;
		if (length == 0)
			looserFlag = 1;
		turn = 0;
	}

	var x = placeCounter/3;
	var y = turn+2;
	var z = placeCounter/3;
	
	placeCounter++;
	cardShapes[card].position.x = x;
	//cardShapes[card].rotation.z = Math.PI/4;
	cardShapes[card].position.y = y;
	cardShapes[card].position.z = z;
	cardShapes[card].rotation.x = Math.PI;
	if(card%13 == 12)
	{
		currentCard = 1;
	}
	else
	{
		currentCard = (card%13)+2;
	}
	scene.add( cardShapes[card] );
	
 
	
}
function getCurrentValue()
{	
	return (currentCard); 
}

function getWinner()
{	
	return (looserFlag); 
}


// Step 5
function grab(){
	
	//if(theMiddle.length > 0){
	for(var a = 0; a < theMiddle.length; a++){
		var card = theMiddle.pop();
			cardShapes[card].position.x = a;
			cardShapes[card].position.y = -60;
			cardShapes[card].position.z = 1;
			cardShapes[card].rotation.x = 0;
			myhand.push( card );
	}
	placeCounter = 0;
	/*for(var a = 0; a < theMiddle.length; a++){
			cardShapes[card].position.x = a;
			cardShapes[card].position.y = 60;
			cardShapes[card].position.z = 1;
			cardShapes[card].rotation.x = 0;
			dealerhand.push( card[a] );
	}
	*/
}
function grab2(){
	
	//if(theMiddle.length > 0){
	for(var a = 0; a < theMiddle.length; a++){
		var card = theMiddle.pop();
			cardShapes[card].position.x = a;
			cardShapes[card].position.y = 60;
			cardShapes[card].position.z = 1;
			cardShapes[card].rotation.x = 0;
			dealerhand.push( card );
	}
	placeCounter = 0;
	/*for(var a = 0; a < theMiddle.length; a++){
			cardShapes[card].position.x = a;
			cardShapes[card].position.y = 60;
			cardShapes[card].position.z = 1;
			cardShapes[card].rotation.x = 0;
			dealerhand.push( card[a] );
	}
	*/
}

function hit()
{
	var card = deck.pop();
	var length = 0;
	
	if( turn == 0 ) 
	{
		myhand.push( card );
		length = myhand.length;
	}
	else
	{
		dealerhand.push( card );
		length = dealerhand.length;
	}

	var x = ( length - 1 ) * 20;
	var y = -35 + turn * 70;
	var z = 3 + length * .1;

	cardShapes[card].position.x = x;
	cardShapes[card].position.y = y;
	cardShapes[card].position.z = z;
	cardShapes[card].rotation.x = Math.PI;
	scene.add( cardShapes[card] );
	
	if( turn == 0 && GetHandScore( myhand ) > 21 ) stand();
	
}



// Step 6
function stand()
{
	turn = 1;
	for( var i=0; i<52; i++ )
	{
		cardShapes[i].rotation.x = Math.PI;
	}

	while( GetHandScore( dealerhand ) <= 16 )
	{
		hit();
	}
}

function GetHandScore(CardList)
{
	var nAceCount = 0;
	var nCurrentScore = 0;
		
	for( var i=0; i<CardList.length; i++ )
	{
		var nRank = CardList[i] % 13;
		if( nRank <= 7 )
		{
			nCurrentScore += ( nRank + 2 );
		}
		else if( nRank == 12 )
		{
			nCurrentScore += 11;
			nAceCount++;
		}
		else
		{
			nCurrentScore += 10;
		}
	}
		
	while( nCurrentScore > 21 &&
		nAceCount > 0 )
	{
		nCurrentScore -= 10;
		nAceCount--;
	}
		
	return( nCurrentScore );
}
