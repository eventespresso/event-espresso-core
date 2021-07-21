<?php

/**
 * EE_Not_Approved_Registration_message_type
 *
 * Handles messages for not approved registrations.
 *
 * @package     Event Espresso
 * @subpackage  includes/core/messages/message_type/EE_Not_Approved_Registration_message_type.class.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Not_Approved_Registration_message_type extends EE_Registration_Base_message_type
{

    public function __construct()
    {
        $this->name = 'not_approved_registration';
        $this->description = esc_html__('This message type is for messages sent to registrants when their registration is set to the not approved status.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('not approved registration', 'event_espresso'),
            'plural' => esc_html__('not approved registrations', 'event_espresso')
            );

        $this->_master_templates = array(
            'email' => 'registration'
            );

        parent::__construct();
    }




    /**
     * _set_contexts
     * This sets up the contexts associated with the message_type
     *
     * @access  protected
     * @return  void
     */
    protected function _set_contexts()
    {
        $this->_context_label = array(
            'label' => esc_html__('recipient', 'event_espresso'),
            'plural' => esc_html__('recipients', 'event_espresso'),
            'description' => esc_html__('Recipient\'s are who will receive the template.  You may want different registration details sent out depending on who the recipient is', 'event_espresso')
            );

        $this->_contexts = array(
            'admin' => array(
                'label' => esc_html__('Event Admin', 'event_espresso'),
                'description' => esc_html__('This template is what event administrators will receive when registration status is set to not approved.', 'event_espresso')
                ),
            'primary_attendee' => array(
                'label' => esc_html__('Primary Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what the primary registrant (the person who completed the initial transaction) will receive when the registration status is not approved.', 'event_espresso')
                )
            );
    }



    protected function _primary_attendee_addressees()
    {
        $cached = $this->_single_message;
        $this->_single_message = false;
        $addressees = parent::_primary_attendee_addressees();
        $this->_single_message = $cached;
        return $addressees;
    }
}
