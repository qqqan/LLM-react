import { StreamOptions } from "stream";
import type { AnyObject } from "../../../utils/type";

export interface RequestBaseOptions {
    baseURL: string;
    model?: string;
    dangerouslyApiKey?: string;
}

type RequestMessageContent = string | AnyObject

interface RequestMessage extends AnyObject {
    role?: string;
    content?: RequestMessageContent
}

export interface RequestParams {
    model?: string,
    stream?: boolean

    messages?: RequestMessage[]
}

export type RequestOptions = RequestBaseOptions & RequestCustomOptions;

export interface RequestCallbacks<Output> {
    onSuccess: (chunks: Output[]) => void
    onError: (error: Error) => void
    onUpdate: (chunk: Output) => void
}


class RequestClass {
    readonly baseURL;
    readonly model;

    private defaultHeaders;
    private customOptions;

    private static instanceBuffer: Map<string, RequestClass> = new Map();

    private constructor(options: RequestOptions) {
        const { baseURL, model, dangerouslyApiKey, ...customOptions } = options;

        this.baseURL = options.baseURL;
        this.model = options.model;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...(options.dangerouslyApiKey && {
                Authorization: options.dangerouslyApiKey
            })
        }
        this.customOptions = customOptions
    }

    public static init(options: RequestOptions): RequestClass {
        const id = options.baseURL;

        if (!id || typeof id !== 'string') throw new Error('The baseURL is not valid！')；
        if (!RequestClass.instanceBuffer.has(id)) {
            RequestClass.instanceBuffer.set(id, new RequestClass(options))
        }

        return RequestClass.instanceBuffer.get(id) as RequestClass
    }

    public create = async<Input = AnyObject, Output = SSEOutput>(
        params: RequestParams & Input,
        callbacks?: RequestCallbacks<Output>,
        transformStream?: StreamOptions<Output>['transformStream']
    ){
        const { onSuccess, onError, onUpdate } = callbacks || {}

        const requestInit = {
            methods: 'POST',
            body: JSON.stringify({
                model: this.model,
                ...params
            }),
            headers: this.defaultHeaders
        }

        try {
            const response = await 
        }
    }

}

const Request = RequestClass.init;

export default Request