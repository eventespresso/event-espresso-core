export interface CommonProps {
	className?: string;
	showStepNumber?: boolean;
	vertical?: boolean;
}

export interface StepsProps extends CommonProps {
	current?: number;
	heading?: string;
	initial?: number;
}

export interface StepProps extends CommonProps {
	active?: boolean;
	description?: string;
	disabled?: boolean;
	icon?: React.ComponentType;
	stepIndex?: number; // 0, 1, 2, 3
	stepNumber?: string; // '1', '2', '3'
	title?: React.ReactNode;
}
