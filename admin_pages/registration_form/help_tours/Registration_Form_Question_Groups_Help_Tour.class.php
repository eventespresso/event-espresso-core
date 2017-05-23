<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Registration_Form_Question_Groups_Help_Tour
 *
 * This is the help tour object for the Registration Overview page
 *
 *
 * @package         Registration_Form_Question_Groups_Help_Tour
 * @subpackage      includes/core/admin/registration/help_tours/Registration_Form_Question_Groups_Help_Tour.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Question_Groups_Help_Tour extends EE_Help_Tour
{
    
    protected function _set_tour_properties()
    {
        $this->_label = __('Question Groups Tour', 'event_espresso');
        $this->_slug  = $this->_is_caf ? 'question-groups-caf-overview-joyride' : 'question-groups-overview-joyride';
    }
    
    
    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'content' => $this->_start(),
            )
        );
        
        if ($this->_is_caf) {
            $this->_stops[20] = array(
                'id'      => 'name',
                'content' => $this->_name_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -30,
                    'tipAdjustmentX' => 25
                )
            );
            $this->_stops[30] = array(
                'id'      => 'description',
                'content' => $this->_description_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -30,
                    'tipAdjustmentX' => 20
                )
            );
            $this->_stops[40] = array(
                'id'      => 'show_group_name',
                'content' => $this->_show_group_name_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -30,
                    'tipAdjustmentX' => 20
                )
            );
            $this->_stops[50] = array(
                'id'      => 'show_group_desc',
                'content' => $this->_show_group_description_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -30,
                    'tipAdjustmentX' => 20
                )
            );
            $this->_stops[60] = array(
                'class'   => 'bulkactions',
                'content' => $this->_bulk_actions_stop(),
                'options' => array(
                    'tipLocation'    => 'left',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => -80
                )
            );
            $this->_stops[70] = array(
                'id'      => 'add-new-question-group',
                'content' => $this->_add_new_question_group_stop(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -50,
                    'tipAdjustmentX' => 15
                )
            );
        }
    }
    
    
    protected function _start()
    {
        $content = '<h3>' . __('Question Groups', 'event_espresso') . '</h3>';
        if ($this->_is_caf) {
            $content .= '<p>' . __('This tour of the Question Groups page will go over different areas of the screen to help you understand what they are used for.',
                    'event_espresso') . '</p>';
        } else {
            $content .= '<p>' . __('Sorry, Event Espresso Decaf does not have this feature. Please purchase a support license to get access to this feature.',
                    'event_espresso') . '</p>';
        }
        
        return $content;
    }
    
    protected function _name_stop()
    {
        return '<p>' . __('View available questions groups. You can reorder your questions by dragging and dropping them.',
            'event_espresso') . '</p>';
    }
    
    protected function _description_stop()
    {
        return '<p>' . __('View the question group description.', 'event_espresso') . '</p>';
    }
    
    protected function _show_group_name_stop()
    {
        return '<p>' . __('View if the name of the question group should be shown to customers.',
            'event_espresso') . '</p>';
    }
    
    protected function _show_group_description_stop()
    {
        return '<p>' . __('View if the description of the question group should be shown to customers.',
            'event_espresso') . '</p>';
    }
    
    protected function _bulk_actions_stop()
    {
        return '<p>' . __('Perform bulk actions to multiple question groups.', 'event_espresso') . '</p>';
    }
    
    protected function _search_stop()
    {
        return '<p>' . __('Search through questions. The following sources will be searched: question group name and question group description.',
            'event_espresso') . '</p>';
    }
    
    protected function _add_new_question_group_stop()
    {
        return '<p>' . __('Click here to create a new question group.', 'event_espresso') . '</p>';
    }
}