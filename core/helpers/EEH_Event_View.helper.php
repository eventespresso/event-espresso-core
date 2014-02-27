<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 */



	/**
	 * espresso_event_reg_button
	 * returns the "Register Now" button if event is active, 
	 * an inactive button like status banner if the event is not active
 	 * or a "Read More" button if so desired
	 * 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_reg_button' )) {
		function espresso_event_reg_button( $btn_text_if_active = NULL, $btn_text_if_inactive = FALSE, $EVT_ID = FALSE ) {
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



	/**
	 * espresso_display_ticket_selector
	 * whether or not to display the Ticket Selector for an event
	* 
	 * @return boolean
	 */
	if ( ! function_exists( 'espresso_display_ticket_selector' )) {
		function espresso_display_ticket_selector( $EVT_ID = FALSE ) {
			return EEH_Event_View::display_ticket_selector( $EVT_ID );
		}		
	}



	/**
	 * espresso_event_status
	 * returns a banner showing the event status if it is sold out, expired, or inactive
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_status_banner' )) {
		function espresso_event_status_banner( $EVT_ID = FALSE ) {
			return EEH_Event_View::event_status( $EVT_ID );
		}		
	}


	/**
	 * espresso_event_status
	 * returns the event status if it is sold out, expired, or inactive
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_status' )) {
		function espresso_event_status( $EVT_ID = FALSE, $echo = TRUE ) {
			if ( $echo ) {
				echo EEH_Event_View::event_active_status( $EVT_ID );
			} else {
				return EEH_Event_View::event_active_status( $EVT_ID );
			}			
		}		
	}


	/**
	 * espresso_event_categories
	 * returns the terms associated with an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_categories' )) {
		function espresso_event_categories( $EVT_ID = FALSE, $hide_uncategorized = TRUE, $echo = TRUE ) {
			if ( $echo ) {
				echo EEH_Event_View::event_categories( $EVT_ID, $hide_uncategorized );
			} else {
				return EEH_Event_View::event_categories( $EVT_ID, $hide_uncategorized );
			}
		}		
	}


	/**
	 * espresso_event_tickets_available
	* returns the ticket types available for purchase for an event
	* 
	 * @return object
	 */
	if ( ! function_exists( 'espresso_event_tickets_available' )) {
		function espresso_event_tickets_available( $EVT_ID = FALSE, $echo = TRUE, $format = TRUE ) {
			$tickets = EEH_Event_View::event_tickets_available( $EVT_ID );
			if ( is_array( $tickets ) && ! empty( $tickets )) {
				$html = $format ? '<ul id="ee-event-tickets-ul-' . $EVT_ID . '" class="ee-event-tickets-ul">' : '';
				foreach ( $tickets as $ticket ) {
					$html .= $format ? '<li id="ee-event-tickets-li-' . $ticket->ID() . '" class="ee-event-tickets-li">' : '';
					$html .= $format ? $ticket->name() . ' ' . EEH_Template::format_currency( $ticket->get_ticket_total_with_taxes() ) : $ticket;	
					$html .= $format ? '</li>' : ', ';
				}
				$html .= $format ? '</ul>' : '';
				if ( $echo ) {
					echo $html;
				} else {
					return $html;
				}
			}
		}		
	}

	/**
	 * espresso_event_date
	* returns the primary date object for an event
	* 
	 * @return object
	 */
	if ( ! function_exists( 'espresso_event_date_obj' )) {
		function espresso_event_date_obj( $EVT_ID = FALSE ) {
			return EEH_Event_View::get_primary_date_obj( $EVT_ID );
		}		
	}


	/**
	 * espresso_event_date 
	* returns the primary date for an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_date' )) {
		function espresso_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = FALSE ) {
			echo EEH_Event_View::the_event_date( $dt_frmt, $tm_frmt, $EVT_ID );
		}		
	}


	/**
	 * espresso_list_of_event_dates
	* returns a unordered list of dates for an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_list_of_event_dates' )) {
		function espresso_list_of_event_dates( $EVT_ID = FALSE, $dt_frmt = 'l F jS, Y', $tm_frmt = 'g:i a', $echo = TRUE, $show_expired = NULL, $format = TRUE ) {
			$datetimes = EEH_Event_View::get_all_date_obj( $EVT_ID ,$show_expired );
			//d( $datetimes );
			if ( is_array( $datetimes ) && ! empty( $datetimes )) {
				global $post;
				$html = $format ? '<ul id="ee-event-datetimes-ul-' . $post->ID . '" class="ee-event-datetimes-ul">' : '';
				foreach ( $datetimes as $datetime ) {
					if ( $datetime instanceof EE_Datetime ) {
						if ( $format ) {
							$html .= '<li id="ee-event-datetimes-li-' . $datetime->ID() . '" class="ee-event-datetimes-li">';
							$datetime_name = $datetime->name();
							$html .= ! empty( $datetime_name ) ? '<b>' . $datetime_name . '</b>' : '';
							$datetime_description = $datetime->description();
							$html .= ! empty( $datetime_name ) && ! empty( $datetime_description ) ? ' - ' : '';
							$html .= ! empty( $datetime_description ) ? $datetime_description : '';
							$html .= ! empty( $datetime_name ) || ! empty( $datetime_description ) ? '<br/>' : '';
							$html .= '<span class="dashicons dashicons-calendar"></span>' . $datetime->date_range( $dt_frmt ) . ' &nbsp; &nbsp; ';
							$html .= '<span class="dashicons dashicons-clock"></span>' . $datetime->time_range( $tm_frmt ) . '<br/><br/>';
							$html .= '</li>';

						} else {
							$html .= $datetime;
						}
					}
				}
				$html .= $format ? '</ul>' : '';
				if ( $echo ) {
					echo $html;
				} else {
					return $html;
				}
			}
		}		
	}


	/**
	 * espresso_event_end_date
	* returns the last date for an event
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_end_date' )) {
		function espresso_event_end_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = FALSE ) {
			echo EEH_Event_View::the_event_end_date( $dt_frmt, $tm_frmt, $EVT_ID );
		}		
	}

	/**
	 * espresso_event_date_range
	* returns the first and last dates for an event (if different)
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_date_range' )) {
		function espresso_event_date_range( $dt_frmt = 'M jS', $tm_frmt = ' ', $single_dt_frmt = 'D M jS @ ', $single_tm_frmt = ' g:i a', $EVT_ID = FALSE ) {
			$the_event_date = EEH_Event_View::the_event_date( $dt_frmt, $tm_frmt, $EVT_ID );
			$the_event_end_date = EEH_Event_View::the_event_end_date( $dt_frmt, $tm_frmt, $EVT_ID );
			if ( $the_event_date != $the_event_end_date ) {
				echo $the_event_date . __( ' - ', 'event_espresso' ) . EEH_Event_View::the_event_end_date( $dt_frmt . ', Y', $tm_frmt, $EVT_ID );
			} else {
				echo EEH_Event_View::the_event_date( $single_dt_frmt, $single_tm_frmt, $EVT_ID );
			}
		}		
	}


	/**
	 * espresso_event_date_as_calendar_page
	* returns the primary date for an event, stylized to appear as the page of a calendar
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_date_as_calendar_page' )) {
		function espresso_event_date_as_calendar_page( $EVT_ID = FALSE ) {
			EEH_Event_View::event_date_as_calendar_page( $EVT_ID );
		}		
	}




	/**
	 * espresso_event_link_url	 
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_link_url' )) {
		function espresso_event_link_url( $EVT_ID = FALSE ) {
			echo EEH_Event_View::event_link_url( $EVT_ID );
		}		
	}




	/**
	 * espresso_event_content_or_excerpt	 
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_content_or_excerpt' )) {
		function espresso_event_content_or_excerpt( $num_words = NULL, $more = NULL, $echo = TRUE ) {
			if ( $echo ) {
				echo EEH_Event_View::event_content_or_excerpt( $num_words, $more );
			} else {
				return EEH_Event_View::event_content_or_excerpt( $num_words, $more );
			}
		}		
	}



	/**
	 * espresso_event_phone	 
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_phone' )) {
		function espresso_event_phone( $EVT_ID = FALSE, $echo = TRUE ) {
			if ( $echo ) {
				echo EEH_Event_View::event_phone( $EVT_ID );
			} else {
				return EEH_Event_View::event_phone( $EVT_ID );
			}
		}		
	}



	/**
	 * espresso_edit_event_link	 
	 * returns a link to edit an event
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_edit_event_link' )) {
		function espresso_edit_event_link( $EVT_ID = FALSE, $echo = TRUE ) {
			if ( $echo ) {
				echo EEH_Event_View::edit_event_link( $EVT_ID );
			} else {
				return EEH_Event_View::edit_event_link( $EVT_ID );
			}
		}		
	}


	/**
	 * espresso_organization_name
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_name' )) {
		function espresso_organization_name() {
			echo EE_Registry::instance()->CFG->organization->name;
		}		
	}

	/**
	 * espresso_organization_address
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_address' )) {
		function espresso_organization_address( $type = 'inline' ) {
			EE_Registry::instance()->load_helper( 'Formatter' );
			$address = new EE_Generic_Address(
				EE_Registry::instance()->CFG->organization->address,
				EE_Registry::instance()->CFG->organization->address_2,
				EE_Registry::instance()->CFG->organization->city,
				EE_Registry::instance()->CFG->organization->STA_ID,
				EE_Registry::instance()->CFG->organization->CNT_ISO,
				EE_Registry::instance()->CFG->organization->zip
			);
			return EEH_Address::format( $address, $type );
		}		
	}

	/**
	 * espresso_organization_email
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_email' )) {
		function espresso_organization_email() {
			echo EE_Registry::instance()->CFG->organization->email;
		}		
	}

	/**
	 * espresso_organization_logo_url
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_logo_url' )) {
		function espresso_organization_logo_url() {
			echo EE_Registry::instance()->CFG->organization->logo_url;
		}		
	}

	/**
	 * espresso_organization_facebook
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_facebook' )) {
		function espresso_organization_facebook() {
			echo EE_Registry::instance()->CFG->organization->facebook;
		}		
	}

	/**
	 * espresso_organization_twitter
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_twitter' )) {
		function espresso_organization_twitter() {
			echo EE_Registry::instance()->CFG->organization->twitter;
		}		
	}

	/**
	 * espresso_organization_linkedin
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_linkedin' )) {
		function espresso_organization_linkedin() {
			echo EE_Registry::instance()->CFG->organization->linkedin;
		}		
	}

	/**
	 * espresso_organization_pinterest
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_pinterest' )) {
		function espresso_organization_pinterest() {
			echo EE_Registry::instance()->CFG->organization->pinterest;
		}		
	}

	/**
	 * espresso_organization_google
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_google' )) {
		function espresso_organization_google() {
			echo EE_Registry::instance()->CFG->organization->google;
		}		
	}

	/**
	 * espresso_organization_instagram
	 * @return string
	 */
	if ( ! function_exists( 'espresso_organization_instagram' )) {
		function espresso_organization_instagram() {
			echo EE_Registry::instance()->CFG->organization->instagram;
		}		
	}





