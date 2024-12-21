import React from "react";
import Conversations, { ConversationItem, ConversationItemKey } from "..";
import { Button } from "antd";

const App: React.FC = () => {
    const [conversations, setConversations] = React.useState<
        ConversationItem[]
    >([]);
    const [activeKey, setActiveKey] = React.useState<ConversationItemKey>("");

    const onActiveChange = (activeKey: ConversationItemKey) => {
        setActiveKey(activeKey);
    };

    const addNewConversation = () => {
        const newConversation = {
            key: Date.now().toString(),
            label: `New Conversation ${conversations.length + 1}`,
        };

        setConversations([...conversations, newConversation]);

        setActiveKey(newConversation.key);
    };

    return (
        <>
            <Button onClick={addNewConversation}>Add New Conversation</Button>
            <Conversations
                items={conversations}
                activeKey={activeKey}
                onActiveChange={onActiveChange}
            ></Conversations>
        </>
    );
};
export default App;
