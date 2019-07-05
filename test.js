// class A {
//   constructor(params) {
//     this.ax = 1;
//   }

//   call() {
//     this.run();
//   }

//   run() {
//     console.log(this);
//   }
// }

class A {
  constructor(name, image, x, y, speed) {
    this.name = name;
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
}

class B extends A {
  constructor(name, image, x, y, speed) {
    super(name, image, x, y, speed);
  }
}

class C extends A {
  constructor(name, image, x, y, lives) {
    super(name, image, x, y);
    this.lives = lives;
  }
}

const a = new A("miles", { width: 10, height: 20 }, 10, 20, 8);

const b = new B("gg", { width: 1, height: 2 }, 2, 2, 8);

const c = new C("gg", { width: 100, height: 200 }, 3, 3, 10);