/**
 * ------------------------------------------------------------------------
 *
 * EEH_Event_View Helper
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_Event_View extends EEH_Base {

	private static $_event = NULL;


	/**
	 * 	get_event
	* 	attempts to retrieve an EE_Event object any way it can
	 *
	 *  @access 	private
	 *  @return 	object
	 */
	private static function get_event( $EVT_ID = FALSE ) {
		$EVT_ID = absint( $EVT_ID );
//		d( $EVT_ID );
		// do we already have the Event  you are looking for?
		if ( EEH_Event_View::$_event instanceof EE_Event && $EVT_ID && EEH_Event_View::$_event->ID() === $EVT_ID ) {
			return EEH_Event_View::$_event;
		}
		EEH_Event_View::$_event = NULL;
		// international newspaper?
		global $post;
		// if this is being called from an EE_Event post, then we can just grab the attached EE_Event object
		 if ( isset( $post->post_type ) && $post->post_type == 'espresso_events' || $EVT_ID ) {
//			d( $post );
			// grab the event we're looking for
			if ( isset( $post->EE_Event ) && (( $EVT_ID && $post->EE_Event->ID() === $EVT_ID ) || ! $EVT_ID )) {
				EEH_Event_View::$_event = $post->EE_Event;
//				d( EEH_Event_View::$_event );
			}
			// now if we STILL do NOT have an EE_Event model object, BUT we have an Event ID...
			if ( ! EEH_Event_View::$_event instanceof EE_Event && $EVT_ID ) {
				// sigh... pull it from the db
				EEH_Event_View::$_event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
//				d( EEH_Event_View::$_event );
			}
		}
		return EEH_Event_View::$_event;
	}




	/**
	 * 	display_ticket_selector
	 *
	 *  @access 	public
	 *  @return 	boolean
	 */
	public static function display_ticket_selector( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->display_ticket_selector() : FALSE;
	}



	/**
	 * 	event_status
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_status( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->pretty_active_status( FALSE, FALSE ) : '';
	}



	/**
	 * 	event_active_status
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_active_status( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->pretty_active_status() : 'inactive';
	}



	/**
	 * 	event_active_status
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_content_or_excerpt( $num_words = NULL, $more = NULL ) {

		global $post;
		$content = '';
		
		ob_start();
		if (( is_single() ) || ( is_archive() && espresso_display_full_description_in_event_list() )) {
//			echo '<h1>the_content</h1>';
			the_content();
		} else if (( is_archive() && has_excerpt( $post->ID ) && espresso_display_excerpt_in_event_list() ) || apply_filters( 'FHEE__EES_Espresso_Events__process_shortcode__true', FALSE )) {
//			echo '<h1>the_excerpt</h1>';
			the_excerpt();
		} else if (( is_archive() && ! has_excerpt( $post->ID ) && espresso_display_excerpt_in_event_list() )) {
//			echo '<h1>get_the_content</h1>';
			if ( ! empty( $num_words )) {
				if ( empty( $more )) {
					$more = ' <a href="' . get_permalink() . '" class="more-link">' . __( '(more&hellip;)' ) . '</a>';
					$more = apply_filters( 'the_content_more_link', $more );
				}
				$content = str_replace( 'NOMORELINK', '', get_the_content( 'NOMORELINK' ));
				$content =  wp_trim_words( $content, $num_words, ' ' ) . $more;
			} else {
				$content =  get_the_content();				
			}
			echo apply_filters( 'the_content', $content );
		} else {
//			echo '<h1>nothing</h1>';
			echo apply_filters( 'the_content', $content );			
		}
		return ob_get_clean();
	}



	/**
	 * 	event_tickets_available
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_tickets_available( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		$tickets_available_for_purchase = array();
		if( $event instanceof EE_Event ) {
			foreach( EEH_Event_View::get_all_date_obj( $EVT_ID, FALSE ) as $datetime ) {
				$tickets_available_for_purchase = array_merge( $tickets_available_for_purchase, $datetime->ticket_types_available_for_purchase() );
			}			
		}
		return $tickets_available_for_purchase;
	}




	/**
	 * 	the_event_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_categories( $EVT_ID = FALSE, $hide_uncategorized = TRUE ) {
		$category_links = array();
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			if ( $event_categories = get_the_terms( $event->ID(), 'espresso_event_categories' )) {
				// loop thru terms and create links
				foreach ( $event_categories as $term ) {
					$url = get_term_link( $term, 'espresso_venue_categories' );
					if ( ! is_wp_error( $url ) && (( $hide_uncategorized && strtolower( $term->name ) != __( 'uncategorized', 'event_espresso' )) || ! $hide_uncategorized )) {
						$category_links[] = '<a href="' . esc_url( $url ) . '" rel="tag">' . $term->name . '</a>';
					}					
				}
			}
		}		
		return implode( ', ', $category_links );		
	}




	/**
	 * 	the_event_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function the_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = FALSE ) {
		if ( $datetime = EEH_Event_View::get_primary_date_obj( $EVT_ID )) {
			return $datetime->start_date_and_time( $dt_frmt, $tm_frmt );
		}		
	}



	/**
	 * 	the_event_end_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function the_event_end_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = FALSE ) {
		if ( $datetime = EEH_Event_View::get_last_date_obj( $EVT_ID )) {
			return $datetime->end_date_and_time( $dt_frmt, $tm_frmt );
		}		
	}



	/**
	 * 	event_date_as_calendar_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_date_as_calendar_page( $EVT_ID = FALSE ) {
		if ( $datetime = EEH_Event_View::get_primary_date_obj( $EVT_ID )) {
	?>
		<div class="event-date-calendar-page-dv">
			<div class="event-date-calendar-page-month-dv"><?php echo $datetime->start_date('M');?></div>
			<div class="event-date-calendar-page-day-dv"><?php echo $datetime->start_date('d');?></div>
		</div>
	<?php	
		}
	}




	/**
	 * 	get_primary_date_obj
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_primary_date_obj( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related('Datetime');
			return reset( $datetimes );
		} else {
			 return FALSE;
		} 
	}



	/**
	 * 	get_last_date_obj
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_last_date_obj( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related('Datetime');
			return end( $datetimes );
		} else {
			 return FALSE;
		}
	}



	/**
	 * 	get_all_date_obj
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_all_date_obj( $EVT_ID = FALSE,$include_expired = NULL, $include_deleted = false ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if($include_expired === null){
			if($event->is_expired()){
				$include_expired = true;
			}else{
				$include_expired = false;
			}
		}else{
			$include_expired = true;
		}
		if ( $event instanceof EE_Event ) {
			return $event->datetimes_ordered($include_expired,$include_deleted);
		} else {
			 return FALSE;
		}
	}




	/**
	 * 	event_link_url
	 *
	 *  @access 	public
	 *  @param	string $text 
	 *  @return 	string
	 */
	public static function event_link_url( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$url = $event->external_url() !== NULL && $event->external_url() !== '' ? $event->external_url() : get_permalink( $event->ID() );
			return preg_match( "~^(?:f|ht)tps?://~i", $url ) ? $url : 'http://' . $url;
		}
		return NULL;
	}



	/**
	 * 	event_phone
	 *
	 *  @access 	public
	 *  @param	string $text 
	 *  @return 	string
	 */
	public static function event_phone( $EVT_ID = FALSE ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			EE_Registry::instance()->load_helper( 'Formatter' );
			return EEH_Schema::telephone( $event->phone() );
		}
		return NULL;
	}



	/**
	 * 	edit_event_link
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function edit_event_link( $EVT_ID = FALSE, $link = '', $before = '', $after = '' ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			// can the user edit this post ?
			if ( current_user_can( 'edit_post', $event->ID() )) {
				// set link text
				$link = ! empty( $link ) ? $link : __('edit this event');
				// generate nonce
				$nonce = wp_create_nonce( 'edit_nonce' );
				// generate url to event editor for this event
				$url = add_query_arg( array( 'page' => 'espresso_events', 'action' => 'edit', 'post' => $event->ID(), 'edit_nonce' => $nonce ), admin_url() );
				// get edit CPT text
				$post_type_obj = get_post_type_object( 'espresso_events' );
				// build final link html
				$link = '<a class="post-edit-link" href="' . $url . '" title="' . esc_attr( $post_type_obj->labels->edit_item ) . '">' . $link . '</a>';
				// put it all together 
				return $before . apply_filters( 'edit_post_link', $link, $event->ID() ) . $after;			
			}
		}
	}




	/**
	 * 	event_desc
	 *
	 *  @access 	public
	 *  @return 	string
	 */
