<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;

/**
 * EED_Add_New_State class
 *
 * @package        Event Espresso
 * @subpackage     /modules/add_new_state/
 * @author         Brent Christensen
 */
class EED_Add_New_State extends EED_Module
{


    /**
     * @return EED_Module|EED_Add_New_State
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
        add_action('wp_loaded', array('EED_Add_New_State', 'set_definitions'), 2);
        add_action('wp_enqueue_scripts', array('EED_Add_New_State', 'translate_js_strings'), 0);
        add_action('wp_enqueue_scripts', array('EED_Add_New_State', 'wp_enqueue_scripts'), 10);
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form',
            array('EED_Add_New_State', 'display_add_new_state_micro_form'),
            1,
            1
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Payment_Options___get_billing_form_for_payment_method__billing_form',
            array('EED_Add_New_State', 'display_add_new_state_micro_form'),
            1,
            1
        );
        add_filter(
            'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item',
            array('EED_Add_New_State', 'unset_new_state_request_params'),
            10,
            1
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__state_options',
            array('EED_Add_New_State', 'inject_new_reg_state_into_options'),
            10,
            5
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__country_options',
            array('EED_Add_New_State', 'inject_new_reg_country_into_options'),
            10,
            5
        );
        add_filter(
            'FHEE__EE_State_Select_Input____construct__state_options',
            array('EED_Add_New_State', 'state_options'),
            10,
            1
        );
        add_filter(
            'FHEE__EE_Country_Select_Input____construct__country_options',
            array('EED_Add_New_State', 'country_options'),
            10,
            1
        );
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        add_action('wp_loaded', array('EED_Add_New_State', 'set_definitions'), 2);
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form',
            array('EED_Add_New_State', 'display_add_new_state_micro_form'),
            1,
            1
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Payment_Options___get_billing_form_for_payment_method__billing_form',
            array('EED_Add_New_State', 'display_add_new_state_micro_form'),
            1,
            1
        );
        add_action('wp_ajax_espresso_add_new_state', array('EED_Add_New_State', 'add_new_state'));
        add_action('wp_ajax_nopriv_espresso_add_new_state', array('EED_Add_New_State', 'add_new_state'));
        add_filter(
            'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item',
            array('EED_Add_New_State', 'unset_new_state_request_params'),
            10,
            1
        );
        add_action(
            'AHEE__General_Settings_Admin_Page__update_country_settings__state_saved',
            array('EED_Add_New_State', 'update_country_settings'),
            10,
            3
        );
        add_action(
            'AHEE__General_Settings_Admin_Page__delete_state__state_deleted',
            array('EED_Add_New_State', 'update_country_settings'),
            10,
            3
        );
        add_filter(
            'FHEE__EE_State_Select_Input____construct__state_options',
            array('EED_Add_New_State', 'state_options'),
            10,
            1
        );
        add_filter(
            'FHEE__EE_Country_Select_Input____construct__country_options',
            array('EED_Add_New_State', 'country_options'),
            10,
            1
        );
        add_filter(
            'FHEE__EE_Form_Section_Proper__receive_form_submission__request_data',
            array('EED_Add_New_State', 'filter_checkout_request_params'),
            10,
            1
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__state_options',
            array('EED_Add_New_State', 'inject_new_reg_state_into_options'),
            10,
            5
        );
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__country_options',
            array('EED_Add_New_State', 'inject_new_reg_country_into_options'),
            10,
            5
        );
    }


    /**
     * @return void
     */
    public static function set_definitions()
    {
        define('ANS_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets' . DS);
        define(
            'ANS_TEMPLATES_PATH',
            str_replace(
                '\\',
                DS,
                plugin_dir_path(__FILE__)
            ) . 'templates' . DS
        );
    }


    /**
     * @param WP $WP
     * @return void
     */
    public function run($WP)
    {
    }


    /**
     * @return void
     */
    public static function translate_js_strings()
    {
        EE_Registry::$i18n_js_strings['ans_no_country'] = esc_html__(
            'In order to proceed, you need to select the Country that your State/Province belongs to.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['ans_no_name'] = esc_html__(
            'In order to proceed, you need to enter the name of your State/Province.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['ans_no_abbreviation'] = esc_html__(
            'In order to proceed, you need to enter an abbreviation for the name of your State/Province.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['ans_save_success'] = esc_html__(
            'The new state was successfully saved to the database.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['ans_server_save_error'] = esc_html__(
            'An unknown error has occurred on the server while saving the new state to the database.',
            'event_espresso'
        );
    }


