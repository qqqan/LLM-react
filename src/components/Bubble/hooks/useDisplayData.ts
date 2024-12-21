import { ListItemType } from "./useListData";
import React from "react";
import { useEvent } from "rc-util";

export default function useDisplayData(items: ListItemType[]) {
    const [displayCount, setDisplayCount] = React.useState(items.length)
    const displayList = React.useMemo(() => items.slice(0, displayCount), [items, displayCount])
    const displayListLastKey = React.useMemo(() => {
        const lastItem = displayList[displayList.length - 1];
        return lastItem ? lastItem.key : null
    }, [displayList])

    // when items changed, we replaced with lastest one
    React.useEffect(() => {
        if (displayList.length && displayList.every((items, index) => items.key === items[index]?.key)) {
            return
        }

        if (displayList.length === 0) {
            setDisplayCount(1)
        } else {
            for (let i = 0; i < displayList.length; i++) {
                if (displayList[i].key !== items[i]?.key) {
                    setDisplayCount(i)
                    break
                }
            }
        }
    }, [items])

    // Continue to show if last one finished typing
    const onTypingComplete = useEvent((key: string | number) => {
        if (key === displayListLastKey) {
            setDisplayCount(displayCount + 1)
        }
    })

    return [displayList, onTypingComplete] as const
}