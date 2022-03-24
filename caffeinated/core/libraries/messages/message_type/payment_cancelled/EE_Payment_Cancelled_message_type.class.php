<?php

/**
 * EE_Payment_Cancelled_message_type extends EE_message_type
 *
 * Handles frontend and backend payment notification messages for cancelled payments
 *
 * @package     Event Espresso
 * @subpackage  messages
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment_Cancelled_message_type extends EE_Payment_Base_message_type
{
    public function __construct()
    {

        // setup type details for reference
        $this->name = 'payment_cancelled';
        $this->description = esc_html__('This message type is used for all cancelled payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('payment cancelled', 'event_espresso'),
            'plural' => esc_html__('payments cancelled', 'event_espresso')
            );

        $this->_master_templates = array(
            'email' => 'payment'
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
            'description' => esc_html__('Recipient\'s are who will receive the template.  You may want different payment details sent out depending on who the recipient is.', 'event_espresso')
            );

        $this->_contexts = array(
            'admin' => array(
                'label' => esc_html__('Event Admin', 'event_espresso'),
                'description' => esc_html__('This template is what event administrators will receive when payment is cancelled.', 'event_espresso')
                ),
            'primary_attendee' => array(
                'label' => esc_html__('Primary Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what the primary registrant (the person who made the main registration) will receive when the payment is cancelled.', 'event_espresso')
                )
            );
    }
}
