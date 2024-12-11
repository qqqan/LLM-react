import { Spin } from "antd";
import React from "react";
import useTypedEffect from "./hooks/useTypedEffect";
import useTypingConfig from "./hooks/useTypingConfig";

export default function Bubble(props, ref) {
    const {
        loading = false,
        content = "",
        typing,
        messageRender,
        ...otherHtmlProps
    } = props;
    const [typingEnabled, typingStep, typingInterval] = useTypingConfig(typing);
    const [typedContent, isTyping] = useTypedEffect(
        content,
        typingEnabled,
        typingStep,
        typingInterval
    );

    const mergedContent = messageRender
        ? messageRender(typedContent as any)
        : typedContent;

    let contentNode: React.ReactNode;
    if (loading) {
        contentNode = <Spin />;
    } else {
        contentNode = mergedContent as React.ReactNode;
    }
    let fullContent: React.ReactNode = <div>{contentNode}</div>;
    return <div>{fullContent}</div>;
}
