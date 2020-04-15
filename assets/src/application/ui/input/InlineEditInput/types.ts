export interface AdditionalProps {
	className?: string;
	value?: number;
	onSubmit?: (text: string) => void;
}

export interface EditableProps extends AdditionalProps {
	inputType: InputType;
	tabIndex?: number;
}

export type InputType = 'text' | 'heading' | 'textarea';

export interface TextAreaProps extends AdditionalProps {}
export interface TextProps extends AdditionalProps {}
