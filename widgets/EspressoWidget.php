<?php

namespace EventEspresso\widgets;

/**
 * Class EspressoWidget
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class EspressoWidget extends \WP_Widget
{


    /**
     * @param string $name
     * @param array  $widget_options
     * @param array  $control_options
     */
    public function __construct($name = '', array $widget_options = array(), array $control_options = array())
    {
        $id_base = EspressoWidget::getIdBase(get_class($this));
        $control_options['id_base'] = $id_base;
        $control_options['height'] = isset($control_options['height']) ? $control_options['height'] : 300;
        $control_options['width'] = isset($control_options['width']) ? $control_options['width'] : 350;
        // Register widget with WordPress
        parent::__construct($id_base, $name, $widget_options, $control_options);
    }


    /**
     * @param string $widget_class
     * @return string
     */
    public static function getIdBase($widget_class)
    {
        return sanitize_title(str_replace(array('EEW_', '_'), array('EE_', '-'), $widget_class)) . '-widget';
    }
}
