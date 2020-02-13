import React from 'react';

import parseInfinity from '../services/utilities/parseInfinity';

interface InfinitySymbolProps {
	value: any;
	asInt?: boolean;
}

const InfinitySymbol: React.FC<InfinitySymbolProps> = ({ value, asInt }) => {
	value = parseInfinity(value, asInt);
	return value === Infinity ? <span className={'ee-infinity-sign'}>&infin;</span> : value;
};

export default InfinitySymbol;
