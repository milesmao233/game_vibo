import config from "./js/config.js";

const e = sel => document.querySelector(sel);
const es = sel => document.querySelectorAll(sel);

const bindAll = (sel, eventName, callback) => {
    var ls = es(sel);
    for (let input of ls) {
        input.addEventListener(eventName, event => {
            callback(event);
        });
    }
};

const log = console.log.bind(console);

const imageFromPath = function(path) {
    var img = new Image();
    img.src = path;
    return img;
};

const rectIntersects = function(a, b) {
    // 思路： 中心点的距离，小于等于宽一半总和 / 长的一半总和

    let aMiddleX = a.x + a.w / 2,
        aMiddleY = a.y + a.h / 2,
        bMiddleX = b.x + b.w / 2,
        bMiddleY = b.y + b.h / 2;

    return (
        Math.abs(bMiddleX - aMiddleX) <=
            a.w / 2 + b.w / 2 - config.crash_error &&
        Math.abs(bMiddleY - aMiddleY) <= a.h / 2 + b.h / 2 - config.crash_error
    );
};

const randomBetween = (start, end) => {
    const n = Math.random() * (end - start + 1) + start;
    return Math.floor(n);
};

export { e, es, bindAll, log, imageFromPath, rectIntersects, randomBetween };
