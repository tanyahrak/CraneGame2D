// create bodies
const wallTop = 200; // 壁上端
const wallBottom = 500; // 壁下端（壁厚の外側）
const wallLeft = 0; // 壁左端（壁厚の外側）
const wallRight = 600; // 壁右端（壁厚の外側）
const wallThick = 20;
const leftWall = Bodies.rectangle(wallLeft + wallThick / 2, (wallTop + wallBottom) / 2, wallThick, wallBottom - wallTop, {isStatic:true});
const rightWall = Bodies.rectangle(wallRight - wallThick / 2, (wallTop + wallBottom) / 2, wallThick, wallBottom - wallTop, {isStatic:true});
const bottomWall = Bodies.rectangle((wallLeft + wallRight) / 2, wallBottom - wallThick / 2, wallRight - wallLeft , wallThick, {isStatic:true});

const crane = new Crane((wallLeft + wallRight) / 2, 0);

// 玉を沢山用意
var stack = Composites.stack(wallLeft + wallThick / 2 + 15, 250, 10, 3, 5, 5, function(x, y) {
    return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
});
World.add(iEngine.world, stack);

// add all of the bodies to the world
World.add(iEngine.world, [leftWall, rightWall, bottomWall, crane.whole]);
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