<?php
namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Datetime;
use EE_Error;
use EE_Event;
use EE_Ticket;
use EEH_Event_View;
use EEH_Template;
use EEM_Attendee;
use EEM_Datetime;
use EEM_Event;
use EEM_Registration;
use EEM_Ticket;
use EventEspresso\core\services\shortcodes\EspressoShortcode;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoEventAttendees
 * ESPRESSO_EVENT_ATTENDEES shortcode
 *
 * @package Event Espresso
 * @author  Darren Ethier
 * @since   4.9.26
 */
class EspressoEventAttendees extends EspressoShortcode
{

    private $query_params = array(
        0 => array()
    );

    private $template_args = array(
        'contacts'      => array(),
        'event'         => null,
        'datetime'      => null,
        'ticket'        => null,
    );

    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_EVENT_ATTENDEES';
    }



    /**
     * the time in seconds to cache the results of the processShortcode() method
     * 0 means the processShortcode() results will NOT be cached at all
     *
     * @return int
     */
    public function cacheExpiration()
    {
        return 0;
    }



    /**
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * @return void
     */
    public function initializeShortcode()
    {
        $this->shortcodeHasBeenInitialized();
    }



    /**
     * process_shortcode - ESPRESSO_EVENT_ATTENDEES - Returns a list of attendees to an event.
     *  [ESPRESSO_EVENT_ATTENDEES]
     *  - defaults to attendees for earliest active event, or earliest upcoming event.
     *
     *  [ESPRESSO_EVENT_ATTENDEES event_id=123]
     *  - attendees for specific event.
     *
     *  [ESPRESSO_EVENT_ATTENDEES datetime_id=245]
     *  - attendees for a specific datetime.
     *
     *  [ESPRESSO_EVENT_ATTENDEES ticket_id=123]
     *  - attendees for a specific ticket.
     *
     *  [ESPRESSO_EVENT_ATTENDEES status=all]
     *  - specific registration status (use status id) or all for all attendees regardless of status.
     *  Note default is to only return approved attendees
     *
     *  [ESPRESSO_EVENT_ATTENDEES show_gravatar=true]
     *  - default is to not return gravatar.  Otherwise if this is set then return gravatar for email address given.
     *
     *  [ESPRESSO_EVENT_ATTENDEES display_on_archives=true]
     *  - default is to not display attendees list on archive pages.
     *
     * Note: because of the relationship between event_id, ticket_id, and datetime_id:
     * If more than one of those params is included, then preference is given to the following:
     *  - event_id is used whenever its present and any others are ignored.
     *  - if no event_id then datetime is used whenever its present and any others are ignored.
     *  - otherwise ticket_id is used if present.
     *
     * @param array $attributes
     * @return string
     * @throws EE_Error
     */
    public function processShortcode($attributes = array())
    {
        // grab attributes and merge with defaults
        $attributes = $this->getAttributes((array)$attributes);
        $archive = is_archive();
        $display_on_archives = filter_var($attributes['display_on_archives'], FILTER_VALIDATE_BOOLEAN);
        // don't display on archives unless 'display_on_archives' is true
        if($archive && ! $display_on_archives) {
            return '';
        }
        // add attributes to template args
        $this->template_args['show_gravatar'] = $attributes['show_gravatar'];
        // add required objects: event, datetime, and ticket
        $this->template_args['event'] = $this->getEventAndQueryParams($attributes);
        $this->template_args['datetime'] = $this->getDatetimeAndQueryParams($attributes);
        $this->template_args['ticket'] = $this->getTicketAndQueryParams($attributes);

        // if any of the above objects is invalid or missing,
        // then there was an invalid parameter or the shortcode was used incorrectly
        // so when WP_DEBUG is set and true, we'll show a message,
        // otherwise we'll just return an empty string.
         if (
            ! $this->template_args['event'] instanceof EE_Event
            || empty($this->query_params[0])
            || ($attributes['datetime_id'] && ! $this->template_args['datetime'] instanceof EE_Datetime)
            || ($attributes['ticket_id'] && ! $this->template_args['ticket'] instanceof EE_Ticket)
        ) {
            if (WP_DEBUG) {
                return '<div class="important-notice ee-attention">'
                       . esc_html__('The [ESPRESSO_EVENT_ATTENDEES] shortcode has been used incorrectly.  Please double check the arguments you used for any typos.  In the case of ID type arguments, its possible the given ID does not correspond to existing data in the database.',
                        'event_espresso')
                       . '</div>';
            }
             return '';
        }
        $this->setAdditionalQueryParams($attributes);
        //get contacts!
        $this->template_args['contacts'] = EEM_Attendee::instance()->get_all($this->query_params);
        //all set let's load up the template and return.
        return EEH_Template::locate_template(
            'loop-espresso_event_attendees.php',
            $this->template_args
        );

    }



    /**
     * merge incoming attributes with filtered defaults
     *
     * @param array $attributes
     * @return array
     */
    private function getAttributes(array $attributes)
    {
        return (array) apply_filters(
            'EES_Espresso_Event_Attendees__process_shortcode__default_shortcode_atts',
            $attributes + array(
                'event_id'            => null,
                'datetime_id'         => null,
                'ticket_id'           => null,
                'status'              => EEM_Registration::status_id_approved,
                'show_gravatar'       => false,
                'display_on_archives' => false,
            )
        );
    }



    /**
     * @param array $attributes
     * @return EE_Event|null
     * @throws EE_Error
     */
    private function getEventAndQueryParams(array $attributes){
        if ( ! empty($attributes['event_id'])) {
            $event = EEM_Event::instance()->get_one_by_ID($attributes['event_id']);
            if ($event instanceof EE_Event) {
                $this->query_params[0]['Registration.EVT_ID'] = $attributes['event_id'];
                return $event;
            }
        }
        if (is_espresso_event()) {
            $event = EEH_Event_View::get_event();
            if ($event instanceof EE_Event) {
                $this->query_params[0]['Registration.EVT_ID'] = $event->ID();
                return $event;
            }
        }
        // one last shot...
        // try getting the earliest active event
        $events = EEM_Event::instance()->get_active_events(array(
            'limit'    => 1,
            'order_by' => array('Datetime.DTT_EVT_start' => 'ASC')
        ));
        //  if none then get the next upcoming
        $events = empty($events)
            ? EEM_Event::instance()->get_upcoming_events(array(
                'limit'    => 1,
                'order_by' => array('Datetime.DTT_EVT_start' => 'ASC')
            ))
            : $events;
        $event = reset($events);
        if ($event instanceof EE_Event) {
            $this->query_params[0]['Registration.EVT_ID'] = $event->ID();
            return $event;
        }
        return null;
    }



    /**
     * @param array $attributes
     * @return EE_Datetime|null
     */
    private function getDatetimeAndQueryParams(array $attributes)
    {
        if ( ! empty($attributes['datetime_id'])) {
            $datetime = EEM_Datetime::instance()->get_one_by_ID($attributes['datetime_id']);
            if ($datetime instanceof EE_Datetime) {
                $this->query_params[0]['Registration.Ticket.Datetime.DTT_ID'] = $attributes['datetime_id'];
                $this->query_params['default_where_conditions'] = 'this_model_only';
                if ( ! $this->template_args['event'] instanceof EE_Event) {
                    $this->template_args['event'] = $datetime->event();
                }
                return $datetime;
            }
        }
        return null;
    }



    /**
     * @param array $attributes
     * @return \EE_Base_Class|null
     * @throws EE_Error
     */
    private function getTicketAndQueryParams(array $attributes)
    {
        if ( ! empty($attributes['ticket_id']) && empty($attributes['event_id']) && empty($attributes['datetime_id'])) {
            $ticket = EEM_Ticket::instance()->get_one_by_ID($attributes['ticket_id']);
            if ($ticket instanceof EE_Ticket) {
                $this->query_params[0]['Registration.TKT_ID'] = $attributes['ticket_id'];
                if ( ! $this->template_args['event'] instanceof EE_Event) {
                    $this->template_args['event'] = $ticket->first_datetime() instanceof EE_Datetime
                        ? $ticket->first_datetime()->event()
                        : null;
                }
                return $ticket;
            }
        }
        return null;
    }



    /**
     * @param array $attributes
     * @throws EE_Error
     */
    private function setAdditionalQueryParams(array $attributes)
    {
        $reg_status_array = EEM_Registration::reg_status_array();
        if ($attributes['status'] !== 'all' && isset($reg_status_array[$attributes['status']])) {
            $this->query_params[0]['Registration.STS_ID'] = $attributes['status'];
        }
        $this->query_params['group_by'] = array('ATT_ID');
        $this->query_params['order_by'] = (array) apply_filters(
            'FHEE__EES_Espresso_Event_Attendees__process_shortcode__order_by',
            array('ATT_lname' => 'ASC', 'ATT_fname' => 'ASC')
        );
    }



}
// End of file EspressoEventAttendees.php
// Location: EventEspresso\core\domain\entities\shortcodes/EspressoEventAttendees.php
