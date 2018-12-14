<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * @package        Event Espresso
 * @subpackage     /modules/admin_refactor/
 * @author         Brent Christensen
 */
class EED_Admin_Refactor extends EED_Module
{


    /**
     * @var WP_Post $post
     */
    private $post;

    /**
     * @var EE_Event $event
     */
    private $event;


    /**
     * @return EED_Module|EED_Admin_Refactor
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        add_action('add_meta_boxes_espresso_events', array('EED_Admin_Refactor', 'add_meta_boxes'));
        add_action(
            'AHEE__caffeinated_admin_new_pricing_templates__event_tickets_metabox_main__before_content',
            array(EED_Admin_Refactor::instance(), 'eventDatesAndTicketsMetabox'), 12
        );
    }

    /**
     * run - initial module setup
     * this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @var WP $WP
     * @return void
     */
    public function run($WP)
    {
        // TODO: Implement run() method.
    }




    /**
     * @return void
     */
    public static function add_meta_boxes(WP_Post $post)
    {
        $admin_refactor = EED_Admin_Refactor::instance();
        $admin_refactor->post = $post;
    }

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function eventDatesAndTicketsMetabox()
    {
        $arr = [];
        $this->event = EEM_Event::instance()->get_one_by_ID($this->post->ID);
        $datetimes = $this->event->datetimes_in_chronological_order();
        $venue = $this->getVenue();
        $venue_name = $venue instanceof EE_Venue ? $venue->name() : '';
        $edit_venue_link = $this->getEditVenueLink($venue);
        foreach ($datetimes as $datetime) {
            if (! $datetime instanceof EE_Datetime) {
                continue;
            }
            $DTD_ID = $datetime->ID();
            $datetime_data = array(
                'id' => $DTD_ID,
                'name' => $datetime->name(),
                'description' => $datetime->description(),
                'start' => $datetime->start_date(DATE_ATOM), // 'D M d Y H:i:s O'
                'end' => $datetime->end_date(DATE_ATOM),
                'status' => $datetime->get_active_status(),
                'reg_list_url' => EE_Admin_Page::add_query_args_and_nonce(
                    array('event_id' => $datetime->event()->ID(), 'datetime_id' => $DTD_ID),
                    REG_ADMIN_URL
                ),
                'sold' => $datetime->sold(),
                'reserved' => $datetime->reserved(),
                'regLimit' => $datetime->reg_limit() === INF ? 'INF' : $datetime->reg_limit(),
                'order' => $datetime->order(),
                'venue' => $venue_name,
                'edit_venue_link' => $edit_venue_link,
                'tickets' => $this->getTicketData($datetime)
            );
            $datetime_data += $this->getRecurrenceData($datetime);
            $arr[] = $datetime_data;
        }
        echo '
        <script type="text/javascript">
            /* <![CDATA[ */
                var eeEditorEventDatesList = ' . json_encode($arr) . '
                var eeEditorEventId = ' . $this->event->ID() . '
            /* ]]> */
        </script>
        <div id="ee-editor-event-dates-and-tickets-metabox">
        <h1>Events Dates and Tickets Admin Refactor</h1>
        </div>';
    }

    /**
     * @since $VID:$
     * @return EE_Venue|mixed|null
     * @throws EE_Error
     */
    public function getVenue()
    {
        /** @var EE_Venue[] $venues */
        $venues = $this->event->venues();
        return is_array($venues) ? reset($venues) : null;
    }

    /**
     * @param EE_Venue $venue
     * @since $VID:$
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function getEditVenueLink($venue)
    {
        if ($venue instanceof EE_Venue) {
            return EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'edit', 'post' => $venue->ID()),
                EE_VENUES_ADMIN_URL
            );
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'create_new', 'page' => 'espresso_venues'),
            EE_VENUES_ADMIN_URL
        );
    }


    /**
     * @param EE_Datetime $datetime
     * @return array|mixed
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    private function getTicketData(EE_Datetime $datetime )
    {
        $ticketData = array();
        $tickets = $datetime->tickets(array(
            array('OR' => array('TKT_deleted' => 1, 'TKT_deleted*' => 0)),
            'default_where_conditions' => 'none',
            'order_by' => array('TKT_start_date' => 'ASC')
        ));
        foreach ($tickets as $ticket) {
            if ( ! $ticket instanceof EE_Ticket ) {
                continue;
            }
            $TKT_ID = $ticket->ID();
            $ticketData[] = array(
                'id'          => $TKT_ID,
                'templateId'  => null,
                'name'        => $ticket->name(),
                'description' => $ticket->description(),
                'qty'         => $ticket->qty() !== INF ? $ticket->qty() : 'INF',
                'sold'        => $ticket->sold(),
                'reserved'    => $ticket->reserved(),
                'uses'        => $ticket->uses() !== INF ? $ticket->uses() : 'INF',
                'required'    => $ticket->required(),
                'min'         => $ticket->min(),
                'max'         => $ticket->max() !== INF ? $ticket->max() : 'INF',
                'price'       => $ticket->price(),
                'startDate'   => $ticket->start_date(DATE_ATOM ), // 'D M d Y H:i:s O'
                'endDate'     => $ticket->end_date(DATE_ATOM),
                'taxable'     => $ticket->taxable(),
                'order'       => $ticket->order(),
                'row'         => $ticket->row(),
                'isDefault'   => $ticket->is_default(),
                'wpUser'      => $ticket->wp_user(),
                'parent'      => $ticket->parent(),
                'deleted'     => $ticket->deleted(),
                'status'      => $ticket->ticket_status(),
                'regCount'    => $ticket->count_registrations(),
            );
        }
        return $ticketData;
    }


    /**
     * @param EE_Datetime $datetime
     * @return array|mixed
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    private function getRecurrenceData(EE_Datetime $datetime )
    {
        $DTD_ID = $datetime->ID();
        $recurrenceData = array(
            24 => array(
                'rRule'   => 'FREQ=DAILY;INTERVAL=1;COUNT=10',
                'exRule'  => '',
                'rDates'  => [],
                'exDates' => [],
            ),
            26 => array(
                'rRule'   => 'FREQ=WEEKLY;INTERVAL=1;COUNT=20',
                'exRule'  => '',
                'rDates'  => [],
                'exDates' => [],
            ),
        );
        return isset($recurrenceData[ $DTD_ID ])
            ? $recurrenceData[ $DTD_ID ]
            : array();
    }
}
