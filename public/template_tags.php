<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
//echo '<br/><h6 style="color:#2EA2CC;">' . __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */



/*************************** EE Conditionals ***************************/


/**
 * is_espresso_event
 * whether this is an Espresso Event post
 *
 * @param int | \EE_Event $event
 * @return bool
 */
function is_espresso_event( $event = NULL ) {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		// load event view helper
		EE_Registry::instance()->load_helper( 'Event_View' );
		// extract EE_Event object from passed param regardless of what it is (within reason of course)
		$event = EEH_Event_View::get_event( $event );
		// do we have a valid event ?
		return $event instanceof EE_Event  ? TRUE : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_event_single
 * whether this is a singular Espresso Event post
 *
 * @return bool
 */
function is_espresso_event_single() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		// return conditionals set by CPTs
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_single : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_event_archive
 * whether this is an archive of Espresso Event posts
 *
 * @return bool
 */
function is_espresso_event_archive() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_archive : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_event_taxonomy
 * whether this is an Espresso Event category
 *
 * @return bool
 */
function is_espresso_event_taxonomy() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_event_taxonomy : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_venue
 * whether this is an Espresso Venue post
 *
 * @param int | \EE_Venue $venue
 * @return bool
 */
function is_espresso_venue( $venue = NULL ) {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		// load event view helper
		EE_Registry::instance()->load_helper( 'Venue_View' );
		// extract EE_Venue object from passed param regardless of what it is (within reason of course)
		$venue = EEH_Venue_View::get_venue( $venue, FALSE );
		// do we have a valid event ?
		return $venue instanceof EE_Venue ? TRUE : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_venue_single
 * whether this is a singular Espresso Venue post
 *
 * @return bool
 */
function is_espresso_venue_single() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_single : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_venue_archive
 * whether this is an archive of Espresso Venue posts
 *
 * @return bool
 */
function is_espresso_venue_archive() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_archive : FALSE;
	}
	return FALSE;
}

/**
 * is_espresso_venue_taxonomy
 * whether this is an Espresso Venue category
 *
 * @return bool
 */
function is_espresso_venue_taxonomy() {
	if ( can_use_espresso_conditionals( __FUNCTION__ )) {
		global $wp_query;
		return $wp_query instanceof WP_Query ? $wp_query->is_espresso_venue_taxonomy : FALSE;
	}
	return FALSE;
}

/**
 * can_use_espresso_conditionals
 * tests whether the Espresso Conditional tags like is_espresso_event_single() can be called
 *
 * @param $conditional_tag
 * @return bool
 */
function can_use_espresso_conditionals( $conditional_tag ) {
	if ( ! did_action( 'AHEE__EE_System__initialize' )) {
		EE_Error::doing_it_wrong(
			__FUNCTION__,
			sprintf(
				__( 'The "%s" conditional tag can not be used until after the "init" hook has run, but works best when used within a theme\'s template files.','event_espresso'),
				$conditional_tag
			),
			'4.4.0'
		);
		return FALSE;
	}
	return TRUE;
}




/*************************** Event Queries ***************************/

if ( ! function_exists( 'espresso_get_events' )) {
	/**
	 * 	espresso_get_events
	 * @param array $params
	 * @return array
	 */
	function espresso_get_events( $params = array() ) {
		//set default params
		$default_espresso_events_params = array(
			'limit' => 10,
			'show_expired' => FALSE,
			'month' => NULL,
			'category_slug' => NULL,
			'order_by' => 'start_date',
			'sort' => 'ASC'
		);
		// allow the defaults to be filtered
		$default_espresso_events_params = apply_filters( 'espresso_get_events__default_espresso_events_params', $default_espresso_events_params );
		// grab params and merge with defaults, then extract
		$params = array_merge( $default_espresso_events_params, $params );
		// run the query
		$events_query = new EE_Event_List_Query( $params );
		// assign results to a variable so we can return it
		$events = $events_query->have_posts() ? $events_query->posts : array();
		// but first reset the query and postdata
		wp_reset_query();
		wp_reset_postdata();
		EED_Events_Archive::remove_all_events_archive_filters();
		unset( $events_query );
		return $events;
	}
}



/*************************** EED_Ticket_Selector ***************************/


/**
 * espresso_load_ticket_selector
 */
