jQuery(document).ready(function($) {


	$('#entries-per-page-slct').on( 'change', function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		var theForm = $(this).parents('form');
		var formURL = theForm.attr('action');
		formURL = formURL.replace( '&noheader=true', '' );
		theForm.attr( 'action', formURL );
		theForm.submit();
	}); 

	var dates = $( '.datepicker' ).datepicker({
		defaultDate: "-1m",
		numberOfMonths: 2,
	});

	$('.confirm-delete').on( 'click', function() {
		var what = $(this).attr('rel');
		var answer = confirm( eei18n.confirm_delete );
  		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();




	$('#txn-admin-payment-method-slct').bind('change', function() {
		var mop = $(this).val();
		$('.mop').hide();
		$('.mop-'+mop).show();
	});



	var dialog = $( "#txn-admin-apply-payment-dv" ).draggable();
	// send to global space
	window.dialog = dialog;



	$( '#txn-admin-payments-tbl' ).on( 'click', '.txn-admin-payment-action-edit-lnk', function() {
		// grab payment ID
		var PAY_ID = $(this).attr('rel');
		$('#admin-modal-dialog-edit-payment-h2').show();
		$('#admin-modal-dialog-edit-payment-h2 > span').html(PAY_ID);
		// transfer values from table to modal box form
		$('#txn-admin-payment-payment-id-inp').val( PAY_ID );
		$('#txn-admin-payment-status-slct').val($('#payment-STS_ID-' + PAY_ID ).html());
		$('#txn-admin-payment-date-inp').val( $('#payment-date-' + PAY_ID ).html() );
		$('#txn-admin-payment-method-slct').val( $('#payment-method-' + PAY_ID ).html() );
		$('#txn-admin-payment-gateway-slct').val( $('#payment-gateway-id-' + PAY_ID ).html() );
		$('#txn-admin-payment-gateway-response-inp').val( $('#payment-response-' + PAY_ID ).html() );
		$('#txn-admin-payment-txn-id-chq-nmbr-inp').val( $('#payment-txn-id-chq-nmbr-' + PAY_ID ).html() );
		$('#txn-admin-payment-po-nmbr-inp').val( $('#payment-po-nmbr-' + PAY_ID ).html() );
		$('#txn-admin-payment-accounting-inp').val( $('#payment-accntng-' + PAY_ID ).html() );
		$('#txn-admin-payment-details-inp').val( $('#payment-details-' + PAY_ID ).html() );		
		$('#txn-admin-payment-amount-inp').val( $('#payment-amount-' + PAY_ID ).html() );

		$('#txn-admin-modal-dialog-edit-payment-lnk').removeClass('hidden');
		$('#txn-admin-modal-dialog-cancel-lnk').removeClass('hidden');
		
		display_payments_and_refunds_modal_dialog();
	}); 



	$( "#display-txn-admin-apply-payment" ).on( 'click',  function() {
		$('#admin-modal-dialog-apply-payment-h2').show();
		$('#txn-admin-modal-dialog-apply-payment-lnk').removeClass('hidden');
		$('#txn-admin-modal-dialog-cancel-lnk').removeClass('hidden');
		$('#txn-admin-payment-date-inp').val( $('#txn-admin-todays-date-inp').val() );
		var paymentAmount = $('#txn-admin-total-amount-due').html();
		$('#txn-admin-payment-amount-inp').val( paymentAmount );
		display_payments_and_refunds_modal_dialog();
	});



	$( "#display-txn-admin-apply-refund" ).on( 'click',  function() {
		$('#admin-modal-dialog-apply-refund-h2').show();
		$('#txn-admin-modal-dialog-apply-refund-lnk').removeClass('hidden');
		$('#txn-admin-modal-dialog-cancel-lnk').removeClass('hidden');
		$('#txn-admin-payment-payment-id-inp').val(0);
		$('#txn-admin-payment-type-inp').val(-1);
		$('#txn-admin-payment-date-inp').val( $('#txn-admin-todays-date-inp').val() );
		var refundAmount = $('#txn-admin-total-amount-due').html();
		$('#txn-admin-payment-amount-inp').val( refundAmount );
		display_payments_and_refunds_modal_dialog();
	});

	
	function display_payments_and_refunds_modal_dialog() {
		$('#message').hide();
		position_overlay();
		position_dialog();
		$('#txn-admin-payment-method-slct').trigger('change');
		overlay.on('click', function() {
			dialog.fadeOut( 'fast');
			overlay.fadeOut('fast', function(){
				overlay.removeClass('active');
				//reset form values
				$('.txn-admin-apply-payment-inp').each( function() {
					$(this).val('');			
				});
				var regCode = $('#txn-admin-reg-code-inp').val();
				$('#txn-admin-payment-accounting-inp').val( regCode );
				$('.txn-admin-apply-payment-slct').each( function() {
					$(this).val(0);
				});	
				$('#txn-admin-payment-gateway-response-slct').val('PAP');
				$('.admin-modal-dialog-h2').hide();
				$('#admin-modal-dialog-options-ul a').addClass('hidden');
				$('#txn-admin-payment-type-inp').val(1);
				// remove validation notices
				$('#txn-admin-apply-payment-frm .required').css( 'border', '1px solid #dfdfdf' ).removeClass('requires-value');
				$('.validation-notice-dv').hide();
				
				$('.mop').hide();		
			});
		});	
	}



	//modal dialog "submit" buttons

	$('#txn-admin-modal-dialog-apply-payment-lnk').on( 'click', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			apply_payment_or_refund( 'apply' );
		}
	});

	$('#txn-admin-modal-dialog-apply-refund-lnk').on( 'click', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			apply_payment_or_refund( 'apply' );
		}
	});

	$('#txn-admin-modal-dialog-edit-payment-lnk').on( 'click', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			apply_payment_or_refund( 'edit' );
		}
	});


	
	
	function validate_form_inputs() {
		goodToGo = true;
		$('#txn-admin-apply-payment-frm .required').each( function( index ) {
		    if( $( this ).val() == '' || $( this ).val() == 0 ) {
		 		$( this ).addClass('requires-value').siblings( '.validation-notice-dv' ).fadeIn();
				goodToGo = false;
			}
			$( this ).on( 'change', function() {
			    if( $( this ).val() != '' || $( this ).val() != 0 ) {
			 		$( this ).removeClass('requires-value').siblings( '.validation-notice-dv' ).fadeOut('fast');
				}
			});
		});
		return goodToGo;
	}



	function apply_payment_or_refund( editOrApply ) {
 
		var formURL = $('#txn-admin-apply-payment-frm').attr('action');
		formURL = formURL + '&noheader=true';		
		$('#espresso-ajax').val(1);
		$('#txn-admin-noheader-inp').val('true');
		var formData = $('#txn-admin-apply-payment-frm').serialize();
		//alert( 'formURL = ' + formURL + '\n\n' + 'formData = ' + formData );
//		console.log(formData);
//		response = new Object();

		$.ajax({
					type: "POST",
					url:  formURL,
					data: formData,
					dataType: "json",
					beforeSend: function() {
						do_before_admin_page_ajax();
					},
					success: function( response ) {
						console.log(response);
						if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
							response.edit_or_apply = editOrApply;
							process_return_data( response );
						} else if ( response.errors ) {
							show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2' );
						} else {
							response.errors = eei18n.invalid_server_response;
							show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
						}
					},
					error: function(response) {
						console.log(response);
						if ( response.errors == undefined ) {
							response.errors = eei18n.error_occured;
						}
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
			});
	}




	// delete a payment
	$( '#txn-admin-payments-tbl' ).on( 'click', '.txn-admin-payment-action-delete-lnk', function() {

		$('#espresso-ajax').val(1);
		var formURL = $('#txn-admin-delete-payment-form-url-inp').val();
		var PAY_ID = $(this).attr('rel');
		//alert( 'formURL = ' + formURL + '\n' + 'PAY_ID = ' + PAY_ID );
		console.log( 'formURL = ' + formURL + '\n' + 'PAY_ID = ' + PAY_ID );
		var delBtn = $( this );

		
		$.ajax({
					type: "POST",
					url:  formURL,
					data: { ID : PAY_ID, espresso_ajax : 1, noheader : 'true' },
					dataType: "json",
					beforeSend: function() {
						do_before_admin_page_ajax();
					},
					success: function(response){	
						if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
							delBtn.closest('tr').remove();
							process_delete_payment( response );
						} else if ( response.errors ) {
							show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper' );
						} else {
							response = new Object();
							response.errors = eei18n.invalid_server_response;
							show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );
						}
					},
					error: function(response) {
						if ( response.errors == undefined ) {
							response.errors = eei18n.error_occured;
						}
						show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );
					}
			});
	});




	function process_return_data( response ) {

		$('#espresso-admin-page-ajax-loading').fadeOut('fast');
		overlay.trigger('click');

		// grab PAY ID from return data
		var PAY_ID = response.return_data.PAY_ID;

		if ( response.edit_or_apply == 'apply' ) {
			// grab empty paymnet table row
			var newRow = '\n				<tr id="txn-admin-payment-tr-PAY_ID">' + $('#txn-admin-payment-empty-row-tr').html() + '\n				</tr>\n';
			// insert new PAY_ID 
			newRow = newRow.replace( /PAY_ID/g, PAY_ID );
			$('#txn-admin-payments-total-tr').before( newRow );
//			$('#txn-admin-payments-tbl tr:last').after( newRow );
		}
			
		update_payment( PAY_ID, response );
		update_payment_totals( response );
		
		show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );

	}


	function update_payment( PAY_ID, response ) {
		// payment-status
		$('#payment-status-' + PAY_ID + ' > span').html( response.return_data.status );
		$('#payment-STS_ID-' + PAY_ID).html( response.return_data.pay_status );
		// and the css class for the payment status wrapper
		$('#payment-status-' + PAY_ID + ' > span').removeClass();
		$('#payment-status-' + PAY_ID + ' > span').addClass( 'txn-admin-payment-status-'+response.return_data.pay_status );
		// payment-date
		$('#payment-date-' + PAY_ID).html( response.return_data.date );
		// payment-method
		$('#payment-method-' + PAY_ID).html( response.return_data.method );
		// payment-gateway
		$('#payment-gateway-' + PAY_ID).html( response.return_data.gateway );
		$('#payment-gateway-id-' + PAY_ID).html( response.return_data.gateway );
		// payment-gateway_response
		$('#payment-response-' + PAY_ID).html( response.return_data.gateway_response );
		// payment-txn_id_chq_nmbr
		$('#payment-txn-id-chq-nmbr-' + PAY_ID).html( response.return_data.txn_id_chq_nmbr );
		// payment-po_number
		$('#payment-po-nmbr-' + PAY_ID).html( response.return_data.po_number );
		// payment-extra_accntng
		$('#payment-accntng-' + PAY_ID).html( response.return_data.extra_accntng );
		// payment-amount
		var payment = parseFloat( response.return_data.amount );		
		$('#payment-amount-' + PAY_ID).html( payment.toFixed(2) );
		// update amount span class
		if ( payment < 0 ) {
			response.return_data.pay_status = 'PDC';
		}
		$('#payment-amount-' + PAY_ID).parent().removeClass().addClass( 'txn-admin-payment-status-'+response.return_data.pay_status );		
		
	}



	function update_payment_totals( response ) {
		//alert( response.toSource() );	

		// payment-total
		var totalPaid = parseFloat( response.return_data.total_paid );	
		$('#txn-admin-payment-total').html( totalPaid.toFixed(2) );
		// total-amount-due
		var txnTotal = parseFloat( $('#txn-admin-grand-total').html() );			
		var totalAmountDue = txnTotal - totalPaid;
		//$('#txn-admin-total-amount-due').html( totalAmountDue.toFixed(2) );
		$('#txn-amount-due-h2 > span').html( totalAmountDue.toFixed(2) );

		$('#txn-status').html( eei18n.txn_status_array[ response.return_data.txn_status ] );
		$('#txn-status').removeClass().addClass( 'status-' + response.return_data.txn_status  );

		if ( totalPaid == txnTotal ) {
			//alert( 'paid in full' );
			$('#txn-amount-due-h2').addClass('hidden');
			$('#txn-amount-due-h2 > span').removeClass();
			$('#txn-admin-payments-total-tr').removeClass('hidden')
			$('#txn-admin-no-payments-tr').addClass('hidden');
			$('#payments-total-spn').html( 'Payments Total' );
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');
		} else if ( totalPaid > txnTotal ) {
			//alert( 'overpaid' );
			$('#txn-amount-due-h2').removeClass('hidden');
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').removeClass('hidden')
			$('#txn-admin-no-payments-tr').addClass('hidden');
			$('#payments-total-spn').html( 'This transaction has been overpaid ! Payments Total' );
			$('#payments-total-spn').parents('tr').addClass( 'red-text');
		} else if ( totalPaid > 0 ) {
			//alert( 'part payment' );
			$('#txn-amount-due-h2').removeClass('hidden');
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-part-payment-spn');
			$('#txn-admin-payments-total-tr').removeClass('hidden')
			$('#txn-admin-no-payments-tr').addClass('hidden');
			$('#payments-total-spn').html( 'Payments Total' );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');			
		} else {
			//alert( 'no payment' );
			$('#txn-amount-due-h2').removeClass('hidden');
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').addClass('hidden')
			$('#txn-admin-no-payments-tr').removeClass('hidden');
			$('#payments-total-spn').html( 'Payments Total' );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');			
		}

	}




	function process_delete_payment( response ) {

		// grab PAY ID from return data
		var PAY_ID = response.return_data.PAY_ID;
		update_payment_totals( response );
		show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', false );
	}




	$('#txn-admin-modal-dialog-cancel-lnk').on( 'click',  function() {
		overlay.trigger('click');
	});




		
	
});

