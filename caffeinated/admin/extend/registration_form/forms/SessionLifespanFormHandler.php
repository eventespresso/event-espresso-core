<?php

namespace EventEspresso\caffeinated\admin\extend\registration_form\forms;

use EE_Admin_Two_Column_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Select_Input;
use EEH_HTML;
use EventEspresso\core\domain\values\session\SessionLifespanOption;

class SessionLifespanFormHandler
{
    /**
     * @var SessionLifespanOption
     */
    private $session_lifespan_option;


    /**
     * SessionLifespanForm constructor.
     *
     * @param SessionLifespanOption $session_lifespan_option
     */
    public function __construct(SessionLifespanOption $session_lifespan_option)
    {
        $this->session_lifespan_option = $session_lifespan_option;
    }


    /**
     * @param SessionLifespanForm $form
     */
    public function process($form)
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
