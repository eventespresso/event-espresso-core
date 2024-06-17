<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Base_Class;
use EE_Datetime;
use EE_Error;
use EE_Event;
use EE_Registry;
use EE_System;
use EE_Tax_Config;
use EE_Ticket;
use EE_Ticket_Selector_Config;
use EEH_Event_View;
use EEH_HTML;
use EEH_Template;
use EEH_URL;
use EEM_Event;
use EEM_Ticket;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\entities\users\CurrentUser;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use WP_Post;

// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
// phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersText

/**
 * Class DisplayTicketSelector
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 */
class DisplayTicketSelector
{
    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var EE_Ticket_Selector_Config
     */
    protected $config;

    /**
     * event that ticket selector is being generated for
     *
     * @access protected
     * @var EE_Event $event
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
     * @var string $date_format
     */
    private $date_format;

    /**
     * @var string $time_format
     */
    private $time_format;

    /**
     * @var boolean $display_full_ui
     */
    private $display_full_ui;

    /**
     * @var CurrentUser
     */
    private $current_user;


    /**
     * DisplayTicketSelector constructor.
     *
     * @param CurrentUser $current_user
     * @param RequestInterface          $request
     * @param EE_Ticket_Selector_Config $config
     * @param bool                      $iframe
     */
    public function __construct(
        CurrentUser $current_user,
        RequestInterface $request,
        EE_Ticket_Selector_Config $config,
        bool $iframe = false
    ) {
        $this->current_user = $current_user;
        $this->request     = $request;
        $this->config      = $config;
        $this->setIframe($iframe);
        $this->date_format = apply_filters(
            'FHEE__EED_Ticket_Selector__display_ticket_selector__date_format',
            get_option('date_format')
        );
        $this->time_format  = apply_filters(
            'FHEE__EED_Ticket_Selector__display_ticket_selector__time_format',
            get_option('time_format')
        );
    }


    /**
     * @return bool
     */
    public function isIframe(): bool
    {
        return $this->iframe;
    }


