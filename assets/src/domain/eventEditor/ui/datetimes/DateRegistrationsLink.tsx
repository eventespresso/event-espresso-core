import React from 'react';
import { Datetime } from '@edtrServices/apollo/types';

interface DateRegistrationsLinkProps {
	datetime: Datetime;
}
const DateRegistrationsLink: React.FC<DateRegistrationsLinkProps> = ({ datetime }) => {
	// @todo add link
	return <span>{datetime.dbId}</span>;
};

export default DateRegistrationsLink;
