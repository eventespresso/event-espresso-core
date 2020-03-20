import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

interface Props extends InputProps {
    htmlType?: string;
}

const Text: React.FC<Props> = ({ htmlType = 'text', ...props }) => {
    return <Input {...props} onPressEnter={(e) => e.preventDefault()} type={htmlType} />;
};

export default Text;
