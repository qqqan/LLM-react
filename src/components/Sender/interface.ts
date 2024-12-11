import React from "react";

export type SubmitType = 'enter' | 'shiftEnter' | false;

type Component<P> =
    | React.ComponentType<P>
    | React.ForwardRefExoticComponent<P>
    | keyof React.ReactHTML;

export type CustomizeComponent<T = any> = Component<T>