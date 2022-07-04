<?php

/**
 *
 * EE_Messages_Html_Invoice_Validator
 *
 * This is a child class for the EE_Messages_Validator. Holds any special validation rules for template fields with Html Messenger and Invoice Message Type.
 *
 *
 * @since 4.5.0
 *
 * @package         Event Espresso
 * @subpackage      messages
 * @author          Darren Ethier
 */
class EE_Messages_Html_Invoice_Validator extends EE_Messages_Validator
{
    public function __construct($fields, $context)
    {
        $this->_m_name = 'html';
        $this->_mt_name = 'invoice';

        parent::__construct($fields, $context);
    }

    /**
     * custom validator (restricting what was originally set by the messenger).
     * Note nothing is currently done for this messenger and message type.
     */
    protected function _modify_validator()
    {
        $this->_specific_shortcode_excludes['content'] = array('[DISPLAY_HTML_URL]');
        return;
    }
}