function espresso_load_ticket_selector() {
	EE_Registry::instance()->load_file( EE_MODULES . 'ticket_selector', 'EED_Ticket_Selector', 'module' );
}

if ( ! function_exists( 'espresso_ticket_selector' )) {
	/**
	 * espresso_ticket_selector
	 * @param null $event
	 */
	function espresso_ticket_selector( $event = NULL ) {
		if (  ! apply_filters( 'FHEE_disable_espresso_ticket_selector', FALSE ) ) {
			espresso_load_ticket_selector();
			echo EED_Ticket_Selector::display_ticket_selector( $event );
		}
	}
}


	if ( ! function_exists( 'espresso_view_details_btn' )) {
	/**
	 * espresso_view_details_btn
	 * @param null $event
	 */
	function espresso_view_details_btn( $event = NULL ) {
		if (  ! apply_filters( 'FHEE_disable_espresso_view_details_btn', FALSE ) ) {
			espresso_load_ticket_selector();
			echo EED_Ticket_Selector::display_ticket_selector( $event, TRUE );
		}
	}
}




/*************************** EEH_Event_View ***************************/

if ( ! function_exists( 'espresso_load_event_list_assets' )) {
	/**
	 * espresso_load_event_list_assets
	 * ensures that event list styles and scripts are loaded
	 *
	 * @return object
	 */
	function espresso_load_event_list_assets() {
		$event_list = EED_Events_Archive::instance();
		add_action( 'AHEE__EE_System__initialize_last', array( $event_list, 'load_event_list_assets' ), 10 );
		add_filter( 'FHEE_enable_default_espresso_css', '__return_true' );
	}
}


if ( ! function_exists( 'espresso_event_reg_button' )) {
	/**
	 * espresso_event_reg_button
	 * returns the "Register Now" button if event is active,
	 * an inactive button like status banner if the event is not active
	 * or a "Read More" button if so desired
	 *
	 * @param null $btn_text_if_active
	 * @param bool $btn_text_if_inactive
	 * @param bool $EVT_ID
	 * @return string
	 */
	function espresso_event_reg_button( $btn_text_if_active = NULL, $btn_text_if_inactive = FALSE, $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		$event_status = EEH_Event_View::event_active_status( $EVT_ID );
		switch ( $event_status ) {
			case EE_Datetime::sold_out :
				$btn_text = __('Sold Out', 'event_espresso');
				$class = 'ee-pink';
				break;
			case EE_Datetime::expired :
				$btn_text = __('Event is Over', 'event_espresso');
				$class = 'ee-grey';
				break;
			case EE_Datetime::inactive :
				$btn_text = __('Event Not Active', 'event_espresso');
				$class = 'ee-grey';
				break;
			case EE_Datetime::upcoming :
			case EE_Datetime::active :
			default :
				$btn_text =! empty( $btn_text_if_active ) ? $btn_text_if_active : __( 'Register Now', 'event_espresso' );
				$class = 'ee-green';
		}
		if ( $event_status < 1 && ! empty( $btn_text_if_inactive )) {
			$btn_text = $btn_text_if_inactive;
			$class = 'ee-grey';
		}
		?>
		<a class="ee-button ee-register-button <?php echo $class; ?>" href="<?php espresso_event_link_url(); ?>">
			<?php echo $btn_text; ?>
		</a>
	<?php
	}
}



if ( ! function_exists( 'espresso_display_ticket_selector' )) {
	/**
	 * espresso_display_ticket_selector
	 * whether or not to display the Ticket Selector for an event
	 *
	 * @param bool $EVT_ID
	 * @return boolean
	 */
	function espresso_display_ticket_selector( $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		return EEH_Event_View::display_ticket_selector( $EVT_ID );
	}
}



if ( ! function_exists( 'espresso_event_status_banner' )) {
	/**
	 * espresso_event_status
	 * returns a banner showing the event status if it is sold out, expired, or inactive
	 *
	 * @param bool $EVT_ID
	 * @return string
	 */
	function espresso_event_status_banner( $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		return EEH_Event_View::event_status( $EVT_ID );
	}
}


