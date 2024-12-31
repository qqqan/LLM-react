import React from "react";
import type { BubbleListProps } from "../BubbleList";

export type ListItemType = ReturnType<typeof useListData>[number]

// 作用是为每个item生成一个key
export default function useListData(items: BubbleListProps['items']) {
    return React.useMemo(() => (items || []).map((bubbleData, i) => {
        const mergedKey = bubbleData.key ?? `preset_${i}`;

        return {
            // ...getRoleBubbleProps(bubbleData),
            ...bubbleData,
            key: mergedKey
        }
    }), [items])
}