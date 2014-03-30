<?php
/**
 * This file contains the EE_Newsletter_message_type class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * The message type for newsletter type of messages.
 *
 * Newsletter message types are triggered manually by the admin for sending mass email to select groups of
 * registrants.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.4.0
 * @author          Darren Ethier
 */
class EE_Newsletter_message_type extends EE_message_type {

    public function __construct() {
        $this->name = 'newsletter';
        $this->description = __('Newsletter message types are triggered manually by the admin for sending mass email to select groups of registrants.', 'event_espresso');
        $this->label = array(
            'singular' => __('newsletter', 'event_espresso'),
            'plural' => __('newsletters', 'event_espresso')
            );
        parent::__construct();
    }



    protected function _set_admin_pages() {
        $this->admin_registered_pages = array(); //no admin pages to register this with.
    }



    protected function _set_data_handler() {
        $this->_data_handler = 'contacts';
        $this->_single_message = $this->_data instanceof EE_Registration ? TRUE : FALSE;
    }




    protected function _set_admin_settings_fields() {
        $this->_admin_settings_fields = array();
    }



    protected function _set_default_field_content() {
        $this->_default_field_content = array(
            'subject' => $this->_default_template_field_subject(),
            'content' => $this->_default_template_field_content()
            );
    }



    protected function _default_template_field_subject() {
        foreach ( $this->_contexts as $context => $details ) {
            $content[$context] = sprintf( __('Message from %s', 'event_espresso'), EE_Registry::instance()->CFG->organization->name);
        }
        return $content;
    }



    protected function _default_template_field_content() {
        $content = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/newsletter/templates/newsletter-message-type-content.template.php', TRUE );

        foreach ( $this->_contexts as $context => $details ) {
            $tcontent[$context]['main'] = $content;
            $tcontent[$context]['attendee_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/templates/newsletter-message-type-attendee-list.template.php', TRUE );
            $tcontent[$context]['event_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/templates/newsletter-message-type-event-list.template.php', TRUE );
            $tcontent[$context]['ticket_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/templates/newsletter-message-type-ticket-list.template.php', TRUE );
            $tcontent[$context]['datetime_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/templates/newsletter-message-type-datetime-list.template.php', TRUE );
            $tcontent[$context]['datetime_list'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/templates/newsletter-message-type-question-list.template.php', TRUE );
        }


        return $tcontent;
    }



    protected function _set_contexts() {
        $this->_context_label = array(
            'label' => __('recipient', 'event_espresso'),
            'plural' => __('recipients', 'event_espresso'),
            'description' => __('Recipient\'s are who will receive the message.', 'event_espresso')
            );

        $this->_contexts = array(
            'attendee' => array(
                'label' => __('Registrant', 'event_espresso'),
                'description' => __('This template goes to selected registrants.')
                )
            );
    }


}
