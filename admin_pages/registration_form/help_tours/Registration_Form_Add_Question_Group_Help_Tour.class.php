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
class Registration_Form_Add_Question_Group_Help_Tour extends EE_Help_Tour
{

    protected function _set_tour_properties()
    {
        $this->_label = __('Add New Question Group Tour', 'event_espresso');
        $this->_slug = $this->_is_caf ? 'add-question-group-caf-joyride' : 'add-question-group-joyride';
    }

    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'content' => $this->_start(),
            ),
            20 => array(
                'id'      => 'QSG_name',
                'content' => $this->_qsg_name_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            30 => array(
                'id'      => 'QSG_identifier',
                'content' => $this->_qsg_identifier_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            40 => array(
                'id'      => 'QSG_desc',
                'content' => $this->_qsg_desc_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            50 => array(
                'id'      => 'QSG_order',
                'content' => $this->_qsg_order_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => -20,
                    'tipAdjustmentY' => -35,
                ),
            ),
            60 => array(
                'id'      => 'QSG_show_group_name',
                'content' => $this->_qsg_show_group_name_stop(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentX' => 0,
                    'tipAdjustmentY' => -35,
                ),
            ),
            70 => array(
                'id'      => 'QSG_show_group_desc',
                'content' => $this->_qsg_show_group_desc_stop(),
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
        $content = '<h3>' . __('Add Question Group', 'event_espresso') . '</h3>';
        $content .= '<p>'
                    . __(
                        'This tour of the Add Question Group page will go over different areas of the screen to help you understand what they are used for.',
                        'event_espresso'
                    ) . '</p>';

        return $content;
    }

    protected function _qsg_name_stop()
    {
        return '<p>' . __('The name of the question group.', 'event_espresso') . '</p>';
    }

    protected function _qsg_identifier_stop()
    {
        return '<p>' . __('A unique name for your question group.', 'event_espresso') . '</p>';
    }

    protected function _qsg_desc_stop()
    {
        return '<p>' . __('A description of the question group.', 'event_espresso') . '</p>';
    }

    protected function _qsg_order_stop()
    {
        return '<p>' . __('Set the order that you want your question group to appear in.', 'event_espresso') . '</p>';
    }

    protected function _qsg_show_group_name_stop()
    {
        return '<p>'
               . __(
                   'Specify whether the group name should be shown on the registration page.',
                   'event_espresso'
               ) . '</p>';
    }

    protected function _qsg_show_group_desc_stop()
    {
        return '<p>'
               . __(
                   'Specify whether the group description should be shown on the registration page.',
                   'event_espresso'
               ) . '</p>';
    }
}
