//Run at start
function trainSetup(learn){
}
//Run at draw
function trainDraw(learn){
	background(coloring.primary);
	renderDots();
	
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
	fallButton(300, 55, "menu", () => { lowerCurtain(() => { menu.inSection = false; page = "menu" }) });
	fallButton(400, 55, "train", () => { lowerCurtain(() => { page = "train" }) });
	fallButton(500, 55, "mods", () => { lowerCurtain(() => { page = "mods" }) });
	fallButton(600, 55, "profile", () => { lowerCurtain(() => { page = "profile" }) });

	textAlign(LEFT);
	textFont(coloring.primaryFont);
	fill('white');
	noStroke();
	textSize(15);
	text("Press Any Key to Add to Training List\n(backspace to clear)",50,200);
	textSize(25);
	text(Array.from(user.train).join(', ') + (frameCount % 50 < 25 ? '.' : ' '),50,235, 300,Infinity);

	Button(460,185,"Run [Normal]", () => { lowerCurtain(() => {  } )},!user.train.size > 0);
	Button(460,265,"Run [Insane]", () => { lowerCurtain(() => {  } )},!user.train.size > 0);
	Button(460,345,"Run [Extra]", () => { lowerCurtain(() => {  } )},!user.train.size > 0);
	Button(460,425,"Run [Master]", () => { lowerCurtain(() => {  } )},!user.train.size > 0);
	
	Button(650,185,"Taiko [Normal]", () => { lowerCurtain(() => { taikoSetup(taiko, Array.from(user.train), 60); page = "taiko"; } )},!user.train.size > 0);
	Button(650,265,"Taiko [Insane]", () => { lowerCurtain(() => { taikoSetup(taiko, Array.from(user.train), 120); page = "taiko"; } )},!user.train.size > 0);
	Button(650,345,"Taiko [Extra]", () => { lowerCurtain(() => { taikoSetup(taiko, Array.from(user.train), 180); page = "taiko"; } )},!user.train.size > 0);
	Button(650,425,"Taiko [Master]", () => { lowerCurtain(() => { taikoSetup(taiko, Array.from(user.train), 300); page = "taiko"; } )},!user.train.size > 0);
	noStroke();
}