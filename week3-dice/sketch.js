function preload() {
	mapShader = loadShader("map.vert", "map.frag");
}

function setup() {
	createCanvas(windowHeight, windowHeight, WEBGL);
}

let time = 0;

function draw() {
	noStroke();

	time += deltaTime;

	mapShader.setUniform("uResolution", [width, height]);
	mapShader.setUniform("uTime", time / 500);
	shader(mapShader);

	const paddingX = 0;
	const paddingY = 0;

	const left = paddingX;
	const top = paddingY;
	const right = width - paddingX;
	const bottom = height - paddingY;

	beginShape(TRIANGLE_STRIP);

	vertex(left, top, 0, 0, 0);
	vertex(right, top, 0, 1, 0);
	vertex(left, bottom, 0, 0, 1);
	vertex(right, bottom, 0, 1, 1);

	endShape();
}

function windowResized() {
	resizeCanvas(windowHeight, windowHeight);
}
