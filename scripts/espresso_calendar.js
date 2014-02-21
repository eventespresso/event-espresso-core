jQuery(document).ready(function($) {
	
	// fix this one boolean
	if ( eeCAL.time_weekends == undefined || eeCAL.time_weekends == '' ) {
		eeCAL.time_weekends = false;
	}
	
	var calendar_width = $('#espresso_calendar').width();
	if ( eeCAL.time_weekends ) {
		var day_width = calendar_width / 7;
	} else {
		var day_width = calendar_width / 5;
	}
	// padding and margin between event and day cell (this could be calculated via js)
	var day_padding = 16;

	$('#espresso_calendar').fullCalendar({
		
		// General Display - http://arshaw.com/fullcalendar/docs/display/
		// Defines the buttons and title at the top of the calendar.
		header: {
			left: eeCAL.header_left,
			center: eeCAL.header_center,
			right: eeCAL.header_right
		},
		// Enables/disables use of jQuery UI theming.
		theme: eeCAL.theme,
		// The day that each week begins.
		firstDay: eeCAL.time_first_day,
		// Whether to include Saturday/Sunday columns in any of the calendar views.
		weekends: eeCAL.time_weekends,
		// Determines the number of weeks displayed in a month view. Also determines each week's height.
		weekMode: eeCAL.time_week_mode,
		// Will make the entire calendar (including header) a pixel height.
		height: !eeCAL.widget ? eeCAL.display_calendar_height:'',
		aspectRatio: 1.618,
		// Triggered when the calendar loads and every time a different date-range is displayed.
		viewDisplay: function(view) {
			// remove ui styling from tool tips
		        $('.qtip-close .ui-icon').each( function() {
		 		$(this).removeClass('ui-icon');
		 		$(this).removeClass('ui-icon-close');
		 	});	
	    	},	 
		// Views - http://arshaw.com/fullcalendar/docs/views/
		// The initial view when the calendar loads.
		defaultView: eeCAL.cal_view,		
		//Text/Time Customization - http://arshaw.com/fullcalendar/docs/text/
		// Determines the text that will be displayed in the header's title.
		timeFormat:{ 
			agenda: 'h:mm a{ - h:mm a}',
			'' : ''
		},
		// Determines the text that will be displayed on the calendar's column headings.
		columnFormat: {
			month: eeCAL.column_format_month,
			week: eeCAL.column_format_week,
			day: eeCAL.column_format_day
		},
		// Determines the text that will be displayed in the header's title.
		titleFormat: {
			month: eeCAL.title_format_month,
			week: eeCAL.title_format_week,
			day: eeCAL.title_format_day
		},
		// Text that will be displayed on buttons of the header.
		buttonText: {
			next: eeCAL.button_text_next, 	// default '&lsaquo;' <
			prev: eeCAL.button_text_prev, 	// default '&rsaquo;'  >
			prevYear: eeCAL.button_text_prevYear, 	// default '&laquo;'  <<
			nextYear:eeCAL.button_text_nextYear, 	// default '&raquo;'  >>
			today: eeCAL.button_text_today, 	// default 'today'
			month: eeCAL.button_text_month, 	// default 'month'
			week: eeCAL.button_text_week, 	// default 'week'
			day: eeCAL.button_text_day 	// default 'day'
		},
		
		// Sets the background and border colors for all events on the calendar.
		eventColor: eeCAL.display_event_background,
		// Sets the text color for all events on the calendar.
		eventTextColor: eeCAL.display_event_text_color,


		//Full names of months.
		monthNames: eeCAL.month_names,
		//Abbreviated names of months.
		monthNamesShort: eeCAL.month_names_short,
		//Full names of days-of-week.
		dayNames: eeCAL.day_names,
		//Abbreviated names of days-of-week.
		dayNamesShort: eeCAL.day_names_short,
				
		//Load the events into json srrsy
		events: function(start, end, callback) {
			$.ajax({
				url: eeCAL.ajax_url,
				dataType: 'json',
				data: {
					action: 'get_calendar_events',
					noheader : 'true',
					start_date: Math.round(start.getTime() / 1000),
					end_date: Math.round(end.getTime() / 1000),
					show_expired: eeCAL.show_expired,
					event_category_id: eeCAL.event_category_id,
					event_venue_id: eeCAL.event_venue_id
				},
				success: function( response ) {
					// because FullCalendar won't wait for images to load fully before positioning events in the table grid...
					// loop through response data
					$.each( response, function( index, element ){
						// look for event thumbnail
						var thumb = $(element.event_img_thumb).find('img');
						// attempt to load image
						$( thumb ).load( function() {
							// copy image into container so that the browser is forced to d/l image
							$('#espresso_calendar_images').append(thumb);
							// then hide it immediately ( also remove the id attribute so as not to conflict with image used in the actual calendar )
							$( thumb ).hide().attr( 'id', '' );
						});								
					});
					// send event data to calendar for display
					callback( response );
				},
				error: function(response) {
				}
			});
		},
		// A hook for modifying a day cell.
		dayRender: function( date, cell ) {
			// console.log( JSON.stringify( 'date: ' + date, null, 4 ));
			// console.log( JSON.stringify( 'cell: ' + cell, null, 4 ));
			// console.log( cell );
		},
		// Triggered while an event is being rendered.
		eventRender: function( event, element ) {
			// console.log( JSON.stringify( 'event: ' + event.title, null, 4 ));
			// console.log( event );
			// console.log( element );

			// cycle thru each day of the HTML calendar
			$('.fc-day').each( function(){
				// if calendar date matches event date
				if ( $(this).attr('data-date') == event.target_date ) {
					// mark that day as having an event on it
					$(this).addClass('event-day');
				}				
			});
			// calculate the width for this event based on number of days x one day event width - 
			var event_width = ( day_width * event.event_days ) - day_padding;
			// set element to correct width
			element.width( event_width );
			// find the event title object
			var event_title = element.find('.fc-event-title');
			// get original height of element
			var original_height = element.height();
			// if there's an image, then add it
			if( event.event_img_thumb && ! eeCAL.widget ){
				event_title.after( event.event_img_thumb );
			}
			// and get height of element after image is added
			var height_with_img = element.height();
			// if there's event times set, then add them
			if( event.event_time && ! eeCAL.widget ){
				event_title.after( event.event_time );
			}
			// and get height of element after times are added
			var height_with_all = element.height();			
			// again, check for image ( has to happen a second time after times get added )
			if( event.event_img_thumb && ! eeCAL.widget ){
				// and actually find it
				var thumb = element.find('img');
				// calculate it's height'
				var thumb_height = thumb.height();
				// so if the event actually has an image ( events without thumbnails will have a thumb_height of NULL )
				if ( thumb_height != null ) {
					// calculate base height for event, which basically just subtracts the original ( but often incorrect ) image height
					var base_evt_height = original_height + ( height_with_all - height_with_img );
					// multi day events
					if ( event.event_days > 1 ) {
						// can usually display the full thumbnail size becuz of their width
						var img_height = parseInt( event.thumbnail_size_h );
						// but in case thumbnail is still wider than multiday table cell
						if ( parseInt( event.thumbnail_size_h ) > event_width ) {
							// use that as the height
							img_height = event_width - day_padding;
						}
					} else {
						// for single day events
						// for portrait oriented images
						var thumb_width = thumb.width();
						if ( thumb_height > thumb_width ) {
							var img_height = parseInt( thumb_height + day_padding );
						} else if ( thumb_height == 0) {
							var img_height = parseInt( day_width + day_padding );
						} else {
						// for landscape oriented images
							var img_height = parseInt( day_width - day_padding );
						}
					}
					// set the element height to our newly calculated value
					element.height( base_evt_height + img_height );
				}
			}
			
			if ( eeCAL.tooltip_show ) {				
				element.qtip({
					content: {
						text: event.description + event.tooltip,
						title: event.title,
						button: 'close'
					},
					position: {
						// Position my top left...
						my: event.tooltip_my, 
						// at the bottom right of...
						at: event.tooltip_at
					},
					show: {
						event: 'click mouseenter',
						solo: true
					},
					hide: "unfocus",
					style: {
						classes: event.tooltip_style, 
						widget: true
					}
				});
				
			} else {
				//This displays the title of the event when hovering
				element.attr( 'title', event.title + " - Event Times: " + event.event_time_no_tags );				
			}
			
		},
		// Triggered after an event has been placed on the calendar in its final position.
		eventAfterRender : function( event, element, view ) {
		},
		// Triggered after all events have finished rendering.
		eventAfterAllRender : function( view ) {
		},
		// Triggered when event fetching starts/stops.
		loading: function( bool ) {
			if ( bool ) $('#espresso-ajax-loading').show();
			else $('#espresso-ajax-loading').hide();
		}

	});

    $('.qtip-close .ui-icon').each( function() {
 		$(this).removeClass('ui-icon');
 		$(this).removeClass('ui-icon-close');
 	});	

	$('.submit-this').on( 'change', function() {
		$(this).closest('form').submit();
	});

});
