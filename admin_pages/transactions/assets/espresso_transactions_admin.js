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
		numberOfMonths: 2
	});/**/

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

	var dialog_content = {};
	var d_contents = '';



	$( '#txn-admin-payments-tbl' ).on( 'click', '.txn-admin-payment-action-edit-lnk', function() {
		display_payments_and_refunds_modal_dialog();
		$('.txn-reg-status-change-reg-status').val('NAN');
		// grab payment ID
		var PAY_ID = $(this).attr('rel');
		$('#admin-modal-dialog-edit-payment-h2').show();
		$('#admin-modal-dialog-edit-payment-h2 > span').html(PAY_ID);
		// transfer values from table to modal box form
		$('#txn-admin-payment-payment-id-inp').val( PAY_ID );
		$('#txn-admin-payment-status-slct').val($('#payment-STS_ID-' + PAY_ID ).text());
		$('#txn-admin-payment-date-inp').val( $('#payment-date-' + PAY_ID ).text() );
		$('#txn-admin-payment-method-slct').val( $('#payment-method-' + PAY_ID ).text() );
		$('#txn-admin-payment-gateway-slct').val( $('#payment-gateway-id-' + PAY_ID ).text() );
		$('#txn-admin-payment-gateway-response-inp').val( $('#payment-response-' + PAY_ID ).text() );
		$('#txn-admin-payment-txn-id-chq-nmbr-inp').val( $('#payment-txn-id-chq-nmbr-' + PAY_ID ).text() );
		$('#txn-admin-payment-po-nmbr-inp').val( $('#payment-po-nmbr-' + PAY_ID ).text() );
		$('#txn-admin-payment-accounting-inp').val( $('#payment-accntng-' + PAY_ID ).text() );
		$('#txn-admin-payment-details-inp').val( $('#payment-details-' + PAY_ID ).text() );
		$('#txn-admin-payment-amount-inp').val( $('#payment-amount-' + PAY_ID ).text() );

		$('#txn-admin-modal-dialog-edit-payment-lnk').show();
		$('#txn-admin-modal-dialog-cancel-lnk').show();
		dttPickerHelper.resetpicker().picker($('#txn-admin-payment-date-inp'), {}, $('#txn-admin-payment-amount-inp'), true);
	});



	$( "#display-txn-admin-apply-payment" ).on( 'click',  function() {
		display_payments_and_refunds_modal_dialog();
		//set reg status to approved by default
		$('.txn-reg-status-change-reg-status').val('RAP');
		$('#admin-modal-dialog-delete-payment-h2').show();
		$('#txn-admin-modal-dialog-apply-payment-lnk').show();
		$('#txn-admin-modal-dialog-cancel-lnk').show();
		$('#txn-admin-payment-date-inp').val( $('#txn-admin-todays-date-inp').val() );
		var paymentAmount = $('#txn-admin-total-amount-due').text();
		$('#txn-admin-payment-amount-inp').val( paymentAmount );
		dttPickerHelper.resetpicker().picker($('#txn-admin-payment-date-inp'), {}, $('#txn-admin-payment-amount-inp'), true);
	});

	$( '#txn-admin-payments-tbl' ).on( 'click', '.txn-admin-payment-action-delete-lnk', function() {
		display_delete_payment_modal_dialog();
		//grab payment ID
		var PAY_ID = $(this).attr('rel');
		$('#delete-txn-admin-payment-payment-id-inp').val( PAY_ID );
		$('.delete-txn-reg-status-change-reg-status').val('NAN');
		$('#admin-modal-dialog-delete-payment-h2').show();
		$('#txn-admin-modal-dialog-delete-lnk').show();
		$('#del-txn-admin-modal-dialog-cancel-lnk').show();
	});



	$( "#display-txn-admin-apply-refund" ).on( 'click',  function() {
		display_payments_and_refunds_modal_dialog();
		$('.txn-reg-status-change-reg-status').val('RCN');
		$('#admin-modal-dialog-apply-refund-h2').show();
		$('#txn-admin-modal-dialog-apply-refund-lnk').show();
		$('#txn-admin-modal-dialog-cancel-lnk').show();
		$('#txn-admin-payment-payment-id-inp').val(0);
		$('#txn-admin-payment-type-inp').val(-1);
		$('#txn-admin-payment-date-inp').val( $('#txn-admin-todays-date-inp').val() );
		var refundAmount = $('#txn-admin-total-amount-due').text();
		$('#txn-admin-payment-amount-inp').val( refundAmount );
		dttPickerHelper.resetpicker().picker($('#txn-admin-payment-date-inp'), {}, $('#txn-admin-payment-amount-inp'), true);
	});


	function display_payments_and_refunds_modal_dialog() {
		$('#message').hide();
		dialog_content = $('#txn-admin-apply-payment-dv');
		d_contents = dialog_content.html();
		dialog_content.empty();
		dialogHelper.displayModal().addContent(d_contents);
		overlay.on('click', function() {
				//add content back to dom
				dialog_content.html(d_contents);
				$('.admin-modal-dialog-h2').hide();
				$('#admin-modal-dialog-options-ul a').hide();
				$('#txn-admin-payment-method-slct').trigger('change');
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
				$('#txn-admin-payment-type-inp').val(1);
				// remove validation notices
				$('#txn-admin-apply-payment-frm .required').css( 'border', '1px solid #dfdfdf' ).removeClass('requires-value');
				$('.validation-notice-dv').hide();

				$('.mop').hide();
			});
	}



	//modal dialog "submit" buttons

	$(document).on( 'click', '#txn-admin-modal-dialog-apply-payment-lnk', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			toggleaAjaxActivity();
			apply_payment_or_refund( 'apply' );
		}
	});

	$(document).on( 'click', '#txn-admin-modal-dialog-apply-refund-lnk', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			toggleaAjaxActivity();
			apply_payment_or_refund( 'apply' );
		}
	});

	$(document).on( 'click', '#txn-admin-modal-dialog-edit-payment-lnk', function( event ) {
		event.preventDefault();
		if ( validate_form_inputs() ) {
			$('#espresso-ajax').val(1);
			toggleaAjaxActivity();
			apply_payment_or_refund( 'edit' );
		}
	});


	$(document).on( 'click', '#txn-admin-modal-dialog-delete-lnk', function( event ) {
		event.preventDefault();
		$('#delete-espresso-ajax').val(1);
		toggleaAjaxActivity();
		apply_delete_payment_or_refund();
	});




	function validate_form_inputs() {
		goodToGo = true;
		$('#txn-admin-apply-payment-frm .required').each( function( index ) {
			if( $( this ).val() === false ) {
				$( this ).addClass('requires-value').siblings( '.validation-notice-dv' ).fadeIn();
				goodToGo = false;
			}
			$( this ).on( 'change', function() {
				if( $( this ).val() !== false ) {
					$( this ).removeClass('requires-value').siblings( '.validation-notice-dv' ).fadeOut('fast');
				}
			});
		});
		return goodToGo;
	}



	function toggleaAjaxActivity( done ) {
		done = typeof(done) === 'undefined' ? false : true;
		if ( done ) {
			$('#espresso-ajax-loading').eeCenter().fadeOut('fast');
			$('#txn-admin-modal-dialog-apply-payment-lnk').fadeIn('fast');
			$('#txn-admin-modal-dialog-apply-refund-lnk').fadeIn('fast');
			$('#txn-admin-modal-dialog-edit-payment-lnk').fadeIn('fast');
			$('#txn-admin-modal-dialog-delete-lnk').fadeIn('fast');
			$('#del-txn-admin-modal-dialog-cancel-lnk').fadeIn('fast');
			$('#delete-ee-ajax-processing-text').fadeOut('fast');
			$('#ee-ajax-processing-text').fadeOut('fast');
		} else {
			$('#espresso-ajax-loading').eeCenter().fadeIn('fast');
			$('#txn-admin-modal-dialog-apply-payment-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-apply-refund-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-edit-payment-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-cancel-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-delete-lnk').fadeOut('fast');
			$('#del-txn-admin-modal-dialog-cancel-lnk').fadeOut('fast');
			$('#delete-ee-ajax-processing-text').fadeIn('fast');
			$('#ee-ajax-processing-text').fadeIn('fast');
		}
	}



	function apply_payment_or_refund( editOrApply ) {

		var formURL = $('#txn-admin-apply-payment-frm').attr('action');
		formURL = formURL + '&noheader=true&ee_admin_ajax=true';
		$('#espresso-ajax').val(1);
		$('#txn-admin-noheader-inp').val('true');

		var formData = $('#txn-admin-apply-payment-frm').serializeFullArray();
		formData.ee_admin_ajax = true;
		formData.page = 'espresso_transactions';
		formData.action = 'espresso_apply_payment';
		formData.noheader = true;
		//alert( 'formURL = ' + formURL + '\n\n' + 'formData = ' + formData );
		formData.txn_admin_payment.amount = accounting.unformat(formData.txn_admin_payment.amount);
//		response = new Object();

		$.ajax({
					type: "POST",
					url:  ajaxurl,
					data: formData,
					dataType: "json",
					beforeSend: function(jqXHR, obj) {
						do_before_admin_page_ajax();
					},
					success: function( response ) {
						/*console.log(response);/**/
						if ( typeof(response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null ) {
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
						/*console.log(response);/**/
						if ( typeof(response.errors) === 'undefined' ) {
							response.errors = eei18n.error_occurred;
						}
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
			});
	}


	function display_delete_payment_modal_dialog() {
		$('#message').hide();
		dialog_content = $('#txn-admin-delete-payment-dv');
		d_contents = dialog_content.html();
		dialog_content.empty();
		dialogHelper.displayModal().addContent(d_contents);
		overlay.on('click', function() {
				//add content back to dom
				dialog_content.html(d_contents);
				$('.admin-modal-dialog-h2').hide();
				$('#del-admin-modal-dialog-options-ul a').hide();
			});
	}


	// delete a payment
	function apply_delete_payment_or_refund() {
		$('#delete-txn-admin-noheader-inp').val('true');
		var formData = $('#txn-admin-delete-payment-frm').serializeFullArray();
		var PAY_ID = $( '#delete-txn-admin-payment-payment-id-inp' ).val();
		var delBtn = $( '.txn-admin-payment-action-delete-lnk[rel="' + PAY_ID + '"]');
		formData.ee_admin_ajax = true;
		formData.noheader = true;
		formData.page = 'espresso_transactions';
		formData.action= 'espresso_delete_payment';
		$.ajax({
					type: "POST",
					url:  ajaxurl,
					data: formData,
					dataType: "json",
					beforeSend: function(jqXHR, obj) {
						do_before_admin_page_ajax();
					},
					success: function(response){
						if ( typeof(response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null ) {
							delBtn.closest('tr').remove();
							process_delete_payment( response );
						} else if ( response.errors ) {
							show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper' );
						} else {
							response = {};
							response.errors = eei18n.invalid_server_response;
							show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );
						}
					},
					error: function(response) {
						if ( typeof(response.errors) === 'undefined' ) {
							response.errors = eei18n.error_occurred;
						}
						show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );
					}
			});
	}




	function process_return_data( response ) {

		toggleaAjaxActivity( true );
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



	function update_payment_status( PAY_ID, status ) {
		var status_itm = $('#payment-status-' + PAY_ID);
		status_itm.removeClass().addClass('ee-status-strip-td ee-status-strip pymt-status-' + status);
	}



	function update_payment( PAY_ID, response ) {
		// payment-status
		update_payment_status(PAY_ID, response.return_data.STS_ID);
		$('#payment-STS_ID-' + PAY_ID).html( response.return_data.pay_status );
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
		var payment = accounting.formatMoney( response.return_data.amount );
		$('#payment-amount-' + PAY_ID).html( payment );
		// update amount span class
		if ( accounting.unformat(payment) < 0 ) {
			response.return_data.pay_status = 'PDC';
		}
		$('#payment-amount-' + PAY_ID).parent().removeClass().addClass( 'txn-admin-payment-status-'+response.return_data.pay_status );

	}



	function update_payment_totals( response ) {
		//alert( response.toSource() );

		// payment-total
		var totalPaid = response.return_data.total_paid;
		$('#txn-admin-payment-total').html( accounting.formatMoney( totalPaid ) );
		// total-amount-due
		var txnTotal = accounting.unformat( $('#txn-admin-grand-total').text() );
		var totalAmountDue = txnTotal - totalPaid;
		//$('#txn-admin-total-amount-due').html( totalAmountDue.toFixed(2) );
		$('#txn-amount-due-h2 > span').html( accounting.formatMoney( totalAmountDue ) );

		$('#txn-status').html( eei18n.txn_status_array[ response.return_data.txn_status ] );
		$('#txn-status').removeClass().addClass( 'status-' + response.return_data.txn_status  );

		if ( totalPaid == txnTotal ) {
			//alert( 'paid in full' );
			$('#txn-amount-due-h2').hide();
			$('#txn-amount-due-h2 > span').removeClass();
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( 'Payments Total' );
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');
		} else if ( totalPaid > txnTotal ) {
			//alert( 'overpaid' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( 'This transaction has been overpaid ! Payments Total' );
			$('#payments-total-spn').parents('tr').addClass( 'red-text');
		} else if ( totalPaid > 0 ) {
			//alert( 'part payment' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-part-payment-spn');
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( 'Payments Total' );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');
		} else {
			//alert( 'no payment' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').hide();
			$('#txn-admin-no-payments-tr').show();
			$('#payments-total-spn').html( 'Payments Total' );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'red-text');
		}

	}




	function process_delete_payment( response ) {
		toggleaAjaxActivity( true );
		overlay.trigger('click');
		// grab PAY ID from return data
		var PAY_ID = response.return_data.PAY_ID;
		update_payment_totals( response );
		show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', false );
	}




	$(document).on( 'click', '#txn-admin-modal-dialog-cancel-lnk', function() {
		overlay.trigger('click');
	});

	$(document).on( 'click', '#del-txn-admin-modal-dialog-cancel-lnk', function() {
		overlay.trigger('click');
	});

});
