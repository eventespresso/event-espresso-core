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
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 */




	/**
	 * espresso_event_venues
	 *
	 * @returns all venues related to an event
	 * @uses $wp_query
	 *
	 * @return bool
	 */
	if ( ! function_exists( 'espresso_event_venues' )) {
		function espresso_event_venues() {
			EEH_Venue_View::get_event_venues();
		}		
	}



	/**
	 * espresso_edit_venue_link
	 *
	 * @returns a link to edit a venue
	 * @uses $wp_query
	 *
	 * @return bool
	 */
	if ( ! function_exists( 'espresso_edit_venue_link' )) {
		function espresso_edit_venue_link( $VNU_ID = FALSE ) {
			EEH_Venue_View::edit_venue_link( $VNU_ID );
		}		
	}






/**
 * ------------------------------------------------------------------------
 *
 * EEH_Venue_View Helper
 *
 * @package		Event Espresso
 * @subpackage	/core/
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_Venue_View extends EEH_Base {





	/**
	 * 	edit_event_link
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_event_venues() {
		global $post;
		if ( $post->post_type == 'espresso_events' ) {
			if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
				return $post->EE_Event->venues();
			}
		}
	}





	/**
	 * 	edit_venue_link
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function edit_venue_link( $VNU_ID = FALSE, $link = '', $before = '<p class="edit-venue-lnk small-txt">', $after = '</p>' ) {
		if ( $VNU_ID ) {
			// can the user edit this post ?
			if ( current_user_can( 'edit_post', $VNU_ID )) {
				// set link text
				$link = ! empty( $link ) ? $link : __('edit this venue');
				// generate nonce
				$nonce = wp_create_nonce( 'edit_nonce' );
				// generate url to venue editor for this venue
				$url = add_query_arg( array( 'page' => 'espresso_venues', 'action' => 'edit', 'post' => $VNU_ID, 'edit_nonce' => $nonce ), admin_url() );
				// get edit CPT text
				$post_type_obj = get_post_type_object( $post->post_type );
				// build final link html
				$link = '<a class="post-edit-link" href="' . $url . '" title="' . esc_attr( $post_type_obj->labels->edit_item ) . '">' . $link . '</a>';
				// put it all together 
				echo $before . apply_filters( 'edit_post_link', $link, $VNU_ID ) . $after;			
			}
		}
	}






}
// End of file EEH_Venue_View.helper.php
// Location: /helpers/EEH_Venue_View.helper.php