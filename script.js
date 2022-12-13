/**
	IF YOU ARE CONFUSED ON ANYTHING, PLEASE DON'T HESTITATE TO REACH OUT TO ME OR DREW!
**/

/** Current Page 
     - "menu"
		 - "train"
	   - "mods"
		 - "profile"
	 
     - "taiko"
		  * "taikoend"
     - "run"
	   - "learn"     **/
let page = "mods";

/** Letter Sets **/
const all = "abcdefghijklmnopqrstuvwxyz".split('');
const caps = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
const special = "0123456789[]{};:,.?'!&".split('');

/** Mouse **/
let tmouseX = 0;
let tmouseY = 0;

/** Background **/
const dots = [];

/** User Information **/
const user = {
	username: "?",
	xp: 0,
	completed: ["Vowels 1Practice 1"],
	train: new Set([]),
	mods: {
		bpm: 1.0,
		hp: 1.0,
		ar: 1.0,
		dt: false,
		sd: false,
		split: true,
	},
};

/** Update Keys **/
function keyPressed() {
	if(page == "mods" && keyCode == 8){
		user.mods = {
			bpm:1,
			hp: 1,
			ar: 1,
			dt: false,
			sd: false,
			split: true,
		}
	}
	if(page == "train"){
		if(keyCode == 8){
			user.train.clear();
		}else if([13,16,17,18,191,220].includes(keyCode)){
			//illegal character, ignore
		}else{
			user.train.add(key);
		}
	}
	if(!lockinput){
		run.keys[key] = true;
		menu.keys[key] = true;
		taiko.keys[key] = true;
		learn.keys[learn] = true;
	}
}
function keyReleased() {
	if(!lockinput){
		run.keys[key] = false;
		menu.keys[key] = false;
		taiko.keys[key] = false;
		learn.keys[learn] = false;
	}
}

/** Graphics **/
const coloring = {
	primaryFont: null,
	secondaryFont: null,
	
	primary: null,
	secondary: null,
	tertiary: null, 
	quaternary: null,
}

