import React from "react";
import { BubbleProps } from "./interface";
import { useEvent } from "rc-util";
import Bubble from "./Bubble";
import useListData from "./hooks/useListData";
import useDisplayData from "./hooks/useDisplayData";
import Item from "antd/es/list/Item";

export interface BubbleListRef {
    nativeElement: HTMLDivElement;
    scrollTo: (info: {
        offset?: number;
        key?: string | number;
        behavior?: ScrollBehavior;
        block?: ScrollLogicalPosition;
    }) => void;
}

export type BubbleDataType = BubbleProps & {
    key?: string | number;
    role?: "user" | "ai";
};

export type RoleType = Partial<Omit<BubbleProps, "content">>;

export type RolesType =
    | Record<string, RoleType>
    | ((bubbleDataP: BubbleDataType) => RoleType);

// export interface BubbleListProps extends React.HTMLAttributes<HTMLDivElement> {
//     items?: BubbleDataType[];
//     autoScroll?: boolean;
//     roles?: RolesType;
// }

export interface BubbleListProps {
    items: BubbleDataType[];
}

export interface BubbleContextProps {
    onUpdate?: VoidFunction;
}

export const BubbleContext = React.createContext<BubbleContextProps>({});

// const BubbleList: React.ForwardRefRenderFunction<
//     BubbleListRef,
//     BubbleListProps
// > = (props, ref) => {
//     // const { items, roles, autoScroll = true, ...restProps } = props;
//     const { items, autoScroll = true, roles } = props;
//     const mergedData = useListData(items, roles);
//     const [displayData, onTypingComplete] = useDisplayData(mergedData);

//     // ============================ Typing ============================
//     const [initialized, setInitialized] = React.useState(false);
//     React.useEffect(() => {
//         setInitialized(true);
//         return () => {
//             setInitialized(false);
//         };
//     }, []);

//     // ============================ Scroll ============================
//     // Is current scrollTop at the end. User scroll will make this false.
//     const [updateCount, setUpdateCount] = React.useState(0);

//     // =========================== Context ============================
//     // When bubble content update, we try to trigger `autoScroll` for sync
//     const onBubbleUpdate = useEvent(() => {
//         if (autoScroll) {
//             setUpdateCount((c) => c + 1);
//         }
//     });

//     const context = React.useMemo(
//         () => ({
//             onUpdate: onBubbleUpdate,
//         }),
//         []
//     );

//     console.log(displayData);
//     return (
//         <BubbleContext.Provider value={context}>
//             <div>
//                 {displayData.map(({ key, ...bubble }) => {
//                     <Bubble
//                         {...bubble}
//                         key={key}
//                         typing={initialized ? bubble.typing : false}
//                         // onTypingComplete={() => {
//                         //     bubble.onTypingComplete?.();
//                         //     onTypingComplete(key);
//                         // }}
//                     />;
//                 })}
//             </div>
//         </BubbleContext.Provider>
//     );
// };

const BubbleList: React.FC<BubbleListProps> = ({ items }) => {
    // const mergedData = useListData(items);
    // const [displayData, onTypingComplete] = useDisplayData(mergedData);

    return (
        <div>
            {items.map((item) => (
                <Bubble
                    key={item.key}
                    content={item.content}
                    typing={{ step: 2, interval: 50 }}
                />
            ))}
        </div>
    );
};

// const ForwardBubbleList = React.forwardRef(BubbleList);

// if (process.env.NODE_ENV !== "production") {
//     ForwardBubbleList.displayName = "BubbleList";
// }

export default BubbleList;
