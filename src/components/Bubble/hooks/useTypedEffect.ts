import React from "react"
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';


function isString(str: any): str is string {
    return typeof str === 'string'
}

// 模拟打字机效果
/*
输入参数：
content: React.ReactNode | object, // 需要展示的内容
typingEnabled: boolean,  // 是否启用打字效果
typingStep: number,  // 每次打字时增加的字符数
typingInterval: number,  // 打字效果的时间间隔
返回参数：
typedContent: 当前展示的内容
isTyping: 表示当前是否正在打字
*/

const useTypedEffect = (
    content: React.ReactNode | object,
    typingEnabled: boolean,
    typingStep: number,
    typingInterval: number,
): [typedContent: React.ReactNode | object, isTyping: boolean] => {
    const [prevContent, setPrevContent] = React.useState<React.ReactNode | object>("");
    const [typingIndex, setTypingIndex] = React.useState<number>(1);

    const mergedTypingEnabled = typingEnabled && isString(content)

    useLayoutEffect(() => {
        setPrevContent(content);
        if (!mergedTypingEnabled && isString(content)) {
            setTypingIndex(content.length)
        } else if (isString(content) && isString(prevContent) && content.indexOf(prevContent) !== 0) {
            setTypingIndex(1)
        }
    }, [content])

    // 开始打印
    React.useEffect(() => {
        if (mergedTypingEnabled && typingIndex < content.length) {
            const id = setTimeout(() => {
                setTypingIndex((prev) => prev + typingStep)
            }, typingInterval)

            return () => {
                clearTimeout(id)
            }
        }
    }, [typingIndex, typingEnabled, content])

    const mergedTypingContent = mergedTypingEnabled ? content.slice(0, typingIndex) : content

    return [mergedTypingContent, mergedTypingEnabled && typingIndex < content.length]
}

export default useTypedEffect