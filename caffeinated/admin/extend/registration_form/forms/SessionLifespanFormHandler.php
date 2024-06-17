<?php

namespace EventEspresso\caffeinated\admin\extend\registration_form\forms;

use EE_Error;
use EE_Config;
use EE_Switch_Input;
use EventEspresso\core\domain\values\session\SessionLifespanOption;

class SessionLifespanFormHandler
{
    private SessionLifespanOption $session_lifespan_option;
    private EE_Config $config;


    /**
     * SessionLifespanForm constructor.
     *
     * @param SessionLifespanOption $session_lifespan_option
     * @param EE_Config $config
     */
    public function __construct(SessionLifespanOption $session_lifespan_option, EE_Config $config)
    {
        $this->session_lifespan_option = $session_lifespan_option;
        $this->config = $config;
    }


    public function process(SessionLifespanForm $form)
    {
        try {
            // if not displaying a form, then check for form submission
            if ($form->was_submitted()) {
                // capture form data
                $form->receive_form_submission();
                // validate form data
                if ($form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $form->valid_data();
                    if (isset($valid_data['session_lifespan'])) {
                        $session_lifespan = (int) $valid_data['session_lifespan'];
                        $this->session_lifespan_option->setSessionLifespan($session_lifespan);
                        $this->config->registration->setUseSessionCountdown(
                            isset($valid_data['use_session_countdown'])
                            && $valid_data['use_session_countdown'] === EE_Switch_Input::OPTION_ON
                        );
                        $this->config->update_espresso_config();
                    } else {
                        EE_Error::add_error(
                            esc_html__(
                                'Invalid or missing Email Validation settings. Please refresh the form and try again.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                } elseif ($form->submission_error_message() !== '') {
                    EE_Error::add_error(
                        $form->submission_error_message(),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }
    }
}
