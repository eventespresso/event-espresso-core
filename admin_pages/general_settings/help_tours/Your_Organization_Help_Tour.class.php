<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Your_Organization_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package         Your_Organization_Help_Tour
 * @subpackage      includes/core/admin/general_settings/help_tours/Your_Organization_Help_Tour.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Your_Organization_Help_Tour extends EE_Help_Tour
{
    
    protected function _set_tour_properties()
    {
        $this->_label = __('Your Organization Tour', 'event_espresso');
        $this->_slug  = 'your-organization-joyride';
    }
    
    
    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'content' => $this->_start(),
            ),
            30 => array(
                'id'      => 'contact_info_h4',
                'content' => $this->_contact_information_stop(),
                'options' => array(
                    'tipLocation'    => 'left',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            ),
            40 => array(
                'id'      => 'upload_image',
                'content' => $this->_upload_image_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            ),
            50 => array(
                'id'      => 'organization_facebook',
                'content' => $this->_organization_facebook_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            ),
            60 => array(
                'id'      => 'ueip_optin',
                'content' => $this->_ueip_option_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            ),
            70 => array(
                'id'      => 'espresso_major_buttons_wrapper',
                'content' => $this->_end_tour_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 185
                )
            )
        );
        
        if (is_main_site()) {
            $this->_stops[20] = array(
                'id' => 'site_license_key',
                'content' => $this->_site_license_key_stop(),
                'options' => array(
                    'tipLocation' => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            );
        }
        ksort( $this->_stops );
    }
    
    
    protected function _start()
    {
        $content = '<h3>' . __('Organization Settings', 'event_espresso') . '</h3>';
        $content .= '<p>' . __('This tour of the Your Organization page will go over different areas of the screen to help you understand what they are used for.',
                'event_espresso') . '</p>';
        
        return $content;
    }
    
    protected function _site_license_key_stop()
    {
        return '<p>' . __('Enter your support license key here to enable one-click updates.',
            'event_espresso') . '</p>';
    }
    
    protected function _contact_information_stop()
    {
        return '<p>' . __('You can change your business / organization information below. Be sure to keep this information updated as it is used in other areas of the site. Adjusting the country option here will update your currency settings. More options are available in the Countries tab.',
            'event_espresso') . '</p>';
    }
    
    protected function _upload_image_stop()
    {
        return '<p>' . __('Add a logo. This can be used for invoices and tickets.', 'event_espresso') . '</p>';
    }
    
    protected function _organization_facebook_stop()
    {
        return '<p>' . __('Add links to various social media networks.', 'event_espresso') . '</p>';
    }
    
    protected function _ueip_option_stop()
    {
        return '<p>' . __('Help us to help you! Sign up to the User eXperience Improvement Program and send us anonymous data that will help us improve Event Espresso.',
            'event_espresso') . '</p>';
    }
    
    protected function _end_tour_stop()
    {
        return '<p>' . __('You are almost done updating Your Organization information. Click on the Save button to save changes and then go to the Payment Methods screen so you can setup a payment gateway.',
            'event_espresso') . '</p>';
    }
}