import TestRenderer from 'react-test-renderer';
import withBaseControl from '../base-control';
import { BaseControl } from '@wordpress/components';

describe( 'withBaseControl()', () => {
	const TestComponent = ( {} ) => {
		return <div />;
	};
	it( 'should generate the expected css id when there is no' +
		' custom id provided', () => {
		const WrappedComponent = withBaseControl()( TestComponent );
		const elementInstance = TestRenderer.create( <WrappedComponent /> )
			.root;
		const BaseControlInstance = elementInstance.findByType( BaseControl );
		const TestComponentInstance = elementInstance.findByType( TestComponent );

		expect( BaseControlInstance.props.id )
			.toEqual(
				`inspector--control-${ TestComponentInstance.props.instanceId }`
			);
	} );
	it( 'should generate the expected css id when there is a custom ' +
		'id provided', () => {
		const WrappedComponent = withBaseControl( 'custom-id' )( TestComponent );
		const elementInstance = TestRenderer.create( <WrappedComponent /> )
			.root;
		const BaseControlInstance = elementInstance.findByType( BaseControl );
		const TestComponentInstance = elementInstance.findByType( TestComponent );
		expect( BaseControlInstance.props.id )
			.toEqual(
				`inspector-custom-id-control-${ TestComponentInstance.props.instanceId }`
			);
	} );
} );
