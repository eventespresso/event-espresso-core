// ordered clockwise starting top left
export enum LabelPosition {
	TOP_LEFT = 'top-left',
	TOP_CENTER = 'top-center',
	TOP_RIGHT = 'top-right',
	RIGHT_TOP = 'right-top',
	RIGHT_MIDDLE = 'right-middle',
	RIGHT_BOTTOM = 'right-bottom',
	BOTTOM_RIGHT = 'bottom-right',
	BOTTOM_CENTER = 'bottom-center',
	BOTTOM_LEFT = 'bottom-left',
	LEFT_BOTTOM = 'left-bottom',
	LEFT_MIDDLE = 'left-middle',
	LEFT_TOP = 'left-top',
}

export interface withLabelProps {
	id?: string;
	label?: string;
	labelClassName?: string;
	labelPosition?: LabelPosition;
}
