<?php
/**
 * This file contains the EE_New_Template_Pack
 * @package      new-messages-template-pack
 * @subpackage messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This is a new template pack for the ee messages template pack system.
 *
 * @package        new-messages-template-pack
 * @subpackage  messages
 * @since            4.5.0
 * @author          Darren Ethier
 */
class  EE_Messages_Template_Pack_New_Template_Pack extends EE_Messages_Template_Pack {

    public function _set_props() {
        $this->label = esc_html__('Test Pack', 'event_espresso');
        $this->dbref = 'new_template_pack';
        $this->description = esc_html__('This is a new template pack included as part of an example template pack for demonstration purposes.', 'event_espresso');
        $this->_base_url = EE_NEW_TP_URL . 'templates/';
        $this->_base_path = EE_NEW_TP_PATH . 'templates/';

        //note in this example we're stating that this template pack JUST supports the email messenger and the payment message types.
        $this->_supports = array(
            'email' => array(
                'payment_declined', 'payment', 'payment_refund', 'payment_reminder', 'newsletter'
            )
        );

        //here we list what variations are supported.  This example demonstration doesn't support any extra variations.
        //Remember that ALL variations for your template pack must be in a folder located at $this->_base_path '/variations'.  The variation file names should match what each messenger expects.  So you may need to look at the messenger classes for the messengers you support to see what possible variations might be requested by the messenger.
        $this->_variations = array();

        //all template packs can define the default variation.  You may want to override the label that describes this default, and you do so via this property.  Indexes are the messenger you wish to override the default label for and values are the new label.
        $this->_default_variation_labels = array( 'email' => esc_html__('New Pack Default', 'event_espresso' ) );
    }
}
