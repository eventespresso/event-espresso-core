<?php

namespace EventEspresso\core;

use EE_Error;
use EventEspresso\core\libraries\iframe_display\Iframe;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class Factory
 * creates instantiations of classes
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class Factory
{
    /**
     * @param string $class_name
     * @param array  $arguments
     * @return mixed|null
     * @throws EE_Error
     */
    public static function create($class_name, $arguments = array())
    {
        if (empty($class_name)) {
            throw new EE_Error(
                esc_html__('You must provide a class name in order to instantiate it.', 'event_espresso')
            );
        }
        switch ($class_name) {
            case 'Request':
            case 'EE_Request':
                $object = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\request\Request');
                break;
            case 'Iframe':
                $title = isset($arguments['title']) ? $arguments['title'] : null;
                $content = isset($arguments['content']) ? $arguments['content'] : null;
                $object = new Iframe($title, $content);
                break;
            default:
                $object = new $class_name($arguments);
        }
        return $object;
    }
}
