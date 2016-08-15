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

	$('.confirm-delete').on( 'click', function() {
		var what = $(this).attr('rel');
		var answer = confirm( eei18n.confirm_delete );
		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();


	var dialog_content = {};
	var d_contents = '';
	var txn_admin_payments_table = $( '#txn-admin-payments-tbl' );


	txn_admin_payments_table.on( 'click', '.txn-admin-payment-action-edit-lnk', function() {
		display_payments_and_refunds_modal_dialog();
		// grab payment ID
		var PAY_ID = $(this).data( 'paymentId');
		var payAmt = accounting.unformat( $('#payment-amount-' + PAY_ID ).text() );

		//display depending on whether amount is negative (refund) or positive (payment).
		if ( payAmt < 0 ) {
			//refund
			$('.txn-reg-status-change-reg-status').val('RCN');
            $('#txn-admin-payment-type-inp').val(-1);
			$('#admin-modal-dialog-edit-refund-h2').show();
			$('#admin-modal-dialog-edit-refund-h2' ).find('span').html(PAY_ID);
			// transfer values from table to modal box form
			$('#txn-admin-payment-payment-id-inp').val( PAY_ID );
			$('#txn-admin-payment-status-slct').val($('#payment-STS_ID-' + PAY_ID ).text());
			$('#txn-admin-payment-date-inp').val( $('#payment-date-' + PAY_ID ).text() );
			$('#txn-admin-payment-method-slct').val( $('#payment-gateway-id-' + PAY_ID ).text() );
			$('#txn-admin-payment-gateway-response-inp').val( $('#payment-response-' + PAY_ID ).text() );
			$('#txn-admin-payment-txn-id-chq-nmbr-inp').val( $('#payment-txn-id-chq-nmbr-' + PAY_ID ).text() );
			$('#txn-admin-payment-po-nmbr-inp').val( $('#payment-po-nmbr-' + PAY_ID ).text() );
			$('#txn-admin-payment-accounting-inp').val( $('#payment-accntng-' + PAY_ID ).text() );
			$('#txn-admin-payment-details-inp').val( $('#payment-details-' + PAY_ID ).text() );
			$('#txn-admin-payment-amount-inp').val( payAmt * -1 );
			$('#txn-admin-apply-payment-to-all-registrations-inp').data( 'paymentId', PAY_ID );
			$('#txn-admin-apply-payment-to-some-registrations-inp').data( 'paymentId', PAY_ID );

			$('#txn-admin-modal-dialog-edit-refund-lnk').show();
			$('#txn-admin-modal-dialog-cancel-lnk').show();
		} else {
			//payment
			$('.txn-reg-status-change-reg-status').val('NAN');
			$('#admin-modal-dialog-edit-payment-h2').show().find('span').html(PAY_ID);
			// transfer values from table to modal box form
			$('#txn-admin-payment-payment-id-inp').val( PAY_ID );
            $('#txn-admin-payment-type-inp').val(1);
			$('#txn-admin-payment-status-slct').val($('#payment-STS_ID-' + PAY_ID ).text());
			$('#txn-admin-payment-date-inp').val( $('#payment-date-' + PAY_ID ).text() );
			$('#txn-admin-payment-method-slct').val( $('#payment-gateway-id-' + PAY_ID ).text() );
			$('#txn-admin-payment-gateway-response-inp').val( $('#payment-response-' + PAY_ID ).text() );
			$('#txn-admin-payment-txn-id-chq-nmbr-inp').val( $('#payment-txn-id-chq-nmbr-' + PAY_ID ).text() );
			$('#txn-admin-payment-po-nmbr-inp').val( $('#payment-po-nmbr-' + PAY_ID ).text() );
			$('#txn-admin-payment-accounting-inp').val( $('#payment-accntng-' + PAY_ID ).text() );
			$('#txn-admin-payment-details-inp').val( $('#payment-details-' + PAY_ID ).text() );
			$('#txn-admin-payment-amount-inp').val( $('#payment-amount-' + PAY_ID ).text() );
			$('#txn-admin-apply-payment-to-all-registrations-inp').data( 'paymentId', PAY_ID );
			$('#txn-admin-apply-payment-to-some-registrations-inp').data( 'paymentId', PAY_ID );

			$('#txn-admin-modal-dialog-edit-payment-lnk').show();
			$('#txn-admin-modal-dialog-cancel-lnk').show();
		}
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

		//make sure payment status selector shows
		$('.txn-admin-apply-payment-status-dv').show();

		dttPickerHelper.resetpicker().picker($('#txn-admin-payment-date-inp'), {}, $('#txn-admin-payment-amount-inp'), true);
	});

	txn_admin_payments_table.on( 'click', '.txn-admin-payment-action-delete-lnk', function() {
		display_delete_payment_modal_dialog();
		//grab payment ID
		var PAY_ID = $(this).data( 'paymentId');
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
		//don't show payment status selector
		$('.txn-admin-apply-payment-status-dv').hide();

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


    $(document).on( 'click', '#txn-admin-modal-dialog-edit-refund-lnk', function( event ) {
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
			if( ! $(this).val() ) {
				$( this ).addClass('requires-value').siblings( '.validation-notice-dv' ).fadeIn();
                $( this ).eeScrollTo(400);
				goodToGo = false;
			}
			$( this ).on( 'change', function() {
				if( ! $(this).val() ) {
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
            $('#txn-admin-modal-dialog-edit-refund-lnk').fadeIn('fast');
			$('#txn-admin-modal-dialog-delete-lnk').fadeIn('fast');
			$('#del-txn-admin-modal-dialog-cancel-lnk').fadeIn('fast');
			$('#delete-ee-ajax-processing-text').fadeOut('fast');
			$('#ee-ajax-processing-text').fadeOut('fast');
		} else {
			$('#espresso-ajax-loading').eeCenter().fadeIn('fast');
			$('#txn-admin-modal-dialog-apply-payment-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-apply-refund-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-edit-payment-lnk').fadeOut('fast');
            $('#txn-admin-modal-dialog-edit-refund-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-cancel-lnk').fadeOut('fast');
			$('#txn-admin-modal-dialog-delete-lnk').fadeOut('fast');
			$('#del-txn-admin-modal-dialog-cancel-lnk').fadeOut('fast');
			$('#delete-ee-ajax-processing-text').fadeIn('fast');
			$('#ee-ajax-processing-text').fadeIn('fast');
		}
	}



	function apply_payment_or_refund( editOrApply ) {

		//var formURL = $('#txn-admin-apply-payment-frm').attr('action');
		$('#espresso-ajax').val(1);
		$('#txn-admin-noheader-inp').val('true');

		var formData = $('#txn-admin-apply-payment-frm').serializeFullArray();
		formData.ee_admin_ajax = true;
		formData.page = 'espresso_transactions';
		formData.action = 'espresso_apply_payment';
		formData.noheader = true;
		formData.ee_admin_ajax = true;
		formData.txn_admin_payment.amount = accounting.unformat( formData.txn_admin_payment.amount );

		$.ajax({
					type: "POST",
					url:  ajaxurl,
					data: formData,
					dataType: "json",
					beforeSend: function() {
						do_before_admin_page_ajax();
					},
					success: function( response ) {

						if ( typeof(response.data.return_data) !== 'undefined' && response.data.return_data !== false && response.data.return_data !== null ) {
							response.edit_or_apply = editOrApply;
							process_return_data( response );
						} else {
							if( typeof(response.error) == 'undefined' ||  response.error == false || response.error == null || response.error == '' ) {
								response.error = eei18n.invalid_server_response;
								response.errors = response.error;
							}
							//hide the modal dialogue and show the error
							overlay.trigger('click');
							show_admin_page_ajax_msg( response );
                                                        
						}
					},
					error: function(response) {
						if ( typeof(response.error) === 'undefined' ) {
							response.error = eei18n.error_occurred;
							response.errors = eei18n.error_occurred;
						}
						show_admin_page_ajax_msg( response );
					}
			});
	}


	function process_notifications( response, show_before ) {
		show_before = typeof( show_before ) !== 'undefined' && show_before !== '' ? show_before : '.nav-tab-wrapper';
		show_admin_page_ajax_msg( response, show_before );
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
				$('#admin-modal-dialog-options-ul a').hide();
			});
	}


	// delete a payment
	function apply_delete_payment_or_refund() {
		$('#delete-txn-admin-noheader-inp').val('true');
		var formData = $('#txn-admin-delete-payment-frm').serializeFullArray();
		var PAY_ID = $( '#delete-txn-admin-payment-payment-id-inp' ).val();
		var delBtn = $( '.txn-admin-payment-action-delete-lnk[data-payment-id="' + PAY_ID + '"]');
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
						if ( typeof(response.data.return_data) !== 'undefined' && response.data.return_data !== false && response.data.return_data !== null ) {
							delBtn.closest('tr').remove();
							process_delete_payment( response );
						} else if ( response.error ) {
							show_admin_page_ajax_msg( response );
						} else {
							response = {};
							response.error = eei18n.invalid_server_response;
							response.errors = response.error;
							show_admin_page_ajax_msg( response );
						}
					},
					error: function(response) {
						if ( typeof(response.error) === 'undefined' ) {
							response.error = eei18n.error_occurred;
							response.errors = response.error;
						}
						show_admin_page_ajax_msg( response );
					}
			});
	}




	function process_return_data( response ) {

		toggleaAjaxActivity( true );
		overlay.trigger('click');

		// grab PAY ID from return data
		var PAY_ID = response.data.return_data.PAY_ID;

		if ( response.edit_or_apply === 'apply' ) {
			// grab empty payment table row
			var newRow = '\n				<tr id="txn-admin-payment-tr-PAY_ID">' + $('#txn-admin-payment-empty-row-tr').html() + '\n				</tr>\n';
			// insert new PAY_ID
			newRow = newRow.replace( /PAY_ID/g, PAY_ID );
			$('#txn-admin-payments-total-tr').before( newRow );
//			$('#txn-admin-payments-tbl tr:last').after( newRow );
		}

		update_payment( PAY_ID, response );
		update_payment_totals( response );
		update_registration_payment_totals( response );
		process_notifications( response );

	}




	/**
	 * update registration payment table totals from ajax response.
	 * @param response
	 */
	function update_registration_payment_totals( response ) {
		if ( ! response.data.return_data.registrations ) {
			return;
		}

		for ( var regID in response.data.return_data.registrations ) {
			if ( response.data.return_data.registrations.hasOwnProperty(regID) ) {
				var regProps = response.data.return_data.registrations[regID];
				if ( regProps.owing ) {
					$('.txn-admin-payment-owing-td', '#apply-payment-registration-row-' + regID).html( regProps.owing );
				}

				if ( regProps.paid ) {
					$('.txn-admin-payment-paid-td', '#apply-payment-registration-row-' + regID).html( regProps.paid );
				}
			}
		}
	}



	function update_payment_status( PAY_ID, status ) {
		var status_itm = $('#payment-status-' + PAY_ID);
		status_itm.removeClass().addClass('ee-status-strip-td ee-status-strip pymt-status-' + status);
	}



	function update_payment( PAY_ID, response ) {
		// payment-status
		update_payment_status(PAY_ID, response.data.return_data.STS_ID);
		$('#payment-STS_ID-' + PAY_ID).html( response.data.return_data.pay_status );
		// payment-date
		$('#payment-date-' + PAY_ID).html( response.data.return_data.date );
		// payment-method
		$('#payment-method-' + PAY_ID).html( response.data.return_data.method );
		// payment-gateway
		$('#payment-gateway-' + PAY_ID).html( response.data.return_data.gateway );
		$('#payment-gateway-id-' + PAY_ID).html( response.data.return_data.PM_ID );
		// payment-gateway_response
		$('#payment-response-' + PAY_ID).html( response.data.return_data.gateway_response );
		// payment-txn_id_chq_nmbr
		$('#payment-txn-id-chq-nmbr-' + PAY_ID).html( response.data.return_data.txn_id_chq_nmbr );
		// payment-po_number
		$('#payment-po-nmbr-' + PAY_ID).html( response.data.return_data.po_number );
		// payment-extra_accntng
		$('#payment-accntng-' + PAY_ID).html( response.data.return_data.extra_accntng );
		// payment-amount
		var payment = accounting.formatMoney( response.data.return_data.amount );
		$('#payment-amount-' + PAY_ID).html( payment );
		// update amount span class
		if ( accounting.unformat(payment) < 0 ) {
			response.data.return_data.pay_status = 'PDC';
		}
		$('#payment-amount-' + PAY_ID).parent().removeClass().addClass( 'txn-admin-payment-status-'+response.data.return_data.pay_status );

	}



	function update_payment_totals( response ) {
		//alert( response.toSource() );

		// payment-total
		var totalPaid = parseFloat( response.data.return_data.total_paid );
		$('#txn-admin-payment-total').html( accounting.formatMoney( totalPaid ) );
		// total-amount-due
		//this is already in decimal format, no unformatting needed
		var txnTotal = parseFloat($('#txn-admin-grand-total').text() );
		var totalAmountDue = txnTotal - totalPaid;
		//console.log( JSON.stringify( 'txnTotal: ' + txnTotal, null, 4 ) );
		//console.log( JSON.stringify( 'totalPaid: ' + totalPaid, null, 4 ) );
		//console.log( JSON.stringify( 'totalAmountDue: ' + totalAmountDue, null, 4 ) );
		//console.log( JSON.stringify( 'accounting.formatMoney( totalAmountDue ): ' + accounting.formatMoney( totalAmountDue ), null, 4 ) );
		//$('#txn-admin-total-amount-due').html( totalAmountDue.toFixed(2) );
		$('#txn-amount-due-h2 > span').html( accounting.formatMoney( totalAmountDue ) );

		$('#txn-status').html( eei18n.txn_status_array[ response.data.return_data.txn_status ] );
		$('#txn-status').removeClass().addClass( 'status-' + response.data.return_data.txn_status  );

		if ( totalPaid === txnTotal ) {
			//alert( 'paid in full' );
			$('#txn-amount-due-h2').hide();
			$('#txn-amount-due-h2 > span').removeClass();
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( eei18n.payments_total );
			$('#payments-total-spn').parents('tr').removeClass( 'important-notice');
		} else if ( totalPaid > txnTotal ) {
			//alert( 'overpaid' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( eei18n.transaction_overpaid );
			$('#payments-total-spn').parents('tr').addClass( 'important-notice');
		} else if ( totalPaid > 0 ) {
			//alert( 'part payment' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-part-payment-spn');
			$('#txn-admin-payments-total-tr').show();
			$('#txn-admin-no-payments-tr').hide();
			$('#payments-total-spn').html( eei18n.payments_total );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'important-notice');
		} else {
			//alert( 'no payment' );
			$('#txn-amount-due-h2').show();
			$('#txn-amount-due-h2 > span').removeClass().addClass('txn-overview-no-payment-spn');
			$('#txn-admin-payments-total-tr').hide();
			$('#txn-admin-no-payments-tr').show();
			$('#payments-total-spn').html( eei18n.payments_total );
			$('#overpaid').remove();
			$('#payments-total-spn').parents('tr').removeClass( 'important-notice');
		}

	}


	function process_delete_payment( response ) {
		toggleaAjaxActivity( true );
		overlay.trigger('click');
		if ( typeof(response.data.return_data.PAY_ID) !== 'undefined' && response.data.return_data.PAY_ID !== false && response.data.return_data.PAY_ID !== null ) {
			// grab PAY ID from return data
			var PAY_ID = response.data.return_data.PAY_ID;
			update_payment_totals( response );
			update_registration_payment_totals( response );
		}
		show_admin_page_ajax_msg( response );
	}




	$(document).on( 'click', '#txn-admin-modal-dialog-cancel-lnk', function() {
		overlay.trigger('click');
	});

	$(document).on( 'click', '#del-txn-admin-modal-dialog-cancel-lnk', function() {
		overlay.trigger('click');
	});


	function update_registration_payments_inputs( reg_payments ) {
		var check_all = false;
		if ( typeof( reg_payments ) === 'undefined' ) {
			reg_payments = [];
			check_all = true;
		}
		var REG_ID;
		$( 'input[name="txn_admin_payment[registrations]"]' ).each( function() {
			REG_ID = parseInt( $( this ).val() );
			if ( $.inArray( REG_ID, reg_payments ) > -1 || check_all ) {
				$( this ).prop( 'checked', true );
			} else {
				$( this ).prop( 'checked', false );
			}
		} );

	}


	function display_payment_registrations_table() {
		$( '#txn-admin-apply-payment-to-registrations-dv' ).slideDown();
	}

	function hide_payment_registrations_table() {
		$( '#txn-admin-apply-payment-to-registrations-dv' ).slideUp();
	}

	eedialog.on( 'click', '#txn-admin-apply-payment-to-some-registrations-inp', function() {
		if ( $( this ).is( ':checked' ) ) {
			display_payment_registrations_table();
			var PAY_ID = $( this ).data( 'paymentId' );
			var reg_payments = $.parseJSON( $( '#reg-payments-' + PAY_ID ).html() );
			update_registration_payments_inputs( reg_payments );
		}
	} );

	eedialog.on( 'click', '#txn-admin-apply-payment-to-all-registrations-inp', function() {
		if ( $( this ).is( ':checked' ) ) {
			hide_payment_registrations_table();
			update_registration_payments_inputs();
		}
	} );


});
