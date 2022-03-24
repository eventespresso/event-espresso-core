<?php

/**
 *  EE_Declined_Registration_message_type
 *
 * Handles frontend registration message types.
 *
 * @package     Event Espresso
 * @subpackage  includes/core/messages/message_type/EE_Declined_Registration_message_type.class.php
 * @author      Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Declined_Registration_message_type extends EE_Registration_Base_message_type
{
    public function __construct()
    {
        $this->name = 'declined_registration';
        $this->description = esc_html__('This message type is for messages sent to registrants when their registration is declined.', 'event_espresso');
        $this->label = array(
            'singular' => esc_html__('registration declined', 'event_espresso'),
            'plural' => esc_html__('registrations declined', 'event_espresso')
            );
        $this->_master_templates = array(
            'email' => 'not_approved_registration'
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
                'description' => esc_html__('This template is what event administrators will receive with an declined registration', 'event_espresso')
                ),
            'attendee' => array(
                'label' => esc_html__('Registrant', 'event_espresso'),
                'description' => esc_html__('This template is what each registrant for the event will receive when their registration is declined.', 'event_espresso')
                )
            );
    }
}
