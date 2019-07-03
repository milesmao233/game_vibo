var imageFromPath = function(path) {
  var img = new Image();
  img.src = path;
  return img;
};

class Item {
  constructor(path, x, y) {
    this.image = imageFromPath(path);
    this.x = x;
    this.y = y;
  }
}

export default Item;
