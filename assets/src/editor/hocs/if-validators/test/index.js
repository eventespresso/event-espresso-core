/**
 * External imports
 */
import renderer from 'react-test-renderer';
import { AuthedDateTimeResponse, DateTimeFactory } from '@test/fixtures';

/**
 * Internal imports
 */
import { ifValidDateEntity } from '../index';

describe( 'ifValidDateEntity', () => {
	const inValidDateEntity = { id: 10, name: 'no date for you' };
	const validDateEntity = DateTimeFactory.fromExisting(
		{ ...AuthedDateTimeResponse, DTT_ID: 10 }
	);
	const TestComponent = ( { dateEntity } ) => {
		return <div>{ dateEntity.id }</div>;
	};
	const IfComponent = ifValidDateEntity( TestComponent );
	it( 'does not load WrappedComponent when no Date Entity is supplied', () => {
		const rendered = renderer.create(
			<IfComponent dateEntity={ inValidDateEntity } />
		);
		expect( rendered.root.children ).toEqual( [] );
	} );
	it( 'loads WrappedComponent when valid Date Entity is supplied', () => {
		const rendered = renderer.create(
			<IfComponent dateEntity={ validDateEntity } />
		);
		expect( rendered.root.children[ 0 ].type ).toEqual( TestComponent );
	} );
} );
