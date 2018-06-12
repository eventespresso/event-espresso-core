	// Render the PayPal button
	jQuery(document).ready(function() {
		SPCO.main_container.on( 'spco_display_step', function(){
			initialize_smart_button();
		} );
		initialize_smart_button();
	});

function initialize_smart_button()
{
	var payment_div_id = '#paypal-button-container';
	var payment_div = jQuery(payment_div_id);
	if( payment_div.length == 0 ){
		//if there payment div doesn't exist, don't do anything more
		return;
	}
	paypal.Button.render({

		// Set your environment

		env: 'sandbox', // sandbox | production

		// Specify the style of the button
		// locale: 'en_BR',
		style: {
			layout: 'vertical',  // horizontal | vertical
			size:   'responsive',    // small, medium | large | responsive
			shape:  'pill',      // pill | rect
			color:  '',       // gold | blue | silver | black
		},

		// Specify allowed and disallowed funding sources
		//
		// Options:
		// - paypal.FUNDING.CARD
		// - paypal.FUNDING.CREDIT
		// - paypal.FUNDING.ELV

		funding: {
			allowed: [ paypal.FUNDING.CARD, paypal.FUNDING.CREDIT ],
			disallowed: [ ]
		},

		// PayPal Client IDs - replace with your own
		// Create a PayPal app: https://developer.paypal.com/developer/applications/create

		client: {
			sandbox:    'AbdGVrza9U1_msrsJEfhuf5T2oTDM-gLxnh4ihMVlttoP8Re_Lz1C2zp0_RQ1dlTV4fMhM_K-ZNdF_Ob',
			production: '<insert production client id>'
		},

		payment: function(data, actions) {
			return actions.payment.create({
				payment: {
					transactions: [
						{
							amount: { total: '0.01', currency: 'USD' }
						}
					]
				}
			});
		},

		// onClick: function() {
		// 	SPCO.display_payment_method(
		// 		'paypal_smart_buttons'
		// 	);
		// 	//if we did this, we just need to call jQuery( '#spco-go-to-step-finalize_registration-submit').trigger( 'click' );
		// 	//from onAuthorize
		// },

		onAuthorize: function(data, actions) {
			// don't execute the payment here. Let's do it server-side where it's more secure
			// return actions.payment.execute().then(function() {
				//window.alert('Payment Complete!');
				SPCO.display_payment_method(
					'paypal_smart_buttons'
				);
				// wait for the payment method to be fully displayed, then submit it
				jQuery(document).on('spco_switch_payment_methods', function(){
					jQuery('#paypal-payer-id').val(data.payerID);
					jQuery('#paypal-payment-id').val(data.paymentID);
					jQuery('#paypal-payment-token').val(data.paymentToken);
					jQuery('#paypal-order-id').val(data.orderID);
					jQuery('#spco-go-to-step-finalize_registration-submit').trigger( 'click' );
				});

			// });
		},
		onError: function( data, actions){
			if( typeof(data) !== 'undefined' && typeof(data.message) !== 'undefined') {
				var error = data.message;
			} else {
				var error = 'An error occurred while processing payment with PayPal';
			}
			var messages = {
				errors : error
			};
			SPCO.display_messages(messages,false);
		}

	}, payment_div_id);

}