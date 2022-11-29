/** Current Page 
     - "taiko"
     - "run"
	   - "learn"     **/
let page = "taiko";

/** Update Keys **/
function keyPressed() {
	run.keys[key] = true;
	taiko.keys[key] = true;
	learn.keys[learn] = true;
}
function keyReleased() {
	run.keys[key] = false;
	taiko.keys[key] = false;
	learn.keys[learn] = false;
}

/** Variables **/
const taiko = { 
	lowercase: "abcdefghijklmnopqrstuvwxyz".split(''),
	uppercase: "ABCDEFGHIJKLMNOPOQRSTUVWXYZ".split(''),
	special: "0123456789,.?;:\'\"!()".split(''),
	keys: [],
	pool: [],
	time: {
		offset: 0,
		set: 0,
	},
	player: {
		score: {
			raw: 0,
			display: 0
		},
		combo: 0,
		maxcombo: 0,
		health: 100,
		popup: {
			text: "nothing",
			opacity: 0,
		},
		curtain: 0,
	},
	notes: [],
	mods: {
		split: true,
		capital: true,
		special: true,
		bpm: 120,
		speed: 5,
	}
};
const run = {
	keys: [],
};
const learn = {
	keys: [],
};

function setup() {
	createCanvas(800, 600);
	runSetup(run);
	learnSetup(learn);
	taikoSetup(taiko);
}

function draw() {
	switch (page) {
		case "run":
			runDraw(run);
			break;
			
		case "learn":
			learnDraw(learn);
			break;
			
		case "taiko":
			taikoDraw(taiko);
			break;
		case "taikoend":
			taikoEnd(taiko);
			break;
	}
}