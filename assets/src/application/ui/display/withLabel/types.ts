export enum LabelPosition {
	BOTTOM = 'bottom',
	LEFT = 'left',
	RIGHT = 'right',
	TOP = 'top',
}

export interface withLabelProps {
	id?: string;
	label?: string;
	labelClassName?: string;
	labelPosition?: LabelPosition;
}