//	public static function event_desc( ) {
//			global $post;
//			
//	}



	/**
	 * 	extract_event_IDs_from_WP_Query
	 * 	given a WP_Query object, this method will get the EVT_IDs for all event CPT posts 
	 *
	 *  @access 	public
	 *  @param 	array	$EVT_IDs an array of Event IDs
	 *  @return 	string
	 */
//	public static function extract_event_IDs_from_WP_Query( WP_Query $wp_query = NULL ) {
//		// array for storing Event IDs
//		$EVT_IDs = array();
//		// loop thru posts
//		if ( isset( $wp_query->posts )) {
//			foreach( $wp_query->posts as $event ) {
//				if ( $event->post_type == 'espresso_events' ) {
//					$EVT_IDs[] = $event->ID;
//				}
//			}
//		}
//		return $EVT_IDs;
//	}	



	/**
	 * 	get_datetimes_for_events
	 * 	given an array of event IDs, this method will retrieve all datetimes associated with those events
	 *
	 *  @access 	public
	 *  @param 	array	$EVT_IDs an array of Event IDs
	 *  @return 	string
	 */
//	public static function get_datetimes_for_events( $EVT_IDs = array() ) {
//		
//		if ( ! is_array( $EVT_IDs )) {
//			$EVT_IDs = array( absint( $EVT_IDs ));
//		}
//		// load model
//		EE_Registry::instance()->load_model( 'Datetime' );
//		// grab datetimes for events
//		$datetimes = EEM_Datetime::instance()->get_all( array( array( 'EVT_ID' => array( 'IN', $EVT_IDs ))));
//		$datetimes = is_array( $datetimes ) ? $datetimes : array();
////		printr( $datetimes, '$datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		return $datetimes;
//	}	




	/**
	 * 	add_event_datetimes_and_tickets_to_WP_Query
	 *	efficiently adds event datetimes and event tickets to WP_Query event CPT posts 
	 *
	 *  @access 	public
	 *  @param 	WP_Query	$wp_query
	 *  @param 	array		$datetimes
	 *  @param 	array		$tickets
	 *  @return 	string
	 */
