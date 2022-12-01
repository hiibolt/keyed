function Button(x, y, t, f) {
	textSize(20);
	textFont(menu.coloring.primaryFont);
	
	if (mouseX > x - (textWidth(t) / 2) - 10 && mouseX < x - (textWidth(t) / 2) - 10 + textWidth(t) + 20 && mouseY > y && mouseY < y + 65) {
		fill(menu.coloring.secondary);
		stroke(0, 0, 0, 75);
		if(mouseIsPressed){
			f();
		}
	} else {
		fill(menu.coloring.secondary);
		stroke(lerpColor(menu.coloring.secondary, color(0), 0.10));
	}

	strokeWeight(4);
	rect(x - (textWidth(t) / 2) - 10, y, textWidth(t) + 20, 65, 5);

	fill(0);
	stroke(0);
	strokeWeight(0);
	textAlign(CENTER);
	text(t, x, y + 38);
	
	return textWidth(t) + 20;
}
//Run at start
function menuSetup(menu) {
}
//Run at draw
function menuDraw(menu,taiko,run,learn) {
	background(menu.coloring.primary);
	stroke(255);
	strokeWeight(3);
	line(0,100,800,100);
	
	if (!menu.inSection) {
		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(menu.coloring.secondaryFont);
		textSize(35);
		text("Pick a category...",20,140);
		
		Button(300, 165, "Vowels 1", () => {menu.section = "Vowels 1";menu.swapping = true;});
		Button(500, 165, "Vowels 2", () => {menu.section = "Vowels 2";menu.swapping = true;});
		
		Button(200, 245, "Consonants 1", () => {menu.section = "Consonants 1";menu.swapping = true;});
		Button(400, 245, "Consonants 2", () => {menu.section = "Consonants 2";menu.swapping = true;});
		Button(600, 245, "Consonants 3", () => {menu.section = "Consonants 3";menu.swapping = true;});
		
		Button(200, 325, "Consonants 4", () => {menu.section = "Consonants 4";menu.swapping = true;});
		Button(400, 325, "Consonants 5", () => {menu.section = "Consonants 5";menu.swapping = true;});
		Button(600, 325, "Consonants 6", () => {menu.section = "Consonants 6";menu.swapping = true;});
		
		Button(400, 405, "Consonants 7", () => {menu.section = "Consonants 7";menu.swapping = true;});
	}else{
		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(menu.coloring.secondaryFont);
		textSize(35);
		text(menu.section,20,140);

		menu.sections[menu.section].forEach((i)=>{
			if(i.notice){
				fill(255);
				noStroke();
				textAlign(RIGHT);
				textFont(menu.coloring.secondaryFont);
				textSize(18);
				text(i.notice,i.x - 80,i.y + 36.5);
			}
			Button(i.x, i.y, i.name, () => {
				switch(i.type){
					case "taiko":
						taikoSetup(taiko, i.chars, i.bpm);
						page = "taiko";
						break;
				}
			});
		});
	}

	if(menu.swapping){
		if(menu.curtain > 0.2){
			menu.curtain = constrain(menu.curtain - (menu.curtain) / 10, 0, 100);
		}else{
			menu.swapping = false;
			menu.inSection = !menu.inSection;
		}
	}else{
		menu.curtain = constrain(menu.curtain + (100 - menu.curtain) / 10, 0, 100);
	}
	fill(0);
	noStroke();
	rect(0, 0, 800, 600 * (1 - (menu.curtain / 100)));
}