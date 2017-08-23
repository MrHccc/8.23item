// 开始页的按钮
var hnews = document.getElementById("news");
var hdetail = document.getElementById("detail");
// 获取分页
var index = document.getElementById("index");
var center = document.getElementById("center");
// 获取进度条
var proBar = document.getElementById("proBar");
// 获取暂停键
var btnPause = document.getElementById("pause");
var btnContinue = document.getElementById("continue");
// 获取开始游戏时的倒计时
var countDown = document.getElementById("countDown");
var countDownBox = document.getElementById("countDownBox");
// 获取分数
var score = document.getElementById("score");
var timerProBar = null;
var timerCount = null;
var proWidth = parseInt(window.getComputedStyle(proBar).width);
hnews.onclick = function() {
    index.style.display = "none";
    center.style.display = "block";
    timerCount = setInterval(function() {
        var time = parseInt(countDown.innerHTML) - 1;
        countDown.innerHTML = time;
        if (time == 0) {
            clearInterval(timerCount);
            countDownBox.style.display = "none";
            // 倒计时进度条
            function proBarMove() {
                proWidth --;
                proBar.style.width = proWidth + "px";
                if (proWidth == 0) {
                    clearInterval(timerProBar);
                    clearInterval(timerMouse);
                    clearInterval(timerReturn);
                }
            }
            // 90秒倒计时
            timerProBar = setInterval(proBarMove,500);
            // 暂停
            btnPause.onclick = function() {
                clearInterval(timerProBar);
                pause.style.display = "none";
                btnContinue.style.display = "block";
            }
            // 继续
            btnContinue.onclick = function() {
                pause.style.display = "block";
                btnContinue.style.display = "none";
                timerProBar = setInterval(proBarMove,500);
            }
            var timerMouse = null;
            var timerReturn = null;
            var ran;
            var cons = document.getElementById("con").getElementsByTagName("div");
            var mouse = document.getElementById("con").getElementsByTagName("span");
            var arr = [];
            var timer = null;
            function start() {
                ran = Math.floor(Math.random() * 9);
                clearInterval(timerMouse);
               
                sport(mouse[ran],{"top" : 0},20);
                // 回洞
                timerReturn = setTimeout(function() {
                    sport(mouse[arr[0]],{"top" : 80},20);
                    cons[arr[0]].style.backgroundColor = "#666";
                    arr.shift();
                },3000);

                timerMouse = setInterval(start,1000);
                for(var i = 0; i < cons.length; i++){
                     mouse[i].style.background = "";
                    cons[i].onclick = function() {
                       for(var j = 0; j < arr.length; j++) {
                             if(this == cons[arr[j]]) {
                                // clearInterval(timerMouse);


                                sport(mouse[arr[j]],{"top" : 80},20);

                                mouse[arr[j]].style.background = "url('images/mouse.png') -400px -30px no-repeat";
                               // timer = setTimeout(function() {
                               //       sport(mouse[arr[j]],{"top" : 80},20);
                               //  },2000);
                               console.log(typeof arr[j]);

                                var scoreVal = parseInt(score.innerHTML);
                                scoreVal++;
                                score.innerHTML = scoreVal;
                            }
                       }
                    }
                }
                arr.push(parseInt(ran));
                console.log(arr);
            }start();
        }
        // 用于动态变化标签的属性
        // 运动的核心功能函数
        function sport(ele, json, step, fn) {    // ele标签名、json对象、step步长、fn函数
            // 清除计时器
            clearInterval(ele.timer);
            ele.timer = setInterval(function(){
                // 所有的属性只有全部达到目标值时才允许清除计时器
                var timerjudge = true;
                for (var prop in json) {
                    if(prop == "opacity"){
                        var startVal = parseInt(getStyle(ele, prop) * 100);
                    } else {
                        var startVal = parseInt(getStyle(ele, prop));
                    }
                    var distance = Math.abs(json[prop] - startVal);
                    speed = Math.ceil(distance / step);
                    // console.log(speed);
                    // 双方向运动判断
                    if(startVal < json[prop]) {
                        startVal += speed;
                    } else {
                        startVal -= speed;
                    }
                    // 自动贴合功能
                    if(distance < 5) {
                        startVal = json[prop];
                    }
                    // 只有任何一个属性没有达到终点，timerjudge为false
                    if(startVal != json[prop]){
                        timerjudge = false;
                    }
                    if(prop == "opacity"){
                        ele.style[prop] = startVal / 100;
                        ele.style["filter"] = "alpha(opacity=" + startVal + ")";
                    } else {
                        ele.style[prop] = startVal + "px";
                    }
                }
                if(timerjudge) {
                    clearInterval(ele.timer);
                    // 实现回调函数
                    if(fn){
                        fn();
                    }
                }
            }, 40);
        }
        /* 
        * 功能：获取渲染后标签的样式
        * 参数：ele是标签对象，prop是获取的样式属性
        */
        function getStyle(ele, prop) {
            var proValue = null;
            if(document.defaultView) {
                // 谷歌等浏览器的样式获取
                proValue = document.defaultView.getComputedStyle(ele)[prop];
            } else {
                // IE低版本下的样式获取
                proValue = ele.currentStyle[prop];
            }
            return proValue;
        }
    },1000);
}



