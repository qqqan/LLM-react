import React from "react";
import { Input, Button, Space } from "antd";

const { Search } = Input;

export interface SenderProps {
    defaultValue?: string;
    value?: string;
    loading?: boolean;
    onSubmit?: (message: string) => void;
    onChange?: (value: string) => void;
    onCancel?: VoidFunction;
    style?: React.CSSProperties;
    className?: string;
}

export default function Sender(props: SenderProps) {
    const {
        defaultValue,
        value,
        loading,
        onSubmit,
        onChange,
        onCancel,
        style,
        className,
        ...rest
    } = props;

    return (
        <div>
            <Search
                placeholder={defaultValue}
                loading={loading}
                value={value}
                onChange={onChange}
                onSearch={onSubmit}
            ></Search>
        </div>
    );
}
