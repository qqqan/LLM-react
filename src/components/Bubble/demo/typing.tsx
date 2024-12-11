import Bubble from "..";
import { Button } from "antd";
import React from "react";

const text = "Hello World!";

const App = () => {
    const [repeat, setRepeat] = React.useState(1);
    return (
        <div>
            <Bubble
                content={text.repeat(repeat)}
                typing={{ step: 2, interval: 50 }}
            ></Bubble>

            <Button
                onClick={() => {
                    setRepeat((ori) => (ori < 5 ? ori + 1 : 1));
                }}
            >
                Repeat {repeat} Times
            </Button>
        </div>
    );
};

export default App;
