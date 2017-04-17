<?php
namespace EventEspresso\core\libraries\rest_api;

/**
 * Class ObjectDetectedException
 * similar to EE's EE_Error, except has space to hold the "data" we
 * want to eventually pass to WP_Error
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
use Exception;
use Throwable;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class ObjectDetectedException extends Exception
{

    /**
     * Object representing an object that triggered this exception
     * @var object
     */
    protected $triggering_object;
    public function __construct($triggering_object)
    {
        $this->triggering_object = $triggering_object;
        $class_type = is_object($triggering_object)
            ? get_class($triggering_object)
            : esc_html__('Unknown', 'event_espresso');
        parent::__construct(
            sprintf(
                // @codingStandardsIgnoreStart
                esc_html__('PHP Object of class %1$s detected in REST API data. This cannot be represented in JSON.', 'event_espresso'),
                // @codingStandardsIgnoreEnd
                $class_type
            )
        );
    }

}
