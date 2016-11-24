<?php
namespace EventEspresso\modules\ticket_selector;

defined('ABSPATH') || exit;



/**
 * Class DatetimeSelector
 * Description
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
            if ( ! $datetime instanceof \EE_Datetime || ! in_array($datetime, $ticket_datetimes)) {
                continue;
            }
            $classes .= ' ee-ticket-datetimes-' . $datetime->date_range('Y_m_d', '-');
        }
        $classes .= ' ee-hidden-ticket-tr';
        return $classes;
    }



    /**
     * @param string $date_format
     * @return string
     * @throws \EE_Error
     */
    public function getDatetimeSelector($date_format = 'Y-m-d') {
        if ( ! $this->active) {
            return '';
        }
        $datetime_options = array();
        foreach ($this->datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime) {
                continue;
            }
            $desc = $datetime->name();
            $desc .= ! empty($desc)
                ? '&nbsp;' . $datetime->date_range($date_format)
                : $datetime->date_range($date_format);
            $datetime_options[$datetime->date_range('Y_m_d', '-')] = $desc;
        }
        $dropdown_selector = new \EE_Checkbox_Dropdown_Selector_Input(
            $datetime_options,
            array(
                'html_id'               => 'datetime-selector-' . $this->event->ID(),
                'html_name'             => 'datetime_selector_' . $this->event->ID(),
                'html_class'            => 'datetime-selector',
                'html_label_text'       => '<span class="dashicons dashicons-calendar-alt"></span> Select a Datetime',
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