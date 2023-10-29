// create bodies
const wallTop = 100; // 壁上端
const wallBottom = 500; // 壁下端（壁厚の外側）
const wallLeft = 0; // 壁左端（壁厚の外側）
const wallRight = 850; // 壁右端（壁厚の外側）
const wallThick = 20;
const partitionCenterX = 600; // 間仕切りの中心のX座標
const partitionTop = 250; // 間仕切上端

function createRectangle(left, top, right, bottom, isStatic){
    return Bodies.rectangle((left + right)/2, (bottom + top)/2, right - left, bottom-top, {isStatic:isStatic});
}
const leftWall = createRectangle(wallLeft, wallTop, wallLeft + wallThick, wallBottom - wallThick, true);
const rightWall = createRectangle(wallRight - wallThick, wallTop, wallRight, wallBottom - wallThick, true);
const bottomWall = createRectangle(wallLeft, wallBottom - wallThick, wallRight, wallBottom, true);
const partition = createRectangle(partitionCenterX - wallThick / 2, partitionTop, partitionCenterX +  wallThick / 2, wallBottom - wallThick, true);

const crane = new Crane((wallLeft + wallRight) / 2, 0);

// 玉を沢山用意
var balls = Composites.stack(wallLeft + wallThick / 2 + 15, 250, 10, 3, 5, 5, function(x, y) {
    return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
});

// add all of the bodies to the world
World.add(iEngine.world, [leftWall, rightWall, bottomWall, partition, crane.whole, balls]);
// run the renderer
Render.run(iRender);

// run the engine
Runner.run(iRunner, iEngine);

Events.on(iEngine, 'beforeUpdate', moveCraneBody);

function moveCraneBody(){
    crane.move(moveDirection);
    if(armIsOpening){
        crane.openArm();
    }
}

document.getElementById("addABall").addEventListener ("click", () => {
    let circle = Bodies.circle(300 + Math.random() * 200, 500, 40);
    World.addBody(iEngine.world, circle);
});