/**
 * Internal Imports
 */
import withLatestCheckin from '../with-latest-checkin';

/**
 * External imports
 */
import { Component } from '@wordpress/element';
import renderer from 'react-test-renderer';
import { select, dispatch, registerStore } from '@wordpress/data';
import { RegistrationFactory } from '@test/fixtures';
import '../../data/index';

describe( 'withLatestCheckin', () => {
	const getLatestCheckin = jest.fn().mockImplementation(
		() => ( { checkIn: true } )
	);
	const hasFinishedResolution = jest.fn().mockImplementation( () => true );
	const toggleCheckin = jest.fn();
	class TestComponent extends Component {
		render() {
			return <div { ...this.props } />;
		}
	}
	const getEnhancedComponent = ( testProps ) => {
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const EnhancedComponent = withLatestCheckin( TestComponent );
		return <EnhancedComponent { ...testProps } />;
	};
	beforeEach( () => {
		// we don't need original store here.
		registerStore( 'core/data', { selectors: {}, reducer: () => {} } );
		select( 'eventespresso/core' ).getLatestCheckin = getLatestCheckin;
		select( 'core/data' ).hasFinishedResolution = hasFinishedResolution;
		dispatch( 'eventespresso/core' ).toggleCheckin = toggleCheckin;
	} );
	afterEach( () => {
		getLatestCheckin.mockClear();
		hasFinishedResolution.mockClear();
		toggleCheckin.mockClear();
	} );
	describe( 'has expected props when value for registration is not an ' +
		'instance of BaseEntity', () => {
		let wrapper, testedComponent;
		beforeEach( () => {
			wrapper = renderer.create( getEnhancedComponent() );
			testedComponent = wrapper.root.findByType( TestComponent );
		} );
		it( 'selectors are not called', () => {
			expect( getLatestCheckin ).not.toHaveBeenCalled();
			expect( hasFinishedResolution ).not.toHaveBeenCalled();
		} );
		it( 'wrapped component has expected props', () => {
			expect( testedComponent.props.registration ).toBeUndefined();
			expect( testedComponent.props.datetimeId ).toBeUndefined();
			expect( testedComponent.props.checkinEntity ).toBeUndefined();
			expect( testedComponent.props.hasResolvedCheckin ).toBeUndefined();
			expect( testedComponent.props.onClick ).toBeDefined();
		} );
		it( 'onClick callback does not trigger toggleCheckin', () => {
			const onClick = testedComponent.props.onClick;
			onClick();
			expect( toggleCheckin ).not.toHaveBeenCalled();
		} );
	} );
	describe( 'has expected props when value for registration is an instance ' +
		'of BaseEntity', () => {
		let wrapper, testedComponent;
		const registration = RegistrationFactory.createNew( {} );
		const datetimeId = 10;
		beforeEach( () => {
			wrapper = renderer.create( getEnhancedComponent( {
				registration,
				datetimeId,
			} ) );
			testedComponent = wrapper.root.findByType( TestComponent );
		} );
		it( 'selectors are called', () => {
			expect( getLatestCheckin ).toHaveBeenCalledWith(
				registration.id,
				datetimeId
			);
			expect( hasFinishedResolution ).toHaveBeenCalledWith(
				'eventespresso/core',
				'getLatestCheckin',
				[ registration.id, datetimeId ]
			);
		} );
		it( 'wrapped component has expected props', () => {
			expect( testedComponent.props.registration ).toBe( registration );
			expect( testedComponent.props.datetimeId ).toBe( datetimeId );
			expect( testedComponent.props.checkinEntity )
				.toEqual( { checkIn: true } );
			expect( testedComponent.props.hasResolvedCheckin ).toBe( true );
			expect( testedComponent.props.onClick ).toBeDefined();
		} );
		it( 'onClick callback triggers toggleCheckin', () => {
			const onClick = testedComponent.props.onClick;
			onClick();
			expect( toggleCheckin ).toHaveBeenCalledWith(
				registration.id,
				datetimeId
			);
		} );
	} );
} );
