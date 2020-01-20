import React from 'react';

import EditTicketButton from './EditTicketButton';
import EditTicketModal from './EditTicketModal';
import { EditTicketProps } from '../types';

const EditTicket: React.FC<EditTicketProps> = ({ position, relatedDates }): JSX.Element => (
	<>
		<EditTicketButton position={position} />
		<EditTicketModal relatedDates={relatedDates} />
	</>
);

export default EditTicket;
