import {type HTMLAttributes, memo} from "react";
import classNames from "classnames";
import RelativePortal from "../RelativePortal/RelativePortal";
import Button from "../Button";
import "./style.css";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	isFetching?: boolean;
	close: () => void;
}

const Modal = (props: IModalProps) => {
	return (
		<RelativePortal>
			<div
				className={`modal__backdrop`}
				onMouseDown={props.close}
			>
				<div
					className={classNames(`modal`, {'modal-fetching': props.isFetching})}
					onMouseDown={ev => ev.stopPropagation()}
				>
					<div className={`modal__caption`}>
						{props.title}
						<Button
							isIcon={true}
							icon={`close`}
							className={`modal__close`}
							onClick={props.close}
						>{`Закрыть`}</Button>
					</div>
					<div className={`modal__body`}>{props.children}</div>
				</div>
			</div>
		</RelativePortal>
	);
};

export const ModalActions = (props: HTMLAttributes<HTMLDivElement>) => {
	return <div className={`modal__actions`}>{props.children}</div>;
};

export default memo(Modal);