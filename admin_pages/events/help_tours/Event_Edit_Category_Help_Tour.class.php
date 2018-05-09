<?php

/**
 * Event_Edit_Category_Help_Tour
 *
 * This is the help tour object for the decaf Event Categories tab
 *
 *
 * @package         Event_Edit_Category_Help_Tour
 * @subpackage      includes/core/admin/Event_Edit_Category_Help_Tour.core.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Edit_Category_Help_Tour extends EE_Help_Tour
{

    protected function _set_tour_properties()
    {
        $this->_label = __('Edit Category Tour', 'event_espresso');
        $this->_slug = 'event-edit-category-joyride';
    }


    protected function _set_tour_stops()
    {
        $this->_stops = array(
            10 => array(
                'content' => $this->_stop_one(),
            ),
            20 => array(
                'id'      => 'category_name',
                'content' => $this->_stop_two(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -55,
                    'tipAdjustmentX' => 5,
                ),
            ),
            30 => array(
                'id'      => 'cat_id',
                'content' => $this->_stop_three(),
                'options' => array(
                    'tipLocation'    => 'right',
                    'tipAdjustmentY' => -55,
                    'tipAdjustmentX' => 5,
                ),
            ),
            40 => array(
                'id'      => 'category_desc',
                'content' => $this->_stop_four(),
                'options' => array(
                    'tipLocation'    => 'top',
                    'tipAdjustmentY' => -75,
                    'tipAdjustmentX' => 250,
                ),
            ),
        );
    }


    protected function _stop_one()
    {
        $content = '<h3>' . __('Edit Event Category', 'event_espresso') . '</h3>';
        $content .= '<p>'
                    . __(
                        'This tour of the Edit Event Category page will go over different areas of the screen to help you understand what they are used for.',
                        'event_espresso'
                    ) . '</p>';
        return $content;
    }

    protected function _stop_two()
    {
        return '<p>' . __('Edit the name for your category.', 'event_espresso') . '</p>';
    }

    protected function _stop_three()
    {
        return '<p>' . __('The unique ID for your category cannot be changed.', 'event_espresso') . '</p>';
    }

    protected function _stop_four()
    {
        return '<p>'
               . __(
                   'The rich text editor can be used to edit information about your category. Images and links can also be added or removed along with your text.',
                   'event_espresso'
               ) . '</p>';
    }
}
