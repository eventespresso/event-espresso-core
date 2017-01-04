<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Ticket Selector  class
 *
 * @package           Event Espresso
 * @subpackage        includes/classes/EE_Ticket_Selector.class.php
 * @author            Brent Christensen
 */
class EED_Ticket_Selector extends EED_Module
{

    const debug = false;    //	true false

    /**
     * event that ticket selector is being generated for
     *
     * @access protected
     * @var \EE_Event
     */
    protected static $_event;

    /**
     * array of datetimes and the spaces available for them
     *
     * @access private
     * @var array
     */
    private static $_available_spaces = array();

    /**
     * max attendees that can register for event at one time
     *
     * @access private
     * @var int
     */
    private static $_max_atndz = EE_INF;



    /**
     * Used to flag when the ticket selector is being called from an external iframe.
     *
     * @var bool
     */
    protected static $_in_iframe = false;



    /**
     * @return EED_Ticket_Selector
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }



    protected function set_config()
    {
        $this->set_config_section('template_settings');
        $this->set_config_class('EE_Ticket_Selector_Config');
        $this->set_config_name('EED_Ticket_Selector');
    }



    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks()
    {
        // routing
        EE_Config::register_route('iframe', 'EED_Ticket_Selector', 'ticket_selector_iframe', 'ticket_selector');
        EE_Config::register_route('process_ticket_selections', 'EED_Ticket_Selector', 'process_ticket_selections');
        EE_Config::register_route('cancel_ticket_selections', 'EED_Ticket_Selector', 'cancel_ticket_selections');
        add_action('wp_loaded', array('EED_Ticket_Selector', 'set_definitions'), 2);
        add_action('AHEE_event_details_header_bottom', array('EED_Ticket_Selector', 'display_ticket_selector'), 10, 1);
        add_action('wp_enqueue_scripts', array('EED_Ticket_Selector', 'load_tckt_slctr_assets'), 10);
    }



    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks_admin()
    {
        add_action('wp_loaded', array('EED_Ticket_Selector', 'set_definitions'), 2);
        //add button for iframe code to event editor.
        add_filter('get_sample_permalink_html', array('EED_Ticket_Selector', 'iframe_code_button'), 10, 2);
        add_action('admin_enqueue_scripts', array('EED_Ticket_Selector', 'load_tckt_slctr_assets_admin'), 10);
    }



    /**
     *    set_definitions
     *
     * @access    public
     * @return    void
     */
    public static function set_definitions()
    {
        define('TICKET_SELECTOR_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets' . DS);
        define('TICKET_SELECTOR_TEMPLATES_PATH', str_replace('\\', DS, plugin_dir_path(__FILE__)) . 'templates' . DS);
        //if config is not set, initialize
        //If config is not set, set it.
        if (EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector === null) {
            EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector = new EE_Ticket_Selector_Config();
        }
        EE_Registry::$i18n_js_strings['ts_embed_iframe_title'] = __('Copy and Paste the following:', 'event_espresso');
    }



    /**
     *    gets the ball rolling
     *
     * @access public
     * @param    WP $WP
     * @return void
     */
    public function run($WP)
    {
    }



    /**
     * ticket_selector_iframe
     *
     * @access    public
     * @return    void
     * @throws \EE_Error
     */
    public function ticket_selector_iframe()
    {
        self::$_in_iframe = true;
        /** @type EEM_Event $EEM_Event */
        $EEM_Event = EE_Registry::instance()->load_model('Event');
        $event = $EEM_Event->get_one_by_ID(
            EE_Registry::instance()->REQ->get('event', 0)
        );
        EE_Registry::instance()->REQ->set_espresso_page(true);
        $template_args['ticket_selector'] = EED_Ticket_Selector::display_ticket_selector($event);
        $template_args['css'] = apply_filters(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__css',
            array(
                TICKET_SELECTOR_ASSETS_URL . 'ticket_selector_embed.css?ver=' . EVENT_ESPRESSO_VERSION,
                TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css?ver=' . EVENT_ESPRESSO_VERSION,
                includes_url('css/dashicons.min.css?ver=' . $GLOBALS['wp_version']),
                EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css?ver=' . EVENT_ESPRESSO_VERSION,
            )
        );
        EE_Registry::$i18n_js_strings['ticket_selector_iframe'] = true;
        EE_Registry::$i18n_js_strings['EEDTicketSelectorMsg'] = esc_html__('Please choose at least one ticket before continuing.',
            'event_espresso');
        $template_args['eei18n'] = apply_filters(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__eei18n_js_strings',
            EE_Registry::localize_i18n_js_strings()
        );
        $template_args['js'] = apply_filters(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
            array(
                includes_url('js/jquery/jquery.js?ver=' . $GLOBALS['wp_version']),
                EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js?ver=' . EVENT_ESPRESSO_VERSION,
                TICKET_SELECTOR_ASSETS_URL . 'ticket_selector_iframe_embed.js?ver=' . EVENT_ESPRESSO_VERSION,
            )
        );
        $template_args['notices'] = EEH_Template::display_template(
            EE_TEMPLATES . 'espresso-ajax-notices.template.php',
            array(),
            true
        );
        EEH_Template::display_template(
            TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_chart_iframe.template.php',
            $template_args
        );
        exit;
    }