/** Variables **/
const menu = {
	keys: [],

	nodes:[],
	
	section: "Vowels 1",
	inSection: false,
	
	sections: {
		"Vowels 1": [
			{type: "learn", name: "Learn A", x:150, y:165, chars: ['a']},
			{type: "learn", name: "Learn E", x:270, y:165, chars: ['e']},
			{type: "learn", name: "Learn I", x:385, y:165, chars: ['i']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['a','e','i']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['a','e','i'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['a','e','i']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['a','e','i'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['a','e','i']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['a','e','i'],bpm:120},
		],
		"Vowels 2": [
			{type: "learn", name: "Learn O", x:150, y:165, chars: ['o']},
			{type: "learn", name: "Learn U", x:270, y:165, chars: ['u']},
			{type: "learn", name: "Learn Y", x:385, y:165, chars: ['y']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['o','u','y']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['o','u','y'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['o','u','y']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['o','u','y'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['o','u','y']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['o','u','y'],bpm:120},
		],
		
		"Consonants 1": [
			{type: "learn", name: "Learn Q", x:150, y:165, chars: ['q']},
			{type: "learn", name: "Learn W", x:270, y:165, chars: ['w']},
			{type: "learn", name: "Learn R", x:385, y:165, chars: ['r']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['q','w','r']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['q','w','r'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['q','w','r']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['q','w','r'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 4"], chars: ['q','w','r']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['q','w','r'],bpm:120},
		],
		"Consonants 2": [
			{type: "learn", name: "Learn T", x:150, y:165, chars: ['t']},
			{type: "learn", name: "Learn P", x:270, y:165, chars: ['p']},
			{type: "learn", name: "Learn S", x:385, y:165, chars: ['s']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['t','p','s']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['t','p','s'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['t','p','s']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['t','p','s'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['t','p','s']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['t','p','s'],bpm:120},
		],
		"Consonants 3": [
			{type: "learn", name: "Learn D", x:150, y:165, chars: ['d']},
			{type: "learn", name: "Learn F", x:270, y:165, chars: ['f']},
			{type: "learn", name: "Learn G", x:385, y:165, chars: ['g']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['d','f','g']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['d','f','g'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['d','f','g']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['d','f','g'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['d','f','g']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['d','f','g'],bpm:120},
		],
		"Consonants 4": [
			{type: "learn", name: "Learn H", x:150, y:165, chars: ['h']},
			{type: "learn", name: "Learn J", x:270, y:165, chars: ['j']},
			{type: "learn", name: "Learn K", x:385, y:165, chars: ['k']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['h','j','k']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['h','j','k'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['h','j','k']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['h','j','k'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['h','j','k']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['h','j','k'],bpm:120},
		],
		"Consonants 5": [
			{type: "learn", name: "Learn L", x:150, y:165, chars: ['l']},
			{type: "learn", name: "Learn Z", x:270, y:165, chars: ['z']},
			{type: "learn", name: "Learn X", x:385, y:165, chars: ['x']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['l','z','x']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['l','z','x'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['l','z','x']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['l','z','x'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['l','z','x']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['l','z','x'],bpm:120},
		],
		"Consonants 6": [
			{type: "learn", name: "Learn C", x:150, y:165, chars: ['c']},
			{type: "learn", name: "Learn V", x:270, y:165, chars: ['v']},
			{type: "learn", name: "Learn B", x:385, y:165, chars: ['b']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['c','v','b']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['c','v','b'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['c','v','b']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['c','v','b'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['c','v','b']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['c','v','b'],bpm:120},
		],
		"Consonants 7": [
			{type: "learn", name: "Learn N", x:150, y:165, chars: ['n']},
			{type: "learn", name: "Learn M", x:270, y:165, chars: ['m']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['n','m']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['n','m'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", requirements:["Practice 1"], chars: ['n','m']},
			{type: "taiko", name: "Practice 4", x:420, y:365, requirements:["Practice 2"], chars: ['n','m'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", requirements:["Practice 3"], chars: ['n','m']},
			{type: "taiko", name: "Practice 6", x:420, y:465, requirements:["Practice 4"], chars: ['n','m'],bpm:120},
		],
		"All Keys": [
			{type: "run", name: "Hard 1", x:280, y:165, chars: all},
			{type: "taiko", name: "Hard 2", x:480, y:165, chars: all,bpm:120},

			{type: "run", name: "Advanced 1", x:280, y:265, requirements:["Hard 1"], chars: all},
			{type: "taiko", name: "Advanced 2", x:480, y:265, requirements:["Hard 2"], chars: all,bpm:180},

			{type: "run", name: "Extreme 1", x:280, y:365, requirements:["Advanced 1"], chars: all},
			{type: "taiko", name: "Extreme 2", x:480, y:365, requirements:["Advacned 2"], chars: all,bpm:240},
			
			{type: "run", name: "Hyper 1", x:280, y:465, requirements:["Extreme 1"], chars: all},
			{type: "taiko", name: "Hyper 2", x:480, y:465, requirements:["Extreme 2"], chars: all,bpm:280},
		],
		"Capitals": [
			{type: "run", name: "Hard 1", x:280, y:165, chars: [...all,...caps]},
			{type: "taiko", name: "Hard 2", x:480, y:165, chars: [...all,...caps],bpm:120},

			{type: "run", name: "Advanced 1", x:280, y:265, requirements:["Hard 1"], chars: [...all,...caps]},
			{type: "taiko", name: "Advanced 2", x:480, y:265, requirements:["Hard 2"], chars: [...all,...caps],bpm:180},

			{type: "run", name: "Extreme 1", x:280, y:365, requirements:["Advanced 1"], chars: [...all,...caps]},
			{type: "taiko", name: "Extreme 2", x:480, y:365, requirements:["Advacned 2"], chars: [...all,...caps],bpm:240},
			
			{type: "run", name: "Hyper 1", x:280, y:465, requirements:["Extreme 1"], chars: [...all,...caps]},
			{type: "taiko", name: "Hyper 2", x:480, y:465, requirements:["Extreme 2"], chars: [...all,...caps],bpm:280},
		],
		"Specials": [
			{type: "run", name: "Hard 1", x:280, y:165, chars: [...all,...caps,...special]},
			{type: "taiko", name: "Hard 2", x:480, y:165, chars: [...all,...caps,...special],bpm:120},

			{type: "run", name: "Advanced 1", x:280, y:265, requirements:["Hard 1"], chars: [...all,...caps,...special]},
			{type: "taiko", name: "Advanced 2", x:480, y:265, requirements:["Hard 2"], chars: [...all,...caps,...special],bpm:180},

			{type: "run", name: "Extreme 1", x:280, y:365, requirements:["Advanced 1"], chars: [...all,...caps,...special]},
			{type: "taiko", name: "Extreme 2", x:480, y:365, requirements:["Advacned 2"], chars: [...all,...caps,...special],bpm:240},
			
			{type: "run", name: "Hyper 1", x:280, y:465, requirements:["Extreme 1"], chars: [...all,...caps,...special]},
			{type: "taiko", name: "Hyper 2", x:480, y:465, requirements:["Extreme 2"], chars: [...all,...caps,...special],bpm:280},
		]
	},
	
	coloring: null,
};
const taiko = { 
	lowercase: all,
	uppercase: caps,
	special: special,
	keys: [],
	pool: ['a','b'],
	time: {
		offset: 0,
		set: 0,
	},
	hitTimings: [],
	totalNotes: 0,
	hitNotes: 0,
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
	},
	notes: [],
	mods: {
		split: true,
		capital: true,
		special: true,
		bpm: 120,
		speed: 5,
	},
};
const run = {
	keys: [],
};
const learn = {
	keys: [],
};

function preload(){
	coloring.primaryFont = loadFont("assets/semibold.ttf");
	coloring.secondaryFont = loadFont("assets/hyperbold.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	coloring.primary = color(55, 62, 152);
	coloring.secondary = color(254,227,110);
	coloring.tertiary = color(241, 103, 117);
	coloring.quaternary = color(42, 42, 42);

	menuSetup(menu);
	runSetup();
	learnSetup();

	for (let i = 0; i < 200; i++) {
		dots.push([random(0, windowWidth), random(0, windowHeight), random(0, 100)]);
	}
}

function draw() {
	tmouseX = (mouseX / (windowHeight / 600 * 1.1)) - (windowWidth - (800 * windowHeight / 600 * 1.1)) / 2;
	tmouseY = mouseY / (windowHeight / 600);
	if(windowWidth < windowHeight * 1.5){
		background(255,0,0);
		textAlign(CENTER);
		textSize(35);
		text("Bad resolution\nSwitch to a less vertically stretched resolution",windowWidth / 2,windowHeight / 2);
		return;
	}
	push();
		translate( (windowWidth - (800 * windowHeight / 600 * 1.1)) / 2, 0);
		scale(windowHeight / 600 * 1.1, windowHeight / 600);
		switch (page) {
		case "menu": 
			menuDraw(menu,taiko,run,learn);
			break;
		case "train":
			trainDraw();
			break;
		case "mods":
			modsDraw();
			break;
		case "profile":
			background(255,0,0)
			fill(255);
			textAlign(CENTER);
			text("hey you aren't supposed to be here",400,200);
			break;
			
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
	pop();
	drawCurtain();
}