if ( ! function_exists( 'espresso_event_status' )) {
	/**
	 * espresso_event_status
	 * returns the event status if it is sold out, expired, or inactive
	 *
	 * @param int  $EVT_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_event_status( $EVT_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::event_active_status( $EVT_ID );
			return '';
		}
		return EEH_Event_View::event_active_status( $EVT_ID );
	}
}


if ( ! function_exists( 'espresso_event_categories' )) {
	/**
	 * espresso_event_categories
	 * returns the terms associated with an event
	 *
	 * @param int  $EVT_ID
	 * @param bool $hide_uncategorized
	 * @param bool $echo
	 * @return string
	 */
	function espresso_event_categories( $EVT_ID = 0, $hide_uncategorized = TRUE, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::event_categories( $EVT_ID, $hide_uncategorized );
			return '';
		}
		return EEH_Event_View::event_categories( $EVT_ID, $hide_uncategorized );
	}
}


if ( ! function_exists( 'espresso_event_tickets_available' )) {
	/**
	 * espresso_event_tickets_available
	 * returns the ticket types available for purchase for an event
	 *
	 * @param int  $EVT_ID
	 * @param bool $echo
	 * @param bool $format
	 * @return string
	 */
	function espresso_event_tickets_available( $EVT_ID = 0, $echo = TRUE, $format = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		$tickets = EEH_Event_View::event_tickets_available( $EVT_ID );
		if ( is_array( $tickets ) && ! empty( $tickets )) {
			// if formatting then $html will be a string, else it will be an array of ticket objects
			$html = $format ? '<ul id="ee-event-tickets-ul-' . $EVT_ID . '" class="ee-event-tickets-ul">' : array();
			foreach ( $tickets as $ticket ) {
				if ( $ticket instanceof EE_Ticket ) {
					if ( $format ) {
						$html .= '<li id="ee-event-tickets-li-' . $ticket->ID() . '" class="ee-event-tickets-li">';
						$html .= $ticket->name() . ' ' . EEH_Template::format_currency( $ticket->get_ticket_total_with_taxes() );
						$html .= '</li>';
					} else {
						$html[] = $ticket;
					}
				}
			}
			if ( $format ) {
				$html .= '</ul>';
			}
			if ( $echo && ! $format ) {
				echo $html;
				return '';
			}
			return $html;
		}
		return '';
	}
}

if ( ! function_exists( 'espresso_event_date_obj' )) {
	/**
	 * espresso_event_date_obj
	 * returns the primary date object for an event
	 *
	 * @param bool $EVT_ID
	 * @return object
	 */
	function espresso_event_date_obj( $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		return EEH_Event_View::get_primary_date_obj( $EVT_ID );
	}
}


if ( ! function_exists( 'espresso_event_date' )) {
	/**
	 * espresso_event_date
	 * returns the primary date for an event
	 *
	 * @param string $date_format
	 * @param string $time_format
	 * @param bool   $EVT_ID
	 * @return string
	 */
	function espresso_event_date( $date_format = '', $time_format = '', $EVT_ID = FALSE ) {
		$date_format = ! empty( $date_format ) ? $date_format : get_option( 'date_format' );
		$time_format = ! empty( $time_format ) ? $time_format : get_option( 'time_format' );
		$date_format = apply_filters( 'FHEE__espresso_event_date__date_format', $date_format );
		$time_format = apply_filters( 'FHEE__espresso_event_date__time_format', $time_format );
		EE_Registry::instance()->load_helper( 'Event_View' );
		echo date_i18n( $date_format . ' ' . $time_format, strtotime( EEH_Event_View::the_event_date( $date_format, $time_format, $EVT_ID )));
	}
}


