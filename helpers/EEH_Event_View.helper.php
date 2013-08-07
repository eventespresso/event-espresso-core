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
	 * the_event_date
	 *
	 * @returns the primary date for an event
	 * @uses $wp_query
	 *
	 * @return bool
	 */
	if ( ! function_exists( 'espresso_event_date' )) {
		function espresso_event_date() {
			EEH_Event_View::the_event_date();
		}		
	}



	/**
	 * the_event_date
	 *
	 * @returns a link to edit an event
	 * @uses $wp_query
	 *
	 * @return bool
	 */
	if ( ! function_exists( 'espresso_edit_event_link' )) {
		function espresso_edit_event_link() {
			EEH_Event_View::edit_event_link();
		}		
	}



	/**
	 * espresso_event_desc
	 *
	 * @returns the primary date for an event
	 * @uses $wp_query
	 *
	 * @return bool
	 */
//	if ( ! function_exists( 'espresso_event_desc' )) {
//		function espresso_event_desc() {
//			EEH_Event_View::event_desc();
//		}		
//	}




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
	public static function the_event_date() {
		global $post;
		if ( isset( $post->datetimes ) && is_array( $post->datetimes ) && ! empty( $post->datetimes )) {
			$datetime = array_shift( array_values( $post->datetimes ));
			$datetime->e_start_date_and_time();		
		}
	}




	/**
	 * 	edit_event_link
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function edit_event_link( $link = '', $before = '<p class="edit-event-lnk small-txt clear">', $after = '</p>', $EVT_ID = FALSE ) {
		global $post;
		// get EVT_ID either from passed value or global $post var
		$EVT_ID = $EVT_ID ? $EVT_ID : $post->ID;
		// can the user edit this post ?
		if ( current_user_can( 'edit_post', $EVT_ID )) {
			// set link text
			$link = ! empty( $link ) ? $link : __('edit this event');
			// generate nonce
			$nonce = wp_create_nonce( 'edit_nonce' );
			// generate url to event editor for this event
			$url = add_query_arg( array( 'page' => 'espresso_events', 'action' => 'edit', 'id' => $EVT_ID, 'edit_nonce' => $nonce ), admin_url() );
			// get edit CPT text
			$post_type_obj = get_post_type_object( $post->post_type );
			// build final link html
			$link = '<a class="post-edit-link" href="' . $url . '" title="' . esc_attr( $post_type_obj->labels->edit_item ) . '">' . $link . '</a>';
			// put it all together 
			echo $before . apply_filters( 'edit_post_link', $link, $EVT_ID ) . $after;			
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
	public static function extract_event_IDs_from_WP_Query( WP_Query $wp_query = NULL ) {
		// array for storing Event IDs
		$EVT_IDs = array();
		// loop thru posts
		if ( isset( $wp_query->posts )) {
			foreach( $wp_query->posts as $event ) {
				if ( $event->post_type == 'espresso_events' ) {
					$EVT_IDs[] = $event->ID;
				}
			}
		}
		return $EVT_IDs;
	}	



	/**
	 * 	get_datetimes_for_events
	 * 	given an array of event IDs, this method will retrieve all datetimes associated with those events
	 *
	 *  @access 	public
	 *  @param 	array	$EVT_IDs an array of Event IDs
	 *  @return 	string
	 */
	public static function get_datetimes_for_events( $EVT_IDs = array() ) {
		if ( ! is_array( $EVT_IDs )) {
			$EVT_IDs = array( absint( $EVT_IDs ));
		}
		// load model
		$EVD = EE_Registry::instance()->load_model( 'Event_Datetime' );
		// grab datetimes for events
		$event_datetimes = $EVD->get_all( array( array( 'EVT_ID' => array( 'IN', $EVT_IDs )), 'force_join' => array( 'Datetime' )));
		$event_datetimes = is_array( $event_datetimes ) ? $event_datetimes : array();
//		printr( $event_datetimes, '$event_datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $event_datetimes;
	}	



	/**
	 * 	get_prices_for_events
	 * 	given an array of event IDs, this method will retrieve all prices associated with those events
	 *
	 *  @access 	public
	 *  @param 	array	$EVT_IDs an array of Event IDs
	 *  @return 	string
	 */
	public static function get_prices_for_events( $EVT_IDs = array() ) {
		if ( ! is_array( $EVT_IDs )) {
			$EVT_IDs = array( absint( $EVT_IDs ));
		}
		// load model
//		$EVP = EE_Registry::instance()->load_model( 'Event_Price' );
		// grab prices
//		$event_prices = $EVP->get_all( array( array( 'Event_Price.EVT_ID' => array( 'IN', $EVT_IDs ))));
		$event_prices = isset( $prices ) && is_array( $prices ) ? $prices : array();
//		printr( $event_prices, '$event_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $event_prices;
	}	



	/**
	 * 	add_event_datetimes_and_prices_to_WP_Query
	 *	efficiently adds event datetimes and event prices to WP_Query event CPT posts 
	 *
	 *  @access 	public
	 *  @param 	WP_Query	$wp_query
	 *  @param 	array		$event_datetimes
	 *  @param 	array		$event_prices
	 *  @return 	string
	 */
	public static function add_event_datetimes_and_prices_to_WP_Query( WP_Query $wp_query = NULL, $event_datetimes = array(), $event_prices = array() ) {
		$event_datetimes = is_array( $event_datetimes ) ? $event_datetimes : array();
		$event_prices = is_array( $event_prices ) ? $event_prices : array();
		// now loop thru posts
		foreach( $wp_query->posts as $EVT_ID => $event ) {
			$wp_query->posts[ $EVT_ID ]->datetimes = array();
			$wp_query->posts[ $EVT_ID ]->prices = array();
			foreach ( $event_datetimes as $event_datetime ) {
				if ( $event->ID == $event_datetime->get( 'EVT_ID' )) {
					$wp_query->posts[ $EVT_ID ]->datetimes[] = $event_datetime->get_first_related( 'Datetime' );
				}
			}
			foreach ( $event_prices as $event_price ) {
				if ( $event->ID == $event_price->get( 'EVT_ID' )) {
					$wp_query->posts[ $EVT_ID ]->prices[] = $event_price;
				}
			}
		}
		return $wp_query;
	}	


	/**
	 * 	get_event_datetimes_and_prices_for_WP_Query
	 *	given WP_Query object, will add datetimes and prices to any event CPTs in the posts array
	 *
	 *  @access 	public
	 *  @param 	WP_Query	$wp_query
	 *  @return 	string
	 */
	public static function get_event_datetimes_and_prices_for_WP_Query( WP_Query $wp_query = NULL ) {
		if ( $wp_query ) {
			// array of Event IDs
			$EVT_IDs = EEH_Event_View::extract_event_IDs_from_WP_Query( $wp_query );
			if ( ! empty( $EVT_IDs )) {
				// get datetimes
				$event_datetimes = EEH_Event_View::get_datetimes_for_events( $EVT_IDs );
				// get prices
				$event_prices = EEH_Event_View::get_prices_for_events( $EVT_IDs );	
				// now put it all together
				$wp_query = EEH_Event_View::add_event_datetimes_and_prices_to_WP_Query( $wp_query, $event_datetimes, $event_prices );
			}					
		}
		return $wp_query;
	}	



}
// End of file EEH_Event_View.helper.php
// Location: /helpers/EEH_Event_View.helper.php