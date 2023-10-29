// module aliases
// 
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    World = Matter.World,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Events = Matter.Events;
    Common = Matter.Common;

// create an engine
const iEngine = Engine.create();
const iRunner = Runner.create();

// create a renderer
const iRender = Render.create({
    element: document.body,
    engine: iEngine,
    options:{
        width:800,
        height:800,
        wireframes:false,
        background:"white"
    }
});

iEngine.gravity.y = 1;
