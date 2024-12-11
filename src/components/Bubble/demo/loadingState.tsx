import React from "react";
import Bubble from "..";
import { Switch } from "antd";

const App: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    return (
        <div>
            <Bubble loading={loading} content="Hello world!"></Bubble>
            Loading state:{" "}
            <Switch checked={loading} onChange={setLoading}></Switch>
        </div>
    );
};

export default App;