    /**
     * @return void
     */
    public static function wp_enqueue_scripts()
    {
        if (apply_filters('EED_Single_Page_Checkout__SPCO_active', false)) {
            wp_register_script(
                'add_new_state',
                ANS_ASSETS_URL . 'add_new_state.js',
                array('espresso_core', 'single_page_checkout'),
                EVENT_ESPRESSO_VERSION,
                true
            );
            wp_enqueue_script('add_new_state');
        }
    }



    /**
     * display_add_new_state_micro_form
     *
     * @param EE_Form_Section_Proper $question_group_reg_form
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function display_add_new_state_micro_form(EE_Form_Section_Proper $question_group_reg_form)
    {
        // only add the 'new_state_micro_form' when displaying reg forms,
        // not during processing since we process the 'new_state_micro_form' in it's own AJAX request
        $action = EE_Registry::instance()->REQ->get('action', '');
        // is the "state" question in this form section?
        $input = $question_group_reg_form->get_subsection('state');
        if ($action === 'process_reg_step' || $action === 'update_reg_step') {
            // ok then all we need to do is make sure the input's HTML name is consistent
            // by forcing it to set it now, like it did while getting the form for display
            if ($input instanceof EE_State_Select_Input) {
                $input->html_name();
            }
            return $question_group_reg_form;
        }
        // we're only doing this for state select inputs
        if ($input instanceof EE_State_Select_Input
            && ! $input->get_display_strategy() instanceof EE_Hidden_Display_Strategy
        ) {
            // grab any set values from the request
            $country_name = str_replace('state', 'nsmf_new_state_country', $input->html_name());
            $state_name = str_replace('state', 'nsmf_new_state_name', $input->html_name());
            $abbrv_name = str_replace('state', 'nsmf_new_state_abbrv', $input->html_name());
            $new_state_submit_id = str_replace('state', 'new_state', $input->html_id());
            $country_options = array();
            $countries = EEM_Country::instance()->get_all_countries();
            if (! empty($countries)) {
                foreach ($countries as $country) {
                    if ($country instanceof EE_Country) {
                        $country_options[ $country->ID() ] = $country->name();
                    }
                }
            }
            $new_state_micro_form = new EE_Form_Section_Proper(
                array(
                    'name'            => 'new_state_micro_form',
                    'html_id'         => 'new_state_micro_form',
                    'layout_strategy' => new EE_Div_Per_Section_Layout(),
                    'subsections'     => array(
                        // add hidden input to indicate that a new state is being added
                        'add_new_state'               => new EE_Hidden_Input(
                            array(
                                'html_name' => str_replace(
                                    'state',
                                    'nsmf_add_new_state',
                                    $input->html_name()
                                ),
                                'html_id'   => str_replace(
                                    'state',
                                    'nsmf_add_new_state',
                                    $input->html_id()
                                ),
                                'default'   => 0,
                            )
                        ),
                        // add link for displaying hidden container
                        'click_here_link'             => new EE_Form_Section_HTML(
                            apply_filters(
                                'FHEE__EED_Add_New_State__display_add_new_state_micro_form__click_here_link',
                                EEH_HTML::link(
                                    '',
                                    esc_html__('click here to add a new state/province', 'event_espresso'),
                                    '',
                                    'display-' . $input->html_id(),
                                    'ee-form-add-new-state-lnk display-the-hidden smaller-text hide-if-no-js',
                                    '',
                                    'data-target="' . $input->html_id() . '"'
                                )
                            )
                        ),
                        // add initial html for hidden container
                        'add_new_state_micro_form'    => new EE_Form_Section_HTML(
                            apply_filters(
                                'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_micro_form',
                                EEH_HTML::div(
                                    '',
                                    $input->html_id() . '-dv',
                                    'ee-form-add-new-state-dv',
                                    'display: none;'
                                ) .
                                EEH_HTML::h6(
                                    esc_html__(
                                        'Is your state/province missing from the dropdown menu above? You can add it by completing the following steps:',
                                        'event_espresso'
                                    )
                                ) .
                                EEH_HTML::ul() .
                                EEH_HTML::li(
                                    esc_html__(
                                        'first select the Country that your State/Province belongs to',
                                        'event_espresso'
                                    )
                                ) .
                                EEH_HTML::li(
                                    esc_html__('enter the name of your State/Province', 'event_espresso')
                                ) .
                                EEH_HTML::li(
                                    esc_html__(
                                        'enter a two to six letter abbreviation for the name of your State/Province',
                                        'event_espresso'
                                    )
                                ) .
                                EEH_HTML::li(esc_html__('click the ADD button', 'event_espresso')) .
                                EEH_HTML::ulx()
                            )
                        ),
                        // NEW STATE COUNTRY
                        'new_state_country'           => new EE_Country_Select_Input(
                            $country_options,
                            array(
                                'html_name'       => $country_name,
                                'html_id'         => str_replace(
                                    'state',
                                    'nsmf_new_state_country',
                                    $input->html_id()
                                ),
                                'html_class'      => $input->html_class() . ' new-state-country',
                                'html_label_text' => esc_html__('New State/Province Country', 'event_espresso'),
                                'default'         => EE_Registry::instance()->REQ->get($country_name, ''),
                                'required'        => false,
                            )
                        ),
                        // NEW STATE NAME
                        'new_state_name'              => new EE_Text_Input(
                            array(
                                'html_name'       => $state_name,
                                'html_id'         => str_replace(
                                    'state',
                                    'nsmf_new_state_name',
                                    $input->html_id()
                                ),
                                'html_class'      => $input->html_class() . ' new-state-state',
                                'html_label_text' => esc_html__(
                                    'New State/Province Name',
                                    'event_espresso'
                                ),
                                'default'         => EE_Registry::instance()->REQ->get($state_name, ''),
                                'required'        => false,
                            )
                        ),
                        'spacer'                      => new EE_Form_Section_HTML(EEH_HTML::br()),
                        // NEW STATE NAME
                        'new_state_abbrv'             => new EE_Text_Input(
                            array(
                                'html_name'             => $abbrv_name,
                                'html_id'               => str_replace(
                                    'state',
                                    'nsmf_new_state_abbrv',
                                    $input->html_id()
                                ),
                                'html_class'            => $input->html_class() . ' new-state-abbrv',
                                'html_label_text'       => esc_html__(
                                    'New State/Province Abbreviation',
                                    'event_espresso'
                                ) . ' *',
                                'html_other_attributes' => 'size="24"',
                                'default'               => EE_Registry::instance()->REQ->get($abbrv_name, ''),
                                'required'              => false,
                            )
                        ),
                        // "submit" button
                        'add_new_state_submit_button' => new EE_Form_Section_HTML(
                            apply_filters(
                                'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_submit_button',
                                EEH_HTML::nbsp(3) .
                                EEH_HTML::link(
                                    '',
                                    esc_html__('ADD', 'event_espresso'),
                                    '',
                                    'submit-' . $new_state_submit_id,
                                    'ee-form-add-new-state-submit button button-secondary',
                                    '',
                                    'data-target="' . $new_state_submit_id . '"'
                                )
                            )
                        ),
                        // extra info
                        'add_new_state_extra'         => new EE_Form_Section_HTML(
                            apply_filters(
                                'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_extra',
                                EEH_HTML::br(2)
                                .
                                EEH_HTML::div('', '', 'small-text')
                                .
                                EEH_HTML::strong(
                                    '* ' .
                                    esc_html__(
                                        'Don\'t know your State/Province Abbreviation?',
                                        'event_espresso'
                                    )
                                )
                                .
                                EEH_HTML::br()
                                .
                                sprintf(
                                    esc_html__(
                                        'You can look here: %s, for a list of Countries and links to their State/Province Abbreviations ("Subdivisions assigned codes" column).',
                                        'event_espresso'
                                    ),
                                    EEH_HTML::link(
                                        'http://en.wikipedia.org/wiki/ISO_3166-2',
                                        'http://en.wikipedia.org/wiki/ISO_3166-2',
                                        '',
                                        '',
                                        'ee-form-add-new-state-wiki-lnk',
                                        '',
                                        'target="_blank"'
                                    )
                                )
                                .
                                EEH_HTML::divx()
                                .
                                EEH_HTML::br()
                                .
                                EEH_HTML::link(
                                    '',
                                    esc_html__('cancel new State/Province', 'event_espresso'),
                                    '',
                                    'hide-' . $input->html_id(),
                                    'ee-form-cancel-new-state-lnk smaller-text',
                                    '',
                                    'data-target="' . $input->html_id() . '"'
                                )
                                .
                                EEH_HTML::divx()
                                .
                                EEH_HTML::br()
                            )
                        ),
                    ),
                )
            );
            $question_group_reg_form->add_subsections(
                array('new_state_micro_form' => $new_state_micro_form),
                'state',
                false
            );
        }
        return $question_group_reg_form;
    }


    /**
     * set_new_state_input_width
     *
     * @return int|string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function add_new_state()
    {
        $REQ = EE_Registry::instance()->load_core('Request_Handler');
        if (absint($REQ->get('nsmf_add_new_state')) === 1) {
            EE_Registry::instance()->load_model('State');
            // grab country ISO code, new state name, and new state abbreviation
            $state_country = $REQ->is_set('nsmf_new_state_country')
                ? sanitize_text_field($REQ->get('nsmf_new_state_country'))
                : false;
            $state_name = $REQ->is_set('nsmf_new_state_name')
                ? sanitize_text_field($REQ->get('nsmf_new_state_name'))
                : false;
            $state_abbr = $REQ->is_set('nsmf_new_state_abbrv')
                ? sanitize_text_field($REQ->get('nsmf_new_state_abbrv'))
                : false;
            if ($state_country && $state_name && $state_abbr) {
                $new_state = EED_Add_New_State::save_new_state_to_db(
                    array(
                        'CNT_ISO'    => strtoupper($state_country),
                        'STA_abbrev' => strtoupper($state_abbr),
                        'STA_name'   => ucwords($state_name),
                        'STA_active' => false,
                    )
                );
                if ($new_state instanceof EE_State) {
                    // clean house
                    EE_Registry::instance()->REQ->un_set('nsmf_add_new_state');
                    EE_Registry::instance()->REQ->un_set('nsmf_new_state_country');
                    EE_Registry::instance()->REQ->un_set('nsmf_new_state_name');
                    EE_Registry::instance()->REQ->un_set('nsmf_new_state_abbrv');
                    // get any existing new states
                    $new_states = EE_Registry::instance()->SSN->get_session_data(
                        'nsmf_new_states'
                    );
                    $new_states[ $new_state->ID() ] = $new_state;
                    EE_Registry::instance()->SSN->set_session_data(
                        array('nsmf_new_states' => $new_states)
                    );
                    if (EE_Registry::instance()->REQ->ajax) {
                        echo wp_json_encode(
                            array(
                                'success'      => true,
                                'id'           => $new_state->ID(),
                                'name'         => $new_state->name(),
                                'abbrev'       => $new_state->abbrev(),
                                'country_iso'  => $new_state->country_iso(),
                                'country_name' => $new_state->country()->name(),
                            )
                        );
                        exit();
                    }
                    return $new_state->ID();
                }
            } else {
                $error = esc_html__(
                    'A new State/Province could not be added because invalid or missing data was received.',
                    'event_espresso'
                );
                if (EE_Registry::instance()->REQ->ajax) {
                    echo wp_json_encode(array('error' => $error));
                    exit();
                }
                EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__);
            }
        }
        return false;
    }


    /**
     * recursively drills down through request params to remove any that were added by this module
     *
     * @param array $request_params
     * @return array
     */
    public static function filter_checkout_request_params($request_params)
    {
        foreach ($request_params as $form_section) {
            if (is_array($form_section)) {
                EED_Add_New_State::unset_new_state_request_params($form_section);
                EED_Add_New_State::filter_checkout_request_params($form_section);
            }
        }
        return $request_params;
    }


