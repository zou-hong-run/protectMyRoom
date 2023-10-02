import { fixTip, modal, showData, showTip, throttle } from "./utils.js";
import { allBladeEle, allMosquitoEle } from "./bus.js"
import {
    fire1,
    fire2,
    fire3,
    noise1,
    noise2,
    noise3,
    paidaAudio
} from "./music.js";
import CreateEle from "./createEle.js";
// 页面元素
let body = document.body;

// 判断游戏是否结束
let isEnded = false;
// 创建元素的速度
let createBladeSpeed = 500;
let createMosquitoSpeed = 200;
// 元素的移动速度
let moveEleSpeed = 100;
// 元素的动画状态
let animationState = ""

// 创建元素的尺寸
let bladeSize = 40;
let mosquitoASize = 200;

// 最大创建元素数量
let limitSize = 6

// 刀
let knife = new CreateEle({
    name: "div",
    id: "knife",
    styles: `
        position: absolute;
        border:2px solid black;
        border-radius: 25px;
        top:${body.getBoundingClientRect().height - 300}px;
        left: ${body.getBoundingClientRect().width / 2 - 40}px;
        width: 100px;
        height: 150px;
        background:url("./assets/imgs/nife2.jpg");
        background-size:100% 100%;
        rotate: 0deg;
        animation:dance 10s infinite linear;
    `,
    parent: body,
});


// 创建元素
let createBlade = throttle(() => {
    // 添加音效a
    let fireArr = [
        fire2
    ];
    let randomNum = Math.floor(Math.random() * fireArr.length);

    fireArr[randomNum]() && fireArr[randomNum]().play();
    // 创建元素
    let blade = new CreateEle({
        name: "div",
        id: "blade",
        styles: `
            border-radius:5px;
            border:1px solid black;
            position:absolute;
            left:${Math.floor(Math.random() * 50 - 25) + 1 + knife.getLeft() + bladeSize / 2}px;     
            top:${Math.floor(Math.random() * 50 - 25) + 1 + knife.getTop() + bladeSize / 2 - 20}px;
            width:${bladeSize}px;
            height:${bladeSize * 3}px;
            background:url("./assets/imgs/nife.jfif");
            background-size:100% 100%;
            rotate:${knife.getDeg()}deg;
            ${animationState === "rotate" ? "animation: rotate 0.1s linear infinite;" : ""}
        `,
        parent: body,
    });
    blade.status = "move";
    allBladeEle.push(blade);

}, createBladeSpeed);
let createMosquito = throttle(() => {
    // 添加音效
    let noiseArr = [
        noise1,
        noise2,
        noise3,
    ];
    let randomNum = Math.floor(Math.random() * noiseArr.length);

    noiseArr[randomNum]() && noiseArr[randomNum]().play();
    // 创建蚊子
    let mosquito = new CreateEle({
        name: "div",
        id: "mosquito",
        styles: `
            position:absolute;
            border-radius:50px;
            left:${Math.floor(Math.random() * body.getBoundingClientRect().width) + 1}px;
            top:${Math.floor(Math.random() * body.getBoundingClientRect().height) + 1}px;
            width:${mosquitoASize}px;
            height:${mosquitoASize}px;
            background: url("./assets/imgs/animal${Math.floor(Math.random() * 6) + 1}.jfif");
            background-size:100% 100%;
            rotate:${40}deg;
            animation: anima 15s linear infinite;
        `,
        parent: body,
    });
    mosquito.type = "mosquito";
    mosquito.status = "move";
    allMosquitoEle.push(mosquito);
}, createMosquitoSpeed);
// 移动元素
let moveEle = throttle(() => {
    allBladeEle.forEach(ele => {
        ele[ele.status] && ele[ele.status]()
    });
    allMosquitoEle.forEach(ele => {
        ele[ele.status] && ele[ele.status]()
    });
}, moveEleSpeed);


// 刷新页面
const requestAnimationFrameFn = () => {
    if (isEnded) {
        return;
    }

    if (allMosquitoEle.length <= 70) {
        createMosquito();
        showData.update([
            {
                name:"蚊子数量",
                number:allMosquitoEle.length,
            },
        ]);
    }
    if (allBladeEle.length <= limitSize) {
        createBlade();
        showData.update([
            {
                name:"刀片数量",
                number:allBladeEle.length,
            },
        ]);
    }
    moveEle();
    endGame();
    window.requestAnimationFrame(requestAnimationFrameFn);
}

// 开始游戏
let beginGame = () => {
    // 监听屏幕变化
    window.addEventListener('resize', () => {
        body = document.body;
    });
    requestAnimationFrameFn();
}