    /**
     * @param boolean $iframe
     */
    public function setIframe(bool $iframe = true)
    {
        $this->iframe = filter_var($iframe, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * finds and sets the \EE_Event object for use throughout class
     *
     * @param mixed $event
     * @return bool
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    protected function setEvent($event = null): bool
    {
        global $post;
        if ($event === null) {
            $event = $post;
        }
        if ($event instanceof EE_Event) {
            $this->event = $event;
            return true;
        }
        if ($event instanceof WP_Post) {
            if (
                isset($event->EE_Event)
                && $event->EE_Event instanceof EE_Event
                && ( ! $post instanceof WP_Post || $post->ID === $event->EE_Event->ID() )
            ) {
                $this->event = $event->EE_Event;
                return true;
            }
            if (isset($event->post_type) && $event->post_type === EspressoPostType::EVENTS) {
                $event->EE_Event = EEM_Event::instance()->instantiate_class_from_post_object($event);
                $this->event     = $event->EE_Event;
                return true;
            }
        }
        $user_msg = esc_html__('No Event object or an invalid Event object was supplied.', 'event_espresso');
        $dev_msg  = $user_msg . esc_html__(
            'In order to generate a ticket selector, please ensure you are passing either an EE_Event object or a WP_Post object of the post type "espresso_event" to the EE_Ticket_Selector class constructor.',
            'event_espresso'
        );
        EE_Error::add_error($user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__);
        return false;
    }


    /**
     * @return int
     */
    public function getMaxAttendees(): int
    {
        return $this->max_attendees;
    }


    /**
     * @param int $max_attendees
     */
    public function setMaxAttendees(int $max_attendees)
    {
        $this->max_attendees = absint(
            apply_filters(
                'FHEE__EE_Ticket_Selector__display_ticket_selector__max_tickets',
                $max_attendees
            )
        );
    }


    /**
     * Returns whether or not the full ticket selector should be shown or not.
     * Currently, it displays on the frontend (including ajax requests) but not the backend
     *
     * @return bool
     */
    private function display_full_ui(): bool
    {
        if ($this->display_full_ui === null) {
            $this->display_full_ui = ! is_admin() || (defined('DOING_AJAX') && DOING_AJAX);
        }
        return $this->display_full_ui;
    }


    /**
     * creates buttons for selecting number of attendees for an event
     *
     * @param WP_Post|int $event
     * @param bool        $view_details
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws Exception
     */
    public function display($event = null, bool $view_details = false)
    {
        // reset filter for displaying submit button
        remove_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        // poke and prod incoming event till it tells us what it is
        if (! $this->setEvent($event)) {
            return $this->handleMissingEvent();
        }
        // is the event expired ?
        $template_args['event_is_expired'] = ! is_admin() && $this->event->is_expired();
        if ($template_args['event_is_expired']) {
            return is_single()
                ? $this->expiredEventMessage()
                : $this->expiredEventMessage() . $this->displayViewDetailsButton();
        }
        // begin gathering template arguments by getting event status
        $template_args = ['event_status' => $this->event->get_active_status()];
        if (
            $this->activeEventAndShowTicketSelector(
                $event,
                $template_args['event_status'],
                $view_details
            )
        ) {
            return ! is_single() ? $this->displayViewDetailsButton() : '';
        }
        // filter the maximum qty that can appear in the Ticket Selector qty dropdowns
        $this->setMaxAttendees($this->event->additional_limit());
        if ($this->getMaxAttendees() < 1) {
            return $this->ticketSalesClosedMessage();
        }
        // get all tickets for this event ordered by the datetime
        $tickets = $this->getTickets();
        if (count($tickets) < 1) {
            return $this->noTicketAvailableMessage();
        }
        // redirecting to another site for registration ??
        $external_url = (string) $this->event->external_url()
                        && $this->event->external_url() !== get_the_permalink()
            ? $this->event->external_url()
            : '';
        // if redirecting to another site for registration, then we don't load the TS
        $ticket_selector = $external_url
            ? $this->externalEventRegistration()
            : $this->loadTicketSelector($tickets, $template_args);
        // now set up the form (but not for the admin)
        $ticket_selector = $this->display_full_ui()
            ? $this->formOpen($this->event->ID(), $external_url) . $ticket_selector
            : $ticket_selector;
        // submit button and form close tag
        $ticket_selector .= $this->display_full_ui() ? $this->displaySubmitButton($external_url) : '';
        return $ticket_selector;
    }


    /**
     * displayTicketSelector
     * examines the event properties and determines whether a Ticket Selector should be displayed
     *
     * @param WP_Post|int $event
     * @param string      $_event_active_status
     * @param bool        $view_details
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function activeEventAndShowTicketSelector($event, string $_event_active_status, bool $view_details): bool
    {
        $event_post = $this->event instanceof EE_Event ? $this->event->ID() : $event;
        return $this->display_full_ui()
               && (
                   ! $this->event->display_ticket_selector()
                   || $view_details
                   || post_password_required($event_post)
                   || (
                       $_event_active_status !== EE_Datetime::active
                       && $_event_active_status !== EE_Datetime::upcoming
                       && $_event_active_status !== EE_Datetime::sold_out
                       && ! (
                           $_event_active_status === EE_Datetime::inactive
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
     */
    protected function expiredEventMessage(): string
    {
        return '<div class="ee-event-expired-notice"><span class="important-notice">'
           . esc_html__(
               'We\'re sorry, but all tickets sales have ended because the event is expired.',
               'event_espresso'
           )
           . '</span></div><!-- .ee-event-expired-notice -->';
    }


    /**
     * noTicketAvailableMessage
     * notice displayed if event has no more tickets available
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function noTicketAvailableMessage(): string
    {
        $no_ticket_available_msg = esc_html__('We\'re sorry, but all ticket sales have ended.', 'event_espresso');
        if (current_user_can('edit_post', $this->event->ID())) {
            $no_ticket_available_msg .= sprintf(
                esc_html__(
                    '%1$sNote to Event Admin:%2$sNo tickets were found for this event. This effectively turns off ticket sales. Please ensure that at least one ticket is available for if you want people to be able to register.%3$s(click to edit this event)%4$s',
                    'event_espresso'
                ),
                '<div class="ee-attention" style="text-align: left;"><b>',
                '</b><br />',
                '<span class="edit-link"><a class="post-edit-link" href="'
                . get_edit_post_link($this->event->ID())
                . '">',
                '</a></span></div><!-- .ee-attention noTicketAvailableMessage -->'
            );
        }
        return '
            <div class="ee-event-expired-notice">
                <span class="important-notice">' . $no_ticket_available_msg . '</span>
            </div><!-- .ee-event-expired-notice -->';
    }


    /**
     * ticketSalesClosed
     * notice displayed if event ticket sales are turned off
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function ticketSalesClosedMessage(): string
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
                '<span class="edit-link"><a class="post-edit-link" href="'
                . get_edit_post_link($this->event->ID())
                . '">',
                '</a></span></div><!-- .ee-attention ticketSalesClosedMessage -->'
            );
        }
        return '<p><span class="important-notice">' . $sales_closed_msg . '</span></p>';
    }


    /**
     * getTickets
     *
     * @return EE_Base_Class[]|EE_Ticket[]
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    protected function getTickets()
    {
        $show_expired_tickets = is_admin() || $this->config->show_expired_tickets;

        $ticket_query_args = [
            [
                'Datetime.EVT_ID' => $this->event->ID(),
                'TKT_visibility'  => ['>', EEM_Ticket::TICKET_VISIBILITY_NONE_VALUE],
            ],
            'order_by' => [
                'TKT_required'           => 'DESC',
                'TKT_order'              => 'ASC',
                'TKT_start_date'         => 'ASC',
                'TKT_end_date'           => 'ASC',
                'Datetime.DTT_EVT_start' => 'DESC',
            ],
        ];

        $datetime_id = $this->request->getRequestParam('datetime', 0, 'int');
        if ($datetime_id) {
            $ticket_query_args[0]['Datetime.DTT_ID'] = $datetime_id;
        }

        if (! $show_expired_tickets) {
            // use the correct applicable time query depending on what version of core is being run.
            $current_time                         = method_exists('EEM_Datetime', 'current_time_for_query')
                ? time()
                : current_time('timestamp');
            $ticket_query_args[0]['TKT_end_date'] = ['>', $current_time];
        }
        /** @var EE_Ticket[] $tickets */
        $tickets = EEM_Ticket::instance()->get_all($ticket_query_args);
        // remove tickets based on their visibility and the current user's allowed access (crudely based on roles)
        // and filter the returned results
         $tickets = array_filter($tickets, [$this, 'ticketVisibilityFilter']);
        return (array) apply_filters(
            'FHEE__EventEspresso_modules_ticketSelector_DisplayTicketSelector__getTickets',
            $tickets,
            $ticket_query_args,
            $this
        );
    }


    /**
     * returns true if any of the following is true:
     *  - ticket visibility is PUBLIC
     *  - ticket visibility is MEMBERS_ONLY and user is logged in
     *  - ticket visibility is ADMINS_ONLY when user IS logged in as an admin
     *  - ticket visibility is ADMIN_UI_ONLY when ticket selector is being viewed via an admin page UI
     *
     * @param EE_Ticket $ticket
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     * @since   5.0.0.p
     */
    public function ticketVisibilityFilter(EE_Ticket $ticket): bool
    {
        return $ticket->isPublicOnly()
               || ($ticket->isMembersOnly() && $this->current_user->isLoggedIn())
               || (
                   $ticket->isAdminsOnly()
                   && ($this->current_user->isEventManager() || $this->current_user->isSuperAdmin())
               )
               || ($ticket->isAdminUiOnly() && is_admin());
    }


    /**
     * loadTicketSelector
     * begins to assemble template arguments
     * and decides whether to load a "simple" ticket selector, or the standard
     *
     * @param EE_Ticket[] $tickets
     * @param array       $template_args
     * @return TicketSelectorSimple|TicketSelectorStandard
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function loadTicketSelector(array $tickets, array $template_args)
    {
        $template_args['event']            = $this->event;
        $template_args['EVT_ID']           = $this->event->ID();
        $template_args['event_is_expired'] = $this->event->is_expired();
        $template_args['max_atndz']        = $this->getMaxAttendees();
        $template_args['date_format']      = $this->date_format;
        $template_args['time_format']      = $this->time_format;
        /**
         * Filters the anchor ID used when redirecting to the Ticket Selector if no quantity selected
         *
         * @param string  '#tkt-slctr-tbl-' . $EVT_ID The html ID to anchor to
         * @param int $EVT_ID The Event ID
         * @since 4.9.13
         */
        $template_args['anchor_id']    = apply_filters(
            'FHEE__EE_Ticket_Selector__redirect_anchor_id',
            '#tkt-slctr-tbl-' . $this->event->ID(),
            $this->event->ID()
        );
        $template_args['tickets']      = $tickets;
        $template_args['ticket_count'] = count($tickets);
        $ticket_selector               = $this->simpleTicketSelector($tickets, $template_args);
        if ($ticket_selector instanceof TicketSelectorSimple) {
            return $ticket_selector;
        }
        return new TicketSelectorStandard(
            $this->config,
            $this->getTaxConfig(),
            $this->event,
            $tickets,
            $this->getMaxAttendees(),
            $template_args,
            $this->date_format,
            $this->time_format
        );
    }


