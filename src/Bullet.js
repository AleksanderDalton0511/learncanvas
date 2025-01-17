import * as Phaser from "phaser";
import { MainScene } from "./MainScene";
import mapJSON from './assets/map.json';

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    hit = false;

    constructor(scene,x,y, target){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_arrow');
        this.setScale(1.5);
        this.body.setMaxSpeed(800);
        this.body.useDamping = true;
        //this.body.setDrag(0.5, 0.5);
        console.log(Phaser.Math.Angle.BetweenPoints(this, target));
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
        scene.physics.moveToObject(this, target, 800);
        
        scene.physics.add.collider(this, scene.map.getLayer("Floor").tilemapLayer, () => {
            this.body.setVelocity(0);
        });

        scene.physics.add.collider(this, scene.goblin, (bullet, goblin) => {
            if(this.hit===false){
            this.hit=true;
            this.body.setVelocity(0);
            goblin.health = goblin.health - 50;
            console.log(goblin.health);
    }});
    }

    // preUpdate(time,delta){
    //     this.x += this.speed.x/1000*delta;
    //     this.y += this.speed.y/1000*delta;
    // }



    // setSpeed(axis, side){
    //     this.speed[axis] = side * this.maxSpeed;
    // }
    // setSpeedsFromAngle(angle){
    //     this.speed.y = this.maxSpeed * Math.cos(angle);
    //     this.speed.x = this.maxSpeed * Math.sin(angle);
    // }
}