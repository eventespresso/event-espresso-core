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
	 * espresso_event_categories
	 * returns the terms associated with an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_categories' )) {
		function espresso_event_categories() {
			global $post;
			the_terms( $post->ID, 'espresso_event_categories' );
		}		
	}


	/**
	 * espresso_event_date
	* returns the primary date for an event
	* 
	 * @return object
	 */
	if ( ! function_exists( 'espresso_event_date_obj' )) {
		function espresso_event_date_obj() {
			return EEH_Event_View::get_primary_date_obj();
		}		
	}


	/**
	 * espresso_event_date 
	* returns the primary date for an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_date' )) {
		function espresso_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a' ) {
			echo EEH_Event_View::the_event_date( $dt_frmt, $tm_frmt );
		}		
	}


	/**
	 * espresso_list_of_event_dates
	* returns the primary date for an event
	* 
	 * @return string
	 */
	if ( ! function_exists( 'espresso_list_of_event_dates' )) {
		function espresso_list_of_event_dates( $dt_frmt = 'l F jS, Y', $tm_frmt = '@ g:i a' ) {
			$datetimes = EEH_Event_View::get_all_date_obj( $dt_frmt, $tm_frmt );
			//d( $datetimes );
			if ( is_array( $datetimes ) && ! empty( $datetimes )) {
				global $post;
				echo '<ul id="ee-event-datetimes-ul-' . $post->ID . '" class="ee-event-datetimes-ul">';
				foreach ( $datetimes as $datetime ) {
					echo '<li id="ee-event-datetimes-li-' . $datetime->ID() . '" class="ee-event-datetimes-li">';	
					echo $datetime->start_date_and_time( $dt_frmt, $tm_frmt );	
					echo '</li>';	
				}
				echo '</ul>';
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
		function espresso_event_end_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a' ) {
			echo EEH_Event_View::the_event_end_date( $dt_frmt, $tm_frmt );
		}		
	}

	/**
	 * espresso_event_date_range
	* returns the first and last dates for an event (if different)
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_date_range' )) {
		function espresso_event_date_range( $dt_frmt = 'M jS', $tm_frmt = ' ', $single_dt_frmt = 'D M jS @ ', $single_tm_frmt = ' g:i a' ) {
			$the_event_date = EEH_Event_View::the_event_date( $dt_frmt, $tm_frmt );
			$the_event_end_date = EEH_Event_View::the_event_end_date( $dt_frmt, $tm_frmt );
			if ( $the_event_date != $the_event_end_date ) {
				echo $the_event_date . __( ' - ', 'event_espresso' ) . EEH_Event_View::the_event_end_date( $dt_frmt . ', Y', $tm_frmt );
			} else {
				echo EEH_Event_View::the_event_date( $single_dt_frmt, $single_tm_frmt );
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
		function espresso_event_date_as_calendar_page() {
			EEH_Event_View::event_date_as_calendar_page();
		}		
	}




	/**
	 * espresso_event_phone	 
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_event_phone' )) {
		function espresso_event_phone() {
			EEH_Event_View::event_phone();
		}		
	}



	/**
	 * espresso_edit_event_link	 
	 * returns a link to edit an event
	 *
	 * @return string
	 */
	if ( ! function_exists( 'espresso_edit_event_link' )) {
		function espresso_edit_event_link() {
			EEH_Event_View::edit_event_link();
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




	/**
	 * 	the_event_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function the_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a' ) {
		$datetime = EEH_Event_View::get_primary_date_obj();
		return $datetime->start_date_and_time( $dt_frmt, $tm_frmt );			
	}



	/**
	 * 	the_event_end_date
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function the_event_end_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a' ) {
		$datetime = EEH_Event_View::get_last_date_obj();
		return $datetime->end_date_and_time( $dt_frmt, $tm_frmt );
	}



	/**
	 * 	event_date_as_calendar_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function event_date_as_calendar_page() {
		$datetime = EEH_Event_View::get_primary_date_obj();
	?>
		<div class="event-date-calendar-page-dv">
			<div class="event-date-calendar-page-month-dv"><?php echo $datetime->start_date('M');?></div>
			<div class="event-date-calendar-page-day-dv"><?php echo $datetime->start_date('d');?></div>
		</div>
	<?php	
	}




	/**
	 * 	get_primary_date_obj
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_primary_date_obj() {
		global $post;
//		d( $post );
		if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
			$datetimes = $post->EE_Event->get_many_related('Datetime');
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
	public static function get_last_date_obj() {
		global $post;
		if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
			$datetimes = $post->EE_Event->get_many_related('Datetime');
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
	public static function get_all_date_obj() {
		global $post;
		if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
			return $post->EE_Event->get_many_related('Datetime');
		} else {
			 return FALSE;
		}
	}




	/**
	 * 	event_phone
	 *
	 *  @access 	public
	 *  @param	string $text 
	 *  @return 	string
	 */
	public static function event_phone() {
		global $post;
		if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
			EE_Registry::instance()->load_helper( 'Formatter' );
			return EEH_Schema::telephone( $post->EE_Event->phone() );
		}
		return NULL;
	}



	/**
	 * 	edit_event_link
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function edit_event_link( $link = '', $before = '<p class="edit-event-lnk small-txt">', $after = '</p>', $EVT_ID = FALSE ) {
		global $post;
		if ( $post->post_type == 'espresso_events' ) {
			// get EVT_ID either from passed value or global $post var
			$EVT_ID = $EVT_ID ? $EVT_ID : $post->ID;
			// can the user edit this post ?
			if ( current_user_can( 'edit_post', $EVT_ID )) {
				// set link text
				$link = ! empty( $link ) ? $link : __('edit this event');
				// generate nonce
				$nonce = wp_create_nonce( 'edit_nonce' );
				// generate url to event editor for this event
				$url = add_query_arg( array( 'page' => 'espresso_events', 'action' => 'edit', 'post' => $EVT_ID, 'edit_nonce' => $nonce ), admin_url() );
				// get edit CPT text
				$post_type_obj = get_post_type_object( $post->post_type );
				// build final link html
				$link = '<a class="post-edit-link" href="' . $url . '" title="' . esc_attr( $post_type_obj->labels->edit_item ) . '">' . $link . '</a>';
				// put it all together 
				echo $before . apply_filters( 'edit_post_link', $link, $EVT_ID ) . $after;			
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