const myDirection = {
    none:0,
    left:1,
    right:2,
    up:3,
    down:4
};
let moveDirection = myDirection.none;
let armIsOpening = false;

document.getElementById("left").addEventListener ("mousedown", () => {moveDirection = myDirection.left}); 
document.getElementById("right").addEventListener ("mousedown", () => {moveDirection = myDirection.right}); 
document.getElementById("up").addEventListener ("mousedown", () => {moveDirection = myDirection.up}); 
document.getElementById("down").addEventListener ("mousedown", () => {moveDirection = myDirection.down}); 
document.addEventListener ("mouseup", () => {moveDirection = myDirection.none});

document.getElementById("open").addEventListener ("click", () => {armIsOpening = true});
document.getElementById("close").addEventListener ("click", () => {armIsOpening = false});