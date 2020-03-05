import { TextProps as AntdTextProps } from 'antd/es/typography/Text';
import { BlockProps } from 'antd/es/typography/Base';

export interface AdditionalProps extends BlockProps, Omit<AntdTextProps, 'ellipsis'> {
	ellipsis?: boolean | EllipsisConfig;
	onChange?: (text: string) => void;
}

// type BaseProps = Omit<BlockProps, 'editable'>;

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
