<?php

/**
 *
 * EE_Registration_Summary_message_type
 *
 * This message type provides a summary notification to primary_attendee and admin contexts when there are
 * multiple registrations in a transaction with different statuses.
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/messages/message_type/EE_Registration_Summary_message_type.class.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Registration_Summary_message_type extends EE_Registration_Base_message_type
{
    public function __construct()
    {
        $this->name = 'registration_summary';
        $this->description = esc_html__('This message type provides a summary notification to Primary Registrants and Admin recipients when there are multiple registrations in a transaction with different statuses.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('registration multi-status summary', 'event_espresso'),
            'plural' => esc_html__('registrations multi-status summary', 'event_espresso')
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
            'description' => esc_html__('Recipient\'s are who will receive the template.  You may want different details sent out depending on who the recipient is.  To "turn off" a recipient from receiving message, simply remove any content from the "to" field in the template.', 'event_espresso')
            );

        $this->_contexts = array(
            'admin' => array(
                'label' => esc_html__('Event Admin', 'event_espresso'),
                'description' => esc_html__('This template is what event administrators will receive when a transaction is finalized that has registrations with multiple different statuses.', 'event_espresso')
                ),
            'primary_attendee' => array(
                'label' => esc_html__('Primary Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what the primary registrant (the person who completed the initial transaction) will receive when the transaction completed has registrations with different statuses.  By default it is a summary email of all registrations for all events on the transaction and their status.', 'event_espresso')
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
