import { BubbleProps, TypingOption } from "../interface";
import React from "react";

// 设置初始值
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