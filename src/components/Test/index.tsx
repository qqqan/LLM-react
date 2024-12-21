import { Button } from "antd";
import Bubble from "../Bubble";
import Sender from "../Sender";
import Conversations from "../Conversations";
import { useState } from "react";

export default function Test() {
    // ==================== State =================
    const defualtConversationsItems = [
        {
            key: "0",
            label: "what is Coze",
        },
    ];
    const [content, setContent] = useState("");
    const [conversationsItems, setConversationsItems] = useState(
        defualtConversationsItems
    );
    const [activeKey, setActiveKey] = useState(
        defualtConversationsItems[0].key
    );

    // ==================== Event =================
    const onRequest = (nextContent: string) => {
        console.log("请求提问", nextContent);
    };

    const onSubmit = (nextContent: string) => {
        if (!nextContent) return;
        onRequest(nextContent);
        setContent("");
    };

    const onChange = (nextContent: string) => {
        setContent(nextContent);
    };

    const onAddConversation = () => {
        // 创建新的会话
        setConversationsItems([
            ...conversationsItems,
            {
                key: `${conversationsItems.length}`,
                label: `New Conversation ${conversationsItems.length}`,
            },
        ]);
        setActiveKey(`${conversationsItems.length}`);
    };

    const onConversationClick = (key) => {
        setActiveKey(key);
    };

    // ==================== Render =================
    return (
        <div>
            <div>
                {/* 🌟 Logo */}
                {/* {logoNode} */}
                {/* 🌟 添加会话 */}
                <Button
                    onClick={onAddConversation}
                    type="link"
                    icon={<PlusOutlined />}
                >
                    New Conversation
                </Button>
                {/* 🌟 会话管理 */}
                <Conversations
                    items={conversationsItems}
                    activeKey={activeKey}
                    onActiveChange={onConversationClick}
                />
            </div>
            <div>
                {/* 🌟 欢迎占位 */}
                {/* {!items.length && placeholderNode} */}
                {/* 🌟 消息列表 */}
                <Bubble.List items={items} roles={roles} />
                {/* 🌟 提示词 */}
                {/* <Prompts
                    items={senderPromptsItems}
                    onItemClick={onPromptsItemClick}
                /> */}
                {/* 🌟 输入框 */}
                <Sender
                    value={content}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}
