<?php

/**
 * EE_Help_Tour_final_stop
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package         EE_Help_Tour_final_stop
 * @subpackage      includes/core/admin/general_settings/help_tours/EE_Help_Tour_final_stop.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Help_Tour_final_stop extends EE_Help_Tour
{
    protected function _set_tour_properties()
    {
        $this->_label = esc_html__('Final Stop Tour', 'event_espresso');
        $this->_slug = 'final-stop-tour';
    }


    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'id'          => 'contextual-help-link',
                'content'     => $this->_end(),
                'button_text' => esc_html__('Quit', 'event_espresso'),
                'options'     => array(
                    'tipLocation'    => 'left',
                    'tipAdjustmentY' => -20,
                    'tipAdjustmentX' => 10,
                ),
            ),
        );
    }


    /**
     * This is the default last stop for all tours that is displayed at the end of a tour OR when a tour is exited for
     * the first time.
     *
     * @return string
     */
    protected function _end()
    {
        $query_args = array(
            'action' => 'admin_option_settings',
            'page'   => 'espresso_general_settings',
        );
        return '<p>'
               . sprintf(
                   esc_html__(
                       'That\'s it for the tour!  At any time you can restart a tour by clicking on this help dropdown and then clicking one of the Tour buttons.  There are help tours available on all Event Espresso Admin pages.  If you want to turn off help tours for all pages, %sgo here%s. All the best with your events!',
                       'event_espresso'
                   ),
                   '<a href="' . EE_Admin_Page::add_query_args_and_nonce($query_args, admin_url('admin.php')) . '">',
                   '</a>'
               )
               . '</p>';
    }
}
