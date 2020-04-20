let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

window.addEventListener("resize", i);

//Attempt to change direction
function getMove (vx, vy) {
	r = Math.random();
	//Only ~30% of attempts will actually change the direction so trails don't just keep turning
	if (r < 0.7) {
		return [vx, vy];
	} else if (r < 0.8) {
		if (vx == 0) {
			vy = -vy;
		} else {
			vx = -vx;
		}
	} else if (r < 0.9) {
		if (vx == 0) {
			vx = vy;
			vy = 0;
		} else {
			vy = vx;
			vx = 0;
		}
	} else {
		if (vx == 0) {
			vx = -vy;
			vy = 0;
		} else {
			vy = -vx;
			vx = 0;
		}
	}
	return [vx, vy];
}

//Maze trail
let ii = function (w, h, sw, sh, i) {
	this.i = i;
	this.v = [];
	if (Math.random() > 0.5) {
		this.v[0] = Math.random() > 0.5 ? 1 : -1;
		this.v[1] = 0;
	} else {
		this.v[0] = 0;
		this.v[1] = Math.random() > 0.5 ? 1 : -1;
	}
	this.fail = false;
	
	this.x = Math.round(Math.random() * w - 1);
	this.y = Math.round(Math.random() * h - 1);
	
	this.hx = this.x;
	this.hy = this.y;
	this.draw = function () {
		used.push([this.x, this.y]);
		this.fail = false;
		this.fails = 0;
		//Try to move (keep trying until 10 unsuccessful attempts)
		do {
			this.fail = false;
			this.v = getMove(this.v[0], this.v[1]);
			this.px = this.x + this.v[0];
			this.py = this.y + this.v[1];
			db:
			for (let x in used) {
				if (used[x][0] == this.px && used[x][1] == this.py) {
					this.fail = true;
					this.fails += 1;
					break db;
				} else if (used[x][0] == this.x && used[x][1] == this.y) {
				} else if (used[x][0] == this.hx && used[x][1] == this.hy) {
				} else {
					this.s = [];
					this.s.push([used[x][0] - 1, used[x][1] - 1]);
					this.s.push([used[x][0], used[x][1] - 1]);
					this.s.push([used[x][0] + 1, used[x][1] - 1]);
					this.s.push([used[x][0] - 1, used[x][1]]);
					this.s.push([used[x][0], used[x][1]]);
					this.s.push([used[x][0] + 1, used[x][1]]);
					this.s.push([used[x][0] - 1, used[x][1] + 1]);
					this.s.push([used[x][0], used[x][1] + 1]);
					this.s.push([used[x][0] + 1, used[x][1] + 1]);
					for (let n in this.s) {
						if (this.px == this.s[n][0] && this.py == this.s[n][1]) {
							this.fail = true;
							this.fails += 1;
							break db;
						}
					}
				}
			}				
		} while (this.fail && this.fails < 10);
		if (this.fail) {
			//If failed, create new trail ...
			iii = [];
			iii.push(new ii(Math.round(window.innerWidth / 5),Math.round(window.innerHeight / 5),window.innerWidth / Math.round(window.innerWidth / 5),window.innerHeight / Math.round(window.innerHeight / 5)));
		} else {
			//Otherwise draw on new square
			this.hx = this.x;
			this.hy = this.y;
			this.x = this.px;
			this.y = this.py;
			c.fillRect(this.x * sw, this.y * sh, sw, sh);
			if (this.x < 0 || this.x > w - 1 || this.y < 0 || this.y > h - 1) {
				iii = [];
				iii.push(new ii(Math.round(window.innerWidth / 5),Math.round(window.innerHeight / 5),window.innerWidth / Math.round(window.innerWidth / 5),window.innerHeight / Math.round(window.innerHeight / 5)));
			}
		}
	}
};

let iii = [];
let used = [];

//Setup function
function i() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);
	iii = [];
	used = [];
	iii.push(new ii(Math.round(window.innerWidth / 5), Math.round(window.innerHeight / 5), window.innerWidth / Math.round(window.innerWidth / 5), window.innerHeight / Math.round(window.innerHeight / 5)));
}

//Animation function
function iv () {
	requestAnimationFrame(iv);
	for (let x in iii) {
		iii[x].draw();
	}
}

//Get generating ...
i();
iv();