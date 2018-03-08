class Glob {
    constructor(size) {
        this.pos = this.getStartPosition();
        this.speed = random( 0.05, 0.13 );
        this.size = random( 3, 100 );
        this.spawnTime = two.frameCount;
        this.movementVector = this.getMovementVector();

        if (size != undefined) {
            this.size = size;
        }

        this.shape = two.makeCircle( this.pos.x, this.pos.y, this.size );
        this.shape.fill = 'red';
        this.shape.noStroke();

        layerTwo.add(this.shape);
    }

    update() {
        this.updatePosition();
        this.checkDeath();
        this.shape.translation.set( this.pos.x, this.pos.y );
    }

    delete(obj) {
        layerTwo.remove(this.shape);
        two.remove(this.shape);
        removeFromArray(globs, obj);
    }

    checkDeath() {
        let lifeTime = two.frameCount - this.spawnTime;
        if (!collisionRectangle(this.pos.x, this.pos.y, this.size * 2, this.size * 2, canvas.x, canvas.y, canvas.w, canvas.h) && lifeTime > 200) {
            this.delete(this);
        }
    }

    updatePosition() {
        if (two.timeDelta === undefined) {
            two.timeDelta = 1;
        }
        this.pos.x += this.movementVector.x * this.speed * two.timeDelta;
        this.pos.y += this.movementVector.y * this.speed * two.timeDelta;
    }

    getMovementVector() {
        return getVector( this.pos.x, this.pos.y, random(0, canvas.w), random(0, canvas.h) );
    }

    getStartPosition() {
        return randomInArea({ area: {x: canvas.w / 2, y: canvas.h / 2, w: canvas.w + 100, h: canvas.h + 100}, mask: {x: canvas.w / 2, y: canvas.h / 2, w: canvas.w, h: canvas.h} });
    }    

}