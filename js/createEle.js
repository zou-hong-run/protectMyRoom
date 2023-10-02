import { allBladeEle,allMosquitoEle,resetAllBladeEle,resetAllMosquitoEle } from "./bus.js";
import { dieAudio } from "./music.js";
import { strToNum } from "./utils.js";
/**
 * 创建元素
 */
class CreateEle {
    /**
     * 创建元素
     * @param {{name:string,id:string,styles:CSSStyleDeclaration.cssText,parent:HTMLElement}} options 
     */
    constructor(options) {
        this.type = "blade"
        this.parent = options.parent;
        // 元素的当前状态
        this.status = "idle";
        // 移动速度
        this.speed = 20;
        // 旋转角度
        this.deg = 0;
        // 每次移动的位移
        this.xStep = 0;
        this.yStep = 0;

        this.name = options.name;
        this.id = options.id;
        this.styles = options.styles;
        this.ele = null;
        this.initEle();
    }
    initEle() {
        let newEle = document.createElement(this.name);
        newEle.id = this.id;
        newEle.style.cssText += this.styles;
        this.ele = newEle;
        // 180度 = π弧度 
        // 一弧度 = 180/π度
        // 一度 = π/180 弧度
        // 这里是度 +90作为转换
        this.deg = strToNum(this.ele.style.rotate) + 90;
        // Math.cos使用的弧度 这里要把度转为弧度 x度 = x*(π/180) 弧度
        this.xStep = this.getSpeed() * (Math.cos(this.deg * (Math.PI / 180)));
        this.yStep = this.getSpeed() * (Math.sin(this.deg * (Math.PI / 180)));
        this.parent.appendChild(this.ele);
    }

    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        if (this.setSpeed >= 100) {
            this.speed = 100;
            return;
        }
        this.speed = speed
    }
    getDeg() {
        return strToNum(this.ele.style.rotate);
    }
    setDeg(deg) {
        this.ele.style.rotate = deg + "deg";
    }

    getLeft() {
        return strToNum(this.ele.style.left);
    }
    getRight() {
        return strToNum(this.ele.style.right);
    }
    getTop() {
        return strToNum(this.ele.style.top);
    }
    getBottom() {
        return strToNum(this.ele.style.bottom);
    }

    setLeft(left) {
        // 反弹
        // if (
        //     left + this.ele.getBoundingClientRect().width 
        //     > 
        //     this.parent.getBoundingClientRect().width
        // ) {
        //     left = this.parent.getBoundingClientRect().width - this.ele.getBoundingClientRect().width;
        //     this.xStep = -this.xStep;
        // }
        // else if (left < 0) {
        //     left = 0;
        //     this.xStep = -this.xStep;
        // }
        this.ele.style.left = left + "px";
    }
    setRight(right) {
        this.ele.style.right = right + "px"
    }
    setTop(top) {
        // 反弹
        // if (top + this.ele.getBoundingClientRect().height > this.parent.getBoundingClientRect().height) {
        //     top = this.parent.getBoundingClientRect().height - this.ele.getBoundingClientRect().height;
        //     this.yStep = -this.yStep;
        // } else if (top < 0) {
        //     top = 0;
        //     this.yStep = -this.yStep;
        // }
        this.ele.style.top = top + "px";
    }
    setBottom(bottom) {
        this.ele.style.bottom = bottom + "px"
    }

    move() {
        let left;
        let top;
        let isCollisionEle;
        if (this.type === "blade") {
            left = this.getLeft() - this.xStep;
            top = this.getTop() - this.yStep;

            // 检查碰撞
            isCollisionEle = allMosquitoEle.find(item => this.collision(item));
        }
        else {
            left = this.getLeft() + (Math.floor(Math.random() * 2) / 2 == 0 ? 1 : -1) * 5;
            top = this.getTop() + (Math.floor(Math.random() * 2) / 2 == 0 ? 1 : -1) * 5;

            // 检查碰撞
            // isCollisionEle = allBladeEle.find(item => this.collision(item));
        }


        if (isCollisionEle) {
            isCollisionEle.die();
            this.die()
            return;
        }

        // 离开可视区清除
        if (
            left >= this.parent.getBoundingClientRect().width ||
            left <= 0 ||
            top >= this.parent.getBoundingClientRect().height - this.ele.getBoundingClientRect().width ||
            top <= 0
        ) {
            this.die();
            return
        }

        this.setLeft(left);
        this.setTop(top);

    }
    idle() {
        let left = this.getLeft();
        let top = this.getTop();

        this.setLeft(left);
        this.setTop(top);
    }
    die() {

        this.type !== "blade" && dieAudio().play();

        resetAllBladeEle(allBladeEle.filter(item => item !== this));
        resetAllMosquitoEle(allMosquitoEle.filter(item => item !== this))
        this.ele.style.cssText += `
            background:url("./assets/imgs/explosion.gif");
            background-size:100% 100%;
            border:none;
        `;
        setTimeout(() => {
            this.parent.removeChild(this.ele);
        }, 500);
    }
    collision(target) {
        // debugger
        let myEle = this.ele;
        let targeEle = target.ele;
        let isCollision = false;
        if (
            !(
                strToNum(myEle.style.left) > strToNum(targeEle.style.left) + strToNum(targeEle.style.width) ||
                strToNum(myEle.style.left) + strToNum(myEle.style.width) < strToNum(targeEle.style.left) ||
                strToNum(myEle.style.top) > strToNum(targeEle.style.top) + strToNum(targeEle.style.height) ||
                strToNum(myEle.style.top) + strToNum(myEle.style.height) < strToNum(targeEle.style.top)
            )
        ) {
            // 碰撞
            isCollision = true;
        }
        return isCollision;
    }
}

export default CreateEle;