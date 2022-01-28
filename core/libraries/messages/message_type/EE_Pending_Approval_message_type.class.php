<?php

/**
 * EE_Pending_Approval_message_type
 *
 * Handles frontend registration message types.
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/messages/message_type/EE_Pending_Approval_message_type.class.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Pending_Approval_message_type extends EE_Registration_Base_message_type
{

    public function __construct()
    {
        $this->name = 'pending_approval';
        $this->description = esc_html__('This message type is used for recipients who have Pending Payment registration status.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('registration pending payment', 'event_espresso'),
            'plural' => esc_html__('registrations pending payment', 'event_espresso')
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
            'description' => esc_html__('Recipient\'s are who will receive the template.  You may want different pending approval details sent out depending on who the recipient is.  To "turn off" a recipient from receiving message, simply remove any content from the "to" field in the template.', 'event_espresso')
            );

        $this->_contexts = array(
            'admin' => array(
                'label' => esc_html__('Event Admin', 'event_espresso'),
                'description' => esc_html__('This template is what event administrators will receive when a message is sent to registrants with the pending payment registration status.', 'event_espresso')
                ),
            'primary_attendee' => array(
                'label' => esc_html__('Primary Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what the primary registrant (the person who completed the initial transaction) will receive on when their registration status is pending payment.', 'event_espresso')
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
