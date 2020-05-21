export interface CommonProps {
	className?: string;
	orientation?: 'inline' | 'vertical';
	showStepNumber?: boolean;
}

export interface StepsProps extends CommonProps {
	current?: number;
	heading?: string;
	initial?: number;
}

export interface StepProps extends CommonProps {
	active?: boolean;
	description?: string;
	icon?: React.ComponentType;
	stepIndex?: number; // 0, 1, 2, 3
	stepNumber?: string; // '1', '2', '3'
	stepState?: 'active' | 'disabled';
	title?: React.ReactNode;
}
