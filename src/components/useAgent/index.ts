import { AnyObject } from "../../utils/type"
import React from "react";

interface RequestFnInfo<Message> extends Partial<AgentConfigPreset>, AnyObject {
    messages?: Message[];
    message?: Message
}

export type RequestFn<Message> = (
    info: RequestFnInfo<Message>,
    callbacks: {
        onUpdate: (message: Message) => void,
        onSuccess: (message: Message) => void,
        onError: (message: Error) => void,
    }
) => void

export interface AgentConfigPreset {
    baseURL: string,
    key: string,
    model: string,
    dangerouslyApiKey: string
}

export interface AgentConfigCustom<Message> {
    request?: RequestFn<Message>
}

export type AgentConfig<Message> = Partial<AgentConfigPreset> & AgentConfigCustom<Message>

let uuid = 0;

export class Agent<Message = string> {
    config: AgentConfig<Message>;

    private requestingMap: Record<number, boolean> = {}

    private finishRequest(id: number) {
        delete this.requestingMap[id]
    }

    public request: RequestFn<Message> = (info, callbacks) => {
        const { request } = this.config;
        const { onUpdate, onSuccess, onError } = callbacks

        const id = uuid;
        uuid += 1;
        this.requestingMap[id] = true

        // 状态是唯一的
        // 获取成功或错误信息时，不应再接收更多消息
        request?.(info, {
            onUpdate: (message) => {
                if (this.requestingMap[id]) {
                    onUpdate(message)
                }
            },
            onSuccess: (message) => {
                if (this.requestingMap[id]) {
                    onSuccess(message);
                    this.finishRequest(id)
                }
            }, onError: (error) => {
                if (this.requestingMap[id]) {
                    onError(error)
                    this.finishRequest(id)
                }
            },
        })
    }

    public isRequesting() {
        return Object.keys(this.requestingMap).length > 0
    }
}


export default function useXAgent<Message = string>(config: XAgentConfig<Message>) {
    const { request, ...restConfig } = config;
    return React.useMemo(
        () =>
            [
                new Agent<Message>({
                    request:
                        request! ||
                        Request({
                            baseURL: restConfig.baseURL!,
                            model: restConfig.model,
                            dangerouslyApiKey: restConfig.dangerouslyApiKey,
                        }).create,
                    ...restConfig,
                }),
            ] as const,
        [],
    );
}
