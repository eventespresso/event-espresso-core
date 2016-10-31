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
        $ticket_datetimes = $ticket->datetimes();
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
        $html = \EEH_HTML::div('', '', 'datetime_selector-dv');
        $html .= \EEH_HTML::label(
            \EEH_HTML::span('', '', 'dashicons dashicons-calendar-alt') . esc_html__('Datetimes', 'event_espresso'),
            '', 'datetime_selector-lbl'
        );
        $html .= "\n" . '<select name="datetime_selector-' . $this->event->ID() . '"';
        $html .= ' id="datetime-selector-' . $this->event->ID() . '"';
        $html .= ' class="ticket-selector-datetime-selector-slct"';
        $html .= ' data-tkt_slctr_evt="' . $this->event->ID() . '">';
        $html .= "\n"
                 . '<option value="0">'
                 . esc_html__('- please select a datetime -', 'event_espresso')
                 . '</option>';
        // offer ticket quantities from the min to the max
        foreach ($this->datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime) {
                continue;
            }
            $html .= "\n" . '<option value="' . $datetime->date_range('Y_m_d', '-') . '">';
            $html .= $datetime->date_range($date_format);
            $html .= '</option>';
        }
        $html .= "\n</select>";
        $html .= \EEH_HTML::br(2);
        $html .= \EEH_HTML::divx();
        return $html;
    }



}
// End of file DatetimeSelector.php
// Location: EventEspresso\modules\ticket_selector/DatetimeSelector.php