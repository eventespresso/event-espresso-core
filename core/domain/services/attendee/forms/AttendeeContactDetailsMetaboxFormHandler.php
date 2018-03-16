<?php

namespace EventEspresso\core\domain\services\attendee\forms;

use DomainException;
use EE_Admin_One_Column_Layout;
use EE_Attendee;
use EE_Email_Input;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Registry;
use EE_Text_Input;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use InvalidArgumentException;
use LogicException;

/**
 * Form handler for the attendee contact details metabox content in the admin.
 *
 * @package EventEspresso\domain\services\attendee\forms
 * @author  Darren Ethier
 * @since   1.0.0
 */
class AttendeeContactDetailsMetaboxFormHandler extends FormHandler{


    protected $attendee;


    /**
     * AttendeeContactDetailsMetaboxFormHandler constructor.
     *
     * @param EE_Attendee $attendee
     * @param EE_Registry $registry
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public function __construct(EE_Attendee $attendee, EE_Registry $registry)
    {
        $this->attendee = $attendee;
        $label = esc_html__('Contact Details', 'event_espresso');
        parent::__construct(
            $label,
            $label,
            'attendee_contact_details',
            '',
            FormHandler::DO_NOT_SETUP_FORM,
            $registry
        );
    }

    /**
     * creates and returns the actual form
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public function generate()
    {
        return new EE_Form_Section_Proper(
            array(
                'name' => 'attendee_contact_details',
                'html_id' => 'attendee-contact-details',
                'html_class' => 'form-table',
                'layout_strategy' => new EE_Admin_One_Column_Layout(),
                'subsections' => array(
                    'ATT_email' => new EE_Email_Input(
                        array(
                            'default' => $this->attendee->email(),
                            'html_label_text' => esc_html__('Email Address', 'event_espresso'),
                            'required' => true
                        )
                    ),
                    'ATT_phone' => new EE_Text_Input(
                        array(
                            'default' => $this->attendee->phone(),
                            'html_label_text' => esc_html__('Phone Number', 'event_espresso')
                        )
                    )
                )
            )
        );
    }


    /**
     * Process form data.
     * @param array $form_data
     * @return bool
     * @throws EE_Error
     * @throws InvalidFormSubmissionException
     * @throws LogicException
     */
    public function process($form_data = array())
    {
        $valid_data = (array) parent::process($form_data);
        if (empty($valid_data)) {
            return false;
        }
        $this->attendee->set_email($valid_data['ATT_email']);
        $this->attendee->set_phone($valid_data['ATT_phone']);
        $updated = $this->attendee->save();
        return $updated !== false;
    }
}