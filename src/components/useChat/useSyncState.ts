import React from "react";

// 提供一个同步获取状态值的方式
// 通过useRef，能直接访问当前状态值，无需等待组件重新渲染
export default function useSyncState<T>(defaultValue: T | (() => T)) {
    const [state, setState] = React.useState(defaultValue)

    const stateRef = React.useRef(state)
    stateRef.current = state;

    // 返回当前状态值
    const getState = React.useCallback(() => stateRef.current, {})

    return [state, setState, getState] as const
}