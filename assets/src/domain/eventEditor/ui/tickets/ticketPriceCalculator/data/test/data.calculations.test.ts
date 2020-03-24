import { renderHook, act } from '@testing-library/react-hooks';
import { v4 as uuidv4 } from 'uuid';
import { last, head } from 'ramda';

import { useDataState } from '../';
import { usePriceTypeForPrice } from '@edtrServices/apollo/queries';
import { usePriceModifier } from '../../hooks';
import defaultPrice from '../../defaultPriceModifier';
import TestWrapper from './TestWrapper';

const timeout = 5000; // milliseconds
describe('TPC:data.calculations', () => {
	it('does nothing yet', async () => {
		// @todo
		expect(true).toBe(true);
	});
});
