class animationImage {

  constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.currentAnimation;
      this.createAnimation();
      this.direction = "";
  }

  getX() {
      return this.x;
  }

  setX(x) {
      this.x = x;
  }

  setCurrentFrameCount(currentFrameCount) {

      this.currentFrameCount = currentFrameCount;
  }

  createAnimation() {
      this.currentAnimation = createSprite(this.x, this.y);
      this.currentAnimation.rotation = 0;
      this.currentAnimation.frameDelay=500;
  }

  loadAnimation(animationType, fileNames) {


      this.currentAnimation.addAnimation(animationType, fileNames[1], fileNames[fileNames.length - 1]);
      // set the hit box
      this.currentAnimation.width = 300;
      this.currentAnimation.height = 150;
      this.currentAnimation.rotation = 0;
      this.currentAnimation.frameDelay= 5;

  }


  drawAnimation(animationType) {
      
      this.currentAnimation.frameDelay = 1000;
      this.currentAnimation.scale = .1;
      this.currentAnimation.changeAnimation(animationType);
      this.currentAnimation.rotation = 0;
      if (animationType == 'walk' && this.direction == 'forward') {
          this.currentAnimation.direction = 0;
          this.currentAnimation.mirror.x = false;
          this.currentAnimation.speed = 5;

      }
      else if (animationType == 'walk' && this.direction == 'reverse') {

          this.currentAnimation.mirror.x = true;
          this.currentAnimation.direction = 180;
          this.currentAnimation.speed = 5;

      }

      else if (animationType == 'walk' && this.direction == 'up') {
        this.currentAnimation.direction = 270;
        this.currentAnimation.speed = 5;
    }
        else if (animationType == 'walk' && this.direction == 'down') {
        this.currentAnimation.direction = 90;
        this.currentAnimation.speed = 5;
    }
      else {
          this.currentAnimation.velocity.x = 0;
          this.currentAnimation.velocity.y = 0;
      }


  }

  incrementIndex() {

      if (this.currentFrameCount % 5 == 0) {
          this.i++;
      }

      if (this.i >= this.fileNames.length) {
          this.i = 0;
      }
  }

  updatePosition(direction) {
      this.direction = direction;
     
  }

  isColliding(myImage) {
      return this.currentAnimation.collide(myImage);
      
  }

}