let endGame = () => {
    if (allMosquitoEle.length >= 30) {
        isEnded = true;
        // fixTip({
        //     title:"游戏失败",
        //     text:"你和你的舍友们被蚊子咬死啦！！",
        //     pos:{
        //         left:50,
        //         top:50
        //     }
        // });
        prompt("游戏失败，你和你的舍友们被蚊子咬死啦！！")
        window.location.reload();
    }
}
// 模态框
modal.install(`
    <h1>告示</h1>
    <hr>
    <span>
        亲爱的玩家你好！！！
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;随着全球核辐射突然剧增，导致地球生态系统发生了巨大的变化。在这个被核辐射侵蚀的世界中，小动物们纷纷发生了不同程度的变异。
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;在这样的世界里，你和你的室友们被困于宿舍之中，你们需要与变异后的小动物展开一场激战。
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;这些变异后的小动物拥有了超乎寻常的力量和速度，连宿舍中的蚊子变得巴掌那么大。
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;那些烦人的小家伙，变成了拥有强大攻击力和防御力的恐怖生物。你需要利用自己的智慧和勇气，寻找合适的武器和策略，击败这些巨大的蚊子，保护自己的宿舍和同伴。
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;目前已知的武器有一把美工刀(可以通过A和D按钮操作攻击方向)，和可以回收的刀片（击杀蚊子后可回收）。
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;你的室友给你提供了几个有用的技能（I J K L），请谨慎使用。
        
    </span>
    <img style="z-index:-1;opacity:0.5;width:100%;height:100%;position:absolute;top:0;left:0;" src="./assets/peoples.jfif">
    <hr>
    <h1 id="bottom">点击W开始游戏</h1>

`);
// 定位
fixTip({
    title:"I 旋转技能！",
    text:"所有刀片增加旋转特效！！！",
    pos:{
        top:7,
        left:10
    }
});
fixTip({
    title:"J 移速技能！",
    text:"所有刀片增加移动速度！！！",
    pos:{
        top:10,
        left:35
    }
});
fixTip({
    title:"K 攻速技能！",
    text:"所有刀片增加攻速速度！！！",
    pos:{
        top:8,
        left:58
    }
});
fixTip({
    title:"L 弹药技能！",
    text:"慎用！！！！<br>增加刀片数量",
    pos:{
        top:10,
        left:80
    }
});
showData.setData([
    {
        name:"蚊子数量",
        number:0
    },
    {
        name:"刀片数量",
        number:limitSize
    },
    {
        name:"刀片发射速度",
        number:500 - createBladeSpeed
    },
    {
        name:"刀片移动速度",
        number:moveEleSpeed
    }
]);

// 监听键盘变换
keyControl()
function keyControl() {
    let directionStrategy = {
        w() {
            showTip({
                title:"游戏开始！",
                text:"蚊子大军要来了，请做好准备！！！",
                interval:5000
            });
            modal.uninstall()
            beginGame();
        },
        a() {
            knife.setDeg(knife.getDeg() - 10);
        },
        s() {

        },
        d() {
            knife.setDeg(knife.getDeg() + 10);
        },
        i() {// 旋转技能
            showTip({
                title:"I 旋转技能！",
                text:"所有刀片增加旋转特效！！！",
                interval:5000
            });
            paidaAudio().play();
            // 旋转
            allBladeEle.forEach(item => {
                item.ele.style.cssText += `
                animation: rotate 4s linear infinite;
                `;
            });
            animationState = "rotate";
        },
        j() {// 加移速速
            showTip({
                title:"J 移速技能！",
                text:"所有刀片增加移动速度！！！",
                interval:5000
            });
            paidaAudio().play();
            // 拍巴掌
            // if (moveEleSpeed <= 10) {
            //     return
            // }
            moveEleSpeed -= 10;
            showData.update([
                {
                    name:"刀片移动速度",
                    number: 100 - moveEleSpeed,
                },
            ]);
            moveEle = throttle(() => {
                allBladeEle.forEach(ele => {
                    ele[ele.status] && ele[ele.status]()
                });
                allMosquitoEle.forEach(ele => {
                    ele[ele.status] && ele[ele.status]()
                });
            }, moveEleSpeed);

        },
        k() {// 加攻速
            showTip({
                title:"K 攻速技能！",
                text:"所有刀片增加攻速度！！！",
                interval:5000
            });
            paidaAudio().play();
            // if (createBladeSpeed <= 10) {
            //     return
            // }
            createBladeSpeed -= 10;
            showData.update([
                {
                    name:"刀片发射速度",
                    number:500 - createBladeSpeed,
                },
            ]);
            createBlade = throttle(() => {
                // 添加音效a
                let fireArr = [
                    fire2
                ];
                let randomNum = Math.floor(Math.random() * fireArr.length);

                fireArr[randomNum]() && fireArr[randomNum]().play();
                // 创建元素
                let blade = new CreateEle({
                    name: "div",
                    id: "blade",
                    styles: `
                        border-radius:5px;
                        border:1px solid black;
                        position:absolute;
                        left:${Math.floor(Math.random() * 50 - 25) + 1 + knife.getLeft() + bladeSize / 2}px;     
                        top:${Math.floor(Math.random() * 50 - 25) + 1 + knife.getTop() + bladeSize / 2 - 20}px;
                        width:${bladeSize}px;
                        height:${bladeSize * 4}px;
                        background:url("./assets/imgs/nife.jfif");
                        background-size:100% 100%;
                        rotate:${knife.getDeg()}deg;
                        ${animationState === "rotate" ? "animation: rotate 0.1s linear infinite;" : ""}
                    `,
                    parent: body,
                });
                blade.status = "move";
                allBladeEle.push(blade);

            }, createBladeSpeed);
            // 高速
        },
        l() {// 加刀片数量
            showTip({
                title:"L 弹药技能！",
                text:"慎用！！！！<br>增加刀片数量",
                interval:5000
            });
            showData.update([
                {
                    name:"弹药最大量",
                    number:limitSize,
                },
            ]);
            paidaAudio().play();
            // if (limitSize >= 30) {
            //     return
            // }
            console.log(limitSize);
            limitSize++;
            // fire()
        },

    };
    window.addEventListener("keypress", (e) => {
        let key = e.key;
        // 防抖
        directionStrategy[key] && directionStrategy[key]()
    })
}
