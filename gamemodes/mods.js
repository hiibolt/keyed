//Run at start
function modsSetup(learn){
	menu.nodes = [];
	for (let i = 0; i < 100; i++) {
		menu.nodes.push([random(0, 800), random(100, 600), random(0, 100)]);
	}
}
//Run at draw
function modsDraw(learn){
	background(coloring.primary);
	//Line below buttons and logo
	stroke(255);
	strokeWeight(3);
	line(0, 100, 800, 100);
	//Logo
	push();
	translate(35, 54);
	noStroke();
	textAlign(LEFT);
	textFont(coloring.primaryFont);
	textSize(30);
	fill(color(255));
	text("keyed", 4, 4);

	fill(lerpColor(coloring.tertiary, color(255), 0.5));
	text("keyed", 2, 2);

	fill(coloring.tertiary);
	text("keyed", 0, 0);
	pop();
	//Page selection
	fallButton(300, 55, "menu", () => { lowerCurtain(() => { menu.inSection = false; page = "menu"; }) });
	fallButton(400, 55, "train", () => { lowerCurtain(() => { page = "train" }) });
	fallButton(500, 55, "mods", () => { lowerCurtain(() => { page = "mods" }) });
	fallButton(600, 55, "profile", () => { lowerCurtain(() => { page = "profile" }) });
	
	//Node animation
	menu.nodes.forEach((i, n) => {
		if (i[0] < 0 || i[0] > 800 || i[1] < 100 || i[1] > 600) {
			i[0] = random(0, 800);
			i[1] = random(100, 600);
			i[2] = random(0, 100);
		}
		stroke(255, 255, 255, cos(Date.now() * n / 100000) * 125 + 50);
		strokeWeight(5);
		point(i[0], i[1]);
		i[0] += cos(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
		i[1] += sin(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
	});

	textAlign(LEFT);
	textFont(coloring.primaryFont);
	fill('white');
	noStroke();
	textSize(17.5);
	text("BPM: "+Math.floor(user.mods.bpm * 10) / 10+"x\nHP: "+Math.floor(user.mods.hp * 10) / 10+"x\nAR: "+Math.floor(user.mods.ar * 10) / 10+"x\nDT: "+(user.mods.dt ? "On" : "Off")+"\nSD: "+(user.mods.sd ? "On" : "Off")+"\n(backspace to clear)",50,200);
	textSize(25);
	text(Array.from(user.train).join(', ') + (frameCount % 50 < 25 ? '.' : ' '),50,235, 300,Infinity);

	Button(460,185,"Double Time", () => { user.mods.dt = true; } );
	Button(460,265,"Sudden Death", () => { user.mods.sd = true; } );
	Button(460,345,"AR Up", () => { user.mods.ar +=0.01; } );
	Button(460,425,"AR Down", () => { user.mods.ar -=0.01; } );
	
	Button(650,185,"BPM Up", () => { user.mods.bpm +=0.01; } );
	Button(650,265,"BPM Down", () => { user.mods.bpm -=0.01; } );
	Button(650,345,"HP Increase", () => { user.mods.hp +=0.01; } );
	Button(650,425,"HP Decrease", () => { user.mods.hp -=0.01; } );
	noStroke();
}