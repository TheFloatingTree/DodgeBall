const canvas =  { x: window.innerWidth / 2, y: window.innerHeight / 2, w: window.innerWidth, h: window.innerHeight };

var mpos = {x: canvas.w / 2, y: canvas.h / 2, b:0, xd: 0, yd: 0};

$( "#content" ).mousemove(function( event ) {
    mpos.xd = mpos.x - event.pageX;
    mpos.yd = mpos.y - event.pageY;

    mpos.xd = -mpos.xd;
    mpos.yd = -mpos.yd;

    mpos.x = event.pageX;
    mpos.y = event.pageY;
});

$( "#content" ).mousedown(function( event ) {
    mpos.b = 1;
});

$( "#content" ).mouseup(function( event ) {
    mpos.b = 0;
});

function collisionCircle(x1, y1, r1, x2, y2, r2) {
    let dist = distance(x1, y1, x2, y2);
    
    if (dist < r1 + r2) {
        return true;
    } else {
        return false;
    }
}

function collisionRectangle(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((Math.abs(x1 - x2) * 2 < (w1 + w2)) && (Math.abs(y1 - y2) * 2 < (h1 + h2))) {
        return true;
    } else {
        return false;
    }
}

function removeFromArray(arr, obj) {
    let index = arr.indexOf(obj);
    arr.splice(index, 1);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInArea(context) {
    let area = context.area;
    let mask = context.mask;

    let output = {
        x: 0,
        y: 0
    }

    output.x = random(area.x - area.w / 2, area.x + area.w / 2);
    output.y = random(area.y - area.h / 2, area.y + area.h / 2);

    while (output.x < mask.x + mask.w / 2 && output.x > mask.x - mask.w / 2) {
        output.x = random(area.x - area.w / 2, area.x + area.w / 2);
    }

    while (output.y < mask.y + mask.h / 2 && output.y > mask.y - mask.h / 2) {
        output.y = random(area.y - area.h / 2, area.y + area.h / 2);
    }

    return output;
}

function distance(x1, y1, x2, y2) {
    let a = x1 - x2
    let b = y1 - y2

    return Math.sqrt( a*a + b*b );
}

function getAngle(x1, y1, x2, y2) {
    let dy = y2 - y1;
    let dx = x2 - x1;

    return Math.atan2(dy, dx);
}

function getVector(x1, y1, x2, y2) {
        let x = x1 - x2;
        let y = y1 - y2;

        if (x === 0 && y === 0) {
            return {x: x, y: y};
        }

        let hyp = Math.sqrt(x * x + y * y);

        x /= hyp;
        y /= hyp;

        return {x: -x, y: -y};
}