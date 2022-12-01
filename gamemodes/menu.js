//Run at start
function menuSetup(menu) {
}
//Run at draw
function menuDraw(menu,taiko,run,learn) {
	background(coloring.primary);
	stroke(255);
	strokeWeight(3);
	line(0,100,800,100);
	
	if (!menu.inSection) {
		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(coloring.secondaryFont);
		textSize(35);
		text("Pick a category...",20,140);
		
		Button(300, 165, "Vowels 1", () => {menu.section = "Vowels 1";lowerCurtain(()=>{menu.inSection=true})});
		Button(500, 165, "Vowels 2", () => {menu.section = "Vowels 2";lowerCurtain(()=>{menu.inSection=true})});
		
		Button(200, 245, "Consonants 1", () => {menu.section = "Consonants 1";lowerCurtain(()=>{menu.inSection=true})});
		Button(400, 245, "Consonants 2", () => {menu.section = "Consonants 2";lowerCurtain(()=>{menu.inSection=true})});
		Button(600, 245, "Consonants 3", () => {menu.section = "Consonants 3";lowerCurtain(()=>{menu.inSection=true})});
		
		Button(200, 325, "Consonants 4", () => {menu.section = "Consonants 4";lowerCurtain(()=>{menu.inSection=true})});
		Button(400, 325, "Consonants 5", () => {menu.section = "Consonants 5";lowerCurtain(()=>{menu.inSection=true})});
		Button(600, 325, "Consonants 6", () => {menu.section = "Consonants 6";lowerCurtain(()=>{menu.inSection=true})});
		
		Button(400, 405, "Consonants 7", () => {menu.section = "Consonants 7";lowerCurtain(()=>{menu.inSection=true})});
	}else{
		fill(255);
		noStroke();
		textAlign(LEFT);
		textFont(coloring.secondaryFont);
		textSize(35);
		text(menu.section,20,140);

		menu.sections[menu.section].forEach((i)=>{
			if(i.notice){
				fill(255);
				noStroke();
				textAlign(RIGHT);
				textFont(coloring.secondaryFont);
				textSize(18);
				text(i.notice,i.x - 80,i.y + 36.5);
			}
			Button(i.x, i.y, i.name, () => {
				switch(i.type){
					case "taiko":
						lowerCurtain(()=>{
							taikoSetup(taiko, i.chars, i.bpm);
							page = "taiko";
						});
						break;
				}
			});
		});
	}
}