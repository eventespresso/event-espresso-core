<?php
/**
 * This file contains the EE_Newsletter_Shortcodes class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This is the library class for the "newsletter" group shortcods.
 *
 *
 * @package        Event Espresso
 * @subpackage  helpers
 *
 * @since            4.4.0
 * @see               EE_Shortcodes for documentation on extended methods.
 * @author          Darren Ethier
 */
class EE_Newsletter_Shortcodes extends EE_Shortcodes {

    protected function _init_props() {
        $this->label = __("Newsletter Shortcodes", 'event_espresso');
        $this->description = __('All shortcodes used for the newsletter message type', 'event_espresso');
        $this->_shortcodes = array(
            '[NEWSLETTER_CONTENT]' => __('This will parse to whatever is found in the related [newsletter_content] field.  Note that when triggering a newsletter message, whatever is added for the custom message will be inserted where this shortcode is placed', 'event_espresso')
            );
    }



    protected function _parser( $shortcode ) {
        if ( $shortcode == '[NEWSLETTER_CONTENT]' ) {
            $this->_validate_list_requirements();
            $this->_set_shortcode_helper();
            $valid_shortcodes = array('recipient_details', 'organization');
            $template = $this->_data['template']['newsletter_content'];
            $data = $this->_data;
            return $this->_shortcode_helper->parse_message_template( $template, $data['data'], $valid_shortcodes );
        }
    }


    /**
     * Callback set in args for EEH_Plugin_API::register_messages_shortcode_library for 'msgr_validator_callback'.
     *
     * register_messages_shortcode_library registers this callback with the
     * 'FHEE__EE_messenger__get_validator_config' filter.
     *
     * @since    4.4.0
     * @param  array                $validator_config  current validator configuration array
     * @param  EE_messenger  $messenger
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
     * Callback set in args for EEH_Plugin_API::register_messages_shortcode_library for
     * 'msgr_template_fields_callback'.
     *
     * register_messages_shortcode_library registers this callback with the
     * FHEE__EE_messenger__get_template_fields filter.
     *
     * @since    4.4.0
     *
     * @param  array                $template_fields current template fields setup array.
     * @param  EE_messenger  $messenger
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
