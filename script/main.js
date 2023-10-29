// create bodies
const leftWall = Bodies.rectangle(10, 500, 20, 600, {isStatic:true});
const rightWall = Bodies.rectangle(790,500,20,600,{isStatic:true});
const bottomWall = Bodies.rectangle(400,790,800,20,{isStatic:true});

const crane = new Crane();

// 玉を沢山用意
var stack = Composites.stack(100, 300, 10, 5, 10, 10, function(x, y) {
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