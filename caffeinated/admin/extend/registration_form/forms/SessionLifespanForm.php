<?php

namespace EventEspresso\caffeinated\admin\extend\registration_form\forms;

use EE_Admin_Two_Column_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Registration_Config;
use EE_Select_Input;
use EE_Switch_Input;
use EEH_HTML;
use EventEspresso\core\domain\values\session\SessionLifespanOption;

class SessionLifespanForm extends EE_Form_Section_Proper
{
    /**
     * SessionLifespanForm constructor.
     *
     * @param SessionLifespanOption  $session_lifespan_option
     * @param EE_Registration_Config $reg_config
     * @throws EE_Error
     */
    public function __construct(SessionLifespanOption $session_lifespan_option, EE_Registration_Config $reg_config)
    {
        parent::__construct([
            'name'            => 'session_lifespan',
            'html_id'         => 'session_lifespan',
            'layout_strategy' => new EE_Admin_Two_Column_Layout(),
            'subsections'     => apply_filters(
                'FHEE__EventEspresso_caffeinated_admin_extend_registration_form_forms_SessionLifespanForm__construct__form_subsections',
                [
                    'session_lifespan_hdr'   => new EE_Form_Section_HTML(
                        EEH_HTML::h2(esc_html__('Session Settings', 'event_espresso'))
                    ),
                    'session_lifespan' => new EE_Select_Input(
                        [
                            300     => esc_html__('Five Minutes', 'event_espresso'),
                            900     => esc_html__('Fifteen Minutes', 'event_espresso'),
                            1800    => esc_html__('Thirty Minutes', 'event_espresso'),
                            3600    => esc_html__('One Hour', 'event_espresso'),
                            7200    => esc_html__('Two Hours', 'event_espresso'),
                        ],
                        [
                            'html_label_text' => esc_html__('Session Lifespan', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'Controls how long a user has to complete the registration form. Defaults to 1 hour.',
                                'event_espresso'
                            ),
                            'default'         => $session_lifespan_option->getSessionLifespan(),
                            'required'        => false,
                        ]
                    ),
                    'use_session_countdown' => new EE_Switch_Input(
                        [
                            'html_label_text' => esc_html__('Session Countdown Timer', 'event_espresso'),
                            'default'        => $reg_config->useSessionCountdown()
                                ? EE_Switch_Input::OPTION_ON
                                : EE_Switch_Input::OPTION_OFF,
                            'html_name'      => 'use_session_countdown',
                            'html_help_text' => esc_html__(
                                'Whether to display a countdown timer to the user showing how much time they have left to complete the registration form. Defaults to off.',
                                'event_espresso'
                            ),
                            'layout_container_class' => 'ee-feature-highlight-2024',
                            'extra_container_html' => '<span class="ee-feature-highlight-2024-notice">✨ ' . esc_html__('NEW', 'event_espresso') . '</span>',
                        ],
                        [
                            EE_Switch_Input::OPTION_OFF => esc_html__(
                                'session countdown timer is NOT displayed',
                                'event_espresso'
                            ),
                            EE_Switch_Input::OPTION_ON  => esc_html__(
                                'session countdown timer is displayed',
                                'event_espresso'
                            ),
                        ]
                    ),
                ]
            ),
        ]);
    }
}
