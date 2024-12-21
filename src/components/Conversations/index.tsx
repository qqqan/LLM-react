export type ConversationItemKey = string | number;

export type ConversationItem = {
    key: ConversationItemKey;
    label: string;
};

export interface ConversationsProps {
    items: ConversationItem[];
    activeKey: ConversationItemKey;
    onActiveChange: (key: ConversationItemKey) => void;
}

export default function Conversations(props: ConversationsProps) {
    const { items, activeKey, onActiveChange } = props;

    return (
        <>
            {items.map((item) => {
                const bgColor =
                    item.key === activeKey ? "bg-amber-200" : "bg-inherit";
                return (
                    <div
                        className={bgColor}
                        key={item.key}
                        onClick={() => onActiveChange(item.key)}
                    >
                        {item.label}{" "}
                    </div>
                );
            })}
        </>
    );
}
