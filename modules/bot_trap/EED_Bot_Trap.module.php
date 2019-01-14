<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EED_Bot_Trap Class
 * adds an email input (honeypot) to the ticket selector form submission
 * and also checks that the form is not being submitted either too fast or too slow
 * which can be an indication that the form was submitted by a bot
 *
 * @package               Event Espresso
 * @subpackage            /modules/bot_trap/
 * @author                Brent Christensen
 */
class EED_Bot_Trap extends EED_Module
{

    /**
     * @return EED_Bot_Trap|EED_Module
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
        if (apply_filters('FHEE__EED_Bot_Trap__set_hooks__use_bot_trap', true) &&
            EE_Registry::instance()->CFG->registration->use_bot_trap
        ) {
            EED_Bot_Trap::set_trap();
            // redirect bots to bogus success page
            EE_Config::register_route(
                'ticket_selection_received',
                'EED_Bot_Trap',
                'display_bot_trap_success'
            );
        }
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_trap()
    {
        define('EE_BOT_TRAP_BASE_URL', plugin_dir_url(__FILE__) . DS);
        add_action(
            'AHEE__ticket_selector_chart__template__after_ticket_selector',
            array('EED_Bot_Trap', 'generate_bot_trap'),
            10,
            2
        );
        add_action(
            'EED_Ticket_Selector__process_ticket_selections__before',
            array('EED_Bot_Trap', 'process_bot_trap'),
            1,
            2
        );
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        if (defined('DOING_AJAX')
            && DOING_AJAX
            && apply_filters('FHEE__EED_Bot_Trap__set_hooks__use_bot_trap', true)
            && EE_Registry::instance()->CFG->registration->use_bot_trap
        ) {
            EED_Bot_Trap::set_trap();
        }
        add_action(
            'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template',
            array('EED_Bot_Trap', 'bot_trap_settings_form'),
            5
        );
        add_filter(
            'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration',
            array('EED_Bot_Trap', 'update_bot_trap_settings_form'),
            10,
            1
        );
    }


    /**
     * run - initial module setup
     *
     * @param WP $WP
     * @return void
     */
    public function run($WP)
    {
    }


    /**
     * generate_bot_trap
     *
     * @return void
     * @throws RuntimeException
     */
    public static function generate_bot_trap()
    {
        $do_not_enter = esc_html__('please do not enter anything in this input', 'event_espresso');
        $time = microtime(true);
        $html = '<div class="tkt-slctr-request-processor-dv" style="float:left; margin:0 0 0 -999em; height: 0;">';
        $html .= '<label for="tkt-slctr-request-processor-email-' . $time . '">' . $do_not_enter . '</label>';
        $html .= '<input type="email" id="tkt-slctr-request-processor-email-';
        $html .= $time . '" name="tkt-slctr-request-processor-email" value=""/>';
        $html .= '</div><!-- .tkt-slctr-request-processor-dv -->';
        echo $html;
    }


    /**
     * process_bot_trap
     *
     * @param array|string $triggered_trap_callback Callback that will be executed for handling the
     *                                              response if the bot trap is triggered.
     *                                              It should receive one argument: a boolean indicating
     *                                              whether the trap was triggered by suspicious timing or not.
     * @throws RuntimeException
     */
    public static function process_bot_trap($triggered_trap_callback = array())
    {
        // what's your email address Mr. Bot ?
        $empty_trap = isset($_REQUEST['tkt-slctr-request-processor-email'])
                      && $_REQUEST['tkt-slctr-request-processor-email'] === '';
        // are we human ?
        if ($empty_trap) {
            do_action('AHEE__EED_Bot_Trap__process_bot_trap__trap_not_triggered');
            return;
        }
        // check the given callback is valid first before executing
        if (! is_callable($triggered_trap_callback)) {
            // invalid callback so lets just sub in our default.
            $triggered_trap_callback = array('EED_Bot_Trap', 'triggered_trap_response');
        }
        call_user_func($triggered_trap_callback);
    }