    /**
     * Adds an iframe embed code button to the Event editor.
     *
     * @param string $permalink_string The current html string for the permalink section.
     * @param int    $id               The post id for the event.
     * @return string The new html string for the permalink area.
     */
    public static function iframe_code_button($permalink_string, $id )
    {
        //make sure this is ONLY when editing and the event id has been set.
        if ( ! empty($id)) {
            $post = get_post($id);
            //if NOT event then let's get out.
            if ($post->post_type !== 'espresso_events') {
                return $permalink_string;
            }
            $permalink_string .= '<a id="js-ticket-selector-embed-trigger" class="button button-small" href="#"  tabindex="-1">'
                                 . __('Embed', 'event_espresso')
                                 . '</a> ';
            $ticket_selector_url = add_query_arg(array('ticket_selector' => 'iframe', 'event' => $id), site_url());
            $iframe_string = esc_html(
                '<iframe src="' . $ticket_selector_url . '" width="100%" height="100%"></iframe>'
            );
            $permalink_string .= '
<div id="js-ts-iframe" style="display:none">
	<div style="width:100%; height: 500px;">
		' . $iframe_string . '
	</div>
</div>';
        }
        return $permalink_string;
    }



    /**
     *    finds and sets the EE_Event object for use throughout class
     *
     * @access    public
     * @param    mixed $event
     * @return    bool
     */
    protected static function set_event($event = null)
    {
        if ($event === null) {
            global $post;
            $event = $post;
        }
        if ($event instanceof EE_Event) {
            self::$_event = $event;
        } else if ($event instanceof WP_Post ) {
            if ( isset($event->EE_Event) && $event->EE_Event instanceof EE_Event) {
                self::$_event = $event->EE_Event;
            } else if ( $event->post_type === 'espresso_events') {
                $event->EE_Event = EEM_Event::instance()->instantiate_class_from_post_object($event);
                self::$_event = $event->EE_Event;
            }
        } else {
            $user_msg = __('No Event object or an invalid Event object was supplied.', 'event_espresso');
            $dev_msg = $user_msg
                       . __('In order to generate a ticket selector, please ensure you are passing either an EE_Event object or a WP_Post object of the post type "espresso_event" to the EE_Ticket_Selector class constructor.',
                    'event_espresso');
            EE_Error::add_error($user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        return true;
    }



    /**
     * creates buttons for selecting number of attendees for an event
     *
     * @access public
     * @param EE_Event $event
     * @param bool     $view_details
     * @return string
     * @throws \EE_Error
     */
    public static function display_ticket_selector($event = null, $view_details = false)
    {
        // reset filter for displaying submit button
        remove_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
        // poke and prod incoming event till it tells us what it is
        if ( ! EED_Ticket_Selector::set_event($event)) {
            return false;
        }
        $event_post = self::$_event instanceof EE_Event ? self::$_event->ID() : $event;
        // grab event status
        $_event_active_status = self::$_event->get_active_status();
        if (
            ! is_admin()
            && (
                ! self::$_event->display_ticket_selector()
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
            )
        ) {
            return ! is_single() ? EED_Ticket_Selector::display_view_details_btn() : '';
        }
        $template_args = array();
        $template_args['event_status'] = $_event_active_status;
        $template_args['date_format'] = apply_filters('FHEE__EED_Ticket_Selector__display_ticket_selector__date_format',
            get_option('date_format'));
        $template_args['time_format'] = apply_filters('FHEE__EED_Ticket_Selector__display_ticket_selector__time_format',
            get_option('time_format'));
        $template_args['EVT_ID'] = self::$_event->ID();
        $template_args['event'] = self::$_event;
        // is the event expired ?
        $template_args['event_is_expired'] = self::$_event->is_expired();
        if ($template_args['event_is_expired']) {
            return '<div class="ee-event-expired-notice"><span class="important-notice">'
                   . __('We\'re sorry, but all tickets sales have ended because the event is expired.',
                'event_espresso')
                   . '</span></div>';
        }
        $ticket_query_args = array(
            array('Datetime.EVT_ID' => self::$_event->ID()),
            'order_by' => array(
                'TKT_order'              => 'ASC',
                'TKT_required'           => 'DESC',
                'TKT_start_date'         => 'ASC',
                'TKT_end_date'           => 'ASC',
                'Datetime.DTT_EVT_start' => 'DESC',
            ),
        );
        if ( ! EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets) {
            //use the correct applicable time query depending on what version of core is being run.
            $current_time = method_exists('EEM_Datetime', 'current_time_for_query') ? time()
                : current_time('timestamp');
            $ticket_query_args[0]['TKT_end_date'] = array('>', $current_time);
        }
        // get all tickets for this event ordered by the datetime
        $template_args['tickets'] = EEM_Ticket::instance()->get_all($ticket_query_args);
        if (count($template_args['tickets']) < 1) {
            return '<div class="ee-event-expired-notice"><span class="important-notice">'
                   . __('We\'re sorry, but all ticket sales have ended.', 'event_espresso')
                   . '</span></div>';
        }
        // filter the maximum qty that can appear in the Ticket Selector qty dropdowns
        \EED_Ticket_Selector::$_max_atndz = apply_filters(
            'FHEE__EE_Ticket_Selector__display_ticket_selector__max_tickets',
            self::$_event->additional_limit()
        );
        $template_args['max_atndz'] = \EED_Ticket_Selector::$_max_atndz;
        if ($template_args['max_atndz'] < 1) {
            $sales_closed_msg = __('We\'re sorry, but ticket sales have been closed at this time. Please check back again later.',
                'event_espresso');
            if (current_user_can('edit_post', self::$_event->ID())) {
                $sales_closed_msg .= sprintf(
                    __('%sNote to Event Admin:%sThe "Maximum number of tickets allowed per order for this event" in the Event Registration Options has been set to "0". This effectively turns off ticket sales. %s(click to edit this event)%s',
                        'event_espresso'),
                    '<div class="ee-attention" style="text-align: left;"><b>',
                    '</b><br />',
                    $link = '<span class="edit-link"><a class="post-edit-link" href="'
                            . get_edit_post_link(self::$_event->ID())
                            . '">',
                    '</a></span></div>'
                );
            }
            return '<p><span class="important-notice">' . $sales_closed_msg . '</span></p>';
        }
        $templates['ticket_selector'] = TICKET_SELECTOR_TEMPLATES_PATH . 'ticket_selector_chart.template.php';
        $templates['ticket_selector'] = apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector__template_path',
            $templates['ticket_selector'], self::$_event);
        // redirecting to another site for registration ??
        $external_url = self::$_event->external_url() !== null || self::$_event->external_url() !== ''
            ? self::$_event->external_url() : false;
        // if not redirecting to another site for registration
        if ( ! $external_url) {
            // then display the ticket selector
            $ticket_selector = EEH_Template::locate_template($templates['ticket_selector'], $template_args);
        } else {
            // if not we still need to trigger the display of the submit button
            add_filter('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true');
            //display notice to admin that registration is external
            $ticket_selector = ! is_admin() ? ''
                : __('Registration is at an external URL for this event.', 'event_espresso');
        }
        // now set up the form (but not for the admin)
        $ticket_selector = ! is_admin()
            ? EED_Ticket_Selector::ticket_selector_form_open(
                self::$_event->ID(),
                $external_url
            ) . $ticket_selector
            : $ticket_selector;
        // submit button and form close tag
        $ticket_selector .= ! is_admin() ? EED_Ticket_Selector::display_ticket_selector_submit($external_url) : '';
        // set no cache headers and constants
        EE_System::do_not_cache();
        return $ticket_selector;
    }



    /**
     *    ticket_selector_form_open
     *
     * @access        public
     * @param        int    $ID
     * @param        string $external_url
     * @return        string
     */
    public static function ticket_selector_form_open($ID = 0, $external_url = '')
    {
        // if redirecting, we don't need any anything else
        if ($external_url) {
            $html = '<form method="GET" action="' . EEH_URL::refactor_url($external_url) . '"';
            // open link in new window ?
            $html .= apply_filters(
                'FHEE__EventEspresso_modules_ticket_selector_DisplayTicketSelector__formOpen__external_url_target_blank',
                false
            )
                ? ' target="_blank"'
                : '';
            $html .= '>';
            $query_args = (array)EEH_URL::get_query_string($external_url);
            foreach ($query_args as $query_arg => $value) {
                $html .= '
				<input type="hidden" name="' . $query_arg . '" value="' . $value . '">';
            }
            return $html;
        }
        // if there is no submit button, then don't start building a form
        // because the "View Details" button will build its own form
        if ( ! apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false)) {
            return '';
        }
        $checkout_url = EEH_Event_View::event_link_url($ID);
        if ( ! $checkout_url) {
            EE_Error::add_error(__('The URL for the Event Details page could not be retrieved.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__);
        }
        $extra_params = self::$_in_iframe ? ' target="_blank"' : '';
        $html = '<form method="POST" action="' . $checkout_url . '"' . $extra_params . '>';
        $html .= wp_nonce_field('process_ticket_selections', 'process_ticket_selections_nonce_' . $ID, true, false);
        $html .= '<input type="hidden" name="ee" value="process_ticket_selections">';
        $html = apply_filters('FHEE__EE_Ticket_Selector__ticket_selector_form_open__html', $html, self::$_event);
        return $html;
    }



    /**
     * display_ticket_selector_submit
     *
     * @param        string $external_url
     * @return        string
     * @throws \EE_Error
     */
    public static function display_ticket_selector_submit($external_url = '')
    {
        $html = '';
        if ( ! is_admin()) {
            // standard TS displayed with submit button, ie: "Register Now"
            if (apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false)) {
                $html .= \EED_Ticket_Selector::display_register_now_button();
                $html .= empty($external_url) ?
                    \EED_Ticket_Selector::no_tkt_slctr_end_dv()
                    : \EED_Ticket_Selector::clear_tkt_slctr();
                $html .= '<br/>' . \EED_Ticket_Selector::ticket_selector_form_close();
            } else if ( EED_Ticket_Selector::$_max_atndz === 1 ) {
                // its a "Dude Where's my Ticket Selector?" (DWMTS) type event (ie: $_max_atndz === 1)
                if ( EED_Ticket_Selector::$_event->is_sold_out() ) {
                    // then instead of a View Details or Submit button, just display a "Sold Out" message
                    $html .= apply_filters(
                        'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__sold_out_msg',
                        sprintf(
                            __(
                                '%1$s"%2$s" is currently sold out.%4$sPlease check back again later, as spots may become available.%3$s',
                                'event_espresso'
                            ),
                            '<p class="no-ticket-selector-msg clear-float">',
                            EED_Ticket_Selector::$_event->name(),
                            '</p>',
                            '<br />'
                        ),
                        EED_Ticket_Selector::$_event
                    );
                    if (
                        apply_filters(
                            'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__no_tickets_but_display_register_now_button',
                            false,
                            EED_Ticket_Selector::$_event
                        )
                    ) {
                        $html .= \EED_Ticket_Selector::display_register_now_button();
                    }
                    // sold out DWMTS event, no TS, no submit or view details button, but has additional content
                    $html .= \EED_Ticket_Selector::no_tkt_slctr_end_dv();
                } else if (
                    apply_filters('FHEE__EE_Ticket_Selector__hide_ticket_selector', false)
                    && ! is_single()
                ) {
                    // this is a "Dude Where's my Ticket Selector?" (DWMTS) type event,
                    // but no tickets are available, so display event's "View Details" button.
                    // it is being viewed via somewhere other than a single post
                    $html .= EED_Ticket_Selector::display_view_details_btn(true);
                }
            } else if (is_archive()) {
                // event list, no tickets available so display event's "View Details" button
                $html .= \EED_Ticket_Selector::no_tkt_slctr_end_dv();
                $html .= EED_Ticket_Selector::display_view_details_btn();
            } else {
                if (
                    apply_filters(
                        'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__no_tickets_but_display_register_now_button',
                        false,
                        EED_Ticket_Selector::$_event
                    )
                ) {
                    $html .= \EED_Ticket_Selector::display_register_now_button();
                }
                // no submit or view details button, and no additional content
                $html .= \EED_Ticket_Selector::no_tkt_slctr_end_dv();
            }
            if ( ! is_archive()) {
                $html .= \EEH_Template::powered_by_event_espresso('', '', array('utm_content' => 'ticket_selector'));
            }
        }
        return $html;
    }



    /**
     * @return string
     */
    public static function clear_tkt_slctr()
    {
        // standard TS displayed, appears after a "Register Now" or "view Details" button
        return '<div class="clear"></div>';
    }



    /**
     * @deprecated 4.9.13
     * @return string
     */
    public static function tkt_slctr_end_dv()
    {
        return \EED_Ticket_Selector::clear_tkt_slctr();
    }



    /**
     * @return string
     */
    public static function no_tkt_slctr_end_dv()
    {
        // DWMTS event, no TS, appears after a "Register Now" or "view Details" button
        return '<div class="clear"></div></div>';
    }



    /**
     *    ticket_selector_form_close
     *
     * @access        public
     * @access        public
     * @return        string
     */
    public static function ticket_selector_form_close()
    {
        return '</form>';
    }



    /**
     * @return string
     * @throws \EE_Error
     */
    public static function display_register_now_button()
    {
        $btn_text = apply_filters(
            'FHEE__EE_Ticket_Selector__display_ticket_selector_submit__btn_text',
            __('Register Now', 'event_espresso'),
            EED_Ticket_Selector::$_event
        );
        $external_url = EED_Ticket_Selector::$_event->external_url();
        $html = '<input id="ticket-selector-submit-' . EED_Ticket_Selector::$_event->ID() . '-btn"';
        $html .= ' class="ticket-selector-submit-btn ';
        $html .= empty($external_url) ? 'ticket-selector-submit-ajax"' : '"';
        $html .= ' type="submit" value="' . $btn_text . '" />';
        $html .= apply_filters(
            'FHEE__EE_Ticket_Selector__after_ticket_selector_submit',
            '',
            EED_Ticket_Selector::$_event
        );
        return $html;
    }


    /**
     * display_view_details_btn
     *
     * @access public
     * @param bool $DWMTS indicates a "Dude Where's my Ticket Selector?" (DWMTS) type event
     *                    (ie: $_max_atndz === 1) where there are no available tickets,
     *                    either because they are sold out, expired, or not yet on sale.
     *                    In this case, we need to close the form BEFORE adding any closing divs
     * @return string
     * @throws \EE_Error
     */
    public static function display_view_details_btn($DWMTS = false)
    {
        if ( ! self::$_event->get_permalink()) {
            EE_Error::add_error(
                __('The URL for the Event Details page could not be retrieved.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__
            );
        }
        $view_details_btn = '<form method="POST" action="';
        $view_details_btn .= apply_filters(
            'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_url',
            self::$_event->get_permalink(),
            self::$_event
        );
        $view_details_btn .= '">';
        $btn_text = apply_filters(
            'FHEE__EE_Ticket_Selector__display_view_details_btn__btn_text',
            __('View Details', 'event_espresso'),
            self::$_event
        );
        $view_details_btn .= '<input id="ticket-selector-submit-'
                             . self::$_event->ID()
                             . '-btn" class="ticket-selector-submit-btn view-details-btn" type="submit" value="'
                             . $btn_text
                             . '" />';
        $view_details_btn .= apply_filters('FHEE__EE_Ticket_Selector__after_view_details_btn', '', self::$_event);
        if ($DWMTS) {
            $view_details_btn .= \EED_Ticket_Selector::ticket_selector_form_close();
            $view_details_btn .= \EED_Ticket_Selector::no_tkt_slctr_end_dv();
            $view_details_btn .= '<br/>';
        } else {
            $view_details_btn .= \EED_Ticket_Selector::clear_tkt_slctr();
            $view_details_btn .= '<br/>';
            $view_details_btn .= \EED_Ticket_Selector::ticket_selector_form_close();
        }
        return $view_details_btn;
    }



    /**
     *    cancel_ticket_selections
     *
     * @access        public
     * @access        public
     * @return        string
     */
    public static function cancel_ticket_selections()
    {
        // check nonce
        if ( ! EED_Ticket_Selector::process_ticket_selector_nonce('cancel_ticket_selections')) {
            return false;
        }
        EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        if (EE_Registry::instance()->REQ->is_set('event_id')) {
            wp_safe_redirect(
                EEH_Event_View::event_link_url(
                    EE_Registry::instance()->REQ->get('event_id')
                )
            );
        } else {
            wp_safe_redirect(
                site_url('/' . EE_Registry::instance()->CFG->core->event_cpt_slug . '/')
            );
        }
        die();
    }



    /**
     *    process_ticket_selector_nonce
     *
     * @access public
     * @param  string $nonce_name
     * @param string  $id
     * @return bool
     */
    public static function process_ticket_selector_nonce($nonce_name, $id = '')
    {
        $nonce_name_with_id = ! empty($id) ? "{$nonce_name}_nonce_{$id}" : "{$nonce_name}_nonce";
        if (
            ! is_admin()
            && (
                ! EE_Registry::instance()->REQ->is_set($nonce_name_with_id)
                || ! wp_verify_nonce(
                    EE_Registry::instance()->REQ->get($nonce_name_with_id),
                    $nonce_name
                )
            )
        ) {
            EE_Error::add_error(
                sprintf(
                    __(
                        'We\'re sorry but your request failed to pass a security check.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }



    /**
     *    process_ticket_selections
     *
     * @access public
     * @return array|boolean
     * @throws \EE_Error
     */
    public function process_ticket_selections()
    {
        do_action('EED_Ticket_Selector__process_ticket_selections__before');
        // do we have an event id?
        if ( ! EE_Registry::instance()->REQ->is_set('tkt-slctr-event-id')) {
            // $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
            EE_Error::add_error(
                sprintf(
                    __(
                        'An event id was not provided or was not received.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        //if event id is valid
        $id = absint(EE_Registry::instance()->REQ->get('tkt-slctr-event-id'));
        // check nonce
        if ( ! EED_Ticket_Selector::process_ticket_selector_nonce('process_ticket_selections', $id)) {
            return false;
        }
        //		d( EE_Registry::instance()->REQ );
        self::$_available_spaces = array(
            'tickets'   => array(),
            'datetimes' => array(),
        );
        //we should really only have 1 registration in the works now (ie, no MER) so clear any previous items in the cart.
        // When MER happens this will probably need to be tweaked, possibly wrapped in a conditional checking for some constant defined in MER etc.
        EE_Registry::instance()->load_core('Session');
        // unless otherwise requested, clear the session
        if (apply_filters('FHEE__EE_Ticket_Selector__process_ticket_selections__clear_session', true)) {
            EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        }
        //d( EE_Registry::instance()->SSN );
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // validate/sanitize data
        $valid = self::_validate_post_data($id);
        //EEH_Debug_Tools::printr( $_REQUEST, '$_REQUEST', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid, '$valid', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid[ 'total_tickets' ], 'total_tickets', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid[ 'max_atndz' ], 'max_atndz', __FILE__, __LINE__ );
        //check total tickets ordered vs max number of attendees that can register
        if ($valid['total_tickets'] > $valid['max_atndz']) {
            // ordering too many tickets !!!
            $total_tickets_string = _n('You have attempted to purchase %s ticket.',
                'You have attempted to purchase %s tickets.', $valid['total_tickets'], 'event_espresso');
            $limit_error_1 = sprintf($total_tickets_string, $valid['total_tickets']);
            // dev only message
            $max_atndz_string = _n('The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                $valid['max_atndz'], 'event_espresso');
            $limit_error_2 = sprintf($max_atndz_string, $valid['max_atndz'], $valid['max_atndz']);
            EE_Error::add_error($limit_error_1 . '<br/>' . $limit_error_2, __FILE__, __FUNCTION__, __LINE__);
        } else {
            // all data appears to be valid
            $tckts_slctd = false;
            $tickets_added = 0;
            $valid = apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data', $valid);
            if ($valid['total_tickets'] > 0) {
                // load cart
                EE_Registry::instance()->load_core('Cart');
                // cycle thru the number of data rows sent from the event listing
                for ($x = 0; $x < $valid['rows']; $x++) {
                    // does this row actually contain a ticket quantity?
                    if (isset($valid['qty'][$x]) && $valid['qty'][$x] > 0) {
                        // YES we have a ticket quantity
                        $tckts_slctd = true;
                        //						d( $valid['ticket_obj'][$x] );
                        if ($valid['ticket_obj'][$x] instanceof EE_Ticket) {
                            // then add ticket to cart
                            $tickets_added += self::_add_ticket_to_cart($valid['ticket_obj'][$x], $valid['qty'][$x]);
                            if (EE_Error::has_error()) {
                                break;
                            }
                        } else {
                            // nothing added to cart retrieved
                            EE_Error::add_error(
                                sprintf(__('A valid ticket could not be retrieved for the event.%sPlease click the back button on your browser and try again.',
                                    'event_espresso'), '<br/>'),
                                __FILE__, __FUNCTION__, __LINE__
                            );
                        }
                    }
                }
            }
            do_action(
                'AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
                EE_Registry::instance()->CART,
                $this
            );
            //d( EE_Registry::instance()->CART );
            //die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL REDIRECT HERE BEFORE CART UPDATE
            if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', $tckts_slctd)) {
                if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__success', $tickets_added)) {
                    do_action(
                        'FHEE__EE_Ticket_Selector__process_ticket_selections__before_redirecting_to_checkout',
                        EE_Registry::instance()->CART,
                        $this
                    );
                    EE_Registry::instance()->CART->recalculate_all_cart_totals();
                    EE_Registry::instance()->CART->save_cart(false);
                    // exit('KILL REDIRECT AFTER CART UPDATE'); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OR HERE TO KILL REDIRECT AFTER CART UPDATE
                    // just return TRUE for registrations being made from admin
                    if (is_admin()) {
                        return true;
                    }
                    EE_Error::get_notices(false, true);
                    wp_safe_redirect(
                        apply_filters(
                            'FHEE__EE_Ticket_Selector__process_ticket_selections__success_redirect_url',
                            EE_Registry::instance()->CFG->core->reg_page_url()
                        )
                    );
                    exit();
                } else {
                    if ( ! EE_Error::has_error() && ! EE_Error::has_error(true, 'attention')) {
                        // nothing added to cart
                        EE_Error::add_attention(__('No tickets were added for the event', 'event_espresso'), __FILE__,
                            __FUNCTION__, __LINE__);
                    }
                }
            } else {
                // no ticket quantities were selected
                EE_Error::add_error(__('You need to select a ticket quantity before you can proceed.',
                    'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            }
        }
        //die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL BEFORE REDIRECT
        // at this point, just return if registration is being made from admin
        if (is_admin()) {
            return false;
        }
        if ($valid['return_url']) {
            EE_Error::get_notices(false, true);
            wp_safe_redirect($valid['return_url']);
            exit();
        } elseif (isset($event_to_add['id'])) {
            EE_Error::get_notices(false, true);
            wp_safe_redirect(get_permalink($event_to_add['id']));
            exit();
        } else {
            echo EE_Error::get_notices();
        }
        return false;
    }



    /**
     *    validate_post_data
     *
     * @access        private
     * @param int $id
     * @return array|FALSE
     */
    private static function _validate_post_data($id = 0)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if ( ! $id) {
            EE_Error::add_error(
                __('The event id provided was not valid.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // start with an empty array()
        $valid_data = array();
        // grab valid id
        $valid_data['id'] = $id;
        // grab and sanitize return-url
        $valid_data['return_url'] = esc_url_raw(EE_Registry::instance()->REQ->get('tkt-slctr-return-url-' . $id));
        // array of other form names
        $inputs_to_clean = array(
            'event_id'   => 'tkt-slctr-event-id',
            'max_atndz'  => 'tkt-slctr-max-atndz-',
            'rows'       => 'tkt-slctr-rows-',
            'qty'        => 'tkt-slctr-qty-',
            'ticket_id'  => 'tkt-slctr-ticket-id-',
            'return_url' => 'tkt-slctr-return-url-',
        );
        // let's track the total number of tickets ordered.'
        $valid_data['total_tickets'] = 0;
        // cycle through $inputs_to_clean array
        foreach ($inputs_to_clean as $what => $input_to_clean) {
            // check for POST data
            if (EE_Registry::instance()->REQ->is_set($input_to_clean . $id)) {
                // grab value
                $input_value = EE_Registry::instance()->REQ->get($input_to_clean . $id);
                switch ($what) {
                    // integers
                    case 'event_id':
                        $valid_data[$what] = absint($input_value);
                        // get event via the event id we put in the form
                        $valid_data['event'] = EE_Registry::instance()
                                                          ->load_model('Event')
                                                          ->get_one_by_ID($valid_data['event_id']);
                        break;
                    case 'rows':
                    case 'max_atndz':
                        $valid_data[$what] = absint($input_value);
                        break;
                    // arrays of integers
                    case 'qty':
                        /** @var array $row_qty */
                        $row_qty = $input_value;
                        // if qty is coming from a radio button input, then we need to assemble an array of rows
                        if ( ! is_array($row_qty)) {
                            // get number of rows
                            $rows = EE_Registry::instance()->REQ->is_set('tkt-slctr-rows-' . $id)
                                ? absint(EE_Registry::instance()->REQ->get('tkt-slctr-rows-' . $id))
                                : 1;
                            // explode ints by the dash
                            $row_qty = explode('-', $row_qty);
                            $row = isset($row_qty[0]) ? absint($row_qty[0]) : 1;
                            $qty = isset($row_qty[1]) ? absint($row_qty[1]) : 0;
                            $row_qty = array($row => $qty);
                            //								 d( $row_qty );
                            for ($x = 1; $x <= $rows; $x++) {
                                if ( ! isset($row_qty[$x])) {
                                    $row_qty[$x] = 0;
                                }
                            }
                        }
                        ksort($row_qty);
                        //							 d( $row_qty );
                        // cycle thru values
                        foreach ($row_qty as $qty) {
                            $qty = absint($qty);
                            // sanitize as integers
                            $valid_data[$what][] = $qty;
                            $valid_data['total_tickets'] += $qty;
                        }
                        break;
                    // array of integers
                    case 'ticket_id':
                        $value_array = array();
                        // cycle thru values
                        foreach ((array)$input_value as $key => $value) {
                            // allow only numbers, letters,  spaces, commas and dashes
                            $value_array[$key] = wp_strip_all_tags($value);
                            // get ticket via the ticket id we put in the form
                            $ticket_obj = EE_Registry::instance()->load_model('Ticket')->get_one_by_ID($value);
                            $valid_data['ticket_obj'][$key] = $ticket_obj;
                        }
                        $valid_data[$what] = $value_array;
                        break;
                    case 'return_url' :
                        // grab and sanitize return-url
                        $valid_data[$what] = esc_url_raw($input_value);
                        break;
                }    // end switch $what
            }
        }    // end foreach $inputs_to_clean
        //		d( $valid_data );
        //		die();
        return $valid_data;
    }



    /**
     *    adds a ticket to the cart
     *
     * @access   private
     * @param EE_Ticket $ticket
     * @param int       $qty
     * @return TRUE on success, FALSE on fail
     * @throws \EE_Error
     */
    private static function _add_ticket_to_cart(EE_Ticket $ticket = null, $qty = 1)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // get the number of spaces left for this datetime ticket
        $available_spaces = self::_ticket_datetime_availability($ticket);
        // compare available spaces against the number of tickets being purchased
        if ($available_spaces >= $qty) {
            // allow addons to prevent a ticket from being added to cart
            if ( ! apply_filters('FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_add_to_cart', true, $ticket,
                $qty, $available_spaces)
            ) {
                return false;
            }
            $qty = absint(apply_filters('FHEE__EE_Ticket_Selector___add_ticket_to_cart__ticket_qty', $qty, $ticket));
            // add event to cart
            if (EE_Registry::instance()->CART->add_ticket_to_cart($ticket, $qty)) {
                self::_recalculate_ticket_datetime_availability($ticket, $qty);
                return true;
            } else {
                return false;
            }
        } else {
            // tickets can not be purchased but let's find the exact number left for the last ticket selected PRIOR to subtracting tickets
            $available_spaces = self::_ticket_datetime_availability($ticket, true);
            // greedy greedy greedy eh?
            if ($available_spaces > 0) {
                if (
                apply_filters(
                    'FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_display_availability_error',
                    true,
                    $ticket,
                    $qty,
                    $available_spaces
                )
                ) {
                    EED_Ticket_Selector::_display_availability_error($available_spaces);
                }
            } else {
                EE_Error::add_error(
                    __('We\'re sorry, but there are no available spaces left for this event at this particular date and time.',
                        'event_espresso'),
                    __FILE__, __FUNCTION__, __LINE__
                );
            }
            return false;
        }
    }



    /**
     *  _display_availability_error
     *
     * @access    private
     * @param int $available_spaces
     * @throws \EE_Error
     */
    private static function _display_availability_error($available_spaces = 1)
    {
        // add error messaging - we're using the _n function that will generate
        // the appropriate singular or plural message based on the number of $available_spaces
        if (EE_Registry::instance()->CART->all_ticket_quantity_count()) {
            $msg = sprintf(
                _n(
                    'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                    'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                    $available_spaces,
                    'event_espresso'
                ),
                $available_spaces,
                '<br />'
            );
        } else {
            $msg = sprintf(
                _n(
                    'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                    'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                    $available_spaces,
                    'event_espresso'
                ),
                $available_spaces,
                '<br />'
            );
        }
        EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
    }



    /**
     * _ticket_datetime_availability
     * creates an array of tickets plus all of the datetimes available to each ticket
     * and tracks the spaces remaining for each of those datetimes
     *
     * @access private
     * @param EE_Ticket $ticket - selected ticket
     * @param bool      $get_original_ticket_spaces
     * @return int
     * @throws \EE_Error
     */
    private static function _ticket_datetime_availability(EE_Ticket $ticket, $get_original_ticket_spaces = false)
    {
        // if the $_available_spaces array has not been set up yet...
        if ( ! isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            self::_set_initial_ticket_datetime_availability($ticket);
        }
        $available_spaces = $ticket->qty() - $ticket->sold();
        if (isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach ((array)self::$_available_spaces['tickets'][$ticket->ID()] as $DTD_ID => $spaces) {
                // if we want the original datetime availability BEFORE we started subtracting tickets ?
                if ($get_original_ticket_spaces) {
                    // then grab the available spaces from the "tickets" array and compare with the above to get the lowest number
                    $available_spaces = min($available_spaces,
                        self::$_available_spaces['tickets'][$ticket->ID()][$DTD_ID]);
                } else {
                    // we want the updated ticket availability as stored in the "datetimes" array
                    $available_spaces = min($available_spaces, self::$_available_spaces['datetimes'][$DTD_ID]);
                }
            }
        }
        return $available_spaces;
    }



    /**
     * _set_initial_ticket_datetime_availability
     *
     * @access private
     * @param EE_Ticket $ticket
     * @return void
     * @throws \EE_Error
     */
    private static function _set_initial_ticket_datetime_availability(EE_Ticket $ticket)
    {
        // first, get all of the datetimes that are available to this ticket
        $datetimes = $ticket->get_many_related(
            'Datetime',
            array(
                array(
                    'DTT_EVT_end' => array(
                        '>=',
                        EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
                    ),
                ),
                'order_by' => array('DTT_EVT_start' => 'ASC'),
            )
        );
        if ( ! empty($datetimes)) {
            // now loop thru all of the datetimes
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    // the number of spaces available for the datetime without considering individual ticket quantities
                    $spaces_remaining = $datetime->spaces_remaining();
                    // save the total available spaces ( the lesser of the ticket qty minus the number of tickets sold or the datetime spaces remaining) to this ticket using the datetime ID as the key
                    self::$_available_spaces['tickets'][$ticket->ID()][$datetime->ID()] = min(
                        $ticket->qty() - $ticket->sold(),
                        $spaces_remaining
                    );
                    // if the remaining spaces for this datetime is already set, then compare that against the datetime spaces remaining, and take the lowest number,
                    // else just take the datetime spaces remaining, and assign to the datetimes array
                    self::$_available_spaces['datetimes'][$datetime->ID()] = isset(self::$_available_spaces['datetimes'][$datetime->ID()])
                        ? min(self::$_available_spaces['datetimes'][$datetime->ID()], $spaces_remaining)
                        : $spaces_remaining;
                }
            }
        }
    }



    /**
     *    _recalculate_ticket_datetime_availability
     *
     * @access    private
     * @param    EE_Ticket $ticket
     * @param    int       $qty
     * @return    void
     */
    private static function _recalculate_ticket_datetime_availability(EE_Ticket $ticket, $qty = 0)
    {
        if (isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach ((array)self::$_available_spaces['tickets'][$ticket->ID()] as $DTD_ID => $spaces) {
                // subtract the qty of selected tickets from each datetime's available spaces this ticket has access to,
                self::$_available_spaces['datetimes'][$DTD_ID] -= $qty;
            }
        }
    }



    /**
     *    load js
     *
     * @access        public
     * @return        void
     */
    public static function load_tckt_slctr_assets()
    {
        // add some style
        if (apply_filters('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', false)) {
            wp_register_style('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css');
            wp_enqueue_style('ticket_selector');
            // make it dance
            // wp_register_script('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js', array('espresso_core'), '', TRUE);
            // wp_enqueue_script('ticket_selector');
        }
    }



    public static function load_tckt_slctr_assets_admin()
    {
        //iframe button js on admin event editor page
        if (EE_Registry::instance()->REQ->get('page') === 'espresso_events'
            && EE_Registry::instance()->REQ->get('action') === 'edit'
        ) {
            wp_register_script('ticket_selector_embed', TICKET_SELECTOR_ASSETS_URL . 'ticket-selector-embed.js',
                array('ee-dialog'), EVENT_ESPRESSO_VERSION, true);
            wp_enqueue_script('ticket_selector_embed');
        }
    }



}




// End of file EE_Ticket_Selector.class.php
// Location: /includes/classes/EE_Ticket_Selector.class.php
