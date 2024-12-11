/**
 * 轮询函数
 * @param conditionChecker - 返回boolean的函数，用于检查条件是否满足
 * @param callback - 当条件满足时调用的回调函数
 * @param interval - 每次轮询间隔时间，默认1s
 * @param maxAttempts - 最大尝试次数，null或undefined表示无限次
 */

export async function poll(
    conditionChecker: () => Promise<boolean>,
    callback: () => void,
    interval: number = 1000,
    maxAttempts: number | null = null
): Promise<void> {
    let attempts = 0;
    const checkCondition = async () => {
        const conditionMet = await conditionChecker()
        if (conditionMet) {
            callback()
        } else if (maxAttempts === null || attempts < maxAttempts) {
            attempts++;
            setTimeout(checkCondition, interval)
        } else {
            console.log("max attemps reached, giving up")
        }
    }

    await checkCondition()
}