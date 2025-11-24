import {memo, type ReactNode} from "react";
import {createPortal} from "react-dom";

interface IRelativePortalProps {
    children: ReactNode
}

const RelativePortal = (props: IRelativePortalProps) => {
    const rootEl: HTMLElement | null = document.getElementById(`root`);
    if (!!rootEl) {
        return createPortal(props.children, rootEl);
    }
    return null;
};

export default memo(RelativePortal);