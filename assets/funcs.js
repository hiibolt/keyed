/** Global Curtain Transition **/
let lockinput = false;
let curtainmode = "raise";
let curtain = 0;
let after = 0;
//F is a function, probably in lambda style ()=>{do stuff;}, that is executed after the curtain is lowered
function lowerCurtain(f){
	lockinput = true;
	curtainmode = "lower";
	after = f;
}

/** Button Function **/
//x: x-coord, y: y-coord, t: text, f: excuted after a click ()=>{do this;}
function Button(x, y, t, f, dead = false) {
	let lockedscale = constrain(system.scale,0,1.5);
	let lockedaltscale = constrain(system.altscale,0,1.5);
	textSize(20 * lockedscale);
	textFont(coloring.primaryFont);

	if(dead == false){
		if (mouseX > x - (textWidth(t) / 2) - 10 * lockedscale && mouseX < x - (textWidth(t) / 2) - 10 * lockedscale + textWidth(t) + 20 * lockedscale && mouseY > y && mouseY < y + 65 * lockedaltscale) {
			fill(coloring.secondary);
			stroke(0, 0, 0, 75);
			if(mouseIsPressed && !lockinput){
				f();
			}
		} else {
			fill(coloring.secondary);
			stroke(lerpColor(coloring.secondary, color(0), 0.10));
		}
	}else{
		fill(coloring.quaternary);
		stroke(lerpColor(coloring.quaternary, color(0), 0.10));
	}

	strokeWeight(4 * lockedscale);
	rect(x - (textWidth(t) / 2) - 10 * lockedscale, y, textWidth(t) + 20 * lockedscale, 65 * lockedaltscale, 5);

	fill(coloring.quaternary);
	stroke(0);
	strokeWeight(0);
	textAlign(CENTER);
	text(t, x, y + 36 * lockedscale);
	
	return textWidth(t) + 20;
}
function fallButton(x, y, t, f) {
	textSize(20);
	textFont(coloring.primaryFont);
	noStroke();

	if (mouseX > x - (textWidth(t) / 2) - 10 && mouseX < x - (textWidth(t) / 2) - 10 + textWidth(t) + 20 && mouseY > y - 36 && mouseY < y + 65 - 36) {
		fill(125,125,125,185 - dist(mouseX,mouseY, x, y) * 5);
		if(mouseIsPressed && !lockinput){
			f();
		}
	} else {
		noFill();
	}

	strokeWeight(4);
	rect(x - (textWidth(t) / 2) - 10, y - 36, textWidth(t) + 20, 65, 5);

	fill('white');
	strokeWeight(0);
	textAlign(CENTER);
	text(t, x, y);
	
	return textWidth(t) + 20;
}

//Render curtain
function drawCurtain(){
	/** Curtain Handling, do not touch **/
	if(curtainmode == "raise"){
		curtain = constrain(curtain + (100 - curtain) / 15, 0, 100);
		if(curtain > 99.8 && after != 0){
			after();
			after = 0;
			lockinput = false;
		}
	}else{
		curtain = constrain(curtain - (curtain) / 15, 0, 100);
		if(curtain < 0.2){
			after();
			after = 0;
			curtainmode = "raise";
			lockinput = false;
		}
	}
	fill(0);
	rect(0, 0, 800 * system.scale, 600 * (1 - (curtain / 100)) * system.altscale);
}
function userCompleted(item){
	user.completed.push(item);
}