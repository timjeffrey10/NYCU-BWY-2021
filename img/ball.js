"use strict";
var ViewportWH = {};
ViewportWH.height = document.getElementById("header").clientHeight;
ViewportWH.width = document.getElementById("header").clientWidth;

class Ball {
    constructor() {
        this.coor = {x:rn(20, (ViewportWH.width-20)), y:rn(20, (ViewportWH.height-20))};
        this.offset = {
            x:rn(5, 20)*(-1)**rn(0,1), 
            y:rn(5, 20)*(-1)**rn(0,1)
        };
        this.node = null;
        this.radius = 15;
        this.node = document.createElement("div");
        this.node.setAttribute("class", "ball");
        this.node.style.borderRadius = "100%";  //圓形
        this.node.style.width = this.radius + "px";
        this.node.style.height = this.node.style.width;
        this.node.style.backgroundColor = "rgb("+ rn(50, 255) +","+ rn(50, 255) +","+ rn(50, 255) +")";
        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }
    getNode() {
        return this.node;
    }
    refresh() {
        //當位置超出邊界，將offset轉方向並重設其值
        if (this.coor.x + this.offset.x > (ViewportWH.width-this.radius)){
            this.offset.x = -rn(5, 20);
        }
        else if (this.coor.x + this.offset.x < 0) {
            this.offset.x = rn(5, 20);
        }
        this.coor.x = this.coor.x + this.offset.x;

        if (this.coor.y + this.offset.y > (ViewportWH.height-this.radius)){
            this.offset.y = -rn(5, 20);
        }
        else if (this.coor.y + this.offset.y < 0) {
            this.offset.y = rn(5, 20);
        }
        this.coor.y = this.coor.y + this.offset.y;
        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }
}

//產生黑背景
let panel = document.createElement("div");
panel.setAttribute("id","container");
panel.setAttribute("width",ViewportWH.width);
panel.setAttribute("height",ViewportWH.height);
document.body.appendChild(panel);

function rn(m, n) { //產生範圍是m~n的亂整數
    return Math.floor(Math.random() * (n-m+1) + m);
}

let bound = rn(5,10);  //得到5-10的整數(球)
let aBall =[];
for (let i = 0; i < bound; i++) {   //球球產生器
    aBall[i] = new Ball();
    panel.appendChild(aBall[i].getNode());
}
//更新球球位置
function draw(){
    for (let i=0; i<aBall.length; i++) {
        aBall[i].refresh();
    }
}

let timer = setInterval(draw, 50);  //每0.05sec更新一次