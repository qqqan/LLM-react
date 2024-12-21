import { measureMemory } from "vm";
import useSyncState from "./useSyncState"
import { useEvent } from "rc-util";
import React from "react";
import { info } from "console";
import { Agent } from "http";

export type SimpleType = string | number | boolean | object;

export type MessageStatus = 'local' | 'loading' | 'success' | 'error'

export interface MessageInfo<Message extends SimpleType> {
    id: number | string;
    message: Message;
    status: MessageStatus
}


export default function useChat<AgentMessage extends SimpleType = string>() {
    const [messages, setMessages, getMessages] = useSyncState<MessageInfo<AgentMessage>[]>(
        // () =>
        // (defaultMessages || []).map((info, index) => ({
        //     id: `default_${index}`,
        //     status: 'local',
        //     ...info
        // }))
        []
    )

    const idRef = React.useRef(0)

    const createMessage = (message: AgentMessage, status: MessageStatus) => {
        const msg: MessageInfo<AgentMessage> = {
            id: `msg_${idRef.current}`,
            message,
            status
        }

        idRef.current += 1

        return msg
    }

    const onRequest = useEvent((message: AgentMessage) => {
        let loadingMsgId: number | string | null = null

        setMessages((ori) => {
            let nextMessages = [...ori, createMessage(message, 'local')];

            return nextMessages
        })

        let updatingMsgId: number | string | null = null
        const updateMessage = (message: AgentMessage, status: MessageStatus) => {
            let msg = getMessages().find((info) => info.id === updatingMsgId)

            if (!msg) {
                msg = createMessage(message, status)

                setMessages((ori) => {
                    const oriWithoutPending = ori.filter((info) => info.id !== loadingMsgId)
                    return [...oriWithoutPending, msg!]
                })

                updatingMsgId = msg.id
            } else {
                setMessages((ori) => {
                    return ori.map((info) => {
                        if (info.id === updatingMsgId) {
                            return {
                                ...info,
                                message,
                                status
                            }
                        }
                        return info
                    })
                })
            }

            return msg
        }

        // agent.request
        agent.request({ message, messages: getRequestMessages() }, {
            onUpdate: (message) => {
                updateMessage(message, 'loading')
            },
            onSuccess: (message) => {
                updateMessage(message, 'success')
            },
            onError: async (error: Error) => {
                setMessages((ori) => {
                    return ori.filter((info) => info.id !== loadingMsgId && info.id !== updatingMsgId)
                })
            }
        })
    })


    return [onRequest, messages, setMessages] as const
}