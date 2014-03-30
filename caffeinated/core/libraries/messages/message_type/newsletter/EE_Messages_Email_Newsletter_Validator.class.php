<?php
/**
 * This file contains the EE_Messages_Email_Newsletter_Validator class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Holds any special validation rules for template fields with Email messenger and Newsletter
 * message type.
 *
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.4.0
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
        return; //nothing special for this message type (yet).
    }
}
