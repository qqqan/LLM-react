import React from "react";
// import { Bubble } from "@ant-design/x";
// import Bubble from "../Bubble";
import Bubble from "..";
import { Button, Flex } from "antd";
import type { GetProp, GetRef } from "antd";

const roles: GetProp<typeof Bubble.List, "roles"> = {
    ai: {
        typing: { step: 5, interval: 20 },
    },
    user: {},
};

const App = () => {
    const [count, setCount] = React.useState(3);
    const listRef = React.useRef<GetRef<typeof Bubble.List>>(null);

    return (
        <Flex vertical gap="small">
            <Flex gap="small" style={{ alignSelf: "flex-end" }}>
                <Button
                    onClick={() => {
                        setCount((i) => i + 1);
                    }}
                >
                    Add Bubble
                </Button>
            </Flex>

            <Bubble.List
                roles={roles}
                items={Array.from({ length: count }).map((_, i) => {
                    const isAI = !!(i % 2);
                    const content = isAI
                        ? "Mock AI content. ".repeat(20)
                        : "Mock user content.";

                    return {
                        key: i,
                        role: isAI ? "ai" : "user",
                        content,
                    };
                })}
            />
        </Flex>
    );
};

export default App;
