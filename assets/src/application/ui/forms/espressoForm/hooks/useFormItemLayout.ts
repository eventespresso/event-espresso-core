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
				labelCol: { span: 5 },
				wrapperCol: { span: 18 },
		  }
		: null;
};

export default useFormItemLayout;
