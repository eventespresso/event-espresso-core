jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 
	
	// close postboxes that should be closed
	$('.if-js-closed').removeClass('if-js-closed').addClass('closed');
	// postboxes setup
	if ( typeof postboxes !== 'undefined' )
		postboxes.add_postbox_toggles('event-espresso_page_transactions');

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
		var answer = confirm('Are you absolutely sure you want to delete this '+what+'?\nThis action will delete ALL DATA asscociated with this '+what+'!!!\nThis can NOT be undone!!!');
  		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();


	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').on( 'click', function() {
		$('.auto-hide').slideUp(500);
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		var control = $(this);
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle(500, function() {		
			if ( ! control.hasClass('no-hide') ){
				// hide the control element
				control.addClass('hidden'); 
			} 
			// display the target div's hide link
			$('#hide-'+item_to_display).removeClass('hidden'); 
			// if hiding/showing a form input, then id of the form input must = item_to_display
			//$('#'+item_to_display).focus(); // add focus to the target
		}); 
		return false;
	});

	// generic click event for re-hiding an element and displaying it's display control 
	$('.hide-the-displayed').on( 'click', function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel"); 
		var control = $(this);
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			if ( ! control.hasClass('no-hide') ){
				// hide the control element
				control.addClass('hidden'); 
			}
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});	



	$('#txn-admin-payment-method-slct').bind('change', function() {
		var mop = $(this).val();
		$('.mop').hide();
		$('.mop-'+mop).show();
	});



	var overlay = $( "#espresso-admin-page-overlay-dv" );
	var dialog = $( "#txn-admin-apply-payment-dv" ).draggable();
	var eeTimeout = false;



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


	function position_dialog() {
		var wndwWidth = parseInt( $(window).width() );
		var wndwHeight = parseInt( $(window).height() );		
		var scrllTp = $('html').scrollTop();
		$('#txn-admin-payment-method-slct').trigger('change');
		var parOff = dialog.parent().offset();
		var dialogTop =  ( wndwHeight / 10 ) - parOff.top + scrllTp;
		var dialogLeft = ( wndwWidth / 4 - parOff.left );
		var dialogWidth = wndwWidth / 2;
		dialog.css({ 'top' : dialogTop, 'left' : dialogLeft, 'width' : dialogWidth }).fadeIn('fast');		
	}



	function position_overlay() {
		var dcmntWidth = parseInt($(document).width() );
		var dcmntHeight = parseInt($(document).height() );
		$(window).scrollTop(0);
		var ovrParOff = overlay.parent().offset();
		var ovrlyTop = ovrParOff.top * (-1);
		var ovrlyLeft = ovrParOff.left * (-1);
		overlay.css({ 'top' : ovrlyTop, 'left' : ovrlyLeft, 'width' : dcmntWidth, 'height' : dcmntHeight }).fadeIn('fast').addClass('active');
	}



	function doneResizing(){
		if ( overlay.hasClass('active') ) {
			position_overlay( $( "#admin-page-overlay-dv" ), false ); 
			position_dialog( $( "#txn-admin-apply-payment-dv" ) ); 
			eeTimeout = false;	
		}
	}



	$(window).resize(function(){	
		 if( eeTimeout !== false) {
		    clearTimeout(eeTimeout);
		}
		eeTimeout = setTimeout(doneResizing, 200);
	});



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
		console.log(formData);
		response = new Object();

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
							response.errors = 'An error occured! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.';
							show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
						}
					},
					error: function(response) {
						console.log(response);
						if ( response.errors == undefined ) {
							response.errors = 'An error occured! Please refresh the page and try again.';
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
							response.errors = 'An error occured! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.';					
							show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', true );
						}
					},
					error: function(response) {
						if ( response.errors == undefined ) {
							response.errors = 'An error occured! Please refresh the page and try again.';
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

		$('#txn-status').html( txn_status_array[ response.return_data.txn_status ] );
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
	
		// return data
		// [amount] => 1000
	   	// [total_paid] => 579.9
	    // [txn_status] => TOP
	    // [PAY_ID] => 73	
	 
		// grab PAY ID from return data
		var PAY_ID = response.return_data.PAY_ID;
		update_payment_totals( response );
		show_admin_page_ajax_msg( response, 'h2.nav-tab-wrapper', false );
	}




	$('#txn-admin-modal-dialog-cancel-lnk').on( 'click',  function() {
		overlay.trigger('click');
	});




	function do_before_admin_page_ajax() {
		// stop any message alerts that are in progress
		$('#message').stop().hide();
		// spinny things pacify the masses
		var st = $('html').scrollTop();
		var po = $('#espresso-admin-page-ajax-loading').parent().offset();		
		var mal_top = ( st+( parseInt( $(window).height() )/3 )-po.top ) - 15;
		var ww = $('#espresso-admin-page-ajax-loading').parent().width();
		var mal_left = ( ww/2 ) -15;		
		$('#espresso-admin-page-ajax-loading').css({ 'top' : mal_top, 'left' : mal_left }).show();
		
	}		
		


	function show_admin_page_ajax_msg( response, beforeWhat, closeModal ) {
			
		$('#espresso-admin-page-ajax-loading').fadeOut('fast');
		//alert( response.toSource() );
		if (( response.success != undefined && response.success != '' ) || ( response.errors != undefined && response.errors != '' )) {
		
			if ( closeModal == undefined ) {
				closeModal = false;
			}

			var fadeaway = true;

			if ( response.success != undefined && response.success != '' ) {
				msg = '<div id="message" class="updated hidden"><p>' + response.success + '</p></div>';
				//closeModal = true;
			}
		
			if ( response.errors != undefined && response.errors != '' ) {
				msg = '<div id="message" class="error hidden"><p>' + response.errors + '</p></div>';
				//closeModal = false;
				fadeaway = false;
			}
			// display message
			$( beforeWhat ).before( msg );
			if ( fadeaway == true ) {
				$('#message').removeClass('hidden').show().delay(8000).fadeOut();
//				$('#message').removeClass('hidden').show().delay(8000).fadeOut( function(){
//						if ( closeModal ) {
//							overlay.trigger('click');
//						}
//				});
			} else {
				$('#message').removeClass('hidden').show();
//				$('#message').removeClass('hidden').show().delay(8000).queue( function() {
//						if ( closeModal ) {
//							overlay.trigger('click');
//						}
//				});
			}

		} 
		
//		response.success = '';
//		response.errors = '';
		//response = null;
			
		
	}





	
	
});

