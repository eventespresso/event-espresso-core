	// Render the PayPal button
	jQuery(document).ready(function(){
		jQuery(document).on('spco_display_step',function(){

			paypal.Button.render({

				// Set your environment

				env: 'sandbox', // sandbox | production

				// Specify the style of the button

				style: {
					layout: 'vertical',  // horizontal | vertical
					size:   'medium',    // medium | large | responsive
					shape:  'rect',      // pill | rect
					color:  'gold'       // gold | blue | silver | black
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

				onAuthorize: function(data, actions) {
					return actions.payment.execute().then(function() {
						//window.alert('Payment Complete!');
						SPCO.display_payment_method(
							'paypal_smart_buttons'
						);
						// wait for the payment method to be fully displayed, then submit it
						jQuery(document).on('spco_switch_payment_methods', function(){
							jQuery( '#spco-go-to-step-finalize_registration-submit').trigger( 'click' );
						});

					});
				}

			}, '#paypal-button-container');
		});
	});