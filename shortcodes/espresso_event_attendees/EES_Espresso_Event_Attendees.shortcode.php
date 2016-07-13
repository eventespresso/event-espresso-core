<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Attendees shortcode class
 *
 * @package			Event Espresso
 * @subpackage		/shortcodes/
 * @author			Darren Ethier
 * @since           4.6.29
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Event_Attendees  extends EES_Shortcode {


	/**
	 * run - initial module setup
	 *
	 * @access    public
	 * @param       WP $WP
	 * @return    void
	 */
	public function run( WP $WP ) {}


	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}






	/**
	 * 	process_shortcode - ESPRESSO_EVENT_ATTENDEES - Returns a list of attendees to an event.
	 *
	 *
	 *
	 * 	[ESPRESSO_EVENT_ATTENDEES] - defaults to attendees for earliest active event, or earliest upcoming event.
	 * 	[ESPRESSO_EVENT_ATTENDEES event_id=123] - attendees for specific event.
	 * 	[ESPRESSO_EVENT_ATTENDEES datetime_id=245] - attendees for a specific datetime.
	 * 	[ESPRESSO_EVENT_ATTENDEES ticket_id=123] - attendees for a specific ticket.
	 * 	[ESPRESSO_EVENT_ATTENDEES status=all] - specific registration status (use status id) or all for all attendees
	 *                                          regardless of status.  Note default is to only return approved attendees
	 * 	[ESPRESSO_EVENT_ATTENDEES show_gravatar=true] - default is to not return gravatar.  Otherwise if this is set
	 *                                                  then return gravatar for email address given.
	 *
	 *  Note: because of the relationship between event_id, ticket_id, and datetime_id. If more than one of those params
	 *  is included then preference is given to the following:
	 *  - event_id is used whenever its present and any others are ignored.
	 *  - if no event_id then datetime is used whenever its present and any others are ignored.
	 *  - otherwise ticket_id is used if present.
	 *
	 *  @access 	public
	 *  @param 	    array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {

		//set default attributes
		$default_shortcode_attributes = array(
			'event_id'      => null,
			'datetime_id'   => null,
			'ticket_id'     => null,
			'status'        => EEM_Registration::status_id_approved,
			'show_gravatar' => false
		);

		// allow the defaults to be filtered
		$default_shortcode_attributes = apply_filters(
			'EES_Espresso_Event_Attendees__process_shortcode__default_shortcode_atts',
			$default_shortcode_attributes
		);
		// grab attributes and merge with defaults, then extract
		$attributes = array_merge( (array) $default_shortcode_attributes, (array) $attributes );

		$template_args = array(
			'contacts'      => array(),
			'event'         => null,
			'datetime'      => null,
			'ticket'        => null,
			'show_gravatar' => $attributes['show_gravatar']
		);

		//start setting up the query for the contacts
		$query = array();

		$error = false;

		//what event?
		if ( empty( $attributes['event_id'] ) && empty( $attributes['datetime_id'] ) && empty( $attributes['ticket_id'] ) ) {
			//seems like is_espresso_event_single() isn't working as expected. So using alternate method.
			if ( is_single() && is_espresso_event() ) {
				$event = EEH_Event_View::get_event();
				if ( $event instanceof EE_Event ) {
					$template_args['event']          = $event;
					$query[0]['Registration.EVT_ID'] = $event->ID();
				}
			} else {
				//try getting the earliest active event if none then get the
				$events = EEM_Event::instance()->get_active_events( array( 'limit'    => 1,
				                                                          'order_by' => array( 'Datetime.DTT_EVT_start' => 'ASC' )
				) );
				$events = empty( $events ) ? EEM_Event::instance()->get_upcoming_events( array( 'limit'    => 1,
				                                                                              'order_by' => array( 'Datetime.DTT_EVT_start' => 'ASC' )
				) ) : $events;
				$event = reset( $events );
				if ( $event instanceof EE_Event ) {
					$query[0]['Registration.EVT_ID'] = $event->ID();
					$template_args['event']          = $event;
				}
			}
		} elseif ( ! empty( $attributes['event_id'] ) ) {
			$event = EEM_Event::instance()->get_one_by_ID( $attributes['event_id'] );
			if ( $event instanceof EE_Event ) {
				$query[0]['Registration.EVT_ID'] = $attributes['event_id'];
				$template_args['event']          = $event;
			} else {
				$error = true;
			}
		}

		//datetime?
		if ( ! empty( $attributes['datetime_id'] ) && empty( $attributes['event_id'] ) ) {
			$datetime = EEM_Datetime::instance()->get_one_by_ID( $attributes['datetime_id'] );
			if ( $datetime instanceof EE_Datetime ) {
				$query[0]['Registration.Ticket.Datetime.DTT_ID'] = $attributes['datetime_id'];
				$query['default_where_conditions'] = 'this_model_only';
				$template_args['datetime']                      = $datetime;
				$template_args['event']                         = $datetime->event();
			} else {
				$error = true;
			}
		}

		//ticket?just
		if ( ! empty( $attributes['ticket_id'] ) && empty( $attributes['event_id'] ) && empty( $attributes['datetime_id'] ) ) {
			$ticket = EEM_Ticket::instance()->get_one_by_ID( $attributes['ticket_id'] );
			if ( $ticket instanceof EE_Ticket ) {
				$query[0]['Registration.TKT_ID'] = $attributes['ticket_id'];
				$template_args['ticket']         = $ticket;
				$template_args['event']          = $ticket->first_datetime() instanceof EE_Datetime ? $ticket->first_datetime()->event() : null;
			} else {
				$error = true;
			}
		}

		//status
		$reg_status_array = EEM_Registration::reg_status_array();
		if ( $attributes['status'] != 'all' && isset( $reg_status_array[$attributes['status']] ) ) {
			$query[0]['Registration.STS_ID'] = $attributes['status'];
		}
		$query['group_by'] = array( 'ATT_ID' );
		$query['order_by'] = apply_filters( 'FHEE__EES_Espresso_Event_Attendees__process_shortcode__order_by', array( 'ATT_lname' => 'ASC', 'ATT_fname' => 'ASC' ) );

		//if we have NO query where conditions, then there was an invalid parameter or the shortcode was used incorrectly
		//so when WP_DEBUG is set and true, we'll show a message, otherwise we'll just return an empty string.
		if ( ( ! isset( $query[0] ) || ! is_array( $query[0] ) ) || $error ) {
			if ( WP_DEBUG ) {
				return '<div class="important-notice ee-attention">' . __( 'The [ESPRESSO_EVENT_ATTENDEES] shortcode has been used incorrectly.  Please double check the arguments you used for any typos.  In the case of ID type arguments, its possible the given ID does not correspond to existing data in the database.', 'event_espresso' ) . '</div>';
			} else {
				return '';
			}
		}


		//get contacts!
		$template_args['contacts'] = EEM_Attendee::instance()->get_all( $query );


		//all set let's load up the template and return.
		return EEH_Template::locate_template( 'loop-espresso_event_attendees.php', $template_args, true, true );

	}


} //end EES_Espresso_Event_Attendees