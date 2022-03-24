<?php

/**
 * EE_Payment_message_type extends EE_message_type
 *
 * Handles frontend payment notification messages
 *
 * @package     Event Espresso
 * @subpackage  includes/core/messages/message_type/EE_Payment_message_type.class.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment_message_type extends EE_Payment_Base_message_type
{
    public function __construct()
    {

        // setup type details for reference
        $this->name = 'payment';
        $this->description = esc_html__('This message type is used for all payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('payment received', 'event_espresso'),
            'plural' => esc_html__('payments received', 'event_espresso')
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
            'description' => esc_html__('Recipient\'s are who will receive the template.  You may want different payment details sent out depending on who the recipient is', 'event_espresso')
            );

        $this->_contexts = array(
            'admin' => array(
                'label' => esc_html__('Event Admin', 'event_espresso'),
                'description' => esc_html__('This template is what event administrators will receive on a successful payment', 'event_espresso')
                ),
            'primary_attendee' => array(
                'label' => esc_html__('Primary Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what the primary registrant (the person who made the main registration) will receive on successful payment', 'event_espresso')
                )
            );
    }
}
