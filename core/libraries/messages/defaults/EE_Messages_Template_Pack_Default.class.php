<?php

/**
 * This is the default messages template pack.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.5.0
 * @author          Darren Ethier
 */
class EE_Messages_Template_Pack_Default extends EE_Messages_Template_Pack
{
    public function _set_props()
    {
        $this->label = esc_html__('Default', 'event_espresso');
        $this->dbref = 'default';
        $this->description = esc_html__('This is the default template pack included with Event Espresso core messages system.', 'event_espresso');
        $this->_base_url = EE_PLUGIN_DIR_URL . 'core/libraries/messages/defaults/default/';
        $this->_base_path = EE_LIBRARIES . 'messages/defaults/default/';
        $this->_supports = array(
            'email' => array(
                'cancelled_registration', 'declined_registration', 'not_approved_registration', 'pending_approval', 'registration',
                    'registration_summary',
                'payment_declined', 'payment', 'payment_refund', 'payment_reminder'
                ),
            'html' => array(
                'receipt', 'invoice'
                )
            );
        $this->_default_variation_labels = array(
            'email' => esc_html__('Default', 'event_espresso'),
            'html' =>  esc_html__('Simple', 'event_espresso')
             );
        $this->_variations = array(
            'html' => array(
                'receipt' =>
                    array(
                    'bauhaus' => esc_html__('Bauhaus', 'event_espresso'),
                    'ejs' => esc_html__('Elliot Jay Stocks', 'event_espresso'),
                    'horizon' => esc_html__('Horizon', 'event_espresso'),
                    'lola' => esc_html__('Lola', 'event_espresso'),
                    'tranquility' => esc_html__('Tranquility', 'event_espresso'),
                    'union' => esc_html__('Union', 'event_espresso'),
                    ),
                'invoice' =>
                    array(
                    'bauhaus' => esc_html__('Bauhaus', 'event_espresso'),
                    'ejs' => esc_html__('Elliot Jay Stocks', 'event_espresso'),
                    'horizon' => esc_html__('Horizon', 'event_espresso'),
                    'lola' => esc_html__('Lola', 'event_espresso'),
                    'tranquility' => esc_html__('Tranquility', 'event_espresso'),
                    'union' => esc_html__('Union', 'event_espresso'),
                    )
                )
            );
    }



    public function get_default_variation($messenger, $message_type, $type, $url, $file_extension)
    {
        $base = $url ? $this->_base_url : $this->_base_path;
        $base_path = $this->_base_path;
        // possible variation paths considering whether message type is present or not in the file name.
        $path_string = 'variations/' . $messenger . '_' . $message_type . '_'  . $type . '_default' . $file_extension;
        $default_path_string = 'variations/' . $messenger . '_' . $type . '_default' . $file_extension;
        // first see if fully validated file exists.
        if (is_readable($base_path . $path_string)) {
            $variation_path = $base . $path_string;
        // otherwise see if default exists.
        } elseif (is_readable($base_path . $default_path_string)) {
            $variation_path = $base . $default_path_string;
        } else {
            // no matches found so nothing is present.
            $variation_path = '';
        }

        return $variation_path;
    }
}
