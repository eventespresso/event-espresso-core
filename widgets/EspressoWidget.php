<?php

namespace EventEspresso\widgets;

use WP_Widget;

/**
 * Class EspressoWidget
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class EspressoWidget extends WP_Widget
{
    /**
     * @param string $name
     * @param array  $widget_options
     * @param array  $control_options
     */
    public function __construct($name = '', array $widget_options = [], array $control_options = [])
    {
        $id_base                    = EspressoWidget::getIdBase(get_class($this));
        $control_options['id_base'] = $id_base;
        $control_options['height']  = $control_options['height'] ?? 300;
        $control_options['width']   = $control_options['width'] ?? 350;
        // Register widget with WordPress
        parent::__construct($id_base, $name, $widget_options, $control_options);
    }


    /**
     * @param string $widget_class
     * @return string
     */
    public static function getIdBase(string $widget_class): string
    {
        return sanitize_title(str_replace(['EEW_', '_'], ['EE_', '-'], $widget_class)) . '-widget';
    }
}
