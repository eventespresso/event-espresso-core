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
	 * @var EE_Event $_event
	 */
	private static $_event = NULL;



	/**
	 *    get_event
	 *    attempts to retrieve an EE_Event object any way it can
	 *
	 * @access    public
	 * @param    int $EVT_ID
	 * @return    object
	 */
	public static function get_event( $EVT_ID = 0 ) {
		$EVT_ID = $EVT_ID instanceof WP_Post ? $EVT_ID->ID : absint( $EVT_ID );
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
			if ( isset( $post->EE_Event ) && ( $EVT_ID == 0 || ( $EVT_ID == $post->ID ))) {
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
	 *    display_ticket_selector
	 *
	 * @access    public
	 * @param    int $EVT_ID
	 * @return    boolean
	 */
	public static function display_ticket_selector( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->display_ticket_selector() : FALSE;
	}



	/**
	 *    event_status
	 *
	 * @access    public
	 * @param    int $EVT_ID
	 * @return    string
	 */
	public static function event_status( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->pretty_active_status( FALSE ) : '';
	}



	/**
	 * 	event_active_status
	 *
	 *  @access 	public
	 * @param    int $EVT_ID
	 *  @return 	string
	 */
	public static function event_active_status( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		return $event instanceof EE_Event ? $event->pretty_active_status() : 'inactive';
	}



	/**
	 * 	event_has_content_or_excerpt
	 *
	 *  @access 	public
	 * @param    int $EVT_ID
	 *  @return 	string
	 */
	public static function event_has_content_or_excerpt( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		$has_content_or_excerpt = FALSE;
		if ( $event instanceof EE_Event ) {
			$has_content_or_excerpt = $event->description() != '' || $event->short_description( NULL, NULL, TRUE ) != '' ? TRUE : FALSE;
		}
		if ( is_archive() && ! ( espresso_display_full_description_in_event_list() || espresso_display_excerpt_in_event_list() )) {
			$has_content_or_excerpt = FALSE;
		}
		return $has_content_or_excerpt;
	}



	/**
	 *    event_active_status
	 *
	 * @access    public
	 * @param null $num_words
	 * @param null $more
	 * @return    string
	 */
	public static function event_content_or_excerpt( $num_words = NULL, $more = NULL ) {
		global $post;

		ob_start();
		if (( is_single() ) || ( is_archive() && espresso_display_full_description_in_event_list() )) {
			// admin has chosen "full description" for the "Event Espresso - Events > Templates > Display Description" option
			the_content();
		} else if (( is_archive() && has_excerpt( $post->ID ) && espresso_display_excerpt_in_event_list() ) ) {
            // admin has chosen "excerpt (short desc)" for the "Event Espresso - Events > Templates > Display Description" option
			// AND an excerpt actually exists
			the_excerpt();
		} else if (( is_archive() && ! has_excerpt( $post->ID ) && espresso_display_excerpt_in_event_list() )) {
            // admin has chosen "excerpt (short desc)" for the "Event Espresso - Events > Templates > Display Description" option
			// but NO excerpt actually exists, so we need to create one
			if ( ! empty( $num_words )) {
				if ( empty( $more )) {
					$more_link_text = __( '(more&hellip;)' );
					$more = ' <a href="' . get_permalink() . '"';
					$more .= ' class="more-link"';
					$more .= \EED_Events_Archive::link_target();
					$more .= '>' . $more_link_text . '</a>';
                    $more = apply_filters( 'the_content_more_link', $more, $more_link_text );
				}
				$content = str_replace( 'NOMORELINK', '', get_the_content( 'NOMORELINK' ));

				$content =  wp_trim_words( $content, $num_words, ' ' ) . $more;
            } else {
                $content =  get_the_content();
			}
			global $allowedtags;
			// make sure links are allowed
            $allowedtags['a'] = isset($allowedtags['a'])
                ? $allowedtags['a']
                : array();
            // as well as target attribute
            $allowedtags['a']['target'] = isset($allowedtags['a']['target'])
                ? $allowedtags['a']['target']
                : false;
            // but get previous value so we can reset it
            $prev_value = $allowedtags['a']['target'];
            $allowedtags['a']['target'] = true;
			$content = wp_kses( $content, $allowedtags );
			$content = strip_shortcodes( $content );
			echo apply_filters( 'the_content', $content );
			$allowedtags['a']['target'] = $prev_value;
        } else {
            // admin has chosen "none" for the "Event Espresso - Events > Templates > Display Description" option
			echo apply_filters( 'the_content', '' );
		}
		return ob_get_clean();
	}



	/**
	 * 	event_tickets_available
	 *
	 *  @access 	public
	 * @param    int $EVT_ID
	 *  @return 	EE_Ticket[]
	 */
	public static function event_tickets_available( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		$tickets_available_for_purchase = array();
		if( $event instanceof EE_Event ) {
			$datetimes = EEH_Event_View::get_all_date_obj( $EVT_ID, FALSE );
			foreach( $datetimes as $datetime ) {
				$tickets_available_for_purchase = array_merge( $tickets_available_for_purchase, $datetime->ticket_types_available_for_purchase() );
			}
		}
		return $tickets_available_for_purchase;
	}



	/**
	 *    the_event_date
	 *
	 * @access    public
	 * @param    int $EVT_ID
	 * @param 	  bool   $hide_uncategorized
	 * @return    string
	 */
	public static function event_categories( $EVT_ID = 0, $hide_uncategorized = TRUE ) {
		$category_links = array();
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$event_categories = get_the_terms( $event->ID(), 'espresso_event_categories' );
			if ( $event_categories ) {
				// loop thru terms and create links
				foreach ( $event_categories as $term ) {
					$url = get_term_link( $term, 'espresso_venue_categories' );
					if ( ! is_wp_error( $url ) && (( $hide_uncategorized && strtolower( $term->name ) != __( 'uncategorized', 'event_espresso' )) || ! $hide_uncategorized )) {
						$category_links[] = '<a href="' . esc_url( $url )
                                            . '" rel="tag"'
                                            . \EED_Events_Archive::link_target()
                                            .'>'
                                            . $term->name
                                            . '</a>';
					}
				}
			}
		}
		return implode( ', ', $category_links );
	}



	/**
	 *    the_event_date - first date by date order
	 *
	 * @access    public
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param int    $EVT_ID
	 * @return    string
	 */
	public static function the_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = 0 ) {
		$datetime = EEH_Event_View::get_primary_date_obj( $EVT_ID );
		$format = ! empty( $dt_frmt ) && ! empty( $tm_frmt ) ? $dt_frmt . ' ' . $tm_frmt : $dt_frmt . $tm_frmt;
		return $datetime instanceof EE_Datetime ? $datetime->get_i18n_datetime( 'DTT_EVT_start', $format ) :  '';
	}



	/**
	 *    the_event_end_date - last date by date order
	 *
	 * @access    public
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param int    $EVT_ID
	 * @return    string
	 */
	public static function the_event_end_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = 0 ) {
		$datetime = EEH_Event_View::get_last_date_obj( $EVT_ID );
		$format = ! empty( $dt_frmt ) && ! empty( $tm_frmt ) ? $dt_frmt . ' ' . $tm_frmt : $dt_frmt . $tm_frmt;
		return $datetime instanceof EE_Datetime ? $datetime->get_i18n_datetime( 'DTT_EVT_end', $format ) : '';
	}



	/**
	 *    the_earliest_event_date - first date chronologically
	 *
	 * @access    public
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param int    $EVT_ID
	 * @return    string
	 */
	public static function the_earliest_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = 0 ) {
		$datetime = EEH_Event_View::get_earliest_date_obj( $EVT_ID );
		$format = ! empty( $dt_frmt ) && ! empty( $tm_frmt ) ? $dt_frmt . ' ' . $tm_frmt : $dt_frmt . $tm_frmt;
		return $datetime instanceof EE_Datetime ?  $datetime->get_i18n_datetime( 'DTT_EVT_start', $format ) : '';
	}



	/**
	 *    the_latest_event_date - latest date chronologically
	 *
	 * @access    public
	 * @param string $dt_frmt
	 * @param string $tm_frmt
	 * @param int    $EVT_ID
	 * @return    string
	 */
	public static function the_latest_event_date( $dt_frmt = 'D M jS', $tm_frmt = 'g:i a', $EVT_ID = 0 ) {
		$datetime = EEH_Event_View::get_latest_date_obj( $EVT_ID );
		$format = ! empty( $dt_frmt ) && ! empty( $tm_frmt ) ? $dt_frmt . ' ' . $tm_frmt : $dt_frmt . $tm_frmt;
		return $datetime instanceof EE_Datetime ?  $datetime->get_i18n_datetime( 'DTT_EVT_end', $format ) : '';
	}



	/**
	 *    event_date_as_calendar_page
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function event_date_as_calendar_page( $EVT_ID = 0 ) {
		$datetime = EEH_Event_View::get_primary_date_obj( $EVT_ID );
		if ( $datetime instanceof EE_Datetime ) {
	?>
		<div class="event-date-calendar-page-dv">
			<div class="event-date-calendar-page-month-dv"><?php echo $datetime->get_i18n_datetime( 'DTT_EVT_start', 'M' );?></div>
			<div class="event-date-calendar-page-day-dv"><?php echo $datetime->start_date( 'd' );?></div>
		</div>
	<?php
		}
	}



	/**
	 *    get_primary_date_obj - orders date by DTT_order
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function get_primary_date_obj( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related(
				'Datetime',
				array(
					'limit' => 1,
					'order_by' => array( 'DTT_order' => 'ASC' )
				)
			);
			return reset( $datetimes );
		} else {
			 return FALSE;
		}
	}



	/**
	 *    get_last_date_obj - orders date by DTT_order
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function get_last_date_obj( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related(
				'Datetime',
				array(
					'limit' => 1,
					'order_by' => array( 'DTT_order' => 'DESC' )
				)
			);
			return end( $datetimes );
		} else {
			return FALSE;
		}
	}



	/**
	 *    get_earliest_date_obj - orders date chronologically
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function get_earliest_date_obj( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related(
				'Datetime',
				array(
					'limit' => 1,
					'order_by' => array( 'DTT_EVT_start' => 'ASC' )
				)
			);
			return reset( $datetimes );
		} else {
			 return FALSE;
		}
	}



	/**
	 *    get_latest_date_obj - orders date chronologically
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function get_latest_date_obj( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$datetimes = $event->get_many_related(
				'Datetime',
				array(
					'limit' => 1,
					'order_by' => array( 'DTT_EVT_start' => 'DESC' )
				)
			);
			return end( $datetimes );
		} else {
			return FALSE;
		}
	}



	/**
	 *    get_all_date_obj
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @param null $include_expired
	 * @param bool $include_deleted
	 * @param null $limit
	 * @return EE_Datetime[]
	 */
	public static function get_all_date_obj( $EVT_ID = 0, $include_expired = null, $include_deleted = false, $limit = NULL ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if($include_expired === null){
			if($event instanceof EE_Event && $event->is_expired()){
				$include_expired = true;
			}else{
				$include_expired = false;
			}
		}

		if ( $event instanceof EE_Event ) {
			return $event->datetimes_ordered($include_expired, $include_deleted, $limit);
		} else {
			 return array();
		}
	}



	/**
	 *    event_link_url
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function event_link_url( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			$url = $event->external_url() !== NULL && $event->external_url() !== '' ? $event->external_url() : get_permalink( $event->ID() );
			return preg_match( "~^(?:f|ht)tps?://~i", $url ) ? $url : 'http://' . $url;
		}
		return NULL;
	}



	/**
	 *    event_phone
	 *
	 * @access    public
	 * @param int $EVT_ID
	 * @return    string
	 */
	public static function event_phone( $EVT_ID = 0 ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			return EEH_Schema::telephone( $event->phone() );
		}
		return NULL;
	}



	/**
	 *    edit_event_link
	 *
	 * @access    public
	 * @param int    $EVT_ID
	 * @param string $link
	 * @param string $before
	 * @param string $after
	 * @return    string
	 */
	public static function edit_event_link( $EVT_ID = 0, $link = '', $before = '', $after = '' ) {
		$event = EEH_Event_View::get_event( $EVT_ID );
		if ( $event instanceof EE_Event ) {
			// can the user edit this post ?
			if ( current_user_can( 'edit_post', $event->ID() )) {
				// set link text
				$link_text = ! empty( $link ) ? $link : __('edit this event');
				// generate nonce
				$nonce = wp_create_nonce( 'edit_nonce' );
				// generate url to event editor for this event
				$url = add_query_arg( array( 'page' => 'espresso_events', 'action' => 'edit', 'post' => $event->ID(), 'edit_nonce' => $nonce ), admin_url() );
				// get edit CPT text
				$post_type_obj = get_post_type_object( 'espresso_events' );
				// build final link html
				$link = '<a class="post-edit-link" href="' . $url . '" ';
				$link .= ' title="' . esc_attr( $post_type_obj->labels->edit_item ) . '"';
				$link .= \EED_Events_Archive::link_target();
				$link .='>' . $link_text . '</a>';
				// put it all together
				return $before . apply_filters( 'edit_post_link', $link, $event->ID() ) . $after;
			}
		}
		return '';
	}



	/**
	 * @return string
	 */
	public static function event_archive_url() {
		return get_post_type_archive_link('espresso_events');
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
////		EEH_Debug_Tools::printr( $datetimes, '$datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
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
