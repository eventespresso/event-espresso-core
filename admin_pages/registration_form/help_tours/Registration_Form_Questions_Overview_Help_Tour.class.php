<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Registration_Form_Questions_Overview_Help_Tour
 *
 * This is the help tour object for the Questions Overview page
 *
 *
 * @package         Registration_Form_Questions_Overview_Help_Tour
 * @subpackage      includes/core/admin/registration/help_tours/Registration_Form_Questions_Overview_Help_Tour.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Questions_Overview_Help_Tour extends EE_Help_Tour
{
    
    protected function _set_tour_properties()
    {
        $this->_label = __('Questions Overview Tour', 'event_espresso');
        $this->_slug  = $this->_is_caf ? 'questions-overview-caf-joyride' : 'questions-overview-joyride';
    }
    
    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10  => array(
                'content' => $this->_start(),
            ),
            30  => array(
                'id'      => 'display_text',
                'content' => $this->_display_text_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => -5,
                    'tipAdjustmentY' => -25
                )
            ),
            40  => array(
                'id'      => 'admin_label',
                'content' => $this->_admin_label_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 20,
                    'tipAdjustmentY' => -25
                )
            ),
            50  => array(
                'id'      => 'type',
                'content' => $this->_type_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => -5,
                    'tipAdjustmentY' => -25
                )
            ),
            60  => array(
                'id'      => 'values',
                'content' => $this->_values_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => -5,
                    'tipAdjustmentY' => -25
                )
            ),
            70  => array(
                'id'      => 'required',
                'content' => $this->_required_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -20,
                    'tipAdjustmentX' => -15
                )
            ),
            /*80 => array(
                'class' => 'bulkactions',
                'content' => $this->_bulk_actions_stop(),
                'options' => array(
                    'tipLocation' => 'top',
                    'tipAdjustmentY' => -30,
                    'tipAdjustmentX' => -15
                    )
                ),*/
            90  => array(
                'id'      => 'event-espresso_page_espresso_registration_form-search-input',
                'content' => $this->_search_stop(),
                'options' => array(
                    'tipLocation'    => 'left',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => -15
                )
            ),
            100 => array(
                'id'      => 'add-new-question',
                'content' => $this->_add_new_question_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            ),
        );
    }
    
    
    protected function _start()
    {
        $content = '<h3>' . __('Questions Overview', 'event_espresso') . '</h3>';
        $content .= '<p>' . __('This tour of the Questions Overview page will go over different areas of the screen to help you understand what they are used for.',
                'event_espresso') . '</p>';
        
        return $content;
    }
    
    protected function _display_text_stop()
    {
        return '<p>' . __('View available questions. You can reorder your questions by dragging and dropping them.',
            'event_espresso') . '</p>';
    }
    
    protected function _admin_label_stop()
    {
        return '<p>' . __('View the admin label for your questions.', 'event_espresso') . '</p>';
    }
    
    protected function _type_stop()
    {
        return '<p>' . __('View the type of question. Available options are Text, Textarea, Checkboxes, Radio Buttons, Dropdown, State/Province Dropdown, Country Dropdown, and Date Picker.',
            'event_espresso') . '</p>';
    }
    
    protected function _values_stop()
    {
        return '<p>' . __('View stored values for checkboxes, radio buttons, and select boxes.',
            'event_espresso') . '</p>';
    }
    
    protected function _required_stop()
    {
        return '<p>' . __('View if a question is required.', 'event_espresso') . '</p>';
    }
    
    /* protected function _bulk_actions_stop() {
        return '<p>' . __('Perform bulk actions to multiple questions.', 'event_espresso') . '</p>';
    } */
    
    protected function _search_stop()
    {
        return '<p>' . __('Search through questions. The following sources will be searched: Name of Question (display text).',
            'event_espresso') . '</p>';
    }
    
    protected function _add_new_question_stop()
    {
        return '<p>' . __('Click here to add a new question.', 'event_espresso') . '</p>';
    }
    
}