<?php
/**
 * This file contains the EE_Messages_Email_Newsletter_Validator class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Holds any special validation rules for template fields with Email messenger and Newsletter
 * message type.
 *
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.3.0
 * @author          Darren Ethier
 */
class EE_Messages_Email_Newsletter_Validator extends EE_Messages_Validator {
    public function __construct( $fields, $context ) {
        $this->_m_name = 'email';
        $this->_mt_name = 'newsletter';

        parent::__construct( $fields, $context );
    }

    /**
     * custom validator (restricting what was originally set by the messenger)
     */
    protected function _modify_validator() {
        if ( $this->_context == 'attendee' )
            $this->_valid_shortcodes_modifier[$this->_context]['from'] = array('recipient_details', 'email', 'organization');

        //excluded shortcodes
        $fields = array('to','from','subject','content','newsletter_content');
        foreach ( $fields as $field ) {
            $this->_specific_shortcode_excludes[$field] = array('[RECIPIENT_REGISTRATION_CODE]', '[RECIPIENT_EDIT_REGISTRATION_LINK]', '[EVENT_AUTHOR_FORMATTED_EMAIL]', '[EVENT_AUTHOR_EMAIL]');
        }
        $add_excludes = array( '[RECIPIENT_FNAME]', '[RECIPIENT_LNAME]', '[RECIPIENT_EMAIL]', '[COMPANY]', '[CO_ADD1]','[CO_ADD2]', '[CO_CITY]', '[CO_STATE]','[CO_ZIP]','[CO_LOGO]','[CO_PHONE]','[CO_LOGO_URL]','[CO_FACEBOOK_URL]','[CO_TWITTER_URL]','[CO_PINTEREST_URL]','[CO_GOOGLE_URL]','[CO_LINKEDIN_URL]','[CO_INSTAGRAM_URL]');
        $this->_specific_shortcode_excludes['from'] = array_merge($this->_specific_shortcode_excludes['from'], $add_excludes);
        $this->_specific_shortcode_excludes['content'] = array_merge( $this->_specific_shortcode_excludes['content'], array('[DISPLAY_PDF_URL]', '[DISPLAY_PDF_BUTTON]') );
    }
}
