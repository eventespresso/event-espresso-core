<?php

namespace EventEspresso\core\services\widgets;

use EE_Error;
use EE_Registry;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use EventEspresso\core\services\container\RegistryContainer;

class LegacyWidgetsManager
{
    public RegistryContainer $widgets;

    public function __construct()
    {
        $this->widgets = EE_Registry::instance()->widgets;
    }


    public function setHooks()
    {
        add_action('widgets_init', [$this, 'widgetsInit']);
    }


    /**
     * @return void
     */
    public function widgetsInit()
    {
        // only init widgets on admin pages when not in complete maintenance, and
        // on frontend when not in any maintenance mode
        if (
            MaintenanceStatus::isDisabled()
            || (is_admin() && MaintenanceStatus::isNotFullSite())
        ) {
            // grab list of installed widgets
            $widgets_to_register = glob(EE_WIDGETS . '*', GLOB_ONLYDIR);
            // filter list of modules to register
            $widgets_to_register = apply_filters(
                'FHEE__EE_Config__register_widgets__widgets_to_register',
                $widgets_to_register
            );
            if (! empty($widgets_to_register)) {
                // cycle thru widget folders
                foreach ($widgets_to_register as $widget_path) {
                    // add to list of installed widget modules
                    $this->registerWidget($widget_path);
                }
            }
            // filter list of installed modules
            $this->widgets = apply_filters(
                'FHEE__EE_Config__register_widgets__installed_widgets',
                $this->widgets
            );
        }
    }


    /**
     * makes core aware of this widget
     *
     * @param string $widget_path - full path up to and including widget folder
     * @return void
     */
    public function registerWidget(string $widget_path = '')
    {
        do_action('AHEE__EE_Config__register_widget__begin', $widget_path);
        $widget_ext = '.widget.php';
        // make all separators match
        $widget_path = rtrim(str_replace('\\', DS, $widget_path), DS);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($widget_path, $widget_ext) !== false) {
            // grab and shortcode file name from directory name and break apart at dots
            $file_name = explode('.', basename($widget_path));
            // take first segment from file name pieces and remove class prefix if it exists
            $widget = strpos($file_name[0], 'EEW_') === 0 ? substr($file_name[0], 4) : $file_name[0];
            // sanitize shortcode directory name
            $widget = sanitize_key($widget);
            // now we need to rebuild the shortcode path
            $widget_path = explode('/', $widget_path);
            // remove last segment
            array_pop($widget_path);
            // glue it back together
            $widget_path = implode(DS, $widget_path);
        } else {
            // grab and sanitize widget directory name
            $widget = sanitize_key(basename($widget_path));
        }
        // create classname from widget directory name
        $widget = str_replace(' ', '_', ucwords(str_replace('_', ' ', $widget)));
        // add class prefix
        $widget_class = 'EEW_' . $widget;
        // is it already added?
        if ($this->widgets->has($widget_class)) {
            return;
        }
        // does the widget exist ?
        if (! is_readable($widget_path . '/' . $widget_class . $widget_ext)) {
            $msg = sprintf(
                esc_html__(
                    'The requested %1$s widget file could not be found or is not readable due to file permissions. Please ensure the following path is correct: %2$s',
                    'event_espresso'
                ),
                $widget_class,
                $widget_path . '/' . $widget_class . $widget_ext
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return;
        }
        // load the widget class file
        require_once($widget_path . '/' . $widget_class . $widget_ext);
        // verify that class exists
        if (! class_exists($widget_class)) {
            $msg = sprintf(esc_html__('The requested %s widget class does not exist.', 'event_espresso'), $widget_class);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return;
        }
        register_widget($widget_class);
        // add to array of registered widgets
        $this->widgets->add($widget_class, $widget_path . '/' . $widget_class . $widget_ext);
    }
}
