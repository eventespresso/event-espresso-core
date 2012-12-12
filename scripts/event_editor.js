		
jQuery(document).ready(function($) {

//	$('.display-ticket-manager').live('click', function(){
//		var page = $('html').scrollTop();
//		var tk_mng_tp = $('#event-datetimes-dv').offset();
//		tk_mng_tp = Math.round( tk_mng_tp.top )-page;  
//		if ( tk_mng_tp > 0 ){
//			tk_mng_tp = 0;
//		}
//		tk_mng_tp = ( tk_mng_tp * (-1))+'px';
//		alert(tk_mng_tp);
//		$('#ticket-manager-dv').animate({ top : tk_mng_tp, opacity : 'show' }, 200 );
//	});


//	$('html').click(function(){
//		$('#ticket-manager-dv').css({ top : 0, opacity : 0 });
//	});
	

	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var offset = $('#event_editor_major_buttons_wrapper').offset();
		//		alert( 'scrollTop : ' + scrollTop +  '   offset.top : ' +offset.top );
		if(offset != null) { 
			if ( (scrollTop+25) > offset.top ) {
				$('#event-editor-floating-save-btns').removeClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').addClass('hidden');
			} else {
				$('#event-editor-floating-save-btns').addClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').removeClass('hidden');
			}
		}
	});
	
	
		
	// set process_datetimes to false
	$('#process_datetimes').val(0);
	// toggle process_datetimes to true if any datetime inputs are changed
	$('.dtm-inp').change( function() {
		$('#process_datetimes').val(1);
	});
	// or if any datetime buttons are clicked	
	$('.dtm-inp-btn').click( function() {
		$('#process_datetimes').val(1);
	});




	$('#event-datetimes-dv').on( 'focusin', '.dtm-es-picker', function () {	
		
		var row = $(this).next().val();
	
		$(this).datetimepicker({

			dateFormat : 'yy-mm-dd',
			timeFormat: 'hh:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,			
			minDate: new Date(),
			showOn:'focus',

//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function(dateText, inst) {
			
				var eventEndsOn = $('#event-end-'+row).val();

				if ( eventEndsOn != '' ) {	
					var newStartDate = new Date( dateText );
					var newEndDate = new Date( eventEndsOn );
					if ( newStartDate > newEndDate ) {
						$('#event-end-'+row).val( dateText );
					}
											
				} else {
					$('#event-end-'+row).val( dateText );
				}
				
				//var start = $(this).datetimepicker('getDate');
				var newStartDate = new Date( dateText );
//				if ( newStartDate == undefined || newStartDate == '' || newStartDate = null ) {
//					newStartDate = ;
//				}
				//alert( 'newStartDate = '+newStartDate );
				$('#event-end-'+row).focusin().datetimepicker('option', 'minDate', newStartDate ).focusout();
				$('#reg-start-'+row).focusin().datetimepicker('option', 'maxDate', newStartDate ).focusout();
				//$(this).focusout();
			
			}/*,
			
		    onSelect: function (){
				var row = $(this).next().val();
				var start = $(this).datetimepicker('getDate');
				var newStartDate = new Date( start );
				$('#event-end-'+row).datepicker('option', 'minDate', newStartDate );
				$('#reg-start-'+row).datepicker('option', 'maxDate', newStartDate );
		 		//alert( 'other box = ' + $('#event-end-'+row).datetimepicker('getDate'));
		    }*/	

		});			 
	});	
	
	

	$('#event-datetimes-dv').on( 'focusin', '.dtm-ee-picker', function () {	
		
		var row = $(this).next().val();
	
		$(this).datetimepicker({
		
			dateFormat : 'yy-mm-dd',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,
			maxDate: new Date( 'Dec 31, 2100' ),
			showOn:'focus',
			
//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function( dateText, inst ) {

				var eventStartsOn = $('#event-start-'+row).val();
				if ( eventStartsOn != '' ) {
					var newStartDate = new Date( eventStartsOn );
					var newEndDate = new Date( dateText );
					if ( newStartDate > newEndDate ) {
						$('#event-start-'+row).val( dateText );
						$('#reg-end-'+row).val( dateText );
					}						
				} else {
					$('#event-start-'+row).val( dateText );
					$('#reg-end-'+row).val( dateText );
				}	

				//var end = $(this).datetimepicker('getDate');
				var newEndDate = new Date( dateText );
				//alert( 'newEndDate = '+newEndDate );
				$('#event-start-'+row).focusin().datetimepicker('option', 'maxDate', newEndDate ).focusout();
				$('#reg-end-'+row).focusin().datetimepicker('option', 'maxDate', newEndDate ).focusout();
				//$(this).focusout();
				//$(this).focus().focusout();

			}/*,			
			
		    onSelect: function() {
				var row = $(this).next().val();
				var end = $(this).datetimepicker('getDate');
				var newEndDate = new Date( end );
				$('#event-start-'+row).datepicker('option', 'maxDate', newEndDate );
				$('#reg-end-'+row).datepicker('option', 'maxDate', newEndDate );
		 		//alert( 'other box = ' + $('#event-start-'+row).datetimepicker('getDate'));
		    }*/

		});	
	});	







	$('#event-datetimes-dv').on( 'focusin', '.dtm-rs-picker', function () {	
		
		var row = $(this).next().val();
	
		$(this).datetimepicker({
		
			dateFormat : 'yy-mm-dd',
			timeFormat: 'hh:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,		
			minDate: new Date(),	
			showOn:'focus',			

//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function(dateText, inst) {
			
				var eventEndsOn = $('#reg-end-'+row).val();

				if ( eventEndsOn != '' ) {	
					var newStartDate = new Date( dateText );
					var newEndDate = new Date( eventEndsOn );
					if ( newStartDate > newEndDate ) {
						$('#reg-end-'+row).val( dateText );
					}
											
				} else {
					$('#reg-end-'+row).val( dateText );
				}

				var newRegEndDate = new Date( dateText );
				//alert( 'newRegEndDate = '+newRegEndDate );
				$('#reg-end-'+row).focusin().datetimepicker('option', 'minDate', newRegEndDate ).focusout();
				//$(this).focus().focusout();
			
			}/*,
			
		    onSelect: function (){
				var row = $(this).next().val();
				var start = $(this).datetimepicker('getDate');
				$('#reg-end-'+row).datepicker('option', 'minDate', new Date( start ));
		 		//alert( 'other box = ' + $('#reg-end-'+row).datetimepicker('getDate'));
		    }	*/

		});			 
	});	
	
	

	$('#event-datetimes-dv').on( 'focusin', '.dtm-re-picker', function () {	
		
		var row = $(this).next().val();
	
		$(this).datetimepicker({
		
			dateFormat : 'yy-mm-dd',
			timeFormat: 'h:mm tt',
			ampm: true,
			separator: '  ',
			stepHour: 1,
			stepMinute: 5,
			hourGrid: 2,
			minuteGrid: 5,
			numberOfMonths: 2,
			maxDate: new Date( 'Dec 31, 2100' ),
			showOn:'focus',
			
//			beforeShow:function( input, inst ) {
//				inst.settings.timepicker._defaults.hourMin = time.getHours();
//			},
	
			onClose: function( dateText, inst ) {

				var eventStartsOn = $('#reg-start-'+row).val();
				if ( eventStartsOn != '' ) {
					var newStartDate = new Date( eventStartsOn );
					var newEndDate = new Date( dateText );
					if ( newStartDate > newEndDate ) {
						$('#reg-start-'+row).val( dateText );
					}						
				}
				else {
					$('#reg-start-'+row).val( dateText );
				}	

				var newRegStartDate = new Date( dateText );
				//alert( 'newRegStartDate = '+newRegStartDate );
				$('#reg-start-'+row).focusin().datetimepicker('option', 'maxDate', newRegStartDate ).focusout();
				//$(this).focus().focusout();

			}/*,			
		    onSelect: function() {
				var row = $(this).next().val();
				var end = $(this).datetimepicker('getDate');
				$('#reg-start-'+row).datepicker('option', 'maxDate', new Date( end ));
		 		//alert( 'other box = ' + $('#reg-start-'+row).datetimepicker('getDate'));
		    }*/

		});	
	});	







