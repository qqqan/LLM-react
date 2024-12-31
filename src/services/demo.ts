const conversationId = "7444432363591073792"
const chatHistory = []
const msg = "讲个笑话";

// 创建会话
const createConversation = async () => {
    try {
        console.log("创建会话");
        const response = await coze.createConversation_coze();
        console.log("createCon_response", response);
        if (response.status === 200) {
            console.log("resData", response.data);
            setConversationId(response.data.data.id);
        }
    } catch (error) {
        console.error("Error", error);
    }
};

// 查看会话信息
const retrieveConversation = async () => {
    try {
        console.log("查看会话信息");
        const res = await coze.retrieveConversation_coze(conversationId);
        console.log("retriCon_resp", res);
        if (res.status === 200) {
            console.log(res.data);
        }
    } catch (error) {
        console.error("Error", error);
    }
};

// 创建消息，添加到指定会话中
const createMsg = async () => {
    try {
        console.log("创建消息");
        const res = await coze.createMessage_coze(msg, conversationId);
        if (res.status === 200) {
            console.log("res", res.data);
            setMsgId(res.data.data.id);
        }
    } catch (error) {
        console.error("Error", error);
    }
};

// 查看对话详情接口
const getChat = async (chatId: string): Promise<boolean> => {
    try {
        const res = await coze.getChat(conversationId, chatId);
        console.log("查看对话详情", res);
        if (res.status === 200) {
            const status = res.data.data.status;
            return status === "completed" || status === "requires_action";
        }
        return false;
    } catch (error) {
        console.error("Error", error);
        return false;
    }
};
// 查看对话消息详情接口
const getChatDetail = async (chatId: string) => {
    try {
        console.log("获取模型回复结果");
        const res = coze.getChatDetail(conversationId, chatId);
        console.log("res", res);
        if (res.status === 200) {
            console.log(res.data.data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

// 发起对话
const createChat = async (question) => {
    try {
        console.log("发送消息");
        const res = await coze.createChat(conversationId);
        console.log("response", res);
        if (res.status === 200) {
            console.log("发起对话成功");
            const chatId = res.data.data.id;
            // 轮询查看对话详情
            poll(
                () => getChat(chatId),
                () => getChatDetail(chatId)
            );
            // 状态为completed或required_action
            // 调用查看对话消息详情接口
        }
    } catch (error) {
        console.error("Error", error);
    }
};

// 流式响应对话
const createChatStream = async (question: string) => {
    console.log("流式对话", question);
    const body = JSON.stringify({
        bot_id: "7443050849351352329",
        user_id: "123456789",
        stream: true,
        auto_save_history: true,
        additional_messages: [
            {
                role: "text",
                content: question,
                content_type: "text",
            },
        ],
    });

    const token =
        "pat_0B8Z1OJS4X0VBJoCN7D8vsiVM7p5NpLmj4Syd6YFemG3C8oH835F7NVmMvbaA53Z";
    let message = "";

    await fetchEventSource(
        `https://api.coze.cn/v3/chat?conversation_id=${encodeURIComponent(
            conversationId
        )}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: body,
            async onmessage(e) {
                const event = e.event;
                const data = JSON.parse(e.data);
                switch (event) {
                    case "conversation.chat.created":
                        console.log("create");
                        break;
                    case "conversation.chat.in_progress":
                        console.log("对话解析中");
                        break;
                    case "conversation.message.delta":
                        if (data.type === "answer") {
                            message += data.content;
                            setCurMsg(message);
                            setResMsg(message);
                            setChatHistory([...chatHistory, message]);
                        }
                        // 还有其他的answer类型
                        break;
                    case "conversation.message.completed":
                        console.log("message已回复完成");
                        break;
                    case "conversation.chat.completed":
                        console.log("对话已完成");
                        break;
                    case "conversation.chat.failed":
                        console.log("对话中断");
                        break;
                    default:
                        break;
                }
            },
            onclose() {
                console.log("close", message);
            },
            onerror(err) {
                console.log("error", err);
            },
        }
    );
};