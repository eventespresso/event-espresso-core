/**
 * Javascript file for handling prices in the price metabox of the event editor.
 */

jQuery(document).ready(function($) {

	var hide_new_price_container = function( trigger ) {
		var inputs_to_cancel = $(trigger).attr("rel");
		var control = $(trigger);

		$('#edit_event_save_prices_btn').delay(450).fadeIn(50);
		$('#new-ticket-price-PRC_name').removeClass('required');


		// hide the target's div container - use slideToggle or addClass
		$('#'+inputs_to_cancel+'-dv').slideToggle( 500, function() {
			// hide the control element
			control.addClass('hidden');
			// display the control element that toggles display of this element
			$('#display-'+inputs_to_cancel).removeClass('hidden');
			$( '.' + inputs_to_cancel + '-input' ).each(function() {
				if ( $(this).is(':radio') ) {
					$(this).prop( 'checked', false );
				} else {
					$(this).val('');
				}
			});
		});
	};

	$(document).on('click', '#hide-add-new-ticket-price', function() {
		hide_new_price_container(this);
	});
				
				
	$(document).on('click', '.edit-event-price-lnk', function() {
		// get target element row from "this" (the control element's) "rel" attribute
		$( '.event-price-settings-dv' ).each( function() {
			if ( $(this).is(':visible')){
				var evt_prc_row = $(this).attr( 'id' );
				$( '#'+evt_prc_row ).slideToggle( 500 );
				evt_prc_row = evt_prc_row.replace('edit-', '');
				$( '#'+evt_prc_row ).slideToggle( 250 );
			}
		});
		
		var PRC_ID = $(this).attr("rel");
		$( '#event-price-'+PRC_ID ).slideToggle( 250 );
		// display the target's div container - use slideToggle or removeClass
		$( '#edit-event-price-'+PRC_ID ).slideToggle( 500 );
		return false;
	});


	$(document).on('change', '.edit-ticket-price-input', function() {
		
		//var edited_input = $(this);
		// determine PRC_ID
		var PRC_ID = $(this).closest('.event-price-dv').attr('id');
		if ( PRC_ID === undefined ) {
			PRC_ID = $(this).closest('.event-price-settings-dv').attr('id');
			PRC_ID = PRC_ID.replace('edit-', '');
		}
		PRC_ID = PRC_ID.replace('event-price-', '');
		var edit_price_input_ID = $(this).attr('id');
		var copy_values = true;

		if( $(this).hasClass('quick-edit')) {
			edit_price_input_ID = '#' + edit_price_input_ID.replace('quick-', '');
		} else {
			edit_price_input_ID = '#quick-' + edit_price_input_ID;
			var orderInp = '#quick-edit-ticket-price-PRC_order-'+PRC_ID;
			var nameInp = '#quick-edit-ticket-price-PRC_name-'+PRC_ID;
			var amntInp = '#quick-edit-ticket-price-PRC_amount-'+PRC_ID;
			//todo we'll have to add in the datetimes and reg_limits stuff here because quick edit changes that!

			if ( edit_price_input_ID !== orderInp && edit_price_input_ID !== nameInp && edit_price_input_ID !== amntInp ) {
				copy_values = false;
			}
		}

		if ( copy_values ) {
			$(edit_price_input_ID).val($(this).val());
		}

	});



	$(document).on('click', '.cancel-event-price-btn', function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel");

		//only if PRC_ID is not 'add-new-ticket-price'
		if ( PRC_ID == 'add-new-ticket-price' )
			return false;
		$( '#event-price-'+PRC_ID ).slideToggle( 250 );
		// display the target's div container - use slideToggle or removeClass
		$( '#edit-event-price-'+PRC_ID ).slideToggle( 500 );
		return false;
	});


	$(document).on('click', '.delete-event-price-lnk', function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel");
		$( '#event-price-'+PRC_ID ).remove();

		//update row counts
		$('#total_count_price_rows').val( $('#total_count_price_rows').val() - 1 );

		//note: we're NOT updating next_price_row at this point because the row removed could have been a middle or beginning row.  So we want to be doubly certain we don't duplicate rows.
		return false;
	});


	$(document).on( 'click', '#display-add-new-ticket-price', function(){
		$('#edit_event_save_prices_btn').slideUp(500);
		$('#new-ticket-price-PRC_name').addClass('required');
	});

	$(document).on('click', '#edit_event_save_price', function(e) {
		e.preventDefault();

		//get all the field data for setting up new price row and send via ajax to get the html for the row.
		var row_data = $('#add-new-ticket-price-dv').find(':input').serializeFullArray();
		row_data.route = 'edit';
		row_data.rownum = $('#next_price_row').val();
		row_data.page = 'espresso_events';
		row_data.action = 'ee_price_add_new_editor_row';


		//todo this can be reworked once we get common ajax handling for all EE stuff in place (displays etc!)
		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: row_data,
			success: function( response, status, xhr ) {
				var ct = xhr.getResponseHeader("content-type") || "";
					var resp = '', isjson = true;
					if (ct.indexOf('html') > -1) {
						/*console.log('html');
						console.log('response');*/
						//last verification that we definitely DON'T have JSON (possibly via exceptions)
						try {
							resp = $.parseJSON(response);
						} catch (e) {
							$('#event_editor_pricing').before('<div class="error">' + response + '</div>');
							isjson = false;
						}
						
					}

					if ( ct.indexOf('json') > -1 || isjson ) {
						resp = resp === '' ? response : resp;
						console.log(resp);
						if ( typeof(resp.data) === 'undefined' ) resp.data = [];
						if ( typeof(resp.data.what) === 'undefined' ) {
							resp.data.what = '';
							resp.error = !resp.error ? '<div class="error"><p>' + PRICE_METABOX_ITEMS.adding_price_error + '</p></div>' : resp.error;
						}

						if ( resp.error ) {
							$('#event_editor_pricing').before(resp.error);
							return false;
						}

						//if we made it here then we have a new row so let's insert it.
						$(resp.data.what).appendTo('#event_editor_pricing');

						//bump the total rows count and the next row value
						$('#total_count_price_rows').val( $('#total_count_price_rows').val() + 1 );
						$('#next_price_row').val( $('#next_price_row').val() + 1 );
						hide_new_price_container( '#hide-add-new-ticket-price' );
					}
			}
		});
		return false;
	});
});