class shapeClass {
    constructor(shapetype, param1, rotateXvalue, rotateYvalue, rotateZvalue, translateX, translateY,
         textureValue) {
        this.shapetype = shapetype;
        this.param1 = param1;
        this.rotateXvalue = rotateXvalue;
        this.rotateYvalue = rotateYvalue;
        this.rotateZvalue = rotateZvalue;
        this.translateX = translateX;
        this.translateY = translateY;
        this.textureValue = textureValue;}

        draw(fCount) {
            push();
            translate(this.translateX, this.translateY);
    
            rotateX(this.rotateXvalue * fCount);
            rotateY(this.rotateYvalue * fCount);
            rotateZ(this.rotateZvalue)
            texture(this.textureValue);
            if (this.shapetype == "sphere") {
                sphere(this.param1);
            }
            pop();
        }

}