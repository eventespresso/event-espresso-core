import { useContext } from 'react';
import { FormContextProps } from '../types';
import FormContext from '../context';
import { ColProps } from 'antd/es/grid';

interface FormItemLayoutProps {
	labelCol?: ColProps;
	wrapperCol?: ColProps;
}

const useFormItemLayout = (): FormItemLayoutProps => {
	const { layout } = useContext<FormContextProps>(FormContext);

	return layout === 'horizontal'
		? {
				labelCol: { span: 4 },
				wrapperCol: { span: 14 },
		  }
		: null;
};

export default useFormItemLayout;
