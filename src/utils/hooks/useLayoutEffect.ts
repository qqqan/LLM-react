import React from "react";

// 检测当前环境是否支持DOM操作
const canUseDom = () => {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

const useInternalLayoutEffect = canUseDom() ? React.useLayoutEffect : React.useEffect
const useLayoutEffect = (callback: (mount: boolean) => void | VoidFunction, deps?: React.DependencyList) => {
    // 记录组件第一次挂载
    const firstMountRef = React.useRef(true);

    // 执行callback，并传递firstMountRef.current作为参数
    useInternalLayoutEffect(() => {
        return callback(firstMountRef.current);
    }, deps)

    // 在组件挂载时，设置firstMountRef.current为false
    // 在组件卸载时，重置firstMountRef.current
    useInternalLayoutEffect(() => {
        firstMountRef.current = false;
        return () => {
            firstMountRef.current = true
        }
    }, [])
};

export const useLayoutUpdateEffect: typeof React.useEffect = (callback, deps) => {
    // 组件更新时执行callback
    useLayoutEffect(firstMount => {
        if (!firstMount) {
            return callback()
        }
    }, deps)
}

export default useLayoutEffect