    /**
     * @param array $request_params
     * @return array
     */
    public static function unset_new_state_request_params($request_params)
    {
        unset(
            $request_params['new_state_micro_form'],
            $request_params['new_state_micro_add_new_state'],
            $request_params['new_state_micro_new_state_country'],
            $request_params['new_state_micro_new_state_name'],
            $request_params['new_state_micro_new_state_abbrv']
        );
        return $request_params;
    }


    /**
     * @param array $props_n_values
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function save_new_state_to_db($props_n_values = array())
    {
        $existing_state = EEM_State::instance()->get_all(array($props_n_values, 'limit' => 1));
        if (! empty($existing_state)) {
            return array_pop($existing_state);
        }
        $new_state = EE_State::new_instance($props_n_values);
        if ($new_state instanceof EE_State) {
            $country_settings_url = add_query_arg(
                array(
                    'page'    => 'espresso_general_settings',
                    'action'  => 'country_settings',
                    'country' => $new_state->country_iso(),
                ),
                admin_url('admin.php')
            );
            // if not non-ajax admin
            new PersistentAdminNotice(
                'new-state-added-' . $new_state->country_iso() . '-' . $new_state->abbrev(),
                sprintf(
                    esc_html__(
                        'A new State named "%1$s (%2$s)" was dynamically added from an Event Espresso form for the Country of "%3$s".%5$sTo verify, edit, and/or delete this new State, please go to the %4$s and update the States / Provinces section.%5$sCheck "Yes" to have this new State added to dropdown select lists in forms.',
                        'event_espresso'
                    ),
                    '<b>' . $new_state->name() . '</b>',
                    '<b>' . $new_state->abbrev() . '</b>',
                    '<b>' . $new_state->country()->name() . '</b>',
                    '<a href="'
                    . $country_settings_url
                    . '">'
                    . esc_html__(
                        'Event Espresso - General Settings > Countries Tab',
                        'event_espresso'
                    )
                    . '</a>',
                    '<br />'
                )
            );
            $new_state->save();
            EEM_State::instance()->reset_cached_states();
            return $new_state;
        }
        return false;
    }


    /**
     * @param string $CNT_ISO
     * @param string $STA_ID
     * @param array  $cols_n_values
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function update_country_settings($CNT_ISO = '', $STA_ID = '', $cols_n_values = array())
    {
        if (! $CNT_ISO) {
            EE_Error::add_error(
                esc_html__('An invalid or missing Country ISO Code was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $STA_abbrev = is_array($cols_n_values) && isset($cols_n_values['STA_abbrev']) ? $cols_n_values['STA_abbrev']
            : false;
        if (! $STA_abbrev && ! empty($STA_ID)) {
            $state = EEM_State::instance()->get_one_by_ID($STA_ID);
            if ($state instanceof EE_State) {
                $STA_abbrev = $state->abbrev();
            }
        }
        if (! $STA_abbrev) {
            EE_Error::add_error(
                esc_html__('An invalid or missing State Abbreviation was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        /** @var PersistentAdminNoticeManager $persistent_admin_notice_manager */
        $persistent_admin_notice_manager = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
        );
        $persistent_admin_notice_manager->dismissNotice($CNT_ISO . '-' . $STA_abbrev, true, true);
    }


    /**
     * @param EE_State[]                            $state_options
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EE_Registration                       $registration
     * @param EE_Question                           $question
     * @param                                       $answer
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function inject_new_reg_state_into_options(
        $state_options = array(),
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        EE_Registration $registration,
        EE_Question $question,
        $answer
    ) {
        if ($answer instanceof EE_Answer && $question instanceof EE_Question
            && $question->type() === EEM_Question::QST_type_state
        ) {
            $STA_ID = $answer->value();
            if (! empty($STA_ID)) {
                $state = EEM_State::instance()->get_one_by_ID($STA_ID);
                if ($state instanceof EE_State) {
                    $country = $state->country();
                    if ($country instanceof EE_Country) {
                        if (! isset($state_options[ $country->name() ])) {
                            $state_options[ $country->name() ] = array();
                        }
                        if (! isset($state_options[ $country->name() ][ $STA_ID ])) {
                            $state_options[ $country->name() ][ $STA_ID ] = $state->name();
                        }
                    }
                }
            }
        }
        return $state_options;
    }


    /**
     * @param EE_Country[]                          $country_options
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EE_Registration                       $registration
     * @param EE_Question                           $question
     * @param                                       $answer
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function inject_new_reg_country_into_options(
        $country_options = array(),
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        EE_Registration $registration,
        EE_Question $question,
        $answer
    ) {
        if ($answer instanceof EE_Answer && $question instanceof EE_Question
            && $question->type()
               === EEM_Question::QST_type_country
        ) {
            $CNT_ISO = $answer->value();
            if (! empty($CNT_ISO)) {
                $country = EEM_Country::instance()->get_one_by_ID($CNT_ISO);
                if ($country instanceof EE_Country) {
                    if (! isset($country_options[ $CNT_ISO ])) {
                        $country_options[ $CNT_ISO ] = $country->name();
                    }
                }
            }
        }
        return $country_options;
    }


    /**
     * @param EE_State[] $state_options
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function state_options($state_options = array())
    {
        $new_states = EED_Add_New_State::_get_new_states();
        foreach ($new_states as $new_state) {
            if ($new_state instanceof EE_State
                && $new_state->country() instanceof EE_Country
            ) {
                $state_options[ $new_state->country()->name() ][ $new_state->ID() ] = $new_state->name();
            }
        }
        return $state_options;
    }


    /**
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected static function _get_new_states()
    {
        $new_states = array();
        if (EE_Registry::instance()->SSN instanceof EE_Session) {
            $new_states = EE_Registry::instance()->SSN->get_session_data(
                'nsmf_new_states'
            );
        }
        return is_array($new_states) ? $new_states : array();
    }


    /**
     * @param EE_Country[] $country_options
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function country_options($country_options = array())
    {
        $new_states = EED_Add_New_State::_get_new_states();
        foreach ($new_states as $new_state) {
            if ($new_state instanceof EE_State
                && $new_state->country() instanceof EE_Country
            ) {
                $country_options[ $new_state->country()->ID() ] = $new_state->country()->name();
            }
        }
        return $country_options;
    }
}
