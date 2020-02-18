import { TextProps as AntdTextProps } from 'antd/es/typography/Text';
import { BlockProps } from 'antd/es/typography/Base';

interface EllipsisConfig {
	rows?: number;
	expandable?: boolean;
	onExpand?: () => void;
}

export interface AdditionalProps {
	onChange?: (text: string) => void;
}

type BaseProps = Omit<BlockProps, 'editable'>;

export interface TextProps extends AdditionalProps, Omit<AntdTextProps, 'ellipsis'> {
	ellipsis: boolean | EllipsisConfig;
}

export interface HeadingProps extends AdditionalProps, BaseProps {
	level?: 1 | 2 | 3 | 4;
}

export type InputType = 'text' | 'heading' | 'textarea';

export interface TextAreaProps extends AdditionalProps, BaseProps {}

export interface EditableProps extends BaseProps, HeadingProps, AdditionalProps {
	inputType: InputType;
}
