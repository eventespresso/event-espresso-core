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
	 * @access    private
	 * @var EE_Venue
	 */
	private static $_venue = NULL;



	/**
	 *    get_venue
	 *    attempts to retrieve an EE_Venue object any way it can
	 *
	 * @access    public
	 * @param int  $VNU_ID
	 * @param bool $look_in_event
	 * @param bool $privacy_check   Defaults to true.
	 *                              When false, means even if the venue is private we return it regardless of access.
	 * @param bool $password_check
	 * @return \EE_Venue|null
	 */
	public static function get_venue( $VNU_ID = 0, $look_in_event = TRUE, $privacy_check = true, $password_check = true ) {
		$VNU_ID = absint( $VNU_ID );
		// do we already have the Venue you are looking for?
		if ( EEH_Venue_View::$_venue instanceof EE_Venue && EEH_Venue_View::$_venue->ID() == $VNU_ID ) {
			return EEH_Venue_View::_get_venue( $privacy_check );
		}
		// international newspaper?
		global $post;
		if ( $post instanceof WP_Post ) {
			switch ( $post->post_type ) {
				// if this is being called from an EE_Venue post,
				// and the EE_Venue post corresponds to the EE_Venue that is being asked for,
				// then we can try to just grab the attached EE_Venue object
				case 'espresso_venues':
					// the post already contains the related EE_Venue object AND one of the following is TRUE:
					// the requested Venue ID matches the post ID OR...
					// there was no specific Venue ID requested
					if ( isset( $post->EE_Venue ) && ( $VNU_ID == $post->ID || ! $VNU_ID )) {
						// use existing related EE_Venue object
						EEH_Venue_View::$_venue =  $post->EE_Venue;
					} else if ( $VNU_ID ) {
						// there WAS a specific Venue ID requested, but it's NOT the current post object
						EEH_Venue_View::$_venue = EEM_Venue::instance()->get_one_by_ID( $VNU_ID );
					} else {
						// no specific Venue ID requested, so use post ID to generate EE_Venue object
						EEH_Venue_View::$_venue = EEM_Venue::instance()->get_one_by_ID( $post->ID );
					}
				break;

				case 'espresso_events':
					if ( $look_in_event ) {
						// grab the events related venues
						$venues = EEH_Venue_View::get_event_venues();
						// make sure the result is an array
						$venues = is_array( $venues ) ? $venues : array();
						// do we have an ID for a specific venue?
						if ( $VNU_ID ) {
							// loop thru the related venues
							foreach( $venues as $venue ) {
								if ( $venue instanceof EE_Venue ) {
									// until we find the venue we're looking for
									if ( $venue->ID() == $VNU_ID ) {
										EEH_Venue_View::$_venue = $venue;
										break;
									}
								}
								// if the venue being asked for is not related to the global event post,
								// still return the venue being asked for
							}
							// no venue ID ?
							// then the global post is an events post and this function was called with no argument
						} else {
							// just grab the first related event venue
							EEH_Venue_View::$_venue = reset( $venues );
						}
					}
				break;

			}
		}
		// now if we STILL do NOT have an EE_Venue model object, BUT we have a Venue ID...
		if ( ! EEH_Venue_View::$_venue instanceof EE_Venue && $VNU_ID ) {
			// sigh... pull it from the db
			EEH_Venue_View::$_venue = EEM_Venue::instance()->get_one_by_ID( $VNU_ID );
		}
		return EEH_Venue_View::_get_venue( $privacy_check, $password_check );
	}



	/**
	 * return a single venue
	 *
	 * @param bool $privacy_check   Defaults to true.
	 *                              When false, means even if the venue is private we return it regardless of access.
	 * @param bool $password_check
	 * @return 	EE_Venue
	 */
	protected static function _get_venue( $privacy_check = true, $password_check = true ) {
		// check for private venues.
		if (
			EEH_Venue_View::$_venue instanceof EE_Venue
			&& EEH_Venue_View::$_venue->status() == 'private'
			&& $privacy_check
			&& ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_private_venues', 'get_venues' )
		) {
			return null;
		}
		// check for password protected venues
		if (
			EEH_Venue_View::$_venue instanceof EE_Venue
			&& $password_check
			&& post_password_required( EEH_Venue_View::$_venue->ID() )
		) {
			return null;
		}
		return EEH_Venue_View::$_venue instanceof EE_Venue ? EEH_Venue_View::$_venue : null;
	}



	/**
	 * 	get_event_venues
	 *
	 *  @access 	public
	 *  @return 	EE_Venue[]
	 */
	public static function get_event_venues() {
		global $post;
		if ( $post->post_type == 'espresso_events' ) {
			if ( isset( $post->EE_Event ) && $post->EE_Event instanceof EE_Event ) {
				return $post->EE_Event->venues();
			}
		}
		return array();
	}




	/**
	 * Simply checks whether a venue for the given ID (or the internally derived venue is private).
	 *
	 * Note: This will return true if its private, null if the venue doesn't exist, and false, if the venue exists but is not
	 * 	  private.  So it is important to do explicit boolean checks when using this conditional.
	 *
	 * @param bool $VNU_ID venue to check (optional). If not included will use internally derived venue object.
	 *
	 * @return bool|null
	 */
	public static function is_venue_private( $VNU_ID = false ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID, true, true );
		if ( ! $venue instanceof EE_Venue ) {
			return null;
		}

		return $venue->status() == 'private' ? true : false;
	}




	/**
	 * returns true or false if a venue is password protected or not
	 * @param bool $VNU_ID venue to check (optional). If not included will use internally derived venue object.
	 * @return bool
	 */
	public static function is_venue_password_protected( $VNU_ID = false ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID, true, true, false );
		if (
			$venue instanceof EE_Venue
			&& post_password_required( $venue->ID() )
		) {
			return true;
		}
		return false;
	}



	/**
	 * If a venue is password protected, this will return the password form for gaining access
	 * returns an empty string otherwise

	 * @param bool $VNU_ID venue to check (optional). If not included will use internally derived venue object.
	 *
	 * @return string
	 */
	public static function password_protected_venue_form( $VNU_ID = false ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID, true, true, false );
		if (
			$venue instanceof EE_Venue
			&& post_password_required( $venue->ID() )
		) {
			return get_the_password_form( $venue->ID() );
		}
		return '';
	}



	/**
	 *    venue_description
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @return string
	 */
	public static function venue_description( $VNU_ID = 0 ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			return$venue->description();
		}
		return '';
	}



	/**
	 *    venue_excerpt
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @return string
	 */
	public static function venue_excerpt( $VNU_ID = 0 ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			$excerpt = $venue->excerpt() != NULL && $venue->excerpt() ? $venue->excerpt() : $venue->description();
			$venue_link = ' ' . EEH_Venue_View::venue_details_link( $venue->ID(), __( 'more', 'event_espresso' ) . '&hellip;' );
			return ! empty( $excerpt ) ? wp_trim_words( $excerpt, 25, '' ) . $venue_link : '';
		}
		return '';
	}



	/**
	 *    venue_categories
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @param bool $hide_uncategorized
	 * @return string
	 */
	public static function venue_categories( $VNU_ID = 0, $hide_uncategorized = TRUE ) {
		$category_links = array();
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			// get category terms
			if ( $venue_categories = get_the_terms( $venue->ID(), 'espresso_venue_categories' )) {
				// loop thru terms and create links
				foreach ( $venue_categories as $term ) {
					$url = get_term_link( $term, 'espresso_venue_categories' );
					if ( ! is_wp_error( $url ) && (( $hide_uncategorized && strtolower( $term->name ) != __( 'uncategorized', 'event_espresso' )) || ! $hide_uncategorized )) {
						$category_links[] = '<a href="' . esc_url( $url ) . '" rel="tag">' . $term->name . '</a> ';
					}
				}
			}
		}
		return implode( ', ', $category_links );
	}



	/**
	 *    venue_address
	 *
	 * @access    public
	 * @param string $type
	 * @param int $VNU_ID
	 * @param bool $use_schema
	 * @param bool $add_wrapper
	 * @return string
	 */
	public static function venue_address( $type = 'multiline', $VNU_ID = 0, $use_schema = true, $add_wrapper = true ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			return EEH_Address::format( $venue, $type, $use_schema, $add_wrapper );
		}
		return '';
	}



	/**
	 *    venue_has_address
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @return bool|string
	 */
	public static function venue_has_address( $VNU_ID = 0 ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			return EEH_Address::format( $venue, 'inline', FALSE, FALSE );
		}
		return false;
	}



	/**
	 *    venue_name
	 *
	 * @access    public
	 * @param    string $link_to - options( details, website, none ) whether to turn Venue name into a clickable link to the Venue's details page or website
	 * @param int $VNU_ID
	 * @return string
	 */
	public static function venue_name( $link_to = 'details', $VNU_ID = 0 ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			$venue_name = apply_filters(
				'FHEE__EEH_Venue__venue_name__append_private_venue_name',
				EEH_Venue_View::is_venue_private()
					? EEH_Venue_View::$_venue->name() . "&nbsp;" . __( '(Private)', 'event_espresso' )
					: EEH_Venue_View::$_venue->name(),
				EEH_Venue_View::$_venue
			);
			$venue_name = EEH_Schema::name( $venue_name );

			//if venue is trashed then ignore the "link to" setting because the venue is trashed.
			if ( $venue->get('status') == 'trash' ) {
				$link_to = '';
			}
			switch( $link_to ) {

				case 'details' :
					return EEH_Venue_View::venue_details_link( $venue->ID(), $venue_name );
				break;

				case 'website' :
					return EEH_Venue_View::venue_website_link( $venue->ID(), $venue_name );
				break;

				default :
					return $venue_name;
			}
		}
		return '';
	}



	/**
	 *    venue_details_link
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @param    string $text
	 * @return string
	 */
	public static function venue_details_link( $VNU_ID = 0, $text = '' ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			return EEH_Schema::url( get_permalink( $venue->ID() ), $text );
		}
		return '';
	}



	/**
	 *    venue_website_link
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @param    string $text
	 * @return string
	 */
	public static function venue_website_link( $VNU_ID = 0, $text = '' ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			$url = $venue->venue_url();
			$text = ! empty( $text ) ? $text : $url;
			return ! empty( $url ) ? EEH_Schema::url( $url, $text ) : '';
		}
		return '';
	}



	/**
	 *    venue_phone
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @return string
	 */
	public static function venue_phone( $VNU_ID = 0) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			return EEH_Schema::telephone( $venue->phone() );
		}
		return '';
	}



	/**
	 *    venue_gmap
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @param bool|string $map_ID a unique identifier for this map
	 * @param    array $gmap map options
	 * @return string
	 */
	public static function venue_gmap( $VNU_ID = 0, $map_ID = FALSE, $gmap = array() ) {

		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			// check for global espresso_events post and use it's ID if no map_ID is set
			global $post;
			$map_ID = empty( $map_ID ) && $post->post_type == 'espresso_events' ? $post->ID : $map_ID;
			// grab map settings
			$map_cfg = EE_Registry::instance()->CFG->map_settings;
			// are maps enabled ?
			if ( $map_cfg->use_google_maps && $venue->enable_for_gmap() ) {

				$details_page = is_single();
				$options = array();
				$options['map_ID'] = $map_ID && $map_ID != $venue->ID() ? $map_ID . '-' . $venue->ID()/* . '-' . $static_map_id*/ : $venue->ID()/* . '-' . $static_map_id*/;

				$options['location'] = EEH_Address::format( $venue, 'inline', FALSE, FALSE );

				$options['ee_map_width'] = $details_page ? $map_cfg->event_details_map_width : $map_cfg->event_list_map_width;
				$options['ee_map_width'] = isset( $gmap['ee_map_width'] ) && ! empty( $gmap['ee_map_width'] ) ? $gmap['ee_map_width'] : $options['ee_map_width'];

				$options['ee_map_height'] = $details_page ? $map_cfg->event_details_map_height : $map_cfg->event_list_map_height;
				$options['ee_map_height'] = isset( $gmap['ee_map_height'] ) && ! empty( $gmap['ee_map_height'] ) ? $gmap['ee_map_height'] : $options['ee_map_height'];

				$options['ee_map_zoom'] = $details_page ? $map_cfg->event_details_map_zoom : $map_cfg->event_list_map_zoom;
				$options['ee_map_zoom'] = isset( $gmap['ee_map_zoom'] ) && ! empty( $gmap['ee_map_zoom'] ) ? $gmap['ee_map_zoom'] : $options['ee_map_zoom'];

				$options['ee_map_nav_display'] = $details_page ? $map_cfg->event_details_display_nav : $map_cfg->event_list_display_nav;
				$options['ee_map_nav_display'] = isset( $gmap['ee_map_nav_display'] ) && ! empty( $gmap['ee_map_nav_display'] ) ? 'true' : $options['ee_map_nav_display'];;

				$options['ee_map_nav_size'] = $details_page ? $map_cfg->event_details_nav_size : $map_cfg->event_list_nav_size;
				$options['ee_map_nav_size'] =  isset( $gmap['ee_map_nav_size'] ) && ! empty( $gmap['ee_map_nav_size'] )? $gmap['ee_map_nav_size'] : $options['ee_map_nav_size'];

				$options['ee_map_type_control'] = $details_page ? $map_cfg->event_details_control_type : $map_cfg->event_list_control_type;
				$options['ee_map_type_control'] =  isset( $gmap['ee_map_type_control'] ) && ! empty( $gmap['ee_map_type_control'] )? $gmap['ee_map_type_control'] : $options['ee_map_type_control'];

				$options['ee_map_align'] = $details_page ? $map_cfg->event_details_map_align : $map_cfg->event_list_map_align;
				$options['ee_map_align'] =  isset( $gmap['ee_map_align'] ) && ! empty( $gmap['ee_map_align'] )? $gmap['ee_map_align'] : $options['ee_map_align'];

				$options['ee_static_url'] =  isset( $gmap['ee_static_url'] ) && ! empty( $gmap['ee_static_url'] ) ? (bool)absint( $gmap['ee_static_url'] ) : $venue->google_map_link();

				return EEH_Maps::google_map( $options );

			}
		}

		return '';

	}

	/**
	 * Gets the HTML to display a static map of the venue
	 * @param EE_Venue $venue
	 * @param array $atts like EEH_Maps::google_map_link
	 * @return string
	 */
	public static function espresso_google_static_map( EE_Venue $venue, $atts = array() ){
		$state = $venue->state_obj();
		$country = $venue->country_obj();
		$atts = shortcode_atts(
				array(
					'id' => $venue->ID(),
					'address' => $venue->get('VNU_address'),
					'city' => $venue->get('VNU_city'),
					'state' => $state instanceof EE_State ? $state->name() : '',
					'zip' => $venue->get('VNU_zip'),
					'country' => $country instanceof EE_Country ? $country->name() : '',
					'type' => 'map',
					'map_w' => 200,
					'map_h' => 200
					),
			$atts);
		return EEH_Maps::google_map_link($atts);
	}



	/**
	 *    edit_venue_link
	 *
	 * @access    public
	 * @param int $VNU_ID
	 * @param string $link
	 * @param string $before
	 * @param string $after
	 * @return string
	 */
	public static function edit_venue_link( $VNU_ID = 0, $link = '', $before = '<p class="edit-venue-lnk small-txt">', $after = '</p>' ) {
		$venue = EEH_Venue_View::get_venue( $VNU_ID );
		if ( $venue instanceof EE_Venue ) {
			// can the user edit this post ?
			if ( current_user_can( 'edit_post', $venue->ID() )) {
				// set link text
				$link = ! empty( $link ) ? $link : __('edit this venue');
				// generate nonce
				$nonce = wp_create_nonce( 'edit_nonce' );
				// generate url to venue editor for this venue
				$url = add_query_arg( array( 'page' => 'espresso_venues', 'action' => 'edit', 'post' => $venue->ID(), 'edit_nonce' => $nonce ), admin_url( 'admin.php' ) );
				// get edit CPT text
				$post_type_obj = get_post_type_object( 'espresso_venues' );
				// build final link html
				$link = '<a class="post-edit-link" href="' . $url . '" title="' . esc_attr( $post_type_obj->labels->edit_item ) . '">' . $link . '</a>';
				// put it all together
				return $before . apply_filters( 'edit_post_link', $link, $venue->ID() ) . $after;
			}
		}
		return '';
	}






}
// End of file EEH_Venue_View.helper.php
// Location: /helpers/EEH_Venue_View.helper.php
