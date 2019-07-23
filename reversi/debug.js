const bindDebugEvents = game => {
    const blocks = es(".block");
    for (block of blocks) {
        let [y, x] = block.dataset.offset.split("");
        if (y == 0) {
            appendHtml(block, `${x}`);
        }
        if (x == 0) {
            appendHtml(block, `${y}`);
        }
    }

    const button = e("button");
    bindEvent(button, "click", () => {
        // 显示当前颜色
        // 显示能走的位置
        log("当前颜色:", game.color);
    });
};

const addDebugButton = () => {
    const button = document.createElement("button");
    appendHtml(button, `debug`);
    const a = e("#container");
    a.appendChild(button);
};

const __debug = game => {
    addDebugButton();
    bindDebugEvents(game);
};
