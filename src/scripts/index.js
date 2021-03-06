import * as P5 from 'p5'
	/* Variables */
	const customWidth = 1920, customHeight = 1080, playerXvelocity =  0, playerYvelocity = 0, playerXpos = customWidth/2
  	const playerYpos = customHeight/2, const imageAnimationNumberLeft = 0, const imageAnimationNumberRight = 0
	const imageAnimationNumberIntLeft = 0, imageAnimationNumberIntRight = 0

let draw = (p5) => {
  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.frameRate(60);
  };
	// Importing the images
  	const playerFrame00Right = p5.loadImage('https://i.ibb.co/JyXQTwk/player-Frame00.png');
	const playerFrame01Right = p5.loadImage('https://i.ibb.co/m5Hkkw4/player-Frame01.png');
	const playerFrame02Right = p5.loadImage('https://i.ibb.co/kHwpjRj/player-Frame02.png');
	const playerFrame03Right = p5.loadImage('https://i.ibb.co/dmQJLyt/player-Frame03.png');
	const playerFrame00Left = p5.loadImage('https://i.ibb.co/nQcCc5v/player-Frame00-Left.png');
	const playerFrame01Left = p5.loadImage('https://i.ibb.co/qjKqC4n/player-Frame01-Left.png');
	const playerFrame02Left = p5.loadImage('https://i.ibb.co/Kct3PfR/player-Frame02-Left.png');
	const playerFrame03Left = p5.loadImage('https://i.ibb.co/bPW68H3/player-Frame03-Left.png');
	const playerAnimationArrayRight = [playerFrame00Right, playerFrame01Right, playerFrame02Right, playerFrame03Right];
	const playerAnimationArrayLeft = [playerFrame00Left, playerFrame01Left, playerFrame02Left, playerFrame03Left];
	const gameBackground = p5.loadImage('https://i.ibb.co/8jJ3ps2/background.png');

  p5.draw = () => {

// Moving the origin coordinates so that the player will move relative to the world
p5.translate(-playerXpos + innerWidth/2, -playerYpos + innerHeight/2)

// X coordinates of the background images
const xPosBackgroundSceneArray = [-1920, 0, 1920]

// Draw the background as the player is moving
if (playerYpos > customHeight/2)
{
	p5.background(81, 145, 160);
}
if (playerYpos < customHeight/2)
{
	p5.background(75, 222, 232);
}
for (let i = 1; 1920*i < playerXpos; i++) {
	xPosBackgroundSceneArray = [(i-1)*1920];
	xPosBackgroundSceneArray.push(i*1920);
	xPosBackgroundSceneArray.push((i+1)*1920);
};
for (let i = 1; -500*i > playerXpos; i++) {
	xPosBackgroundSceneArray = [(i+1)*1920];
	xPosBackgroundSceneArray.push(i*1920);
	xPosBackgroundSceneArray.push((i-1)*1920);
};
for (let i = 0; i < xPosBackgroundSceneArray.length; i++) {
p5.image(gameBackground, xPosBackgroundSceneArray[i], 0);
}

// Key logic
	const keyReceptor = function(event) {
	const keyState = (event.type === 'keydown')?true:false;
	if (keyState == true) {
	// W key logic
		if (event.keyCode === 87 && playerYvelocity >= -5 && playerYvelocity <= 5) {
			playerYvelocity -= 0.1;
			playerJumps = true;
			playerIsRight = false;
			playerIsLeft = false;
			keyState == false;
		}
		
		if (playerYvelocity < -5) {
			playerYvelocity = -5;
		}

		if (playerYvelocity > 5) {
			playerYvelocity = 5;
		}

	// A key logic
		if (event.keyCode === 65 && playerXvelocity >= -5) {
			playerXvelocity -= 0.1;
			playerIsLeft = true;
			playerIsRight = false;
			playerJumps = false;
			keyState == false;
		}
	// D key logic
		if (event.keyCode === 68 && playerXvelocity <= 5) {
			playerXvelocity += 0.1;
			playerIsRight = true;
			playerIsLeft = false;
			playerJumps = false;
			keyState = false;
		}
}
	};
	// Velocity
	playerXpos += playerXvelocity;
	playerYpos += playerYvelocity;

	// Gravity
	playerYvelocity += 0.1;

	// Teleport player to the top if he falls
	if (playerYpos > customHeight * 2) {
	playerYpos = -customHeight/4;
	playerYvelocity = 0;
	}

	// Friction
	playerXvelocity *= 0.9999;
	playerYvelocity *= 0.9999;

// Animation
imageAnimationNumberLeft += 0.5;
if (imageAnimationNumberLeft > 3) {
  imageAnimationNumberLeft = 0;
};

imageAnimationNumberIntLeft = Math.round(imageAnimationNumberLeft);
imageAnimationNumberRight += 0.5;

if (imageAnimationNumberRight > 3) {
  imageAnimationNumberRight = 0;
};
	  
imageAnimationNumberIntRight = Math.round(imageAnimationNumberRight);
	  
if (playerYvelocity < 0 && playerXvelocity == 0) {
	p5.image(playerAnimationArrayRight[imageAnimationNumberIntRight], playerXpos, playerYpos, 717/15, 610/15);
};
if (playerYvelocity > 0 && playerXvelocity == 0) {
	p5.image(playerAnimationArrayRight[3], playerXpos, playerYpos, 717/15, 610/15);
};
if (playerYvelocity > 0 && playerXvelocity > 0) {
	p5.image(playerAnimationArrayRight[0], playerXpos, playerYpos, 717/15, 610/15);
};
if (playerYvelocity > 0 && playerXvelocity < 0) {
	p5.image(playerAnimationArrayLeft[0], playerXpos, playerYpos, 717/15, 610/15);
};
if (playerYvelocity < 0 && playerXvelocity < 0) {
	p5.image(playerAnimationArrayLeft[imageAnimationNumberIntLeft], playerXpos, playerYpos, 717/15, 610/15);
};
if (playerYvelocity < 0 && playerXvelocity > 0) {
	p5.image(playerAnimationArrayRight[imageAnimationNumberIntRight], playerXpos, playerYpos, 717/15, 610/15);

};

// Detect key release
	window.addEventListener('keydown', keyReceptor);
	window.addEventListener('keyup', keyReceptor);
  };
};

new P5(draw);
