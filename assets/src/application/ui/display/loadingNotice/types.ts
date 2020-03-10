import { SpinProps, SpinSize } from 'antd/lib/spin';

export interface LoadingNoticeProps {
	className?: string;
	loading?: boolean | SpinProps;
	size?: SpinSize;
	tip?: string;
}
