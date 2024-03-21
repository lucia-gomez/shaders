function setup() {
	createCanvas(window.innerHeight * 1.5 - 25, window.innerHeight - 25, WEBGL);
}

let thetaX = 0;
let thetaY = 0;
let thetaXDir = 1;
let thetaYDir = -1;

function draw() {
	background();

	thetaX += deltaTime * 0.00005 * thetaXDir;

	if (thetaX > Math.PI / 16 || thetaX < -Math.PI / 16) {
		thetaXDir *= -1;
	}

	translate(-width / 2, -height / 2);
	rotateX(thetaX);

	noStroke();

	let scale = 20;
	const colors = ["magenta", "orange", "cyan"];

	beginShape(TRIANGLE_STRIP);
	for (let i = 0; i <= 40; i++) {
		let distFromPoint = dist(mouseX, mouseY, i * scale, i * scale);

		fill(colors[0]);
		vertex(i * scale, i * scale, 2 * distFromPoint);
		fill(colors[1]);
		vertex((i + 1) * scale, (i + 1) * scale, i * scale);
		fill(colors[2]);
		vertex((i + 1) * scale, i * scale, 0);
	}
	endShape();

	let gap = 200;
	beginShape(TRIANGLE_STRIP);
	for (let i = 1; i <= 60; i++) {
		let distFromPoint = dist(mouseX, mouseY, i * scale + gap, i * scale);

		fill(colors[0]);
		vertex(i * scale + gap, i * scale - gap, 2 * distFromPoint);
		fill(colors[1]);
		vertex((i + 1) * scale + gap, i * scale - gap, 0);
		fill(colors[2]);
		vertex((i + 1) * scale + gap, (i + 1) * scale - gap, -1 * i * scale);
	}
	endShape();
}
