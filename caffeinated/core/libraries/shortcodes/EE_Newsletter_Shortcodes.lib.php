<?php
/**
 * This file contains the EE_Newsletter_Shortcodes class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This is the library class for the "newsletter" group shortcodes.
 *
 *
 * @package        Event Espresso
 * @subpackage  helpers
 *
 * @since            4.3.0
 * @see               EE_Shortcodes for documentation on extended methods.
 * @author          Darren Ethier
 */
class EE_Newsletter_Shortcodes extends EE_Shortcodes {

    protected function _init_props() {
        $this->label = __("Batch Messages Shortcodes", 'event_espresso');
        $this->description = __('All shortcodes used for the batch message type', 'event_espresso');
        $this->_shortcodes = array(
            '[NEWSLETTER_CONTENT]' => __('This will parse to whatever is found in the related [newsletter_content] field.  Note that when triggering a batch message, whatever is added for the custom message will be inserted where this shortcode is placed.', 'event_espresso')
            );
    }



    protected function _parser( $shortcode ) {
        if ( $shortcode == '[NEWSLETTER_CONTENT]' ) {
            $this->_validate_list_requirements();
            $valid_shortcodes = array('recipient_details', 'organization');
            $template = $this->_data['template']['newsletter_content'];
            $data = $this->_data;
            return $this->_shortcode_helper->parse_message_template( $template, $data['data'], $valid_shortcodes, $this->_message_type, $this->_messenger, $this->_message );
        }
    }


    /**
     * Callback set in args for EE_Register_Messages_Shortcode_Library::register for 'msgr_validator_callback'.
     *
     * EE_Register_Messages_Shortcode_Library::register registers this callback with the
     * 'FHEE__EE_messenger__get_validator_config' filter.
     *
     * @since    4.3.0
     * @param  array        $validator_config  current validator configuration array
     * @param  EE_messenger $messenger
     * @return  array                                             new validator config.
     */
    public static function messenger_validator_config( $validator_config, EE_messenger $messenger ) {
        if ( $messenger->name !== 'email' )
            return $validator_config;

        $validator_config['content']['shortcodes'][] = 'newsletter';
        $validator_config['newsletter_content'] = array(
            'shortcodes' => array('recipient_details', 'organization'),
            'required' => array('[NEWSLETTER_CONTENT]')
            );
        return $validator_config;
    }




    /**
     * Callback set in args for EE_Register_Messages_Shortcode_Library::register for
     * 'msgr_template_fields_callback'.
     *
     * EE_Register_Messages_Shortcode_Library::register registers this callback with the
     * FHEE__EE_messenger__get_template_fields filter.
     *
     * @since    4.3.0
     *
     * @param  array        $template_fields current template fields setup array.
     * @param  EE_messenger $messenger
     * @return  array                                           new/modified template fields array.
     */
    public static function messenger_template_fields( $template_fields, EE_messenger $messenger ) {
        if ( $messenger->name !== 'email' )
            return $template_fields;

        $template_fields['extra']['content']['newsletter_content'] = array(
            'input' => 'wp_editor',
            'label' => '[NEWSLETTER_CONTENT]',
            'type' => 'string',
            'required' => TRUE,
            'validation' => TRUE,
            'format' => '%s',
            'rows' => '15',
            'shortcodes_required' => array('[NEWSLETTER_CONTENT]')
            );
        return $template_fields;
    }

} //end class EE_Newsletter_Shortcodes
