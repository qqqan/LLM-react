import "./App.css";
import Sender from "@/components/Sender";
import Conversations, {
    ConversationItem,
    ConversationItemKey,
} from "./components/Conversations/index.js";
import * as coze from "./services/coze.js";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

function App() {
    const [loading, setLoading] = React.useState(false);

    const [conversations, setConversations] = React.useState<
        ConversationItem[]
    >([]);
    const [activeKey, setActiveKey] = React.useState<ConversationItemKey>("");

    const [question, setQuestion] = React.useState<string>("");

    // 创建会话
    const addNewConversation = async () => {
        try {
            const response = await coze.createConversation_coze();
            if (response.status === 200) {
                const resData = response.data;
                const newConversation = {
                    key: resData.data.id,
                    label: `New Conversation ${conversations.length + 1}`,
                };

                setConversations([...conversations, newConversation]);
                setActiveKey(newConversation.key);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    // 切换会话
    const onActiveChange = (activeKey: ConversationItemKey) => {
        // 设置activeKey
        setActiveKey(activeKey);

        // 查询指定会话中的所有消息
    };

    const onRequest = (nextQuestion: string) => {
        console.log("提问", nextQuestion);
    };

    // 创建对话
    const onSubmit = (nextQuestion: string) => {
        if (!nextQuestion) return;
        onRequest(nextQuestion);
        setQuestion("");
    };

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false);
                console.log("Send message successfully");
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [loading]);

    return (
        <>
            {/* <h1>Hello Coze</h1>
            <div className="flex flex-col">
                <button onClick={createConversation}>创建会话接口测试</button>
                <button onClick={retrieveConversation}>
                    查看会话信息接口测试
                </button>
                <button onClick={createMsg}>创建消息接口测试</button>
                <button onClick={createChat}>发起对话</button>
                <button onClick={createChatStream}>流式渲染接口测试</button>
                <button onClick={createChat}>发消息测试</button>
            </div>

            <div className="w-96 h-96 border-2">
                {chatHistory.map((msg) => {
                    return <Bubble content={msg}></Bubble>;
                })}
            </div> */}

            {/* <Bubble content={resMsg}></Bubble> */}

            {/* <Basic></Basic> */}
            {/* <Sender value={resMsg}></Sender> */}
            {/* <textarea value={resMsg} className="w-96 h-64 border-2" /> */}

            <div className="w-full h-full flex">
                <div className="w-96">
                    {/* 添加会话 */}
                    <Button
                        onClick={addNewConversation}
                        icon={<PlusOutlined />}
                    >
                        New Conversation
                    </Button>

                    {/* 会话管理 */}
                    <Conversations
                        items={conversations}
                        activeKey={activeKey}
                        onActiveChange={onActiveChange}
                    ></Conversations>
                </div>
                <div className="flex-1">
                    {/* BubbleList */}
                    {/* 输入框 */}
                    <Sender
                        loading={loading}
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }}
                        onSubmit={onSubmit}
                        onCancel={() => {
                            setLoading(false);
                            console.log("Cancel sending");
                        }}
                    ></Sender>
                </div>
            </div>
        </>
    );
}

export default App;
