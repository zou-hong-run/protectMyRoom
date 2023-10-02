
/**
 * str转数值
 * @param {string} str 
 * @returns {number}
 */
let strToNum = (str) => parseFloat(str);

/**
 * 节流
 * @param {Function} fn 
 * @param {number} interval 
 * @param {*} options 
 * @returns Function
 */
let throttle = (fn, interval, options) => {
    let lastTime = 0;
    // 真正触发的函数
    const _throttle = (args) => {
        let nowTime = new Date().getTime();
        // 剩余多长时间调用 =  用户自定义时间 - 当前经过的时间
        let spareTime = interval - (nowTime - lastTime);
        if (spareTime <= 0) {
            fn(args);// 触发
            lastTime = nowTime;// 更新时间
        }
    }
    return _throttle;
}

let spaceTranslate = 25;
/**
 * 提示框
 * @param {{title:string,text:string,interval:number}} config 传参 
 */
const showTip = (config) => {
    let interval = config?.interval || 3000;
    let title = config.title;
    let text = config.text;
    let tip = document.createElement("div");
    tip.id = "tip";
    tip.style.cssText += `
        position:absolute;
        left:${spaceTranslate}%;
        top:${spaceTranslate}%;
        width:25%;
        height:15%;
        background:pink;
        border-radius:15px;
        border:2px solid black;
        animation:dance 5s infinite linear;
    `;
    let strHTML = `
        <h1>${title}</h1>
        <hr>
        <span>${text}</span>
    `;
    tip.innerHTML = strHTML;

    document.body.appendChild(tip);


    setTimeout(() => {
        document.body.removeChild(tip);
    }, interval);

    spaceTranslate += 2;
    if (spaceTranslate >= 80) {
        spaceTranslate = 50;
    }
}
// 模态框
const modal = {
    modalEle: null,
    install(strHTML) {
        let modal = document.createElement("div");
        modal.id = "modal";
        modal.style.cssText += `
            position:absolute;
            left:50%;
            top:50%;
            width:50%;
            height:60%;
            background:pink;
            opacity:0.9;
            border-radius:15px;
            border:2px solid black;
            animation: modaldance 2s infinite linear;
            z-index:100;
        `;
        modal.innerHTML = strHTML;

        this.modalEle = modal;

        document.body.appendChild(this.modalEle);
    },
    uninstall() {
        if (this.modalEle) {
            document.body.removeChild(this.modalEle);
        }
    }
}

/**
 * 提示框
 * @param {{title:string,text:string,pos:{left:number,top:number}}} config title:标题，text:文本，pos：定位，百分比 
 */
const fixTip = (config) => {
    let title = config.title;
    let text = config.text;
    let pos = config.pos;
    let fixTip = document.createElement("div");
    fixTip.id = "fixTip";
    fixTip.style.cssText += `
        position:absolute;
        left:${pos.left || 78}%;
        top:${pos.top || 0}%;
        width:20%;
        height:12%;
        background:pink;
        opacity:0.3;
        border-radius:15px;
        border:2px solid black;
        animation:dance 5s infinite linear;
    `;
    let strHTML = `
        <h1>${title}</h1>
        <hr>
        <span>${text}</span>
    `;
    fixTip.innerHTML = strHTML;

    document.body.appendChild(fixTip);
}
/**
 * 显示玩家数据
 */
const showData = {
    showDataEle: null,
    dataArr: [],
    /**
     * 
     * @param {{name:string,number:number}[]} dataArr 
     */
    setData(dataArr) {
        this.dataArr = dataArr
        let strHTML = '';

        this.dataArr.forEach(obj => {
            let { name, number } = obj;
            let str = `
                <span style="width:25%;height:100%;">
                    ${name}:${number}
                </span>
            `;
            strHTML += str;
        });


        this.showDataEle = document.createElement("div");
        this.showDataEle.id = "showData";
        this.showDataEle.style.cssText += `
            display:flex;
            align-item:center;
            justify-content:center;
            width:100%;
            height:5%;
        `;
        this.showDataEle.innerHTML = strHTML;

        document.body.appendChild(this.showDataEle);
    },
    update(updateArr) {
        updateArr.forEach(updateItem => {
            this.dataArr = this.dataArr.map(item => {
                if(updateItem.name === item.name){
                    return updateItem;
                }
                return item;
            });
        });

        let strHTML = '';
        this.dataArr.forEach(obj => {
            let { name, number } = obj;
            let str = `
                <span style="width:25%;height:100%;">
                    ${name}:${number}
                </span>
            `;
            strHTML += str;
        });
        this.showDataEle.innerHTML = strHTML;
    }
}
export {
    strToNum,
    throttle,
    showTip,
    fixTip,
    modal,
    showData,
}