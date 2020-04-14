export interface AdditionalProps {
	className?: string;
	value?: number;
	onSubmit?: (text: string) => void;
}

export interface EditableProps extends HeadingProps, AdditionalProps {
	inputType: InputType;
	tabIndex?: number;
}

interface EllipsisConfig {
	rows?: number;
	expandable?: boolean;
	onExpand?: () => void;
}

export interface HeadingProps extends AdditionalProps {
	level?: 1 | 2 | 3 | 4;
}

export type InputType = 'text' | 'heading' | 'textarea';

export interface TextAreaProps extends AdditionalProps {}
export interface TextProps extends AdditionalProps {}