if ( ! function_exists( 'espresso_list_of_event_dates' )) {
	/**
	 * espresso_list_of_event_dates
	 * returns a unordered list of dates for an event
	 *
	 * @param int    $EVT_ID
	 * @param string $date_format
	 * @param string $time_format
	 * @param bool   $echo
	 * @param null   $show_expired
	 * @param bool   $format
	 * @param bool   $add_breaks
	 * @return string
	 */
	function espresso_list_of_event_dates( $EVT_ID = 0, $date_format = '', $time_format = '', $echo = TRUE, $show_expired = NULL, $format = TRUE, $add_breaks = TRUE ) {
		$date_format = ! empty( $date_format ) ? $date_format : get_option( 'date_format' );
		$time_format = ! empty( $time_format ) ? $time_format : get_option( 'time_format' );
		$date_format = apply_filters( 'FHEE__espresso_list_of_event_dates__date_format', $date_format );
		$time_format = apply_filters( 'FHEE__espresso_list_of_event_dates__time_format', $time_format );
		EE_Registry::instance()->load_helper( 'Event_View' );
		$datetimes = EEH_Event_View::get_all_date_obj( $EVT_ID, $show_expired );
		//d( $datetimes );
		if ( is_array( $datetimes ) && ! empty( $datetimes )) {
			global $post;
			$html = $format ? '<ul id="ee-event-datetimes-ul-' . $post->ID . '" class="ee-event-datetimes-ul">' : '';
			foreach ( $datetimes as $datetime ) {
				if ( $datetime instanceof EE_Datetime ) {
					if ( $format ) {
						$html .= '<li id="ee-event-datetimes-li-' . $datetime->ID() . '" class="ee-event-datetimes-li">';
						$datetime_name = $datetime->name();
						$html .= ! empty( $datetime_name ) ? '<strong>' . $datetime_name . '</strong>' : '';
						$html .= ! empty( $datetime_name )  && $add_breaks ? '<br />' : '';
						$html .= '<span class="dashicons dashicons-calendar"></span>' . $datetime->date_range( $date_format ) . '<br/>';
						$html .= '<span class="dashicons dashicons-clock"></span>' . $datetime->time_range( $time_format );
						$datetime_description = $datetime->description();
						$html .= ! empty( $datetime_description )  && $add_breaks ? '<br />' : '';
						$html .= ! empty( $datetime_description ) ? ' - ' . $datetime_description : '';
						$html = apply_filters( 'FHEE__espresso_list_of_event_dates__datetime_html', $html, $datetime );
						$html .= '</li>';
					} else {
						$html .= $datetime;
						$html = apply_filters( 'FHEE__espresso_list_of_event_dates__datetime_html', $html, $datetime );
					}
				}
			}
			$html .= $format ? '</ul>' : '';
		} else {
			$html = $format ?  '<p><span class="dashicons dashicons-marker pink-text"></span>' . __( 'There are no upcoming dates for this event.', 'event_espresso' ) . '</p><br/>' : '';
		}
		if ( $echo ) {
			echo $html;
			return '';
		}
		return $html;
	}
}


if ( ! function_exists( 'espresso_event_end_date' )) {
	/**
	 * espresso_event_end_date
	 * returns the last date for an event
	 *
	 * @param string $date_format
	 * @param string $time_format
	 * @param bool   $EVT_ID
	 * @return string
	 */
	function espresso_event_end_date( $date_format = '', $time_format = '', $EVT_ID = FALSE ) {
		$date_format = ! empty( $date_format ) ? $date_format : get_option( 'date_format' );
		$time_format = ! empty( $time_format ) ? $time_format : get_option( 'time_format' );
		$date_format = apply_filters( 'FHEE__espresso_event_end_date__date_format', $date_format );
		$time_format = apply_filters( 'FHEE__espresso_event_end_date__time_format', $time_format );
		EE_Registry::instance()->load_helper( 'Event_View' );
		echo date_i18n( $date_format . ' ' . $time_format, strtotime( EEH_Event_View::the_event_end_date( $date_format, $time_format, $EVT_ID )));
	}
}

if ( ! function_exists( 'espresso_event_date_range' )) {
	/**
	 * espresso_event_date_range
	 * returns the first and last dates for an event (if different)
	 *
	 * @param string $date_format
	 * @param string $time_format
	 * @param string $single_date_format
	 * @param string $single_time_format
	 * @param bool   $EVT_ID
	 * @return string
	 */
	function espresso_event_date_range( $date_format = '', $time_format = '', $single_date_format = '', $single_time_format = '', $EVT_ID = FALSE ) {
		// formats when there is an actual date range
		$date_format = ! empty( $date_format ) ? $date_format : get_option( 'date_format' );
		$time_format = ! empty( $time_format ) ? $time_format : get_option( 'time_format' );
		$date_format = apply_filters( 'FHEE__espresso_event_date_range__date_format', $date_format );
		$time_format = apply_filters( 'FHEE__espresso_event_date_range__time_format', $time_format );
		// format if there is only one date to display ie: no date range
		$single_date_format = ! empty( $single_date_format ) ? $single_date_format : get_option( 'date_format' );
		$single_time_format = ! empty( $single_time_format ) ? $single_time_format : get_option( 'time_format' );
		$single_date_format = apply_filters( 'FHEE__espresso_event_date_range__single_date_format', $single_date_format );
		$single_time_format = apply_filters( 'FHEE__espresso_event_date_range__single_time_format', $single_time_format );
		EE_Registry::instance()->load_helper( 'Event_View' );
		$the_event_date = date_i18n( $date_format . ' ' . $time_format, strtotime( EEH_Event_View::the_event_date( $date_format, $time_format, $EVT_ID )));
		$the_event_end_date = date_i18n( $date_format . ' ' . $time_format, strtotime( EEH_Event_View::the_event_end_date( $date_format, $time_format, $EVT_ID )));
		if ( $the_event_date != $the_event_end_date ) {
			echo $the_event_date . __( ' - ', 'event_espresso' ) . date_i18n( $date_format . ' ' . $time_format, strtotime( EEH_Event_View::the_event_end_date( $date_format, $time_format, $EVT_ID )));
		} else {
			echo date_i18n( $single_date_format . ' ' . $single_time_format, strtotime( EEH_Event_View::the_event_date( $single_date_format, $single_time_format, $EVT_ID )));
		}
	}
}


