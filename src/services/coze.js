import request from "./request";

// 创建会话
export const createConversation_coze = async (message) => {
    return request({
        method: "POST",
        url: " https://api.coze.cn/v1/conversation/create",
        data: {
            messages: [
                {
                    role: "user",
                    content: "讲个笑话",
                    content_type: "text",
                },
            ],
        },
    });
};

// 查看会话信息
// 返回conversation_id、created_at、meta_data
export const retrieveConversation_coze = async (conversationId) => {
    return request({
        method: "POST",
        url: " https://api.coze.cn/v1/conversation/retrieve",
        params: {
            conversation_id: conversationId,
        },
    });
};

// 创建消息： 创建一天消息并将其添加到指定的会话中
export const createMessage_coze = async (message, conversationId) => {
    return request({
        url: " https://api.coze.cn/v1/conversation/message/create",
        method: "POST",
        params: {
            conversation_id: conversationId,
        },
        data: {
            role: "user",
            content: message,
            content_type: "text",
        },
    });
};

// 查看消息列表
// 查询指定会话中的所有消息，不仅包括开发者再会话中手动插入的每条消息，还包括回复
export const getMsgList_coze = async (conversationId) => {
    return request({
        url: " https://api.coze.cn/v1/conversation/message/list",
        method: "POST",
        params: {
            conversation_id: conversationId,
        },
    });
};

// 查看消息详情
export const getMsgDetail_coze = async (conversationId, messageId) => {
    return request({
        url: " https://api.coze.cn/v1/conversation/message/retrieve",
        method: "GET",
        params: {
            conversation_id: conversationId,
            message_id: messageId,
        },
    });
};

// 发起对话
// 首先测试非流式响应
export const createChat = async (conversationId) => {
    return request({
        method: "POST",
        url: " https://api.coze.cn/v3/chat",
        params: {
            conversation_id: conversationId,
        },
        data: {
            bot_id: "7443050849351352329",
            user_id: "123456789",
            stream: false,
            auto_save_history: true,
            additional_messages: [
                {
                    role: "user",
                    content: "2024年10月1日是星期几",
                    content_type: "text",
                },
            ],
        },
    });
};

// 发起对话
export const createChatStream = async (conversationId) => {
    return request({
        url: "https://api.coze.cn/v3/chat",
        method: "POST",
        params: {
            conversation_id: conversationId,
        },
        data: {
            bot_id: "7443050849351352329",
            user_id: "123456789",
            stream: true,
            auto_save_history: true,
            additional_messages: [
                {
                    role: "text",
                    content: "2024年10月1日星期几",
                    content_type: "text",
                },
            ],
        },
        responseType: "stream", // 设置响应类型为流
    });
};

// 查看对话详情
// 在非流式会话场景中，调用发起对话接口后，可以先轮询此API确认本轮对话是否结束（status=completed）,
// 再调用接口查看对话消息详情查看本轮对话的模型回复
// 注意：仅在对话开启了保存历史记录后，才能调用此接口查看对话详情信息
export const getChat = async (conversationId, chatId) => {
    return request({
        method: "GET",
        url: "https://api.coze.cn/v3/chat/retrieve",
        params: {
            conversation_id: conversationId, // 会话唯一标识
            chat_id: chatId, // 对话唯一标识
        },
    });
};

// 查看对话消息详情
// 查看除Query以外的其他消息，包括模型回复、智能体执行的中间结果等
// 通常用于非流式对话场景，查看某次对话中type=answer的智能体回复及type=follow-up等类型的对话中间态信息
export const getChatDetail = async (conversationId, chatId) => {
    return request({
        url: " https://api.coze.cn/v3/chat/message/list",
        method: "GET",
        params: {
            conversation_id: conversationId,
            chat_id: chatId,
        },
    });
};

// 取消进行中的对话
// 不支持取消以下状态的对话：
// completed: 会话结束
// failed: 会话失败
// requires_action: 会话中断
export const cancelChat = async (conversationId, chatId) => {
    return request({
        url: " https://api.coze.cn/v3/chat/cancel",
        method: "POST",
        data: {
            conversation_id: conversationId,
            chat_id: chatId,
        },
    });
};

// 使用我的个人访问令牌初始化客户端
// const client = new CozeAPI({
//     // 从https://www.coze.com/open/oauth/pats 获取您的 PAT
//     token: "my_pat_token",
//     baseURL: COZE_CN_BASE_URL,
// });

// async function quickChat() {
//     const v = await client.chat.createAndPoll({
//         bot_id: "my_bot_id",
//         additional_messages: [
//             {
//                 role: RoleType.User,
//                 content: "Hello!",
//                 content_type: "text",
//             },
//         ],
//     });

//     if (v.chat.status === ChatStatus.COMPLETED) {
//         for (const item of v.messages) {
//             console.log("[%s]:[%s]:%s", item.role, item.type, item.content);
//         }

//         console.log("usage", v.chat.usage);
//     }
// }

// // 串流聊天
// async function streamChat() {
//     const stream = await client.chat.stream({
//         bot_id: "my_bot_id",
//         additional_messages: [
//             {
//                 role: RoleType.User,
//                 content: "Hello!",
//                 content_type: "text",
//             },
//         ],
//     });

//     for await (const part of stream) {
//         if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
//             process.stdout.write(part.data.content); // 实时消息
//         }
//     }
// }