/*	function format_the_time( timeObj, HoursOrMinutes ) {
		
		if ( HoursOrMinutes == undefined || HoursOrMinutes == '' || HoursOrMinutes == null ) {
			HoursOrMinutes = 'B';
		}
		
		if ( HoursOrMinutes == 'H' || HoursOrMinutes == 'B' ) {
		
			var amPm = '';
			var theHour = timeObj.getHours();
			
			if ( theHour < 12 ) {
				amPm = 'am';
			} else {
				amPm = 'pm';
			}
			
			if ( theHour == 0 ) {
				theHour = 12;
			}
			
			if ( theHour > 12 ) {
				theHour = theHour - 12;
			}

		}

		if ( HoursOrMinutes == 'M' || HoursOrMinutes == 'B' ) {
			
			var theMinutes = timeObj.getMinutes();			
			theMinutes = theMinutes + '';
						
			if ( theMinutes.length == 1 ) {
				theMinutes = '0' + theMinutes;
			}
			
		}
		
		if ( HoursOrMinutes == 'H' ) {
			return theHour;
		} else if ( HoursOrMinutes == 'M' ) {
			return theMinutes;
		} else {
			return theHour + " : " + theMinutes + ' ' + amPm;
		}
		
	}*/

	
	
	$('#hide-add-new-ticket-price').click(function() {
		var inputs_to_cancel = $(this).attr("rel"); 
		var control = $(this);
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
	});	

				
				
	$('.edit-event-price-lnk').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute 
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
		toggle_edit_ticket_price_dates();
		return false;
	});


	$('.edit-ticket-price-input').change(function() {
		
		//var edited_input = $(this);
		// determine PRC_ID
		var PRC_ID = $(this).closest('.event-price-dv').attr('id');
		if ( PRC_ID == undefined ) {
			var PRC_ID = $(this).closest('.event-price-settings-dv').attr('id');
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

			if ( edit_price_input_ID !== orderInp && edit_price_input_ID !== nameInp && edit_price_input_ID !== amntInp ) {
				copy_values = false;
			}  
		}

		if ( copy_values ) {
			var new_val = $(this).val();
			$(edit_price_input_ID).val( new_val );
		}
		add_price_ID_to_list_of_edited_prices( PRC_ID );
	
	});
	
	
	function add_price_ID_to_list_of_edited_prices( PRC_ID ) {
		// add PRD_ID to list of edited prices
		var edited_ticket_price_IDs = $('#edited-ticket-price-IDs').val();
		if ( edited_ticket_price_IDs == undefined ) {
			edited_ticket_price_IDs = '';
		}
		edited_ticket_price_IDs = edited_ticket_price_IDs + PRC_ID + ',';
		$('#edited-ticket-price-IDs').val( edited_ticket_price_IDs );		
	}
	