if ( ! function_exists( 'espresso_event_date_as_calendar_page' )) {
	/**
	 * espresso_event_date_as_calendar_page
	 * returns the primary date for an event, stylized to appear as the page of a calendar
	 *
	 * @param bool $EVT_ID
	 * @return string
	 */
	function espresso_event_date_as_calendar_page( $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		EEH_Event_View::event_date_as_calendar_page( $EVT_ID );
	}
}




if ( ! function_exists( 'espresso_event_link_url' )) {
	/**
	 * espresso_event_link_url
	 *
	 * @param int  $EVT_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_event_link_url( $EVT_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::event_link_url( $EVT_ID );
			return '';
		}
		return EEH_Event_View::event_link_url( $EVT_ID );
	}
}



if ( ! function_exists( 'espresso_event_has_content_or_excerpt' )) {
	/**
	 *    espresso_event_has_content_or_excerpt
	 *
	 * @access    public
	 * @param bool $EVT_ID
	 * @return    boolean
	 */
	function espresso_event_has_content_or_excerpt( $EVT_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		return EEH_Event_View::event_has_content_or_excerpt( $EVT_ID );
	}
}




if ( ! function_exists( 'espresso_event_content_or_excerpt' )) {
	/**
	 * espresso_event_content_or_excerpt
	 *
	 * @param int  $num_words
	 * @param null $more
	 * @param bool $echo
	 * @return string
	 */
	function espresso_event_content_or_excerpt( $num_words = 55, $more = NULL, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::event_content_or_excerpt( $num_words, $more );
			return '';
		}
		return EEH_Event_View::event_content_or_excerpt( $num_words, $more );
	}
}



if ( ! function_exists( 'espresso_event_phone' )) {
	/**
	 * espresso_event_phone
	 *
	 * @param int  $EVT_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_event_phone( $EVT_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::event_phone( $EVT_ID );
			return '';
		}
		return EEH_Event_View::event_phone( $EVT_ID );
	}
}



if ( ! function_exists( 'espresso_edit_event_link' )) {
	/**
	 * espresso_edit_event_link
	 * returns a link to edit an event
	 *
	 * @param int $EVT_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_edit_event_link( $EVT_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Event_View' );
		if ( $echo ) {
			echo EEH_Event_View::edit_event_link( $EVT_ID );
			return '';
		}
		return EEH_Event_View::edit_event_link( $EVT_ID );
	}
}


if ( ! function_exists( 'espresso_organization_name' )) {
	/**
	 * espresso_organization_name
	 * @return string
	 */
	function espresso_organization_name() {
		echo EE_Registry::instance()->CFG->organization->name;
	}
}

if ( ! function_exists( 'espresso_organization_address' )) {
	/**
	 * espresso_organization_address
	 * @param string $type
	 * @return string
	 */
	function espresso_organization_address( $type = 'inline' ) {
		if ( EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config ) {
			EE_Registry::instance()->load_helper( 'Formatter' );
			$address = new EE_Generic_Address(
				EE_Registry::instance()->CFG->organization->address_1,
				EE_Registry::instance()->CFG->organization->address_2,
				EE_Registry::instance()->CFG->organization->city,
				EE_Registry::instance()->CFG->organization->STA_ID,
				EE_Registry::instance()->CFG->organization->CNT_ISO,
				EE_Registry::instance()->CFG->organization->zip
			);
			return EEH_Address::format( $address, $type );
		}
		return '';
	}
}

