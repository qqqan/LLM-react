import React from "react";

const useTypedEffect = (
    content: string,
    typingEnabled: boolean,
    typingStep: number,
    typingInterval: number,
): [typedContent: string, isTyping: boolean] => {
    const [typingIndex, setTypingIndex] = React.useState<number>(0);
    const [isTyping, setIsTyping] = React.useState<boolean>(false);

    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
        if (!typingEnabled) {
            setTypingIndex(content.length)
            setIsTyping(false);
            return;
        }

        setTypingIndex(0)
        setIsTyping(true);

        const type = () => {
            if (typingIndex < content.length) {
                setTypingIndex((prev) => prev + typingStep)
                timeoutRef.current = setTimeout(type, typingInterval);
            } else {
                setIsTyping(false)
            }
        }

        type();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [content, typingEnabled, typingStep, typingInterval])

    const mergedTypingContent = content.slice(0, typingIndex)

    return [mergedTypingContent, isTyping]

}

export default useTypedEffect