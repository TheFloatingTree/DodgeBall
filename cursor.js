class Cursor {
    constructor() {
        this.pos = {
            x: canvas.w / 2,
            y: canvas.h / 2
        }
        this.size = 7
        this.score = 0;

        this.shape = two.makeCircle( this.pos.x, this.pos.y, this.size );
        this.shape.fill = 'grey';
        this.shape.noStroke();

        layerOne.add(this.shape);
    }

    update() {
        this.updatePosition();
        this.shape.translation.set( this.pos.x, this.pos.y );

        this.collision();
    }

    collision() {
        for (let i = 0; i < globs.length; i++) {
            if (collisionCircle(this.pos.x, this.pos.y, this.size, globs[i].pos.x, globs[i].pos.y, globs[i].size)) {
                if (this.size >= globs[i].size) {
                    this.size += globs[i].size / (globs[i].size * 2);
                    this.score++;
                    this.updateScale();
                    
                    globs[i].delete(globs[i]);
                } else {
                    reset();
                }
            }
        } 
    }

    updateScale() {
        this.shape.scale = this.size / 7;
    }

    updatePosition() {
        this.pos.x = mpos.x;
        this.pos.y = mpos.y;
    }
    
}