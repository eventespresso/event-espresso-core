import { data } from '@eventespresso/eejs';
import jQuery from 'jquery';


/**
 * @var ee_paypal_smart_button_args array of localized variables
 */
let eeCardinalCruise = null;
jQuery( document ).ready( () => {

	//add SPCO object
	const eeCardinalCommerceData = data.cardinalCommerce;
	eeCardinalCommerceData.data.spco = window.SPCO || null;
	eeCardinalCommerceData.data.cardinal = window.Cardinal || null;
	//create the smart buttons object
	eeCardinalCruise = new EeCardinalCruise( eeCardinalCommerceData.data, eeCardinalCommerceData.translations );
	//and set it up to listen for its cue to get initialized
	eeCardinalCruise.setInitListeners();
} );

/**
 *
 * @param {Object} instanceVars {
 * }
 * @param {Object} translations {
 * 	no_SPCO_error: string
 * 	no_paypal_js: string
 * }
 * @constructor
 */
function EeCardinalCruise(instanceVars, translations ) {
	this.spco = instanceVars.spco;
	this.cardinal = instanceVars.cardinal;
	this.jwt = instanceVars.jwt;
	this.slug = instanceVars.slug;
	this.translations = translations;

	/**
	 * Sets listeners that will trigger initializing the smart buttons.
	 */
	this.setInitListeners = function() {
		this.setListenerForPaymentMethodSelector();
		this.setListenerForDisplaySpco();
		this.setListenerForPaymentAmountChange();
		//also, if the page was reloaded on the payment option step, we should initialize immediately
		if ( this.billingFormLoaded() ) {
			this.initialize();
		}
	};

	/**
	 * When SPCO displays a step, if its the payment options step, and our billing
	 * form is present, initialize the smart buttons
	 *
	 */
	this.setListenerForDisplaySpco = function() {
		this.spco.main_container.on( 'spco_display_step', ( event, stepToShow ) => {
			if ( typeof stepToShow !== 'undefined' &&
				stepToShow === 'payment_options' &&
				this.billingFormLoaded()
			) {
				this.initialize();
			}
		} );
	};

	/**
	 * When they switch payment methods, if the payment method is this one,
	 * initialize the smart button (or if it's already initialized, just show it again).
	 * If they selected a different payment method, hide the smart buttons
	 */
	this.setListenerForPaymentMethodSelector = function() {
		this.spco.main_container.on( 'spco_switch_payment_methods', ( event, paymentMethod ) => {
			if ( typeof paymentMethod !== 'undefined' && paymentMethod === this.slug ) {
				this.initialize();
			} else if ( this.initialized ) {
				//and if this was previously initialized, make sure we hide the button
			}
		} );
	};

	/**
	 * Returns true if this payment method's billing form exists on the page
	 * @return {boolean} whether it was successffully loaded or not.
	 */
	this.billingFormLoaded = function() {
		return jQuery( '#paypal-pro-billing-form-credit-card' ).length > 0;
	};

	/**
	 * Initializes jQuery selected objects so we don't need to query for anything afterwards
	 */
	this.initializeObjects = function() {
		// Only initialize objects once. It's not removed when switching payment methods, and PayPal's JS
		// malfunctions if this gets reset.
		if ( ! this.initialized ) {
		}
	};

	/**
	 * Shows the smart buttons (this may require initializing them) and otherwise initializes this object
	 */
	this.initialize = function() {

		if ( typeof this.spco === 'undefined' ||
			typeof this.spco.show_event_queue_ajax_msg !== 'function' ||
			typeof this.spco.display_messages !== 'function' ||
			! this.spco.main_container ) {
			// No SPCO object, so we can't use SPCO to show a nice error message. At least put something in the console.
			warning( false, this.translations.no_SPCO_error );
			return;
		}
		// ensure that the Cardinal Commerce object (from https://songbird.cardinalcommerce.com/edge/v1/songbird.js) js class is loaded
		if ( typeof this.cardinal === 'undefined'
			// @todo: make sure we have all the methods we need too...
			// typeof this.cardinal.Button !== 'object' ||
			// typeof this.paypal.Button.render !== 'function'
		) {
			this.spco.show_event_queue_ajax_msg( 'error', this.translations.no_cardinal_error, this.spco.notice_fadeout_attention, true );
			return;
		}


		// Tell me how it goes...
		this.cardinal.configure({
			logging: {
				level: "on"
			}
		});

		// Fire up Cardinal Cruise.
		this.cardinal.setup("init", {
			jwt: this.jwt
		});

		// Ran when Cardinal is ready to go. See https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/557065/Songbird.js#Songbird.js-payments.setupComplete
		this.cardinal.on('payments.setupComplete', (setupCompleteData) => {
			this.cardinalSetupComplete = true;
		});

		this.setListenerForCardinalPaymentValidated();
		this.setListenerForPaymentSubmit();

		// Always re-initialize jQuery objects. If they were payment method switching, the old billing for inputs got
		// removed from the page and we need to find them again.
		this.initializeObjects();
	};

	/**
	 * Ran when Cardinal Cruise has finished validating  the mode of payment. Continue with processing the payment.
	 */
	this.setListenerForCardinalPaymentValidated = function(){
		this.cardinal.on('payments.validated', (data, jwt) => {
			if( typeof(data) !== 'object') {
				this.spco.show_event_queue_ajax_msg( 'error', this.translations.invalid_response_from_cardinal, this.spco.notice_fadeout_attention, true );
				return;
			}
			if(data.ActionCode === 'ERROR'){
				this.spco.show_event_queue_ajax_msg( 'error', data.ErrorDescription + '[' + data.ErrorNumber + ']', this.spco.notice_fadeout_attention, true );
				return;
			}

			this.saveCardinalCruiseResult(data, jwt);
			// Only pay attention if Cardinal is completely setup.
			if (! this.cardinalSetupComplete) {
				return;
			}
			this.getForm().find( '.spco-next-step-btn' ).trigger( 'click' );
		});
	};

	this.saveCardinalCruiseResult = function(data, jwt) {
		const result = JSON.stringify({
			data: data,
			jwt: jwt
		});
		alert ( 'cardinal cruse done. REsult was ' + result);
	};

	/**
	 * When the payment amount changes, just update this object's transaction_total
	 */
	this.setListenerForPaymentAmountChange = function() {
		this.spco.main_container.on( 'spco_payment_amount', ( event, paymentAmount ) => {
			if ( typeof paymentAmount !== 'undefined' && parseInt( paymentAmount ) !== 0 ) {
				this.transactionTotal = paymentAmount;
			}
		} );
	};

	this.setListenerForPaymentSubmit = function() {
		alert( 'setup listener for payment submit');
		this.getForm().on( 'submit', ( e ) => {
			e.preventDefault();
			const data = {
				Consumer: {
					Account: {
						AccountNumber: jQuery('#paypal-pro-billing-form-credit-card').val(),
						ExpirationMonth: jQuery('#paypal-pro-billing-form-exp-month').val(),
						ExpirationYear: jQuery('#paypal-pro-billing-form-exp-year').val(),
						CardCode: jQuery('#paypal-pro-billing-form-cvv').val()
					}
				}
			};
			alert( 'Cardinal sent credit card etails off I think');
			this.cardinal.start('cca', data, this.jwt);
		});
	};

	this.getForm = function(){
		return jQuery('#paypal-pro-billing-form-credit-card').parents( 'form:first' );
	}

	/**
	 * Rounds a number to the specified precision.
	 * See http://www.jacklmoore.com/notes/rounding-in-javascript/.
	 * @param {number} value
	 * @param {number} decimals
	 * @return {number} The original value, to the given precision.
	 */
	this.round = function( value, decimals ) {
		return Number( Math.round( value + 'e' + decimals ) + 'e-' + decimals );
	};
}

