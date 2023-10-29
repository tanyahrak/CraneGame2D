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
document.getElementById("left").addEventListener ("mouseup", () => {moveDirection = myDirection.none});
document.getElementById("right").addEventListener ("mousedown", () => {moveDirection = myDirection.right}); 
document.getElementById("right").addEventListener ("mouseup", () => {moveDirection = myDirection.none});
document.getElementById("up").addEventListener ("mousedown", () => {moveDirection = myDirection.up}); 
document.getElementById("up").addEventListener ("mouseup", () => {moveDirection = myDirection.none});
document.getElementById("down").addEventListener ("mousedown", () => {moveDirection = myDirection.down}); 
document.getElementById("down").addEventListener ("mouseup", () => {moveDirection = myDirection.none});

document.getElementById("open").addEventListener ("mouseup", () => {armIsOpening = true});
document.getElementById("close").addEventListener ("mouseup", () => {armIsOpening = false});