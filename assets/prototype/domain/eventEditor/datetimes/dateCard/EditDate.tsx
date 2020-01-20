import React from 'react';
import EditDateButton from './EditDateButton';
import EditDateModal from './EditDateModal';
import { EditDateProps } from '../types';

const EditDate: React.FC<EditDateProps> = ({ position, relatedTickets }): JSX.Element => (
	<>
		<EditDateButton position={position} />
		<EditDateModal relatedTickets={relatedTickets} />
	</>
);

export default EditDate;
