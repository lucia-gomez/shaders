let webcam;
let DIVISIONS = 20;
let levels = 2;
let time = 0;
const colors = [
	"#4C078B",
	"#8B0C30",
	"#9B197A",
	"#B6710A",
	"#0E852E",
	"black",
	"#17856F",
	"#021D31",
	"#7241f0",
];
let colorIdx = 0;

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const getColor = (idx) => colors[idx % colors.length];

function preload() {
	mapShader = loadShader("map.vert", "map.frag");
}

function setup() {
	createCanvas(900, windowHeight, WEBGL);

	let constraints = {
		audio: false,
	};
	webcam = createCapture(constraints);
	webcam.hide();
}

function draw() {
	background("white");
	noStroke();

	time += deltaTime * 0.001;

	mapShader.setUniform("uResolution", [width, height]);
	mapShader.setUniform("uDimensions", [width, height]);
	mapShader.setUniform("uTexMap", webcam);
	mapShader.setUniform("uTime", millis() / 1000);
	mapShader.setUniform("uOffset", map(mouseX, width, 0, 5, 20));
	shader(mapShader);

	beginShape(TRIANGLES);

	const center = createVector(width / 2, height / 2);
	const vertices = [];

	DIVISIONS = Math.floor(map(mouseX, 0, width, 3, 12));
	colorIdx = Math.floor(map(mouseY, 0, height, 0, colors.length));
	levels = Math.floor(map(mouseY, 0, height, 2, 9));

	const radii = [];
	for (let i = 0; i < levels; i++) {
		radii.push((i + 1) * (width / levels));
	}

	vertices[0] = [];
	for (let i = 0; i < DIVISIONS; i++) {
		vertices[0].push(createVector(center.x, center.y));
	}

	for (let level = 0; level < levels; level++) {
		vertices[level + 1] = [];
		for (let i = 0; i < DIVISIONS; i++) {
			let angle = map(i, 0, DIVISIONS, 0, TWO_PI);
			angle += (TWO_PI / DIVISIONS) * 0.5 * level;
			let x = center.x + radii[level] * cos(angle);
			let y = center.y + radii[level] * sin(angle);
			vertices[level + 1].push(createVector(x, y));
		}
	}

	for (let k = 0; k < levels; k++) {
		for (let i = 0; i < vertices[k].length; i++) {
			let j = (i + 1) % DIVISIONS;
			if (k === 0) {
				fill(getColor(colorIdx + 8));
				vertex(vertices[k][i].x, vertices[k][i].y, 0, 0.5, 1.5);
				fill(getColor(colorIdx + 9));
				vertex(vertices[k + 1][i].x, vertices[k + 1][i].y, 0, 1, 0);
				fill(getColor(colorIdx + 10));
				vertex(vertices[k + 1][j].x, vertices[k + 1][j].y, 0, 0, 0);
			} else {
				fill(getColor(colorIdx + 5 + k));
				vertex(vertices[k][i].x, vertices[k][i].y, k, 1, 0);
				fill(getColor(colorIdx + 6 + k));
				vertex(vertices[k][j].x, vertices[k][j].y, k, 0, 0);
				fill(getColor(colorIdx + 7 + k));
				vertex(vertices[k + 1][i].x, vertices[k + 1][i].y, k, 0.5, 1.5);

				fill(getColor(colorIdx + 2 + k));
				vertex(vertices[k][j].x, vertices[k][j].y, k, 0.5, 1.5);
				fill(getColor(colorIdx + 3 + k));
				vertex(vertices[k + 1][i].x, vertices[k + 1][i].y, k, 0, 0);
				fill(getColor(colorIdx + 4 + k));
				vertex(vertices[k + 1][j].x, vertices[k + 1][j].y, k, 1, 0);
			}
		}
	}

	endShape();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
