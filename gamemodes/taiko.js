//purely functional, lerps a raw number to a display number.
//i wrote this while on a lot of adderall sorry lol
function lerpN(_t, _d) {
	return (_t > _d) ? _d + constrain((_t - _d) / 50, 0.01, Infinity) : (_t < _d) ? _d - constrain((_d - _t) / 50, 0.01, Infinity) : _d;
}
function letterGrade(inputPercent){
	switch(Math.ceil(inputPercent * 10) / 10){
		case 1:
			return 'A';
			break;
		case 0.9: 
			return 'B';
			break;
		case 0.8:
			return 'C';
			break;
		case 0.7:
			return 'D';
			break;
		default:
			return 'F';
	}
}
function isUpperCase(inputLetter){
	return inputLetter == (inputLetter + "").toUpperCase();
}
function isSpecialKey(inputLetter){
	return taiko.special.includes(inputLetter);
}
//Main note class
class taikoNote {
	constructor(setKey, approachRate, timeAt, ind, taiko) {
		this.key = setKey;
		this.aR = approachRate;
		this.x = 850;
		this.time = timeAt;
		this.live = true;
		this.ind = ind;
		this.deathOpacity = 100;
		//(if split is off, all one row!)
		if ( isUpperCase(this.key) && user.mods.split ) {
			if ( isSpecialKey(this.key) ) {
				this.y = 125 + 250;
			} else {
				this.y = 125 + 125;
			};
		} else {
			this.y = 125;
		};
	};
	update() {
		if(!this.live){
			this.x -= 1;
			this.deathOpacity -= 5;
			fill(255, 255, 255, 65 * (this.deathOpacity / 100));
			stroke(0,0,0,255 * (this.deathOpacity / 100));
			strokeWeight(4);
			circle(this.x, this.y, 50, 50);
			
			fill(0, 0, 0, 205  * (this.deathOpacity / 100));
			noStroke();
			textAlign(CENTER);
			textSize(25);
			text(this.key, this.x, this.y + 5);
			if(this.deathOpacity < 0){
				taiko.notes[this.ind] = 0;
			}
			return;
		}
		
		//Update position (relative to time)
		this.x = (this.time - taiko.time.set) * (this.aR / 15);
		//If not on screen, ignore render
		if (this.x > 830) {
			return;
		}
		//Check if offscreen (miss)
		if (this.x < -25) {
			taiko.player.combo = 0;
			taiko.player.score.raw -= 50;
			taiko.player.popup = { text: "Drop", opacity: 255 };
			taiko.player.health -= 20;
			this.live = false;
			return;
		}

		//Render Circle
		fill(255, 255, 255, 65);
		stroke(0);
		strokeWeight(4);
		circle(this.x, this.y, 50, 50);

		fill(0, 0, 0, 205);
		noStroke();
		textAlign(CENTER);
		textSize(25);
		text(this.key, this.x, this.y + 5);

		//If key hit
		if (!taiko.keys[this.key]) {
			return;
		}
		let d = this.x - 50;
		if (d < 10) {
			taiko.player.combo++;
			taiko.player.score.raw += 300 * round(Math.max(1, taiko.player.combo / 10));
			taiko.player.popup = { text: "Perfect!", opacity: 255 };
			taiko.keys[this.key] = false;
			taiko.hitNotes ++;
			this.live = false;
			taiko.hitTimings.push(d);
			if(taiko.hitTimings > 10){
				taiko.hitTimings.shift();
			}
		} else if (d < 25) {
			taiko.player.combo++;
			taiko.player.score.raw += 150 * round(Math.max(1, taiko.player.combo / 10));
			taiko.player.popup = { text: "Good", opacity: 255 };
			taiko.keys[this.key] = false;
			taiko.hitNotes ++;
			this.live = false;
			taiko.hitTimings.push(d);
			if(taiko.hitTimings > 10){
				taiko.hitTimings.shift();
			}
		} else if (d < 50) {
			taiko.player.score.raw += 50 * round(Math.max(1, taiko.player.combo / 10));
			taiko.player.popup = { text: "Okay", opacity: 255 };
			taiko.keys[this.key] = false;
			taiko.player.health -= 10;
			this.live = false;
			taiko.hitTimings.shift();
			if(taiko.hitTimings > 10){
				taiko.hitTimings.shift();
			}
		}
		
	}
};
let lastchars;
let lastbpm;
//Run at start
function taikoSetup(taiko, chars, bpm) {
	//In case of retry, log the chars and bpm
	lastchars = chars;
	lastbpm = bpm;

	//Reset variables that need to be reset
	taiko.player.health = 100;
	taiko.notes = [];
	taiko.time = {
		offset: 0,
		set: 0,
	};
	taiko.player.score = {
		raw: 0,
		display: 0
	};
	taiko.player.combo = 0;
	taiko.player.maxcombo = 0;
	taiko.player.health = 100;
	taiko.player.popup = {
		text: "nothing",
		opacity: 0,
	};
	taiko.player.notes = [];

	for (var i = 5; i < 60; i += (60 / (bpm * user.mods.bpm * (user.mods.dt ? 2 : 1)) )) {
		taiko.notes.push(new taikoNote(
			chars[round(random(0, chars.length - 1))],
			5 * user.mods.ar,
			i * 1000,
			taiko.notes.length,
			taiko));
		taiko.totalNotes ++;
	};
	taiko.time.offset = Date.now();
}
//Taiko endpage
function taikoEnd(taiko) {
	background(coloring.primary);

	//Backboard
	fill(coloring.secondary);
	stroke(lerpColor(coloring.secondary, color(0), 0.2));
	strokeWeight(5);
	rect(50, 0, 700, 350);

	//Won/Lost text
	noStroke();
	textSize(50);
	textFont(coloring.secondaryFont);
	textAlign(CENTER);
	if(taiko.player.health > 0){
		fill(lerpColor(coloring.quaternary, color(0, 255, 0), cos(frameCount / 15) * 0.50));
		text("Passed!", 400, 65);
	}else{
		fill(lerpColor(coloring.quaternary, color(255, 0, 0), cos(frameCount / 15) * 0.50));
		text("Failed!", 400, 65);
	}

	//Backboard
	fill(0, 0, 0, 30);
	stroke(0, 0, 0, 50);
	strokeWeight(5);
	rect(160, 100, 500, 230);

	//Stats
	fill(coloring.quaternary);
	noStroke();
	textSize(25);
	textAlign(LEFT);
	textFont(coloring.primaryFont);
	let spacing = 33;
	text("Score: " + taiko.player.score.raw, 200, 165);
	text("Time Left: " + Math.ceil(120 - taiko.time.set / 1000 ) + "s", 200, 165 + spacing);
	text("Max Combo: " + taiko.player.maxcombo + 'x', 200, 165 + spacing * 2);
	text("Number hit: " + taiko.hitNotes, 200, 165 + spacing * 3);

	//Scoring
	push();
		translate(540, 270);
		rotate(10 * (Math.PI / 180));
		textAlign(CENTER);
		textFont(coloring.secondaryFont);
		textSize(180);
		text(letterGrade(taiko.hitNotes/taiko.totalNotes), 0, 0);
	pop();
	
	Button(200, 400, "Menu", () => { lowerCurtain(() => { page = "menu"; }) });
	Button(600, 400, "Retry", () => { lowerCurtain(() => { taikoSetup(taiko, lastchars, lastbpm); page = "taiko" }) });
}
//Run at draw
function taikoDraw(taiko) {
	background(255 + cos(frameCount / 50) * 50, 255 + cos(frameCount / 40) * 50, 255 + cos(frameCount / 30) * 50);
	if (taiko.player.combo > taiko.player.maxcombo) {
		taiko.player.maxcombo = taiko.player.combo;
	}
	if (taiko.player.health <= 0) {
		//wrap it up folks this guy sucks
		lowerCurtain(() => {
			page = "taikoend";
		});
	}
	if (!lockinput) {
		taiko.time.set = Date.now() - taiko.time.offset;
		taiko.player.health = constrain(taiko.player.health + 0.1, -100, 100);
	}
	if (taiko.notes.every(i => i == 0)) {
		lowerCurtain(() => {
			userCompleted(menu.item);
			page = "taikoend";
		});
	}

	for (var i = 0; i < taiko.notes.length; i++) {
		if (taiko.notes[i] != 0) {
			taiko.notes[i].update();
		}
	}
	/** Healthbar **/
	let width = taiko.player.health * 3;
	let healthPercent = taiko.player.health / 100;
	fill(255 * (1 - healthPercent), 255 * healthPercent, 0);
	stroke(255 * (1 - healthPercent) - 25, 255 * healthPercent + 25, 0);
	rect(400 - (width / 2), -2.5, width, 12.5, 2.5);

	/** Score and Combo **/
	taiko.player.score.display = lerpN(taiko.player.score.raw, taiko.player.score.display);
	fill(0);
	noStroke();
	textSize(30);
	textAlign(LEFT);
	text(Math.ceil(taiko.player.score.display / 2) * 2, 15, 35);
	textAlign(RIGHT);
	text(taiko.player.combo + 'x', 780, 35);

	/** Popup text **/
	switch (taiko.player.popup.text) {
		case "Perfect!":
			fill(255, 105, 97, taiko.player.popup.opacity);
			stroke(255 - 25, 105 - 25, 97 - 25, taiko.player.popup.opacity);
			break;
		case "Good":
			fill(119, 221, 119, taiko.player.popup.opacity);
			stroke(119 - 25, 221 - 25, 119 - 25, taiko.player.popup.opacity);
			break;
		case "Okay":
			fill(255, 179, 51, taiko.player.popup.opacity);
			stroke(255 - 25, 179 - 25, 51 - 25, taiko.player.popup.opacity);
			break;
		case "Drop":
			fill(255, 255, 255, taiko.player.popup.opacity);
			stroke(0, 0, 0, taiko.player.popup.opacity);
		default:
			noFill();
	}
	strokeWeight(5);
	textAlign(CENTER);
	textSize(40);
	text(taiko.player.popup.text, 400, 55);
	taiko.player.popup.opacity -= 3;

	//Taiko Rolls
	fill(50, 50, 50, 100);
	noStroke();
	rect(0, 65, 800, 120);
	rect(0, 65 + 125, 800, 120);
	rect(0, 65 + 250, 800, 120);

	//Taiko Lines
	stroke(50);
	strokeWeight(5);
	line(50, 75, 50, 175); // lowercase
	line(50, 75 + 125, 50, 175 + 125); // uppercase
	line(50, 75 + 250, 50, 175 + 250); // special

}