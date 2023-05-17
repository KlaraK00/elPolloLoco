class DrawableObject {
    imageCache = {};
    currentImage = 0;
    x = 250;
    y = 280;
    img;
    height = 150;
    width = 100;

    //loadImage('img/test.png');
    //loadImage kann dauern eine Sekunde; drawmethode schon bevor image geladen ist.
    loadImage(path) {
        this.img = new Image(); //Image-Objekt existiert bereits; <img id="image">; image-tag / document.getElementById('image')
        this.img.src = path;
        // if (x) {
        // this.img.x = x;
        // this.img.y = y;
        // this.img.height = height;
        // this.img.width = width;
        // }
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;      
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) { 
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}