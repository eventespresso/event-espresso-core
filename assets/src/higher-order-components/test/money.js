/**
 * Internal Imports
 */
import withMoney from '../money';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * External Imports
 */
import { Component } from '@wordpress/element';
import renderer from 'react-test-renderer';

jest.mock( '@eventespresso/eejs', () => ( {
	...require.requireActual( '@eventespresso/eejs' ),
	CURRENCY_CONFIG: {
		code: 'USD',
		singularLabel: 'dollar',
		pluralLabel: 'dollars',
		sign: '$',
		signB4: true,
		decimalMark: '.',
		thousandsSeparator: ',',
		subunits: 100,
	},
} ) );

describe( 'withMoney()', () => {
	class TestComponent extends Component {
		render() {
			return <div { ...this.props } />;
		}
	}
	const getEnhancedComponent = ( testMap = [] ) => {
		return withMoney( testMap )( TestComponent );
	};

	const getWrappedTestComponent = ( testProps, testMap = [] ) => {
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const Wrapped = getEnhancedComponent( testMap );
		return <Wrapped { ...testProps } />;
	};

	it( 'Passes through props with no mapping provided', () => {
		const wrapper = renderer.create( getWrappedTestComponent(
			{ propA: 'testa', propB: 'testb' }
		) );
		const testComponent = wrapper.root.findByType( TestComponent );
		expect( testComponent.props.propA ).toBe( 'testa' );
		expect( testComponent.props.propB ).toBe( 'testb' );
	} );

	it( 'Gives a warning if propNameMap is not valid', () => {
		renderer.create( getWrappedTestComponent( {}, {} ) );
		const expectedMessage = 'Warning: The propNameMap argument provided to ' +
			'withMoney must be either a function or an array';
		expect( console ).toHaveErroredWith( expectedMessage );
		renderer.create( getWrappedTestComponent( {}, '' ) );
		expect( console ).toHaveErroredWith( expectedMessage );
	} );

	describe( 'It gives a warning if propNameMap is a function that returns' +
		' unexpected shape', () => {
		const expectedNoValuesWarning = 'Warning: The propNameMap callback ' +
			'for the withMoney HOC should return an object with a ' +
			'"convertedValues" key.';
		const expectedValuesNotArrayWarning = 'Warning: The propNameMap' +
			' callback for the withMoney HOC should return an object with a' +
			' "convertedValues" key that has an array of numbers as the value.';
		const expectedNoPropsWarning = 'Warning: The propNameMap callback for' +
			' the withMoneyHOC should return an object with a "props" key.';
		it( 'gives warnings for an empty object', () => {
			renderer.create( getWrappedTestComponent( {}, () => {
				return {};
			} ) );
			expect( console ).toHaveErroredWith( expectedNoValuesWarning );
			expect( console ).toHaveErroredWith( expectedNoPropsWarning );
		} );

		it( 'gives warnings for when object contains a convertedValues property' +
			' but it\'s not an array', () => {
			renderer.create( getWrappedTestComponent( {}, () => {
				return { convertedValues: '', props: {} };
			} ) );
			expect( console ).toHaveErroredWith( expectedValuesNotArrayWarning );
		} );
	} );

	it( 'converts prop with custom map function as expected', () => {
		const wrapper = renderer.create( getWrappedTestComponent(
			{ propA: 1000.25, propB: 2.25, propC: 'unconverted' },
			( props, MoneyVo ) => {
				const conversions = {
					propA: new MoneyVo( 1000.25, SiteCurrency ),
					propB: new MoneyVo( 2.25, SiteCurrency ),
				};
				return {
					props: {
						propA: conversions.propA,
						propB: conversions.propB,
						propC: props.propC,
					},
					convertedValues: [
						conversions.propA.toString(),
						conversions.propB.toString(),
						props.propC,
					],
				};
			}
		) );
		const testComponent = wrapper.root.findByType( TestComponent );
		expect( testComponent.props.propA ).toBeInstanceOf( Money );
		expect( testComponent.props.propA.toNumber() ).toBe( 1000.25 );
		expect( testComponent.props.propB ).toBeInstanceOf( Money );
		expect( testComponent.props.propB.toNumber() ).toBe( 2.25 );
		expect( testComponent.props.propC ).toBe( 'unconverted' );
	} );

	it( 'converts prop with array map as expected', () => {
		const wrapper = renderer.create( getWrappedTestComponent(
			{ propA: 1000.25, propB: 2.25, propC: 'unconverted' },
			[ 'propA', 'propB' ]
		) );
		const testComponent = wrapper.root.findByType( TestComponent );
		expect( testComponent.props.propA ).toBeInstanceOf( Money );
		expect( testComponent.props.propA.toNumber() ).toBe( 1000.25 );
		expect( testComponent.props.propB ).toBeInstanceOf( Money );
		expect( testComponent.props.propB.toNumber() ).toBe( 2.25 );
		expect( testComponent.props.propC ).toBe( 'unconverted' );
	} );

	it( 'Does not rerender unnecessarily', () => {
		const propsToPass = { propA: 1000.25, propB: 2.25, propC: 'unconverted' };
		const EnhancedComponent = getEnhancedComponent( [ 'propA', 'propB' ] );
		const wrapper = renderer.create( <EnhancedComponent { ...propsToPass } /> );
		const spy = jest.spyOn( EnhancedComponent.prototype, 'setState' );
		// send same props, should be no call
		wrapper.update( <EnhancedComponent { ...propsToPass } /> );
		expect( spy ).not.toHaveBeenCalled();

		// this demonstrates the need for the extra conditional testing the
		// order of values in the `convertedValues` state because otherwise
		// it'd be considered shallowEqual with previous states.
		wrapper.update( <EnhancedComponent propA={ 2.25 } propB={ 1000.25 } /> );
		expect( spy ).toHaveBeenCalled();
	} );
} );
