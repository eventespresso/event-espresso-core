<?php
/**
 * This file contains the EE_Messages_Newsletter_Defaults class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Class for setting up defaults for the Newsletter Email Messages combo.
 *
 * Handles all the defaults for Email messenger, Newsletter message type templates
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.4.0
 * @author          Darren Ethier
 */
class EE_Messages_Email_Newsletter_Defaults extends EE_Message_Template_Defaults {
    protected function _set_props() {
        $this->_m_name = 'email';
        $this->_mt_name = 'newsletter';
    }


    protected function _change_templates() {
        $this->_templates['attendee']['from'] = '[CO_EMAIL]';
    }
}
