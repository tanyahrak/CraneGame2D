class Crane{
    // Composite Parts
    torso;
    torsoComposite;
    armLeft;
    armRight;
    whole;
    
    // shape constants
    static bodyCenterX = 400;
    static bodyCenterY = 150;
    static torsoHeight = 300;
    static torsoWidth = 60;
    static armThick = 10;
    static armHalfLength = 100;
    static armDensity = 0.001 * 10; // densityはデフォルトが0.001。

    createTorso(){
        this.torso = Bodies.rectangle(Crane.bodyCenterX, Crane.bodyCenterY, Crane.torsoWidth,Crane.torsoHeight, {isStatic:true});
        this.torso.collisionFilter.group = -1;// armと干渉しないように
        this.torso.render.fillStyle = 'orange';
    }

    static createArm(isLeft){
        let offsetX = Crane.torsoWidth / 2 - Crane.armThick + Crane.armHalfLength / 2;
        if (isLeft){ offsetX *= -1; }
        const armPart1 = Bodies.rectangle(Crane.bodyCenterX + offsetX, Crane.torsoHeight - Crane.armThick / 2, Crane.armHalfLength, Crane.armThick, {isStatic:false});
        Body.setDensity(armPart1, Crane.armDensity);
        offsetX = Crane.torsoWidth / 2 + Crane.armHalfLength - Crane.armThick;
        if (isLeft){ offsetX *= -1; }
        const armPart2 = Bodies.rectangle(Crane.bodyCenterX + offsetX, Crane.torsoHeight - Crane.armThick + Crane.armHalfLength / 2, Crane.armThick, Crane.armHalfLength, {isStatic:false});
        Body.setDensity(armPart2, Crane.armDensity);
        let arm = Body.create({ parts: [armPart1, armPart2]});
        arm.collisionFilter.group = -1;
        return arm;
    }

    createArmConstraint(arm, isLeft){
        // torsoの中心から見た接続点の位置。
        let offsetFromTorso = Matter.Vector.create(0, 0);
        offsetFromTorso.x = Crane.torsoWidth / 2 - Crane.armThick / 2;
        offsetFromTorso.y = Crane.torsoHeight / 2 - Crane.armThick / 2;
        if (isLeft) {offsetFromTorso.x *= -1;}

        // armの重心から見た接続点の位置。
        let offsetFromArm = Matter.Vector.create(0,0);
        if(isLeft){
            offsetFromArm.x = arm.bounds.max.x - arm.position.x - Crane.armThick / 2;
        }else{
            offsetFromArm.x = arm.bounds.min.x - arm.position.x + Crane.armThick / 2;
        }
        offsetFromArm.y = arm.bounds.min.y - arm.position.y + Crane.armThick / 2;

        return Constraint.create({
            bodyA:this.torso,
            pointA:offsetFromTorso,
            bodyB:arm,
            pointB:offsetFromArm,
            stiffness: 0.7,// 0.8以上にするとバグる
            damping:0.02,
            length:0
        });
    }

    createStopper() {
        const stopper = Bodies.rectangle(Crane.bodyCenterX, Crane.bodyCenterY + Crane.torsoHeight / 2 - 20, Crane.torsoWidth * 2, 10, {isStatic:true});
        stopper.render.fillStyle = 'orange';
        return stopper;
    }

    constructor(){
        this.createTorso();
        this.armLeft = Crane.createArm(true);
        this.armRight = Crane.createArm(false);

        const constraintLeftArm = this.createArmConstraint(this.armLeft, true);
        const constraintRightArm = this.createArmConstraint(this.armRight, false);
        const stopper = this.createStopper();

        this.torsoComposite = Composite.create();
        Composite.add(this.torsoComposite, [this.torso, stopper]);

        this.whole = Composite.create();
        Composite.add(this.whole, [this.torsoComposite, this.armLeft, this.armRight, constraintLeftArm, constraintRightArm]);
    }

    move(direction){
        if(direction == myDirection.none) {return;}
        let moveVector = Matter.Vector.create(0,0);
        switch(direction){
            case myDirection.left : moveVector.x = -1;break;
            case myDirection.right : moveVector.x = +1;break;
            case myDirection.up : moveVector.y = -1;break;
            case myDirection.down : moveVector.y = +1;break;
        }
        Composite.translate(this.torsoComposite, moveVector);
    }

    openArm(){
        // 回転する方向に沿って、腕を開く向きの力を作用させる。
        // 腕の重さと同じ力をかけると、腕が水平な時に重力に釣り合う。水平でないときは、重力が回転するベクトルと軸を引っ張るベクトルに分解されているから。
        // 腕が水平にはならないように、腕の重さの7割の力をかける。
        let forceVector = Matter.Vector.create(0, -iEngine.gravity.scale * iEngine.gravity.y * this.armLeft.mass * 0.7);
        let leftForceVector = Matter.Vector.rotate(forceVector, this.armLeft.angle);
        Body.applyForce(this.armLeft, this.armLeft.position, leftForceVector);
        let rightForceVector = Matter.Vector.rotate(forceVector, this.armRight.angle);
        Body.applyForce(this.armRight, this.armRight.position, rightForceVector);
    }

    openArm_Quick(){
        // setAngle, setAngularVelocityを使う方法。一瞬で腕が開くので、腕を開いたときに吹っ飛ばされる。
        // Body.setAngle(this.armLeft, 0);
        // Body.setAngularVelocity(this.armLeft, 0);
        // Body.setAngle(this.armRight, 0);
        // Body.setAngularVelocity(this.armRight, 0);
    }
}