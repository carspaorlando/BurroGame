	var renderer;
	var renderer;
	var scene;
	var camera;
	var winner;
	var confetti;
	
	function init()
	{
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

		setupRenderer();
		addSpotLight();
		setupCamera();
		addTable();

		var ambientLight = new THREE.AmbientLight( 0xffffff );
		ambientLight.intensity = .1;
		scene.add( ambientLight );
		
		loadSounds();
		loadCards();
		makeCards();
		updateScore();
		printName();
		printGameName();
		confetti = new Confetti( scene );
		var position = new THREE.Vector3( -5, -45, 0 );
		confetti.start( position, 1000 );
		
		// Main code here.



		
		// Output to the stream
		document.body.appendChild( renderer.domElement );
		
		// Call render
		render();
	}
	
	function setupRenderer()
	{
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x000000, 1.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
	}
	
	function setupCamera()
	{
		camera.position.x = 0;
		camera.position.y = -150;
		camera.position.z = 250;
		camera.lookAt( scene.position );
	}

	var showTempCardMovement = false;
	var waiter = 0;
	function render()
	{
		
		if(getWinner() != 0){
			four.play();
			confetti.update();
		}
		
		if( Key.isDown(Key.D) && !dealt )
		{
			explode.play();
			resetPressed = false;
			three.play();
			deal2();
			
		}
		else if( Key.isDown(Key.S) && dealt && (scoreValue == getCurrentValue()) )//testing if grabbing worksd
		{
			five.play();
			grab();
			
		}
		else if( (Key.isDown(Key.W)&& waiter > 10) && dealt)
		{
			resetPressed = false;
			waiter = 0;
			scoreValue == scoreValue++;
			updateScore();
			one.play();
			place();
			if(getWinner() != 0){
			printWinner();
			confetti.update();
		}
			
		}
		else if( Key.isDown(Key.L) && dealt && (scoreValue == getCurrentValue()) )//testing if grabbing worksd
		{
			five.play();
			grab2();
		}
		else if( Key.isDown(Key.O)&& waiter > 10)
		{
			resetPressed = false;
			waiter = 0;
			scoreValue == scoreValue++;
			updateScore();
			two.play();
			place2();
			if(getWinner() != 0){
			printWinner();
			confetti.update();
		}
			
		}
		else if( Key.isDown(Key.R))
		{
			resetPressed = true;
			waiter = 0;
			reset();
		}
		waiter++;
		
		if( showTempCardMovement )
		{
			for( var i=0; i<movers.length; i++ )
			{
				movers[i].rotation.x += 0.01;
				movers[i].rotation.y += 0.04;
				movers[i].rotation.z += 0.01;
			}
		}
	
		// Request animation frame
		requestAnimationFrame( render );
		
		// Call render()
		renderer.render( scene, camera );
	}
	
	function getRandomColor()
	{
		var r = Math.floor( Math.random() * 255 );
		var g = Math.floor( Math.random() * 255 );
		var b = Math.floor( Math.random() * 255 );
		var col = r * 65536 + g * 256 + b;
		return col;
	}
	
	function addSpotLight()
	{
        spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.shadowCameraNear = 10;
        spotLight.shadowCameraFar = 500;
        spotLight.castShadow = true;
        spotLight.position.set( 100, 0, 200 );
		spotLight.lookAt( scene.position );
        scene.add( spotLight );
	}

	var cardBackTexture;
	var cardFrontTextures = [];
	function loadCards()
	{
		cardBackTexture = THREE.ImageUtils.loadTexture('Cards/Sailboat.png');
		for( var i=0; i<52; i++ )
		{
			var tex = THREE.ImageUtils.loadTexture('Cards/Standard' + i + '.png');
			tex.name = 'Cards/Standard' + i + '.png';
			cardFrontTextures.push( tex );
		}
	}

	var movers = [];
	
	var cardShapes = [];
	function makeCards()
	{
		cardBackTexture = THREE.ImageUtils.loadTexture('Cards/Sailboat.png');
		
		for( var i=0; i<52; i++ )
		{
			var materials = [];
			materials.push(new THREE.MeshLambertMaterial({color:0x222222}));
			materials.push(new THREE.MeshLambertMaterial({color:0x222222}));
			materials.push(new THREE.MeshLambertMaterial({color:0x222222}));
			materials.push(new THREE.MeshLambertMaterial({color:0x222222}));
			materials.push(new THREE.MeshLambertMaterial({map: cardBackTexture, overdraw: true}));
			materials.push(new THREE.MeshLambertMaterial({map: cardFrontTextures[i], overdraw: true}));
			var shape = new THREE.Mesh( new THREE.BoxGeometry(20,30,.1), new THREE.MeshFaceMaterial(materials) );
			shape.name = cardFrontTextures[i].name;
			cardShapes.push(shape);
			
			if( i % 5 == 0 && showTempCardMovement )
			{
				shape.position.x = -5 + i * 2;
				shape.position.y = 5;//5 - i * .2;
				shape.position.z = 5;//5 - i * .2;
				movers.push( shape );
				scene.add( shape );
			}
		}
	}
	
	window.onload = init;

	var selectedCardBack = 2, selectedCardTheme = 0, selectThemeOrBack = 0, selectedValue = 0;
	var cardBackNames = ["Excalibur.png", "Cars.png", "Sailboat.png", "Plaid.png", "Star.png", "Underwater.png", "Tiger.png", "Vines.png"];
	var cardThemeNames = ["Standard37.png", "Antique37.png", "Elegant37.png", "Kids37.png", "LargeFace37.png", "Medieval37.png", "Squares37.png", "RedandBlack37.png" ];
	var cardThemeNames2 = ["Standard", "Antique", "Elegant", "Kids", "LargeFace", "Medieval", "Squares", "RedandBlack" ];
	
	function changeBack()
	{
		cardBackTexture = THREE.ImageUtils.loadTexture('Cards/' + cardBackNames[selectedCardBack] );
		for( var i=0; i<cardShapes.length; i++ )
		{
			cardShapes[i].material.materials[4].map = cardBackTexture;
			cardShapes[i].material.materials[4].map.needsUpdate = true;
		}
	}
	
	function changeTheme()
	{
		cardFrontTextures = [];
		for( var i=0; i<52; i++ )
		{
			var tex = THREE.ImageUtils.loadTexture('Cards/' + cardThemeNames2[selectedCardTheme] + i + '.png');
			cardShapes[i].material.materials[5].map = tex;
			cardShapes[i].material.materials[5].map.needsUpdate = true;
			cardFrontTextures.push( tex );
		}
	}

	var explode, one, two, three, four, five;
	function loadSounds()
	{
		explode = new Audio("sounds/Explosion.mp3");
		one = new Audio("sounds/1.mp3");
		two = new Audio("sounds/2.mp3");
		three = new Audio("sounds/3.mp3");
		four = new Audio("sounds/4.mp3");
		five = new Audio("sounds/5.mp3");
	}

	var tablePlane;
	function addTable()
	{
		var texture = THREE.ImageUtils.loadTexture('Cards/GreenFelt3.jpg');
		var planeMaterial = new THREE.MeshLambertMaterial({map:texture});
		var planeGeometry = new THREE.PlaneGeometry( 180, 180, 4 );
		plane = new THREE.Mesh( planeGeometry, planeMaterial );
		plane.name = "PlayingTable";
		scene.add( plane );
	}
	var winnerObject = null;
	var gameNameObject = null;
	var nameIdObject = null;
	var scoreObject = null;
	var scoreValue = 0;
	function updateScore()
	{
		if( scoreObject != null )
		{
			scene.remove( scoreObject );
		}
		
		if(scoreValue == 14)
			scoreValue = 1;
	switch(scoreValue){
		case 1:
			var scoreString = "TARGET  " + "[A]";
			break;
		case 11:
			var scoreString = "TARGET  " + "[J]";
			break;
		case 12:
			var scoreString = "TARGET  " + "[Q]";
			break;
		case 13:
			var scoreString = "TARGET  " + "[K]";
			break;
		default:	
			var scoreString = "TARGET  " + "[" + scoreValue + "]";
		}
			
			
		
		var scoreObjectGeometry = new THREE.TextGeometry( scoreString,
		{
			size: 13,
			height: 3,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var scoreObjectMaterial = new THREE.MeshLambertMaterial({color:0x9999FF});
		
		scoreObject = new THREE.Mesh( scoreObjectGeometry, scoreObjectMaterial );
		scoreObject.position.x = -200;
		scoreObject.position.y = 0;
		scoreObject.position.z = 0	;
		scoreObject.rotation.x =0;//  Math.PI / 2;
		scoreObject.rotation.y = 0;//- Math.PI / 2;
		
		scene.add( scoreObject );
	}
	
	function printName()
	{
		if( nameIdObject != null )
		{
			scene.remove( nameIdObject );
		}
		
		var nameString = "By: Jose Ghersy" ;
		
		var nameIdObjectGeometry = new THREE.TextGeometry( nameString,
		{
			size: 5,
			height: 1,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var nameIdObjectMaterial = new THREE.MeshLambertMaterial({color:0x9999FF});
		
		nameIdObject = new THREE.Mesh( nameIdObjectGeometry, nameIdObjectMaterial );
		nameIdObject.position.x = 120;
		nameIdObject.position.y = -100;
		nameIdObject.position.z = 0;
		nameIdObject.rotation.x = 0;// Math.PI / 2;
		nameIdObject.rotation.y = 0;//- Math.PI / 2;
		
		scene.add( nameIdObject );
	}
	function printGameName()
	{
		if( gameNameObject != null )
		{
			scene.remove( gameNameObject );
		}
		
		var gameNameString = "BURRO" ;
		
		var gameNameObjectGeometry = new THREE.TextGeometry( gameNameString,
		{
			size: 30,
			height: 1,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var gameNameObjectMaterial = new THREE.MeshLambertMaterial({color:0x9999FF});
		
		gameNameObject = new THREE.Mesh( gameNameObjectGeometry, gameNameObjectMaterial );
		gameNameObject.position.x = -68;
		gameNameObject.position.y = 150;
		gameNameObject.position.z = 0;
		gameNameObject.rotation.x = 0;// Math.PI / 2;
		gameNameObject.rotation.y = 0;//- Math.PI / 2;
		
		scene.add( gameNameObject );
	}
	
	function printWinner()
	{
		if( winnerObject != null )
		{
			scene.remove( winnerObject );
		}
		
		var winnerString = "Player" + getWinner() +" Wins" ;
		
		var winnerObjectGeometry = new THREE.TextGeometry( winnerString,
		{
			size: 25,
			height: 1,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var winnerObjectMaterial = new THREE.MeshLambertMaterial({color:0xd62727});
		
		winnerObject = new THREE.Mesh( winnerObjectGeometry, winnerObjectMaterial );
		winnerObject.position.x = 0;
		winnerObject.position.y = -30;
		winnerObject.position.z = 0;
		winnerObject.rotation.x = 0;// Math.PI / 2;
		winnerObject.rotation.y = 0;//- Math.PI / 2;
		
		scene.add( winnerObject );
	}
	
		function Confetti( container )
	{
		var confettiObjects	= [];
		var pos;
		var pieces;
		
		this.emit = function( position )
		{
			// init sprite material
			var geometry = new THREE.PlaneGeometry( 1, 1 );
			var material = new THREE.MeshLambertMaterial({
				color	: new THREE.Color().setHSL(Math.random(), 1, 0.5),
				side	: THREE.DoubleSide
			});
			
			var object3d = new THREE.Mesh( geometry, material );
			object3d.position.copy( pos );
			object3d.position.x	+= ( Math.random() - 0.5 ) * 30;
			object3d.position.y	+= ( Math.random() - 0.5 ) * 10;
			object3d.position.z	+= ( Math.random() - 0.5 ) * 10;

			scene.add( object3d );
			
			return( object3d );
		}
			
		this.update	= function()
		{
			var deleteme = [];
			
			for( var i=confettiObjects.length-1; i>=0; i-- )
			{
				confettiObjects[i].position.x += ( Math.random() - 0.5 ) * 15;
				confettiObjects[i].position.y += Math.random() * 8;
				confettiObjects[i].position.z += ( Math.random() - 0.5 ) * 4;
				
				if( confettiObjects[i].position.y > 100 )
				{
					confettiObjects[i].position.copy( pos );
				}
			}

		}
		
		this.start = function( position, numpieces )
		{
			pos = position;
			pieces = numpieces;
			for( var i=0; i<pieces; i++ )
			{
				confettiObjects.push( this.emit( position ) );
			}
		}
		
	}