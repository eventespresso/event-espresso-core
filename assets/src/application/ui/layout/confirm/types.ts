import { RenderFunction } from 'antd/lib/_util/getRenderPropValue';
import { PopconfirmProps } from 'antd/lib/popconfirm';

export interface ConfirmProps extends Omit<PopconfirmProps, 'title'> {
	title?: React.ReactNode | RenderFunction;
}
