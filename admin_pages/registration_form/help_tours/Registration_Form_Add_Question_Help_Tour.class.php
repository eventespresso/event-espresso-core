<?php

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
class Registration_Form_Add_Question_Help_Tour extends EE_Help_Tour
{

    protected function _set_tour_properties()
    {
        $this->_label = __('Add New Question Tour', 'event_espresso');
        $this->_slug = $this->_is_caf ? 'add-question-caf-joyride' : 'add-question-joyride';
    }

    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'content' => $this->_start(),
            ),
            20 => array(
                'id'      => 'QST_display_text',
                'content' => $this->_qst_display_text_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            30 => array(
                'id'      => 'QST_admin_label',
                'content' => $this->_qst_admin_label_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            50 => array(
                'id'      => 'QST_admin_only',
                'content' => $this->_qst_admin_only_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => -20,
                    'tipAdjustmentY' => -35,
                ),
            ),
            60 => array(
                'id'      => 'QST_type',
                'content' => $this->_qst_type_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            70 => array(
                'id'      => 'QST_required',
                'content' => $this->_qst_required_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            80 => array(
                'id'      => 'QST_required_text',
                'content' => $this->_qst_required_text_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
        );
    }


    protected function _start()
    {
        $content = '<h3>' . __('Add New Question', 'event_espresso') . '</h3>';
        $content .= '<p>'
                    . __(
                        'This tour of the Add New Question page will go over different areas of the screen to help you understand what they are used for.',
                        'event_espresso'
                    ) . '</p>';

        return $content;
    }

    protected function _qst_display_text_stop()
    {
        return '<p>'
               . __(
                   'This is the question that is displayed to registrants who are signing up for events.',
                   'event_espresso'
               ) . '</p>';
    }

    protected function _qst_admin_label_stop()
    {
        return '<p>'
               . __(
                   'Helps you understand the difference between questions that may appear similar but are actually different.',
                   'event_espresso'
               ) . '</p>';
    }

    protected function _qst_admin_only_stop()
    {
        return '<p>' . __('Specify whether this question should be shown only to admins.', 'event_espresso') . '</p>';
    }

    protected function _qst_type_stop()
    {
        return '<p>'
               . __(
                   'Select the type of question. Available options are Text, Textarea, Single, Multiple, Dropdown, and Date.',
                   'event_espresso'
               ) . '</p>';
    }

    protected function _qst_required_stop()
    {
        return '<p>' . __('Specify whether this question should be required.', 'event_espresso') . '</p>';
    }

    protected function _qst_required_text_stop()
    {
        return '<p>'
               . __(
                   'Text to display when registrant does not answer question but is required to.',
                   'event_espresso'
               ) . '</p>';
    }
}
