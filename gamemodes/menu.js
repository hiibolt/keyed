//Run at start
function menuSetup(menu) {
	menu.nodes = [];
	for (let i = 0; i < 100; i++) {
		menu.nodes.push([random(0, system.w), random(100 * system.altscale, system.h), random(0, 100 * system.altscale)]);
	}
}
//Run at draw
function menuDraw(menu, taiko, run, learn) {
	background(coloring.primary);
	
	//Line below buttons and logo
	stroke(255);
	strokeWeight(3);
	line(0, 100 * system.altscale, system.w, 100  * system.altscale);
	//Logo
	push();
	translate(35, 54);
	noStroke();
	textAlign(LEFT);
	textSize(30);
	fill(color(255));
	text("keyed", 4, 4);
	fill(lerpColor(coloring.tertiary, color(255), 0.5));
	text("keyed", 2, 2);
	fill(coloring.tertiary);
	text("keyed", 0, 0);
	pop();
	
	fallButton(300, 55, "menu", () => { lowerCurtain(() => { menu.inSection = false; page = "menu"; }) });
	fallButton(400, 55, "train", () => { lowerCurtain(() => { page = "train" }) });
	fallButton(500, 55, "mods", () => { lowerCurtain(() => { page = "mods" }) });
	fallButton(600, 55, "profile", () => { lowerCurtain(() => { page = "profile" }) });
	
	//Node animation
	menu.nodes.forEach((i, n) => {
		if (i[0] < 0 || i[0] > system.w || i[1] < 100 * system.altscale || i[1] > system.h) {
			i[0] = random(0, system.w);
			i[1] = random(100 * system.scale, system.w);
			i[2] = random(0, 100);
		}
		stroke(255, 255, 255, cos(Date.now() * n / 100000) * 125 + 50);
		strokeWeight(5 * system.scale + cos((frameCount + n * 10000 ) / 50 ) * 3);
		point(i[0], i[1]);
		i[0] += cos(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
		i[1] += sin(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
	});

	if (!menu.inSection) {
		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(coloring.secondaryFont);
		textSize(32.5);
		text("Pick a category...", 20, 140);
		push();
		translate((system.w / 2 - mouseX) / 75 + cos(frameCount / 100) * 5, (system.h / 2 - mouseY) / 75 + sin(frameCount / 100) * 5);
		Button(300 * system.scale, system.w - (300 - 165) * system.altscale, "Vowels 1", () => { menu.section = "Vowels 1"; lowerCurtain(() => { menu.inSection = true }) });
		Button(500 * system.scale, system.w - (300 - 165) * system.altscale, "Vowels 2", () => { menu.section = "Vowels 2"; lowerCurtain(() => { menu.inSection = true }) });

		Button(200 * system.scale, system.w - (300 - 245) * system.altscale, "Consonants 1", () => { menu.section = "Consonants 1"; lowerCurtain(() => { menu.inSection = true }) });
		Button(400 * system.scale, system.w - (300 - 245) * system.altscale, "Consonants 2", () => { menu.section = "Consonants 2"; lowerCurtain(() => { menu.inSection = true }) });
		Button(600 * system.scale, system.w - (300 - 245) * system.altscale, "Consonants 3", () => { menu.section = "Consonants 3"; lowerCurtain(() => { menu.inSection = true }) });

		Button(200 * system.scale, system.w - (300 - 325) * system.altscale, "Consonants 4", () => { menu.section = "Consonants 4"; lowerCurtain(() => { menu.inSection = true }) });
		Button(400 * system.scale, system.w - (300 - 325) * system.altscale, "Consonants 5", () => { menu.section = "Consonants 5"; lowerCurtain(() => { menu.inSection = true }) });
		Button(600 * system.scale, system.w - (300 - 325) * system.altscale, "Consonants 6", () => { menu.section = "Consonants 6"; lowerCurtain(() => { menu.inSection = true }) });

		Button(400 * system.scale, system.w - (300 - 405) * system.altscale, "Consonants 7", () => { menu.section = "Consonants 7"; lowerCurtain(() => { menu.inSection = true }) });

		Button(250 * system.scale, system.w - (300 - 485) * system.altscale, "All Keys", () => { menu.section = "All Keys"; lowerCurtain(() => { menu.inSection = true }) });
		Button(400  * system.scale, system.w - (300 - 485) * system.altscale, "Capitals", () => { menu.section = "Capitals"; lowerCurtain(() => { menu.inSection = true }) });
		Button(550  * system.scale, system.w - (300 - 485) * system.altscale, "Specials", () => { menu.section = "Specials"; lowerCurtain(() => { menu.inSection = true }) });
		pop();
	} else {
		Button(735, 165, "Menu", () => { lowerCurtain(() => { menu.inSection = false }) });

		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(coloring.secondaryFont);
		textSize(35);
		text(menu.section, 20, 140);

		menu.sections[menu.section].forEach((i) => {
			if (i.notice) {
				fill(255);
				noStroke();
				textAlign(RIGHT);
				textFont(coloring.secondaryFont);
				textSize(18);
				text(i.notice, i.x - 80, i.y + 36.5);
			}
			Button(i.x, i.y, i.name, () => {
				switch (i.type) {
					case "learn":
						//learn launch code
						break;
					case "run":
						//run launch code
						break;
					case "taiko":
						menu.item = menu.section + i.name;
						lowerCurtain(() => {
							taikoSetup(taiko, i.chars, i.bpm);
							page = "taiko";
						});
						break;
				}
			}, i.requirements ? !i.requirements.every(i => user.completed.includes(menu.section + i)) : false);
		});
	}
}