<?php
namespace EventEspresso\core\services\assets;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Used for registering assets used in EE.
 *
 * @package    EventEspresso
 * @subpackage services\assets
 * @author     Darren Ethier
 * @since      4.9.24.rc.004
 */
class Registry
{

    /**
     * This holds the jsdata data object that will be exposed on pages that enqueue the `eejs-core` script.
     * @var array
     */
    protected $jsdata = array();


    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'scripts'), 100);
        add_action('admin_enqueue_scripts', array($this, 'scripts'), 100);
    }


    public function scripts()
    {
        wp_register_script(
            'eejs-core',
            EE_PLUGIN_DIR_URL . 'core/services/core_assets/eejs-core.js',
            array(),
            espresso_version(),
            true
        );
        wp_localize_script('eejs-core', 'eejs', array('data'=>$this->jsdata));
    }


    public function addData($key, $value)
    {
        if (isset($this->jsdata[$key])) {
            if (is_array($this->jsdata[$key])) {
                if (is_array($value)) {
                    $this->jsdata[$key] = array_merge($this->jsdata[$key], $value);
                } else {
                    $this->jsdata[$key][] = $value;
                }
            } else {
                throw new InvalidArgumentException(
                    sprintf(
                        __('The value for %1$s already exists in the Registry::eejs object and it is a scalar value.
                        Array values are merged, however we do not allow overriding scalar values', 'event_espresso'),
                        $key
                    )
                );
            }
        } else {
            $this->jsdata[$key] = $value;
        }
    }



    public function getData($key)
    {
        return isset($this->jsdata[$key]) ? $this->jsdata[$key] : false;
    }
}
