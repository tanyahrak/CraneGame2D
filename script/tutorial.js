// // module aliases
// // 
// const Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite,
//     Composites = Matter.Composites,
//     World = Matter.World,
//     Body = Matter.Body,
//     Constraint = Matter.Constraint;

// // create an engine
// const iEngine = Engine.create();
// const iRunner = Runner.create();

// // create a renderer
// const iRender = Render.create({
//     element: document.body,
//     engine: iEngine,
//     options:{
//         width:800,
//         height:300,
//         wireframes:false,
//         background:"white"
//     }
// });

// iEngine.gravity.y = 1.0;

// // create bodies
// const topWall = Bodies.rectangle(400, 10, 800, 20, { isStatic: true });
// const leftWall = Bodies.rectangle(10,150,20,300,{isStatic:true});
// const rightWall = Bodies.rectangle(790,150,20,300,{isStatic:true});
// const bottomWall = Bodies.rectangle(400,290,800,20,{isStatic:true});

// const box = Bodies.rectangle(460, 120, 40, 40);
// box.restitution = 0.5;
// bottomWall.friction = 0.8;
// box.friction = 0;

// var boxes = Composites.stack(500, 80, 3, 1, 10, 0, function(x, y) {
//     return Bodies.rectangle(x, y, 50, 40);
// });
// var chain = Composites.chain(boxes, 0.5, 0, -0.5, 0, { stiffness: 1});
// Composite.add(boxes, Constraint.create({
//     bodyA:boxes.bodies[0],
//     pointB:{x:500, y:15},
//     stiffness:0.8
// }));

// // add all of the bodies to the world
// World.add(iEngine.world, [topWall, leftWall, rightWall, bottomWall, box]);
// World.addComposite(iEngine.world, chain);

// // run the renderer
// Render.run(iRender);

// // run the engine
// Runner.run(iRunner, iEngine);

// document.querySelector('#scale').addEventListener('click',function(){
//     Body.scale(box, 1.5, 1.2);
// });

// document.querySelector('#rotate').addEventListener('click',function(){
//     Body.rotate(box, Math.PI / 6);
// });

// document.querySelector('#translate').addEventListener('click',function(){
//     Body.translate(box, {x:-10, y:20});
// });

// document.querySelector('#linear').addEventListener('click',function(){
//     Body.setVelocity(box, {x:10, y:-20});
// });

// document.querySelector('#angular').addEventListener('click',function(){
//     Body.setAngularVelocity(box, Math.PI/6);
// });

// document.querySelector('#force').addEventListener('click', function () {
//     Body.applyForce( box, {x: box.position.x, y: box.position.y}, {x: 0.04, y: 0});
// });