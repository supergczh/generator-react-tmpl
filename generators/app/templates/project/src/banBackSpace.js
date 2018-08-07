function banBackSpaceFun(e) {

    var ev = e || window.event;
    console.log(ev);
    //各种浏览器下获取事件对象
    var obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
    //按下Backspace键
    if (ev.keyCode === 8) {

        var tagName = obj.nodeName //标签名称
        //如果标签不是input或者textarea则阻止Backspace
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
            return stopIt(ev);
        }
        var tagType = obj.type.toUpperCase();//标签类型
        //input标签除了下面几种类型，全部阻止Backspace
        if (tagName === 'INPUT' && (tagType !== 'TEXT' && tagType !== 'TEXTAREA' && tagType !== 'PASSWORD')) {
            return stopIt(ev);
        }
        //input或者textarea输入框如果不可编辑则阻止Backspace
        if ((tagName === 'INPUT' || tagName === 'TEXTAREA') && (obj.readOnly === true || obj.disabled === true)) {
            return stopIt(ev);
        }
    }

    function stopIt(ev) {
        if (ev.preventDefault) {
            //preventDefault()方法阻止元素发生默认的行为
            ev.preventDefault();
        }
        if (ev.returnValue) {
            //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
            ev.returnValue = false;
        }
        return false;
    }

}

export default function banBackSpace() {
    var userAgent = navigator.userAgent;
    if ((userAgent.match(/Firefox/i) && (userAgent.match(/Firefox/i)[0] === 'Firefox' || userAgent.match(/Firefox/i) === 'Firefox')) || !!window.ActiveXObject || "ActiveXObject" in window) {
        // 判断是否是ie 或者 Firefox
        document.onkeydown = banBackSpaceFun;
        document.onkeypress = banBackSpaceFun;
    }
}