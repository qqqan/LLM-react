import { BubbleProps, TypingOption } from "../interface";
import React from "react";

// 如果设置了typing属性，返回一个数组，
// 第一个元素为true，表示启用typing效果，
// 第二个元素为step，表示每次打印的字符数，
// 第三个元素为interval，表示打印间隔时间
const useTypingConfig = (typing: BubbleProps['typing']) => {
    return React.useMemo<[enableTyping: boolean, step: number, interval: number]>(() => {
        if (!typing) {
            return [false, 0, 0]
        }

        let baseConfig: Required<TypingOption> = {
            step: 1,
            interval: 50
        }

        if (typeof typing === 'object') {
            baseConfig = { ...baseConfig, ...typing };
        }

        return [true, baseConfig.step, baseConfig.interval];
    }, [typing])
}

export default useTypingConfig