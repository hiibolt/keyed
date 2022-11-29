//purely functional, lerps a raw number to a display number.
//i wrote this while on a lot of adderall sorry lol
function lerpN(_t, _d) {
	return (_t > _d) ? _d + constrain((_t - _d) / 50, 0.01, Infinity) : (_t < _d) ? _d - constrain((_d - _t) / 50, 0.01, Infinity) : _d;
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
		if (taiko.mods.split) {
			if (this.key == (this.key + "").toUpperCase()) {
				if (taiko.special.includes(this.key)) {
					this.y = 125 + 250;
				} else {
					this.y = 125 + 125;
				};
			} else {
				this.y = 125;
			};
		} else {
			this.y = 125;
		};
	};
	update() {
		if (this.live) {
			//Update position (relative to time)
			this.x = (this.time - taiko.time.set) * (this.aR / 15);
 
			if (this.x < 830){
				//Check if offscreen (miss)
				if (this.x < -25) {
					taiko.player.combo = 0;
					taiko.player.score.raw -= 50;
					taiko.player.popup = { text: "Drop", opacity: 255 };
					taiko.player.health -= 20;
					taiko.notes[this.ind] = 0;
				}	

				fill(255, 255, 255, 65);
				stroke(0);
				strokeWeight(4);
				circle(this.x, this.y, 50, 50);	
	
				fill(0, 0, 0, 205);
				noStroke();
				textAlign(CENTER);
				textSize(25);
				text(this.key, this.x, this.y + 5);	

				if (taiko.keys[this.key]) {
					let d = dist(this.x, 0, 50, 0);
					if (d < 10) {
						taiko.player.combo++;
						taiko.player.score.raw += 300 * round(Math.max(1, taiko.player.combo / 10));
						taiko.player.popup = { text: "Perfect!", opacity: 255 };
						taiko.notes[this.ind] = 0;
						taiko.keys[this.key] = false;
					} else if (d < 25) {
						taiko.player.combo++;
						taiko.player.score.raw += 150 * round(Math.max(1, taiko.player.combo / 10));
						taiko.player.popup = { text: "Good", opacity: 255 };
						taiko.notes[this.ind] = 0;
						taiko.keys[this.key] = false;
					} else if (d < 50) {
						taiko.player.score.raw += 50 * round(Math.max(1, taiko.player.combo / 10));
						taiko.player.popup = { text: "Okay", opacity: 255 };
						taiko.notes[this.ind] = 0;
						taiko.keys[this.key] = false;
						taiko.player.health -= 10;
					}
					if(taiko.player.combo > taiko.player.maxcombo){
						taiko.player.maxcombo = taiko.player.combo;
					}
				}
			}
			
		}
	}
};

//Run at start
function taikoSetup(taiko){
	let pool = [...taiko.lowercase, ...(taiko.mods.capital ? taiko.uppercase : []), ...(taiko.mods.special ? taiko.special : [])];
	for (var i = 5; i < 120; i+=0.85) {
		taiko.notes.push(new taikoNote(
			pool[round(random(0, pool.length - 1))],
			5,
			i * 1000, 
			taiko.notes.length,
			taiko));
	};
	taiko.time.offset = Date.now();
}
//Taiko endpage
function taikoEnd(taiko){
	taiko.player.curtain = constrain(taiko.player.curtain + (100 - taiko.player.curtain) / 5, 0, 100);
			if (taiko.player.health > 0) {
				
			}else {
				background(255 + cos(frameCount / 25) * 35,105,97);
				
				fill(0,0,0,30);
				stroke(0,0,0,50);
				strokeWeight(5);
				rect(50,0,700,350);

				fill(0);
				stroke(150,0,0);
				textSize(50);
				textAlign(CENTER);
				text("Failed!", 400, 65);

				fill(0,0,0,30);
				stroke(0,0,0,50);
				strokeWeight(5);
				rect(160,100,500,230);

				fill(0,0,0,155);
				stroke(155,0,0,175);
				strokeWeight(2);
				textSize(25);
				textAlign(LEFT);
				text("Score: " + taiko.player.score.raw, 200, 155);
				textAlign(RIGHT);
				text("Max Combo: "+ taiko.player.maxcombo + 'x', 615, 155);
			}

	fill(0);
	rect(0, 0, 800, 600 * (1 - (taiko.player.curtain / 100)));
}
//Run at draw
function taikoDraw(taiko){
	background(255 + cos(frameCount / 50) * 50, 255 + cos(frameCount / 40) * 50, 255 + cos(frameCount / 30) * 50);
			if (taiko.player.health <= 0) {
				//wrap it up folks this guy sucks
				taiko.player.curtain = constrain(taiko.player.curtain - (taiko.player.curtain) / 15, 0, 100);
				if (taiko.player.curtain < 0.5) {
					page = "taikoend";
				}
			} else {
				taiko.time.set = Date.now() - taiko.time.offset;
				taiko.player.curtain = constrain(taiko.player.curtain + (100 - taiko.player.curtain) / 5, 0, 100);
				taiko.player.health = constrain(taiko.player.health + 0.1, -100, 100);
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
	text(Math.ceil(taiko.player.score.display), 15, 35);
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

	//Taiko lines
	stroke(50);
	strokeWeight(5);
	line(50, 75, 50, 175); // lowercase

	line(50, 75 + 125, 50, 175 + 125); // uppercase

	line(50, 75 + 250, 50, 175 + 250); // special

	fill(0);
	rect(0, 0, 800, 600 * (1 - (taiko.player.curtain / 100)));
}