if ( ! function_exists( 'espresso_organization_email' )) {
	/**
	 * espresso_organization_email
	 * @return string
	 */
	function espresso_organization_email() {
		echo EE_Registry::instance()->CFG->organization->email;
	}
}

if ( ! function_exists( 'espresso_organization_logo_url' )) {
	/**
	 * espresso_organization_logo_url
	 * @return string
	 */
	function espresso_organization_logo_url() {
		echo EE_Registry::instance()->CFG->organization->logo_url;
	}
}

if ( ! function_exists( 'espresso_organization_facebook' )) {
	/**
	 * espresso_organization_facebook
	 * @return string
	 */
	function espresso_organization_facebook() {
		echo EE_Registry::instance()->CFG->organization->facebook;
	}
}

if ( ! function_exists( 'espresso_organization_twitter' )) {
	/**
	 * espresso_organization_twitter
	 * @return string
	 */
	function espresso_organization_twitter() {
		echo EE_Registry::instance()->CFG->organization->twitter;
	}
}

if ( ! function_exists( 'espresso_organization_linkedin' )) {
	/**
	 * espresso_organization_linkedin
	 * @return string
	 */
	function espresso_organization_linkedin() {
		echo EE_Registry::instance()->CFG->organization->linkedin;
	}
}

if ( ! function_exists( 'espresso_organization_pinterest' )) {
	/**
	 * espresso_organization_pinterest
	 * @return string
	 */
	function espresso_organization_pinterest() {
		echo EE_Registry::instance()->CFG->organization->pinterest;
	}
}

if ( ! function_exists( 'espresso_organization_google' )) {
	/**
	 * espresso_organization_google
	 * @return string
	 */
	function espresso_organization_google() {
		echo EE_Registry::instance()->CFG->organization->google;
	}
}

if ( ! function_exists( 'espresso_organization_instagram' )) {
	/**
	 * espresso_organization_instagram
	 * @return string
	 */
	function espresso_organization_instagram() {
		echo EE_Registry::instance()->CFG->organization->instagram;
	}
}



/*************************** EEH_Venue_View ***************************/



if ( ! function_exists( 'espresso_event_venues' )) {
	/**
	 * espresso_event_venues
	 *
	 * @return array  all venues related to an event
	 */
	function espresso_event_venues() {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		return EEH_Venue_View::get_event_venues();
	}
}




if ( ! function_exists( 'espresso_venue_id' )) {
	/**
	 *    espresso_venue_name
	 *
	 * @access    public
	 * @param     int $EVT_ID
	 * @return    string
	 */
	function espresso_venue_id( $EVT_ID = 0 ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		$venue = EEH_Venue_View::get_venue( $EVT_ID );
		return $venue instanceof EE_Venue ? $venue->ID() : 0;
	}
}




if ( ! function_exists( 'espresso_venue_name' )) {
	/**
	 *    espresso_venue_name
	 *
	 * @access    public
	 * @param int       $VNU_ID
	 * @param    string $link_to - options( details, website, none ) whether to turn Venue name into a clickable link to the Venue's details page or website
	 * @return    string
	 */
	function espresso_venue_name( $VNU_ID = 0, $link_to = 'details'  ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		echo EEH_Venue_View::venue_name( $link_to, $VNU_ID );
	}
}




if ( ! function_exists( 'espresso_venue_link' )) {
	/**
	 * 	espresso_venue_link
	 *
	 *  @access 	public
	 *  @param 	int 		$VNU_ID
	 *  @param 	string 	$text
	 *  @return 	string
	 */
	function espresso_venue_link( $VNU_ID = 0, $text = '' ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		return EEH_Venue_View::venue_details_link( $VNU_ID, $text );
	}
}



if ( ! function_exists( 'espresso_venue_description' )) {
	/**
	 *    espresso_venue_description
	 *
	 * @access    public
	 * @param bool $VNU_ID
	 * @return    string
	 */
	function espresso_venue_description( $VNU_ID = FALSE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		echo EEH_Venue_View::venue_description( $VNU_ID );
	}
}