    /**
     * simpleTicketSelector
     * there's one ticket, and max attendees is set to one,
     * so if the event is free, then this is a "simple" ticket selector
     * a.k.a. "Dude Where's my Ticket Selector?"
     *
     * @param EE_Ticket[] $tickets
     * @param array       $template_args
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function simpleTicketSelector(array $tickets, array $template_args)
    {
        // if there is only ONE ticket with a max qty of ONE
        if (count($tickets) > 1 || $this->getMaxAttendees() !== 1) {
            return '';
        }
        /** @var EE_Ticket $ticket */
        $ticket = reset($tickets);
        // if the ticket is free... then not much need for the ticket selector
        if (
            apply_filters(
                'FHEE__ticket_selector_chart_template__hide_ticket_selector',
                $ticket->is_free(),
                $this->event->ID()
            )
        ) {
            return new TicketSelectorSimple(
                $this->event,
                $ticket,
                $this->getMaxAttendees(),
                $template_args
            );
        }
        return '';
    }


    /**
     * externalEventRegistration
     *
     * @return string
     */
    public function externalEventRegistration(): string
    {
        // if not we still need to trigger the display of the submit button
        add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        // display notice to admin that registration is external
        return $this->display_full_ui()
            ? esc_html__(
                'Registration is at an external URL for this event.',
                'event_espresso'
            )
            : '';
    }


    /**
     * formOpen
     *
     * @param int    $ID
     * @param string $external_url
     * @return        string
     */
    public function formOpen(int $ID = 0, string $external_url = ''): string
    {
        // if redirecting, we don't need any anything else
        if ($external_url) {
            $html = '<form method="GET" ';
            $html .= 'action="' . EEH_URL::refactor_url($external_url) . '" ';
            $html .= 'name="ticket-selector-form-' . $ID . '"';
            // open link in new window ?
            $html       .= apply_filters(
                'FHEE__EventEspresso_modules_ticket_selector_DisplayTicketSelector__formOpen__external_url_target_blank',
                $this->isIframe(),
                $this
            )
                ? ' target="_blank"'
                : '';
            $html       .= '>';
            $query_args = EEH_URL::get_query_string($external_url);
            foreach ((array) $query_args as $query_arg => $value) {
                $html .= '<input type="hidden" name="' . $query_arg . '" value="' . $value . '">';
            }
            return $html;
        }
        // if there is no submit button, then don't start building a form
        // because the "View Details" button will build its own form
        if (! apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false)) {
            return '';
        }
        $checkout_url = EEH_Event_View::event_link_url($ID);
        if (! $checkout_url) {
            EE_Error::add_error(
                esc_html__('The URL for the Event Details page could not be retrieved.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        // set no cache headers and constants
        EE_System::do_not_cache();
        $html = '<form method="POST" ';
        $html .= 'action="' . $checkout_url . '" ';
        $html .= 'name="ticket-selector-form-' . $ID . '"';
        $html .= $this->iframe ? ' target="_blank"' : '';
        $html .= '>';
        $html .= '<input type="hidden" name="ee" value="process_ticket_selections">';
        return apply_filters('FHEE__EE_Ticket_Selector__ticket_selector_form_open__html', $html, $this->event);
    }


    /**
     * displaySubmitButton
     *
     * @param string $external_url
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function displaySubmitButton(string $external_url = ''): string
    {
        $html = '';
        if ($this->display_full_ui()) {
            // standard TS displayed with submit button, ie: "Register Now"
            if (apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false)) {
                $html .= $this->displayRegisterNowButton();
                $html .= empty($external_url)
                    ? $this->ticketSelectorEndDiv()
                    : $this->clearTicketSelector();
                $html .= '<br/>' . $this->formClose();
            } elseif ($this->getMaxAttendees() === 1) {
                // its a "Dude Where's my Ticket Selector?" (DWMTS) type event (ie: $_max_atndz === 1)
                if ($this->event->is_sold_out()) {
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
                    if (
                        apply_filters(
                            'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__no_tickets_but_display_register_now_button',
                            false,
                            $this->event
                        )
                    ) {
                        $html .= $this->displayRegisterNowButton();
                    }
                    // sold out DWMTS event, no TS, no submit or view details button, but has additional content
                    $html .= $this->ticketSelectorEndDiv();
                } elseif (
                    apply_filters('FHEE__EE_Ticket_Selector__hide_ticket_selector', false)
                    && ! is_single()
                ) {
                    // this is a "Dude Where's my Ticket Selector?" (DWMTS) type event,
                    // but no tickets are available, so display event's "View Details" button.
                    // it is being viewed via somewhere other than a single post
                    $html .= $this->displayViewDetailsButton(true);
                } else {
                    $html .= $this->ticketSelectorEndDiv();
                }
            } elseif (is_archive()) {
                // event list, no tickets available so display event's "View Details" button
                $html .= $this->ticketSelectorEndDiv();
                $html .= $this->displayViewDetailsButton();
            } else {
                if (
                    apply_filters(
                        'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__no_tickets_but_display_register_now_button',
                        false,
                        $this->event
                    )
                ) {
                    $html .= $this->displayRegisterNowButton();
                }
                // no submit or view details button, and no additional content
                $html .= $this->ticketSelectorEndDiv();
            }
            if (! $this->iframe && ! is_archive()) {
                $html .= EEH_Template::powered_by_event_espresso('', '', ['utm_content' => 'ticket_selector']);
            }
        }
        return apply_filters(
            'FHEE__EventEspresso_modules_ticket_selector_DisplayTicketSelector__displaySubmitButton__html',
            $html,
            $this->event,
            $this
        );
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function displayRegisterNowButton(): string
    {
        $btn_text     = apply_filters(
            'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__btn_text',
            esc_html__('Register Now', 'event_espresso'),
            $this->event
        );
        $external_url = (string) $this->event->external_url()
                        && $this->event->external_url() !== get_the_permalink()
            ? $this->event->external_url()
            : '';
        $html         = EEH_HTML::div(
            '',
            'ticket-selector-submit-' . $this->event->ID() . '-btn-wrap',
            'ticket-selector-submit-btn-wrap'
        );
        $html         .= '<input id="ticket-selector-submit-' . $this->event->ID() . '-btn"';
        $html         .= ' class="ticket-selector-submit-btn ';
        $html         .= empty($external_url) ? 'ticket-selector-submit-ajax"' : '"';
        $html         .= ' type="submit" value="' . $btn_text . '" data-ee-disable-after-recaptcha="true" />';
        $html         .= EEH_HTML::divx() . '<!-- .ticket-selector-submit-btn-wrap -->';
        $html         .= apply_filters(
            'FHEE__EE_Ticket_Selector__after_ticket_selector_submit',
            '',
            $this->event,
            $this->iframe
        );
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function displayViewDetailsButton(bool $DWMTS = false): string
    {
        if (! $this->event->get_permalink()) {
            EE_Error::add_error(
                esc_html__('The URL for the Event Details page could not be retrieved.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $view_details_btn = '<form method="GET" action="';
        $view_details_btn .= apply_filters(
            'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_url',
            $this->event->get_permalink(),
            $this->event
        );
        $view_details_btn .= '"';
        // open link in new window ?
        $view_details_btn .= apply_filters(
            'FHEE__EventEspresso_modules_ticket_selector_DisplayTicketSelector__displayViewDetailsButton__url_target_blank',
            $this->isIframe(),
            $this
        )
            ? ' target="_blank"'
            : '';
        $view_details_btn .= '>';
        $btn_text         = apply_filters(
            'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_text',
            esc_html__('View Details', 'event_espresso'),
            $this->event
        );
        $view_details_btn .= '<input id="ticket-selector-submit-'
                             . $this->event->ID()
                             . '-btn" class="ticket-selector-submit-btn view-details-btn" type="submit" value="'
                             . $btn_text
                             . '" />';
        $view_details_btn .= apply_filters('FHEE__EE_Ticket_Selector__after_view_details_btn', '', $this->event);
        if ($DWMTS) {
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
    public function ticketSelectorEndDiv(): string
    {
        return $this->clearTicketSelector() . '</div><!-- ticketSelectorEndDiv -->';
    }


    /**
     * @return string
     */
    public function clearTicketSelector(): string
    {
        // standard TS displayed, appears after a "Register Now" or "view Details" button
        return '<div class="clear"></div><!-- clearTicketSelector -->';
    }


    /**
     * @access        public
     * @return        string
     */
    public function formClose(): string
    {
        return '</form>';
    }


    /**
     * handleMissingEvent
     * Returns either false or an error to display when no valid event is passed.
     *
     * @return string
     * @throws ExceptionStackTraceDisplay
     * @throws InvalidInterfaceException
     * @throws Exception
     */
    protected function handleMissingEvent()
    {
        // If this is not an iFrame request, simply return false.
        if (! $this->isIframe()) {
            return '';
        }
        // This is an iFrame so return an error.
        // Display stack trace if WP_DEBUG is enabled.
        if (WP_DEBUG === true && current_user_can('edit_pages')) {
            $event_id = $this->request->getRequestParam('event', 0, 'int');
            new ExceptionStackTraceDisplay(
                new InvalidArgumentException(
                    sprintf(
                        esc_html__(
                            'A valid Event ID is required to display the ticket selector.%3$sAn Event with an ID of "%1$s" could not be found.%3$sPlease verify that the embed code added to this post\'s content includes an "%2$s" argument and that its value corresponds to a valid Event ID.',
                            'event_espresso'
                        ),
                        $event_id,
                        'event',
                        '<br />'
                    )
                )
            );
            return '';
        }
        // If WP_DEBUG is not enabled, display a message stating the event could not be found.
        return EEH_HTML::p(
            esc_html__(
                'A valid Event could not be found. Please contact the event administrator for assistance.',
                'event_espresso'
            )
        );
    }


    /**
     * @return EE_Tax_Config
     * @since   4.10.14.p
     */
    protected function getTaxConfig()
    {
        return isset(EE_Registry::instance()->CFG->tax_settings)
               && EE_Registry::instance()->CFG->tax_settings instanceof EE_Tax_Config
            ? EE_Registry::instance()->CFG->tax_settings
            : new EE_Tax_Config();
    }
}
