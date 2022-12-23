const numFlowers = 10;
const flowers = [];
const mouse_gravity_area = 10;
let count = 0;
let starArr = [];

function setup() {
    createCanvas(windowWidth, windowHeight*0.99);
    for (let i = 0; i < random(1000, 5000); i++) {
        flowers.push(new Flower(random(width * 2 - width / 2), random(height * 2 - height / 2)));
        count++;
    }
    setTimeout(createVectors, 10000)
}

function createVectors() {
    if(count < random(2000, 5000))
    {
        for (let i = 0; i < random(1000, 1500); i++) {
            flowers.push(new Flower(random(width * 2 - width / 2), random(height * 2 - height / 2)));
            count++;
        }
        console.log("Create new stars")
    }
    console.log(count)
    setTimeout(createVectors, 10000)
}

function draw() {
    background('#1b1c21');
    for (const flower of flowers) {
        flower.update();
        flower.display();
    }

    for(i in starArr)
    {
        let color = 255-(starArr[i].count * 0.5);
        if(color < 28)
        {
            color = 27;
        }
        // console.log('point: ' + i + ", c: " + starArr[i].count);
        noStroke();
        fill(color, color, color);
        smooth();
        ellipse(starArr[i].x, starArr[i].y, starArr[i].count*0.05);
    }
}

function windowResized() {
    resizeCanvas(windowWidth*0.99, windowHeight*0.99);
  }

class Flower {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = random(30, 100);
      this.speed = random(-0.2, 0.1);
      this.point_towards_x = random(width * 2 - width / 2);
      this.point_towards_y = random(height * 2 - height / 2);
      this.lookout_size = this.size + (this.size * random(1, 4));
      this.random_speed = random(0.1,0.2);
      this.origin_x = x;
      this.origin_y = y;
      this.set = false;
    }
  
    update() {
        if(this.set == false)
        {
            // Calculate distance between flower and mouse pointer
            const d = dist(this.x, this.y, mouseX, mouseY);
            if(d < (this.lookout_size) && d >= (this.size / (this.size*2)))
            {
                // Calculate new speed based on distance
                this.speed = map(d, 0, this.lookout_size, 1, this.random_speed);
                // Calculate angle between flower and mouse pointer
                const angle = atan2(mouseY - this.y, mouseX - this.x);
                // Update position based on speed and angle
                this.x += cos(angle) * this.speed;
                this.y += sin(angle) * this.speed;
            }
            else if(d >= (this.lookout_size))
            {
                let starFlag = false;

                for(var i=0; i<starArr.length; i++)
                {
                    const dToStar = dist(this.x, this.y, starArr[i].x, starArr[i].y)
                    if(dToStar >= 0 && dToStar < 5)
                    {
                        for(i in starArr)
                        {
                            if(this.x < (starArr[i].x + mouse_gravity_area))
                            {
                                if(this.x > (starArr[i].x - mouse_gravity_area))
                                {
                                    if(this.y < (starArr[i].y + mouse_gravity_area))
                                    {
                                        if(this.y > (starArr[i].y - mouse_gravity_area))
                                        {
                                            starFlag = true;
                                            starArr[i].count++;
                                        }
                                    }
                                }
                            }
                        }
                        this.set = true;
                    }

                    if(dToStar < this.lookout_size)
                    {
                        // Update position based on speed and angle
                        this.speed = map(dToStar, 0, this.lookout_size, 1, this.random_speed);
                        const angle = atan2(starArr[i].y - this.y, starArr[i].x - this.x);
                        this.x += (cos(angle) * this.random_speed);
                        this.y += (sin(angle) * this.random_speed);
                        starFlag = true;
                    }
                }

                if(starFlag == false)
                {
                    // Update position based on speed and angle
                    const angle = atan2(this.point_towards_y - this.y, this.point_towards_x - this.x);
                    this.x += (cos(angle) * this.random_speed);
                    this.y += (sin(angle) * this.random_speed);
                }
            }
            else {
                let starFlag = false;
                for(i in starArr)
                {
                    if(this.x < (starArr[i].x + starArr[i].lookout))
                    {
                        if(this.x > (starArr[i].x - starArr[i].lookout))
                        {
                            if(this.y < (starArr[i].y + starArr[i].lookout))
                            {
                                if(this.y > (starArr[i].y - starArr[i].lookout))
                                {
                                    starFlag = true;
                                    starArr[i].count++;
                                }
                            }
                        }
                    }
                }

                if(starFlag == false)
                {
                    let starObj = {};
                    starObj.count = 0;
                    starObj.x = this.x;
                    starObj.y = this.y;
                    starObj.lookout = random(5, 10)
                    starArr.push(starObj);
                }
                
                this.set = true;
                count--;
            }
        }
    }
  
    display() {
      noStroke();
      fill(255,255,255);
      smooth();
      ellipse(this.x, this.y, random(0.1, 1));
    }
  }
  
  