if ( ! function_exists( 'espresso_venue_excerpt' )) {
	/**
	 *    espresso_venue_excerpt
	 *
	 * @access    public
	 * @param int  $VNU_ID
	 * @param bool $echo
	 * @return    string
	 */
	function espresso_venue_excerpt( $VNU_ID = 0,  $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_excerpt( $VNU_ID,  $echo );
			return '';
		}
		return EEH_Venue_View::venue_excerpt( $VNU_ID,  $echo );
	}
}



if ( ! function_exists( 'espresso_venue_categories' )) {
	/**
	 * espresso_venue_categories
	 * returns the terms associated with a venue
	 *
	 * @param int  $VNU_ID
	 * @param bool $hide_uncategorized
	 * @param bool $echo
	 * @return string
	 */
	function espresso_venue_categories( $VNU_ID = 0, $hide_uncategorized = TRUE,  $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_categories( $VNU_ID, $hide_uncategorized );
			return '';
		}
		return EEH_Venue_View::venue_categories( $VNU_ID, $hide_uncategorized );
	}
}


if ( ! function_exists( 'espresso_venue_address' )) {
	/**
	 * espresso_venue_address
	 * returns a formatted block of html  for displaying a venue's address
	 *
	 * @param string $type 'inline' or 'multiline'
	 * @param int    $VNU_ID
	 * @param bool   $echo
	 * @return string
	 */
	function espresso_venue_address( $type = 'multiline', $VNU_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_address( $type, $VNU_ID );
			return '';
		}
		return EEH_Venue_View::venue_address( $type, $VNU_ID );
	}
}


if ( ! function_exists( 'espresso_venue_raw_address' )) {
	/**
	 * espresso_venue_address
	 * returns an UN-formatted string containing a venue's address
	 *
	 * @param string   $type 'inline' or 'multiline'
	 * @param int $VNU_ID
	 * @param bool     $echo
	 * @return string
	 */
	function espresso_venue_raw_address( $type = 'multiline', $VNU_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_address( $type, $VNU_ID, FALSE, FALSE );
			return '';
		}
		return EEH_Venue_View::venue_address( $type, $VNU_ID, FALSE, FALSE );
	}
}


if ( ! function_exists( 'espresso_venue_has_address' )) {
	/**
	 * espresso_venue_has_address
	 * returns TRUE or FALSE if a Venue has address information
	 *
	 * @param int $VNU_ID
	 * @return bool
	 */
	function espresso_venue_has_address( $VNU_ID = 0 ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		return EEH_Venue_View::venue_has_address( $VNU_ID );
	}
}


if ( ! function_exists( 'espresso_venue_gmap' )) {
	/**
	 * espresso_venue_gmap
	 * returns a google map for the venue address
	 *
	 * @param int 		$VNU_ID
	 * @param bool     $map_ID
	 * @param array    $gmap
	 * @param bool     $echo
	 * @return string
	 */
	function espresso_venue_gmap( $VNU_ID = 0, $map_ID = FALSE, $gmap = array(), $echo = TRUE  ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_gmap( $VNU_ID, $map_ID, $gmap );
			return '';
		}
		return EEH_Venue_View::venue_gmap( $VNU_ID, $map_ID, $gmap );
	}
}


if ( ! function_exists( 'espresso_venue_phone' )) {
	/**
	 * espresso_venue_phone
	 *
	 * @param int  $VNU_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_venue_phone( $VNU_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_phone( $VNU_ID );
			return '';
		}
		return EEH_Venue_View::venue_phone( $VNU_ID );
	}
}



if ( ! function_exists( 'espresso_venue_website' )) {
	/**
	 * espresso_venue_website
	 *
	 * @param int  $VNU_ID
	 * @param bool $echo
	 * @return string
	 */
	function espresso_venue_website( $VNU_ID = 0, $echo = TRUE ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		if ( $echo ) {
			echo EEH_Venue_View::venue_website_link( $VNU_ID );
			return '';
		}
		return EEH_Venue_View::venue_website_link( $VNU_ID );
	}
}



if ( ! function_exists( 'espresso_edit_venue_link' )) {
	/**
	 * espresso_edit_venue_link
	 *
	 * @param int $VNU_ID
	 */
	function espresso_edit_venue_link( $VNU_ID = 0 ) {
		EE_Registry::instance()->load_helper( 'Venue_View' );
		echo EEH_Venue_View::edit_venue_link( $VNU_ID );
	}
}






// End of file template_tags.php
// Location: /public/template_tags.php