//	function escape_square_brackets( value ) {
//		value = value.replace(/[[]/g,'\\\[');
//		value = value.replace(/]/g,'\\\]'); 
//		return value; 
//	}

	
	$('.cancel-event-price-btn').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel"); 
		$( '#event-price-'+PRC_ID ).slideToggle( 250 );  
		// display the target's div container - use slideToggle or removeClass
		$( '#edit-event-price-'+PRC_ID ).slideToggle( 500 ); 
		return false;
	});

	
	$('.delete-event-price-lnk').click(function() {
		// get target element ID from "this" (the control element's) "rel" attribute
		var PRC_ID = $(this).attr("rel"); 
		$( '#event-price-'+PRC_ID ).slideToggle( 250, function(){
			$( '#event-price-'+PRC_ID ).delay(100).closest('tr').css( 'display', 'none' ); 
			$( '#edit-event-price-'+PRC_ID ).delay(100).closest('tr').css( 'display', 'none' ); 
		}); 
		add_price_ID_to_list_of_edited_prices( PRC_ID );
		// generate target name for hidden "deleted" input
//		var price_to_delete = escape_square_brackets( 'edit_ticket_price['+PRC_ID+'][PRC_deleted]' );
		// set delete to true
//		$( '[name="'+price_to_delete+'"]' ).val(1); 
		$( '#edit-ticket-price-PRC_deleted-'+PRC_ID ).val(1); 
		return false;
	});

	function toggle_edit_ticket_price_dates() {
		$( '.edit-ticket-price-use-dates-yes' ).each(function() {
			if ( $(this).prop( 'checked' ) ) {
				//alert( $(this).attr('name') + ' = YES' );
				$(this).trigger('click');
			}			
		});		
	
		$( '.edit-ticket-price-use-dates-no' ).each(function() {
			if ( $(this).prop( 'checked' ) ) {
				//alert( $(this).attr('name') + ' = NO' );
				$(this).trigger('click');
			}			
		});	
	}	

	$('.edit-ticket-price-use-dates-yes').bind('click', function() {
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().find('.edit-ticket-price-dates').slideDown().parent().animate({ 'padding-top' : '10', 'padding-bottom' : '10' }, 250);
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().next().find('.edit-ticket-price-dates').slideDown().parent().animate({ 'padding-top' : '10', 'padding-bottom' : '10' }, 250);
	});

	$('.edit-ticket-price-use-dates-no').bind('click', function() {
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().find('.edit-ticket-price-dates').slideUp().parent().animate({ 'padding-top' : '0', 'padding-bottom' : '0' }, 250);
		$(this).parents('.edit-ticket-price-use-dates-tbl-row').next().next().find('.edit-ticket-price-dates').slideUp().parent().animate({ 'padding-top' : '0', 'padding-bottom' : '0' }, 250);
	});

	/*
	Tabs for Messages box on Event Editor Page
	 */
	 $('.nav-tab-wrapper', '.ee-nav-tabs').on('click', '.nav-tab', function(e) {
	 	e.preventDefault();
	 	var content_id = $(this).attr('rel');
	 	//first set all content as hidden and other nav tabs as not active
	 	$('.ee-nav-tabs .nav-tab-content').hide();
	 	$('.ee-nav-tabs .nav-tab').removeClass('nav-tab-active');

	 	//set new active tab
	 	$(this).addClass('nav-tab-active');
	 	$('#'+content_id).show();
	 })

});

