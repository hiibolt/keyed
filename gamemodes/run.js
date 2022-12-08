//Run at start
function runSetup(run){

}

var x = 0
var y = 0
var h = 50

//Run at draw
function runDraw(run) {
	if(run.keys['a'] == true) {
		x += 5
		if(x > 800) {
			x = 0
			y += h
		} 
		if(y > 600) {
			y = 0
			x = 0
		}
		background(200)
		rect(x,y,h)
	}
}