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
	textSize(20);
	textFont(coloring.primaryFont);

	if(dead == false){
		if (tmouseX > x - (textWidth(t) / 2) - 10 && tmouseX < x - (textWidth(t) / 2) - 10 + textWidth(t) + 20 && tmouseY > y && tmouseY < y + 65) {
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

	strokeWeight(4);
	rect(x - (textWidth(t) / 2) - 10, y, textWidth(t) + 20, 65, 5);

	fill(0);
	stroke(0);
	strokeWeight(0);
	textAlign(CENTER);
	text(t, x, y + 38);
	
	return textWidth(t) + 20;
}
function fallButton(x, y, t, f) {
	textSize(20);
	textFont(coloring.primaryFont);
	noStroke();

	if (tmouseX > x - (textWidth(t) / 2) - 10 && tmouseX < x - (textWidth(t) / 2) - 10 + textWidth(t) + 20 && tmouseY > y - 36 && tmouseY < y + 65 - 36) {
		fill(125,125,125,185 - dist(tmouseX,tmouseY, x, y) * 5);
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
	rect(0, 0, windowWidth, windowHeight * (1 - (curtain / 100)));
}
//Render dots
function renderDots(){
	//Node animation
	dots.forEach((i, n) => {
		if (i[0] < 0 || i[0] > windowWidth || i[1] < 100 * windowHeight / 600 || i[1] > windowHeight) {
			i[0] = random(0, windowWidth);
			i[1] = random(100 * windowHeight / 600, windowHeight);
			i[2] = random(0, 100);
		}
		stroke(255, 255, 255, cos(Date.now() * n / 100000) * 125 + 50);
		strokeWeight(5);
		point(i[0] - (windowWidth - (800 * windowHeight / 600 * 1.1)) / 2, i[1]);
		i[0] += cos(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
		i[1] += sin(i[2]) / constrain(dist(i[0], i[1], mouseX, mouseY), 0.01, Infinity) * 100;
	});
}
function userCompleted(item){
	user.completed.push(item);
}