//	public static function add_event_datetimes_and_tickets_to_WP_Query( WP_Query $wp_query = NULL, $datetimes = array(), $tickets = array() ) {
//		$datetimes = is_array( $datetimes ) ? $datetimes : array();
//		$tickets = is_array( $tickets ) ? $tickets : array();
//		// now loop thru posts
//		foreach( $wp_query->posts as $EVT_ID => $event ) {
//			// add empty arrays to events
//			$wp_query->posts[ $EVT_ID ]->datetimes = array();
//			// add datetimes
//			foreach ( $datetimes as $datetime ) {
//				if ( $event->ID == $datetime->get( 'EVT_ID' )) {
//					//$datetime->tickets();
//					$wp_query->posts[ $EVT_ID ]->datetimes[ $datetime->ID() ] = $datetime;
//				}
//			}
//		}
//		return $wp_query;
//	}	


	/**
	 * 	get_event_datetimes_and_tickets_for_WP_Query
	 *	given WP_Query object, will add datetimes and tickets to any event CPTs in the posts array
	 *
	 *  @access 	public
	 *  @param 	WP_Query	$wp_query
	 *  @return 	string
	 */
//	public static function get_event_datetimes_and_tickets_for_WP_Query( WP_Query $wp_query = NULL ) {
//		if ( $wp_query ) {
//			// array of Event IDs
//			$EVT_IDs = EEH_Event_View::extract_event_IDs_from_WP_Query( $wp_query );
//			if ( ! empty( $EVT_IDs )) {
//				// get datetimes
//				$datetimes = EEH_Event_View::get_datetimes_for_events( $EVT_IDs );
//				// now put it all together
//				$wp_query = EEH_Event_View::add_event_datetimes_and_tickets_to_WP_Query( $wp_query, $datetimes );
//			}					
//		}
//		return $wp_query;
//	}	



}
// End of file EEH_Event_View.helper.php
// Location: /helpers/EEH_Event_View.helper.php