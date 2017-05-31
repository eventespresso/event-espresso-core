/**
 * js for ticket selector when embedded in iframe.
 */
jQuery(document).ready(function($) {

	//when submit is clicked, verify that at least one ticket option has been selected before continuing.
	$(document).on('click', '.ticket-selector-submit-btn', function(e) {
		e.stopPropagation();
		var has_selection = 0;
		if ( $('.tkt-slctr-tbl' ).length > 0 ) {
			//grab all values for selects
			$( '.ticket-selector-tbl-qty-slct' ).each( function( ind ) {
				if ( $( this ).val() > 0 ) {
					has_selection++;
				}
				//hang on there may be radios!
				if ( $( this ).attr( 'type' ) == 'radio' && $( this ).prop( 'checked' ) ) {
					has_selection++;
				}
			} );
		} else {
			var $tktSlctrEventInput = $( 'input[name="tkt-slctr-event-id"]' )
			if ( $tktSlctrEventInput.length > 0 ) {
				var eventID = $tktSlctrEventInput.val();
				//console.log( JSON.stringify( 'eventID: ' + eventID, null, 4 ) );
				if ( eventID ) {
					var $ticketInput = $( 'input[name="tkt-slctr-ticket-id-' + eventID + '[]"]' );
					if ( $ticketInput.length > 0 ) {
						var ticketID = $ticketInput.val();
						//console.log( JSON.stringify( 'ticketID: ' + ticketID, null, 4 ) );
						if ( ticketID ) {
							has_selection++;
						}
					}
				}
			}
		}
		var $eventCart = $( 'input[name="event_cart"]' );
		if ( has_selection > 0 || ( $eventCart.length && $eventCart.val() === 'view' ) ) {
			return true;
		} else {
			e.preventDefault();
			alert( eei18n.EEDTicketSelectorMsg );
			return false;
		}
	});

});
