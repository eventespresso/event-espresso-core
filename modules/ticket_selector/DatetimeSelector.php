<?php
namespace EventEspresso\modules\ticket_selector;

defined('ABSPATH') || exit;



/**
 * Class DatetimeSelector
 * adds the ability to filter the Ticket Selector by the available ticket datetimes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DatetimeSelector
{

    /**
     * @var \EE_Event $event
     */
    protected $event;

    /**
     * @var \EE_Ticket[] $tickets
     */
    protected $tickets;

    /**
     * @var \EE_Datetime[] $datetimes
     */
    protected $datetimes;

    /**
     * @var \EE_Ticket_Selector_Config $template_settings
     */
    protected $template_settings;

    /**
     * @var boolean $active
     */
    protected $active = false;



    /**
     * DatetimeSelector constructor.
     *
     * @param \EE_Event                  $event
     * @param \EE_Ticket[]               $tickets
     * @param \EE_Ticket_Selector_Config $template_settings
     * @throws \EE_Error
     */
    public function __construct(\EE_Event $event, array $tickets, \EE_Ticket_Selector_Config $template_settings)
    {
        $this->event = $event;
        $this->tickets = $tickets;
        $this->template_settings = $template_settings;
        $this->datetimes = $this->getAllDatetimesForAllTicket($tickets);
        $this->active = $this->template_settings->showDatetimeSelector($this->datetimes);
    }



    /**
     * @param \EE_Ticket[] $tickets
     * @return array
     * @throws \EE_Error
     */
    protected function getAllDatetimesForAllTicket($tickets = array())
    {
        $datetimes = array();
        foreach ($tickets as $ticket) {
            $datetimes = $this->getTicketDatetimes($ticket, $datetimes);
        }
        return $datetimes;
    }



    /**
     * @param \EE_Ticket      $ticket
     * @param  \EE_Datetime[] $datetimes
     * @return \EE_Datetime[]
     * @throws \EE_Error
     */
    protected function getTicketDatetimes(\EE_Ticket $ticket, $datetimes = array())
    {
        $ticket_datetimes = $ticket->datetimes(
            array(
                'order_by'                 => array(
                    'DTT_order'     => 'ASC',
                    'DTT_EVT_start' => 'ASC'
                ),
                'default_where_conditions' => 'none',
            )
        );
        foreach ($ticket_datetimes as $ticket_datetime) {
            if ( ! $ticket_datetime instanceof \EE_Datetime) {
                continue;
            }
            $datetimes[ $ticket_datetime->ID() ] = $ticket_datetime;
        }
        return $datetimes;
    }



    /**
     * @param \EE_Ticket                 $ticket
     * @return string
     * @throws \EE_Error
     */
    public function getTicketDatetimeClasses( \EE_Ticket $ticket ) {
        if ( ! $this->active) {
            return '';
        }
        $ticket_datetimes = $this->getTicketDatetimes($ticket);
        $classes = '';
        foreach ($this->datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime || ! in_array($datetime, $ticket_datetimes, true)) {
                continue;
            }
            $classes .= ' ee-ticket-datetimes-' . $datetime->date_and_time_range('Y_m_d', 'H_i', '-', '_');
        }
        $classes .= ' ee-hidden-ticket-tr';
        return $classes;
    }



    /**
     * @param string $date_format
     * @param string $time_format
     * @return string
     * @throws \EE_Error
     */
    public function getDatetimeSelector($date_format = 'Y-m-d', $time_format = 'g:i a') {
        if ( ! $this->active) {
            return '';
        }
        $datetime_options = array();
        foreach ($this->datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime) {
                continue;
            }
            $datetime_options[$datetime->date_and_time_range('Y_m_d', 'H_i', '-', '_')] =
                $datetime->date_and_time_range($date_format, $time_format, ' - ');
        }
        $dropdown_selector = new \EE_Checkbox_Dropdown_Selector_Input(
            $datetime_options,
            array(
                'html_id'               => 'datetime-selector-' . $this->event->ID(),
                'html_name'             => 'datetime_selector_' . $this->event->ID(),
                'html_class'            => 'datetime-selector',
                'select_button_text'       => '<span class="dashicons dashicons-calendar-alt"></span> '
                                            . esc_html__('Select a Date', 'event_espresso'),
                'other_html_attributes' => ' data-tkt_slctr_evt="' . $this->event->ID() . '"',
            )
        );
        return \EEH_HTML::div(
            \EEH_HTML::div(
                $dropdown_selector->get_html_for_input(),
                '', 'select-wrap-dv'
            )
            . \EEH_HTML::br(),
            '', 'datetime_selector-dv'
        );
    }



}
// End of file DatetimeSelector.php
// Location: EventEspresso\modules\ticket_selector/DatetimeSelector.php