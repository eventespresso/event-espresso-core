<?php
namespace EventEspresso\modules\ticket_selector;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
    exit( 'No direct script access allowed' );
}



/**
 * Class DisplayTicketSelector
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DisplayTicketSelector
{

    /**
     * event that ticket selector is being generated for
     *
     * @access protected
     * @var \EE_Event $event
     */
    protected $event;

    /**
     * Used to flag when the ticket selector is being called from an external iframe.
     *
     * @var bool $iframe
     */
    protected $iframe = false;

    /**
     * max attendees that can register for event at one time
     *
     * @var int $max_attendees
     */
    private $max_attendees = EE_INF;

    /**
     *@var string $date_format
     */
    private $date_format = '';

    /**
     *@var string $time_format
     */
    private $time_format = '';



    /**
     * DisplayTicketSelector constructor.
     */
    public function __construct()
    {
        $this->date_format = apply_filters(
            'FHEE__EED_Ticket_Selector__display_ticket_selector__date_format',
            get_option('date_format')
        );
        $this->time_format = apply_filters(
            'FHEE__EED_Ticket_Selector__display_ticket_selector__time_format',
            get_option('time_format')
        );
    }



    /**
     * @param boolean $iframe
     */
    public function setIframe( $iframe = true )
    {
        $this->iframe = filter_var( $iframe, FILTER_VALIDATE_BOOLEAN );
    }



    /**
     * finds and sets the \EE_Event object for use throughout class
     *
     * @param    mixed $event
     * @return    bool
     */
    protected function setEvent( $event = null )
    {
        if ( $event === null ) {
            global $post;
            $event = $post;
        }
        if ( $event instanceof \EE_Event ) {
            $this->event = $event;
        } else if ( $event instanceof \WP_Post ) {
            if ( isset( $event->EE_Event ) && $event->EE_Event instanceof \EE_Event ) {
                $this->event = $event->EE_Event;
            } else if ( $event->post_type === 'espresso_events' ) {
                $event->EE_Event = \EEM_Event::instance()->instantiate_class_from_post_object( $event );
                $this->event = $event->EE_Event;
            }
        } else {
            $user_msg = __( 'No Event object or an invalid Event object was supplied.', 'event_espresso' );
            $dev_msg = $user_msg . __(
                    'In order to generate a ticket selector, please ensure you are passing either an EE_Event object or a WP_Post object of the post type "espresso_event" to the EE_Ticket_Selector class constructor.',
                    'event_espresso'
                );
            \EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
            return false;
        }
        return true;
    }



    /**
     * @return int
     */
    public function getMaxAttendees()
    {
        return $this->max_attendees;
    }



    /**
     * @param int $max_attendees
     */
    public function setMaxAttendees($max_attendees)
    {
        $this->max_attendees = absint(
            apply_filters(
                'FHEE__EE_Ticket_Selector__display_ticket_selector__max_tickets',
                $max_attendees
            )
        );
    }



    /**
     * creates buttons for selecting number of attendees for an event
     *
     * @param \WP_Post|int $event
     * @param bool         $view_details
     * @return string
     * @throws \EE_Error
     */
    public function display( $event = null, $view_details = false )
    {
        // reset filter for displaying submit button
        remove_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
        // poke and prod incoming event till it tells us what it is
        if ( ! $this->setEvent( $event ) ) {
            return false;
        }
        // begin gathering template arguments by getting event status
        $template_args = array( 'event_status' => $this->event->get_active_status() );
        if ( $this->activeEventAndShowTicketSelector($event, $template_args['event_status'], $view_details) ) {
            return ! is_single() ? $this->displayViewDetailsButton() : '';
        }
        // filter the maximum qty that can appear in the Ticket Selector qty dropdowns
        $this->setMaxAttendees($this->event->additional_limit());
        if ($this->getMaxAttendees() < 1) {
            return $this->ticketSalesClosedMessage();
        }
        // is the event expired ?
        $template_args['event_is_expired'] = $this->event->is_expired();
        if ( $template_args[ 'event_is_expired' ] ) {
            return $this->expiredEventMessage();
        }
        // get all tickets for this event ordered by the datetime
        $tickets = $this->getTickets();
        if (count($tickets) < 1) {
            return $this->noTicketAvailableMessage();
        }
        // redirecting to another site for registration ??
        $external_url = (string) $this->event->external_url();
        // if redirecting to another site for registration, then we don't load the TS
        $ticket_selector = $external_url
            ? $this->externalEventRegistration()
            : $this->loadTicketSelector($tickets,$template_args);
        // now set up the form (but not for the admin)
        $ticket_selector = ! is_admin()
            ? $this->formOpen($this->event->ID(), $external_url) . $ticket_selector
            : $ticket_selector;
        // submit button and form close tag
        $ticket_selector .= ! is_admin() ? $this->displaySubmitButton() : '';
        return $ticket_selector;
    }



    /**
     * displayTicketSelector
     * examines the event properties and determines whether a Ticket Selector should be displayed
     *
     * @param \WP_Post|int $event
     * @param string       $_event_active_status
     * @param bool         $view_details
     * @return bool
     * @throws \EE_Error
     */
    protected function activeEventAndShowTicketSelector($event, $_event_active_status, $view_details)
    {
        $event_post = $this->event instanceof \EE_Event ? $this->event->ID() : $event;
        return ! is_admin()
               && (
                   ! $this->event->display_ticket_selector()
                   || $view_details
                   || post_password_required($event_post)
                   || (
                       $_event_active_status !== \EE_Datetime::active
                       && $_event_active_status !== \EE_Datetime::upcoming
                       && $_event_active_status !== \EE_Datetime::sold_out
                       && ! (
                           $_event_active_status === \EE_Datetime::inactive
                           && is_user_logged_in()
                       )
                   )
               );
    }



    /**
     * noTicketAvailableMessage
     * notice displayed if event is expired
     *
     * @return string
     * @throws \EE_Error
     */
    protected function expiredEventMessage()
    {
        return '<div class="ee-event-expired-notice"><span class="important-notice">' . esc_html__(
            'We\'re sorry, but all tickets sales have ended because the event is expired.',
            'event_espresso'
        ) . '</span></div>';
    }



    /**
     * noTicketAvailableMessage
     * notice displayed if event has no more tickets available
     *
     * @return string
     * @throws \EE_Error
     */
    protected function noTicketAvailableMessage()
    {
        $no_ticket_available_msg = esc_html__( 'We\'re sorry, but all ticket sales have ended.', 'event_espresso' );
        if (current_user_can('edit_post', $this->event->ID())) {
            $no_ticket_available_msg .= sprintf(
                esc_html__(
                    '%1$sNote to Event Admin:%2$sNo tickets were found for this event. This effectively turns off ticket sales. Please ensure that at least one ticket is available for if you want people to be able to register.%3$s(click to edit this event)%4$s',
                    'event_espresso'
                ),
                '<div class="ee-attention" style="text-align: left;"><b>',
                '</b><br />',
                '<span class="edit-link"><a class="post-edit-link" href="'.get_edit_post_link($this->event->ID()).'">',
                '</a></span></div>'
            );
        }
        return '
            <div class="ee-event-expired-notice">
                <span class="important-notice">' . $no_ticket_available_msg . '</span>
            </div>';
    }



    /**
     * ticketSalesClosed
     * notice displayed if event ticket sales are turned off
     *
     * @return string
     * @throws \EE_Error
     */
    protected function ticketSalesClosedMessage()
    {
        $sales_closed_msg = esc_html__(
            'We\'re sorry, but ticket sales have been closed at this time. Please check back again later.',
            'event_espresso'
        );
        if (current_user_can('edit_post', $this->event->ID())) {
            $sales_closed_msg .= sprintf(
                esc_html__(
                    '%sNote to Event Admin:%sThe "Maximum number of tickets allowed per order for this event" in the Event Registration Options has been set to "0". This effectively turns off ticket sales. %s(click to edit this event)%s',
                    'event_espresso'
                ),
                '<div class="ee-attention" style="text-align: left;"><b>',
                '</b><br />',
                '<span class="edit-link"><a class="post-edit-link" href="'.get_edit_post_link($this->event->ID()).'">',
                '</a></span></div>'
            );
        }
        return '<p><span class="important-notice">' . $sales_closed_msg . '</span></p>';
    }



    /**
     * getTickets
     *
     * @return \EE_Base_Class[]|\EE_Ticket[]
     * @throws \EE_Error
     */
    protected function getTickets()
    {
        $ticket_query_args = array(
            array('Datetime.EVT_ID' => $this->event->ID()),
            'order_by' => array(
                'TKT_order'              => 'ASC',
                'TKT_required'           => 'DESC',
                'TKT_start_date'         => 'ASC',
                'TKT_end_date'           => 'ASC',
                'Datetime.DTT_EVT_start' => 'DESC',
            ),
        );
        if ( ! \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets) {
            //use the correct applicable time query depending on what version of core is being run.
            $current_time = method_exists('EEM_Datetime', 'current_time_for_query')
                ? time()
                : current_time('timestamp');
            $ticket_query_args[0]['TKT_end_date'] = array('>', $current_time);
        }
        return \EEM_Ticket::instance()->get_all($ticket_query_args);
    }



    /**
     * loadTicketSelectorTemplate
     * begins to assemble template arguments
     * and decides whether to load a "simple" ticket selector, or the standard
     *
     * @param \EE_Ticket[] $tickets
     * @param array $template_args
     * @return string
     * @throws \EE_Error
     */
    protected function loadTicketSelector(array $tickets, array $template_args)
    {
        $template_args['event'] = $this->event;
        $template_args['EVT_ID'] = $this->event->ID();
        $template_args['event_is_expired'] = $this->event->is_expired();
        $template_args['max_atndz'] = $this->getMaxAttendees();
        $template_args['date_format'] = $this->date_format;
        $template_args['time_format'] = $this->time_format;
        /**
         * Filters the anchor ID used when redirecting to the Ticket Selector if no quantity selected
         *
         * @since 4.9.13
         * @param     string  '#tkt-slctr-tbl-' . $EVT_ID The html ID to anchor to
         * @param int $EVT_ID The Event ID
         */
        $template_args['anchor_id'] = apply_filters(
            'FHEE__EE_Ticket_Selector__redirect_anchor_id',
            '#tkt-slctr-tbl-' . $this->event->ID(),
            $this->event->ID()
        );
        $template_args['tickets'] = $tickets;
        $template_args['ticket_count'] = count($tickets);
        // if there is only ONE ticket with a max qty of ONE
        if (count($tickets) === 1 && $this->getMaxAttendees() === 1 ) {
            $ticket_selector = $this->simpleTicketSelector( $tickets, $template_args);
        }
        return ! empty($ticket_selector)
            ? $ticket_selector
            : $this->standardTicketSelector($tickets, $template_args);

    }



    /**
     * simpleTicketSelector
     * there's one ticket, and max attendees is set to one,
     * so if the event is free, then this is a "simple" ticket selector
     * a.k.a. "Dude Where's my Ticket Selector?"
     *
     * @param \EE_Ticket[] $tickets
     * @param array  $template_args
     * @return string
     * @throws \EE_Error
     */
    protected function simpleTicketSelector( $tickets, array $template_args)
    {
        /** @var \EE_Ticket $ticket */
        $ticket = reset($tickets);
        // if the ticket is free... then not much need for the ticket selector
        if (
            apply_filters(
                'FHEE__ticket_selector_chart_template__hide_ticket_selector',
                $ticket->is_free(),
                $this->event->ID()
            )
        ) {
            $ticket_selector_row = new TicketSelectorRowSimple(
                $ticket,
                $this->getMaxAttendees(),
                $template_args['date_format']
            );
            unset($template_args['tickets']);
            $template_args['ticket'] = $ticket;
            $template_args['ticket_status_display'] = $ticket_selector_row->getTicketStatusDisplay();
            $template_args['template_path'] = TICKET_SELECTOR_TEMPLATES_PATH
                                              . 'simple_ticket_selector.template.php';
            return $this->loadTicketSelectorTemplate($template_args);
        }
        return '';
    }



    /**
     * standardTicketSelector
     * regular ticket selector that displays one row for each ticket
     * with a dropdown for selecting the desired ticket quantity
     *
     * @param \EE_Ticket[] $tickets
     * @param array        $template_args
     * @return string
     * @throws \EE_Error
     */
    protected function standardTicketSelector(array $tickets, array $template_args)
    {
        $row = 1;
        $ticket_row_html = '';
        $required_ticket_sold_out = false;
        // flag to indicate that at least one taxable ticket has been encountered
        $taxable_tickets = false;
        // get EE_Ticket_Selector_Config and TicketDetails
        $template_settings = isset (\EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector)
            ? \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector
            : new \EE_Ticket_Selector_Config();
        // $template_settings->setShowDatetimeSelector(\EE_Ticket_Selector_Config::ALWAYS_SHOW_DATETIME_SELECTOR);
        // $template_settings->setDatetimeSelectorThreshold(2);
        // \EEH_Debug_Tools::printr($template_settings->getShowDatetimeSelector(), 'getShowDatetimeSelector', __FILE__, __LINE__);
        // \EEH_Debug_Tools::printr($template_settings->getDatetimeSelectorThreshold(), 'getDatetimeSelectorThreshold', __FILE__, __LINE__);
        $tax_settings = isset (\EE_Registry::instance()->CFG->tax_settings)
            ? \EE_Registry::instance()->CFG->tax_settings
            : new \EE_Tax_Config();
        $datetimes = $this->getAllTicketDatetimes($tickets);
        // loop through tickets
        foreach ($tickets as $TKT_ID => $ticket) {
            if ($ticket instanceof \EE_Ticket) {
                $cols = 2;
                $taxable_tickets = $ticket->taxable() ? true : $taxable_tickets;

                $ticket_selector_row = new TicketSelectorRowStandard(
                    $ticket,
                    new TicketDetails($ticket, $template_settings, $template_args),
                    $template_settings,
                    $tax_settings,
                    $this->getMaxAttendees(),
                    $row,
                    $cols,
                    $required_ticket_sold_out,
                    $template_args['event_status'],
                    $template_args['date_format'],
                    $this->getTicketDatetimeClasses($ticket, $datetimes, $template_settings)
                );
                $ticket_row_html .= $ticket_selector_row->getHtml();
                $required_ticket_sold_out = $ticket_selector_row->getRequiredTicketSoldOut();
                $row++;
            }
        }
        $template_args['row'] = $row;
        $template_args['ticket_row_html'] = $ticket_row_html;
        $template_args['taxable_tickets'] = $taxable_tickets;
        $template_args['datetime_selector'] = $this->getDatetimeSelector($datetimes, $template_settings);
        $template_args['prices_displayed_including_taxes'] = $tax_settings->prices_displayed_including_taxes;
        $template_args['template_path'] = TICKET_SELECTOR_TEMPLATES_PATH . 'standard_ticket_selector.template.php';
        remove_all_filters('FHEE__EE_Ticket_Selector__hide_ticket_selector');
        return $this->loadTicketSelectorTemplate($template_args);
    }



    /**
     * loadTicketSelectorTemplate
     *
     * @param array $template_args
     * @return string
     * @throws \EE_Error
     */
    protected function loadTicketSelectorTemplate(array $template_args)
    {
        return \EEH_Template::locate_template(
            apply_filters(
                'FHEE__EE_Ticket_Selector__display_ticket_selector__template_path',
                $template_args['template_path'],
                $this->event
            ),
            array_merge(
                array(
                ),
                $template_args
            )
        );
    }



    /**
     * externalEventRegistration
     *
     * @return string
     */
    public function externalEventRegistration()
    {
        // if not we still need to trigger the display of the submit button
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        //display notice to admin that registration is external
        return is_admin()
            ? esc_html__(
                'Registration is at an external URL for this event.',
                'event_espresso'
            )
            : '';
    }



    /**
     * formOpen
     *
     * @param        int    $ID
     * @param        string $external_url
     * @return        string
     */
    public function formOpen( $ID = 0, $external_url = '' )
    {
        // if redirecting, we don't need any anything else
        if ( $external_url ) {
            $html = '<form method="GET" action="' . \EEH_URL::refactor_url( $external_url ) . '">';
            $query_args = \EEH_URL::get_query_string( $external_url );
            foreach ( (array)$query_args as $query_arg => $value ) {
                $html .= '<input type="hidden" name="' . $query_arg . '" value="' . $value . '">';
            }
            return $html;
        }
        // if there is no submit button, then don't start building a form
        // because the "View Details" button will build its own form
        if ( ! apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false ) ) {
            return '';
        }
        $checkout_url = \EEH_Event_View::event_link_url( $ID );
        if ( ! $checkout_url ) {
            \EE_Error::add_error(
                esc_html__( 'The URL for the Event Details page could not be retrieved.', 'event_espresso' ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        // set no cache headers and constants
        \EE_System::do_not_cache();
        $extra_params = $this->iframe ? ' target="_blank"' : '';
        $html = '<form method="POST" action="' . $checkout_url . '"' . $extra_params . '>';
        $html .= wp_nonce_field( 'process_ticket_selections', 'process_ticket_selections_nonce_' . $ID, true, false );
        $html .= '<input type="hidden" name="ee" value="process_ticket_selections">';
        $html = apply_filters( 'FHEE__EE_Ticket_Selector__ticket_selector_form_open__html', $html, $this->event );
        return $html;
    }



    /**
     * @param \EE_Ticket[] $tickets
     * @return array
     * @throws \EE_Error
     */
    protected function getAllTicketDatetimes($tickets = array())
    {
        $datetimes = array();
        foreach ($tickets as $ticket) {
            $datetimes = $this->getTicketDatetimes($ticket, $datetimes);
        }
        return $datetimes;
    }



    /**
     * @param \EE_Ticket                 $ticket
     * @param \EE_Datetime[]             $datetimes
     * @param \EE_Ticket_Selector_Config $template_settings
     * @return string
     * @throws \EE_Error
     */
    protected function getTicketDatetimeClasses(
        \EE_Ticket $ticket,
        array $datetimes,
        \EE_Ticket_Selector_Config $template_settings
    ) {
        if (
            $template_settings->getShowDatetimeSelector() === \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
            || (
                $template_settings->getShowDatetimeSelector()
                === \EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR
                && count($datetimes) < $template_settings->getDatetimeSelectorThreshold()
            )
        ) {
            return '';
        }
        $ticket_datetimes = $this->getTicketDatetimes($ticket);
        $classes = '';
        foreach ($datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime || ! in_array($datetime, $ticket_datetimes)) {
                continue;
            }
            $classes .= ' ee-ticket-datetimes-' . $datetime->date_range('Y_m_d', '-');
        }
        $classes .= ' ee-ticket-datetimes-hide';
        return $classes;
    }



    /**
     * @param \EE_Ticket     $ticket
     * @param \EE_Datetime[] $datetimes
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
            $datetimes[$ticket_datetime->ID()] = $ticket_datetime;
        }
        return $datetimes;
    }



    /**
     * @param \EE_Datetime[]             $datetimes
     * @param \EE_Ticket_Selector_Config $template_settings
     * @return string
     * @throws \EE_Error
     */
    protected function getDatetimeSelector(
        array $datetimes,
        \EE_Ticket_Selector_Config $template_settings
    ) {
        if(
            $template_settings->getShowDatetimeSelector() === \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
            || (
                $template_settings->getShowDatetimeSelector() === \EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR
                && count($datetimes) < $template_settings->getDatetimeSelectorThreshold()
            )
        ){
            return '';
        }
        $html = \EEH_HTML::div( '', '', 'datetime_selector-dv' );
        $html .= \EEH_HTML::label(
            \EEH_HTML::span('', '', 'dashicons dashicons-calendar-alt') . esc_html__('Datetimes', 'event_espresso'),
            '', 'datetime_selector-lbl'
        ) . \EEH_HTML::br();
        $html .= \EEH_HTML::div( '', '', 'custom-select' );
        $html .= "\n" . '<select name="datetime_selector-' . $this->event->ID() . '"';
        $html .= ' id="datetime-selector-' . $this->event->ID() . '"';
        $html .= ' class="ticket-selector-datetime-selector-slct"';
        $html .= ' data-tkt_slctr_evt="' . $this->event->ID() . '">';
        $html .= "\n" . '<option value="0">' . esc_html__('- please select a datetime -', 'event_espresso')  . '</option>';
        // offer ticket quantities from the min to the max
        foreach ($datetimes as $datetime) {
            if ( ! $datetime instanceof \EE_Datetime) {
                continue;
            }
            $html .= "\n" . '<option value="' . $datetime->date_range('Y_m_d', '-' ) . '">';
            $html .= $datetime->date_range($this->date_format);
            $html .= '</option>';
        }
        $html .= "\n</select>";
        $html .= \EEH_HTML::divx();
        $html .= \EEH_HTML::br(2);
        $html .= \EEH_HTML::divx();
        return $html;
    }

    /**
     * displaySubmitButton
     *
     * @access        public
     * @return        string
     * @throws \EE_Error
     */
    public function displaySubmitButton()
    {
        $html = '';
        if ( ! is_admin() ) {
            // standard TS displayed with submit button, ie: "Register Now"
            if ( apply_filters( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false ) ) {
                $btn_text = apply_filters(
                    'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__btn_text',
                    esc_html__( 'Register Now', 'event_espresso' ),
                    $this->event
                );
                $external_url = $this->event->external_url();
                $html .= \EEH_HTML::div(
                	'', 'ticket-selector-submit-' . $this->event->ID() . '-btn-wrap', 'ticket-selector-submit-btn-wrap'
                );
	            $html .= \EEH_HTML::span(
		            esc_html__( 'please select a datetime', 'event_espresso' ),
		            '', 'ticket-selector-disabled-submit-btn-msg important-notice'
	            );
	            $html .= '<input id="ticket-selector-submit-' . $this->event->ID() . '-btn"';
                $html .= ' class="ticket-selector-submit-btn ';
                $html .= empty( $external_url ) ? 'ticket-selector-submit-ajax"' : '"';
                $html .= ' type="submit" value="' . $btn_text . '" />';
                $html .= \EEH_HTML::divx();
                $html .= apply_filters(
                    'FHEE__EE_Ticket_Selector__after_ticket_selector_submit',
                    '',
                    $this->event
                );
                $html .= $this->ticketSelectorEndDiv();
                $html .= '<br/>' . $this->formClose();
            } else if (
                // a "Dude Where's my Ticket Selector?" (DWMTS) type event (ie: $_max_atndz === 1)
                $this->getMaxAttendees() === 1
                // and the event is sold out
                && $this->event->is_sold_out()
            ) {
                // then instead of a View Details or Submit button, just display a "Sold Out" message
                $html .= apply_filters(
                    'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__sold_out_msg',
                    sprintf(
                        esc_html__(
                            '%1$s"%2$s" is currently sold out.%4$sPlease check back again later, as spots may become available.%3$s',
                            'event_espresso'
                        ),
                        '<p class="no-ticket-selector-msg clear-float">',
                        $this->event->name(),
                        '</p>',
                        '<br />'
                    ),
                    $this->event
                );
                // sold out DWMTS event, no TS, no submit or view details button, but has additional content
                $html .= $this->ticketSelectorEndDiv();
            } else if (
                $this->getMaxAttendees() === 1
                && apply_filters( 'FHEE__EE_Ticket_Selector__hide_ticket_selector', false )
                && ! is_single()
            ) {
                // this is a "Dude Where's my Ticket Selector?" (DWMTS) type event,
                // but no tickets are available, so display event's "View Details" button.
                // it is being viewed via somewhere other than a single post
                $html .= $this->displayViewDetailsButton( true );
            } else if ( is_archive() ) {
                // event list, no tickets available so display event's "View Details" button
                $html .= $this->ticketSelectorEndDiv();
                $html .= $this->displayViewDetailsButton();
            } else {
                // no submit or view details button, and no additional content
                $html .= $this->ticketSelectorEndDiv();
            }
            if ( ! $this->iframe && ! is_archive() ) {
                $html .= \EEH_Template::powered_by_event_espresso('', '', array('utm_content' => 'ticket_selector'));
            }
        }
        return $html;
    }



    /**
     * displayViewDetailsButton
     *
     * @param bool $DWMTS indicates a "Dude Where's my Ticket Selector?" (DWMTS) type event
     *                    (ie: $_max_atndz === 1) where there are no available tickets,
     *                    either because they are sold out, expired, or not yet on sale.
     *                    In this case, we need to close the form BEFORE adding any closing divs
     * @return string
     * @throws \EE_Error
     */
    public function displayViewDetailsButton( $DWMTS = false )
    {
        if ( ! $this->event->get_permalink() ) {
            \EE_Error::add_error(
                esc_html__( 'The URL for the Event Details page could not be retrieved.', 'event_espresso' ),
                __FILE__, __FUNCTION__, __LINE__
            );
        }
        $view_details_btn = '<form method="POST" action="' . $this->event->get_permalink() . '">';
        $btn_text = apply_filters(
            'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_text',
            esc_html__( 'View Details', 'event_espresso' ),
            $this->event
        );
        $view_details_btn .= '<input id="ticket-selector-submit-'
                             . $this->event->ID()
                             . '-btn" class="ticket-selector-submit-btn view-details-btn" type="submit" value="'
                             . $btn_text
                             . '" />';
        $view_details_btn .= apply_filters( 'FHEE__EE_Ticket_Selector__after_view_details_btn', '', $this->event );
        if ( $DWMTS ) {
            $view_details_btn .= $this->formClose();
            $view_details_btn .= $this->ticketSelectorEndDiv();
            $view_details_btn .= '<br/>';
        } else {
            $view_details_btn .= $this->clearTicketSelector();
            $view_details_btn .= '<br/>';
            $view_details_btn .= $this->formClose();
        }
        return $view_details_btn;
    }



    /**
     * @return string
     */
    public function ticketSelectorEndDiv()
    {
        return '<div class="clear"></div></div>';
    }



    /**
     * @return string
     */
    public function clearTicketSelector()
    {
        // standard TS displayed, appears after a "Register Now" or "view Details" button
        return '<div class="clear"></div>';
    }



    /**
     * @access        public
     * @return        string
     */
    public function formClose()
    {
        return '</form>';
    }



}
// End of file DisplayTicketSelector.php
// Location: /DisplayTicketSelector.php