    /**
     * This is the default callback executed by EED_Bot_Trap::process_bot_trap that handles the response.
     *
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function triggered_trap_response()
    {
        // UH OH...
        $redirect_url = apply_filters(
            'FHEE__EED_Bot_Trap__process_bot_trap__redirect_url',
            add_query_arg(
                array('ee' => 'ticket_selection_received'),
                EE_Registry::instance()->CFG->core->reg_page_url()
            )
        );
        // if AJAX, return the redirect URL
        if (defined('DOING_AJAX') && DOING_AJAX) {
            echo wp_json_encode(
                array_merge(
                    EE_Error::get_notices(false),
                    array(
                        'redirect_url' => $redirect_url,
                    )
                )
            );
            exit();
        }
        wp_safe_redirect($redirect_url);
        exit();
    }


    /**
     * display_bot_trap_success
     * shows a "success" screen to bots so that they (ie: the ppl managing them)
     * think the form was submitted successfully
     *
     * @return void
     */
    public static function display_bot_trap_success()
    {
        add_filter('FHEE__EED_Single_Page_Checkout__run', '__return_false');
        $bot_notice = esc_html__(
            'Thank you so much. Your ticket selections have been received for consideration.',
            'event_espresso'
        );
        $bot_notice = isset($_REQUEST['ee-notice']) && $_REQUEST['ee-notice'] !== ''
            ? sanitize_text_field(stripslashes($_REQUEST['ee-notice']))
            : $bot_notice;
        EE_Registry::instance()->REQ->add_output(EEH_HTML::div($bot_notice, '', 'ee-attention'));
    }



    /***********************************    ADMIN    **********************************/


    /**
     * bot_trap_settings_form
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function bot_trap_settings_form()
    {
        EED_Bot_Trap::_bot_trap_settings_form()->enqueue_js();
        echo EED_Bot_Trap::_bot_trap_settings_form()->get_html();
    }


    /**
     * _bot_trap_settings_form
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected static function _bot_trap_settings_form()
    {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'bot_trap_settings',
                'html_id'         => 'bot_trap_settings',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => array(
                    'bot_trap_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(esc_html__('Bot Trap Settings', 'event_espresso'))
                    ),
                    'use_bot_trap' => new EE_Yes_No_Input(
                        array(
                            'html_label_text' => esc_html__('Enable Bot Trap', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'The Event Espresso Bot Trap will insert a fake input into your Ticket Selector forms that is hidden from regular site visitors, but visible to spam bots. Because the input asks for an email address, it is irresistible to spam bots who will of course enter text into it. Since regular site visitors can not see this input, any value detected during form submission means a bot has been detected, which will then be blocked from submitting the form.',
                                'event_espresso'
                            ),
                            'default'         => EE_Registry::instance()->CFG->registration->use_bot_trap !== null
                                ? EE_Registry::instance()->CFG->registration->use_bot_trap
                                : true,
                            'required'        => false,
                        )
                    ),
                ),
            )
        );
    }


    /**
     * update_bot_trap_settings_form
     *
     * @param EE_Registration_Config $EE_Registration_Config
     * @return EE_Registration_Config
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function update_bot_trap_settings_form(EE_Registration_Config $EE_Registration_Config)
    {
        try {
            $bot_trap_settings_form = EED_Bot_Trap::_bot_trap_settings_form();
            // if not displaying a form, then check for form submission
            if ($bot_trap_settings_form->was_submitted()) {
                // capture form data
                $bot_trap_settings_form->receive_form_submission();
                // validate form data
                if ($bot_trap_settings_form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $bot_trap_settings_form->valid_data();
                    if (isset($valid_data['use_bot_trap'])) {
                        $EE_Registration_Config->use_bot_trap = $valid_data['use_bot_trap'];
                    } else {
                        EE_Error::add_error(
                            esc_html__(
                                'Invalid or missing Bot Trap settings. Please refresh the form and try again.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                } elseif ($bot_trap_settings_form->submission_error_message() !== '') {
                    EE_Error::add_error(
                        $bot_trap_settings_form->submission_error_message(),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }
        return $EE_Registration_Config;
    }
}
