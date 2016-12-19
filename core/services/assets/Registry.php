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


    /**
     * Registry constructor.
     * Hooking into WP actions for script registry.
     */
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'scripts'), 100);
        add_action('admin_enqueue_scripts', array($this, 'scripts'), 100);
    }


    /**
     * Callback for the WP script actions.
     * Used to register globally accessible core scripts.
     * Also used to add the eejs.data object to the source for any js having eejs-core as a dependency.
     */
    public function scripts()
    {
        wp_register_script(
            'eejs-core',
            EE_PLUGIN_DIR_URL . 'core/services/core_assets/eejs-core.js',
            array(),
            espresso_version(),
            true
        );

        //js.api
        wp_register_script(
            'eejs-api',
            EE_LIBRARIES_URL . 'rest_api/assets/js/eejs-api.min.js',
            array('underscore','eejs-core'),
            espresso_version(),
            true
        );
        $this->jsdata['paths'] = array('rest_route' => rest_url('ee/v4.8.36'));

        wp_localize_script('eejs-core', 'eejs', array('data'=>$this->jsdata));
    }


    /**
     * Used to add data to eejs.data object.
     *
     * Note:  Overriding existing data is not allowed.  To help enforce uniqueness, key/value pairs are added as an element
     * of the method/function name for the caller.  So for instance, if this coded is called from a class, something like
     * this would be done:

     * EE_Registry::instance()->AssetsRegistry->addData(__METHOD__, 'my_key', 'my_value');
     *
     * If this is being called within a function then you'd do:
     *
     * EE_Registry::instance()->AssetsRegistry->addData(__FUNCTION__, 'my_key', 'my_value');
     *
     * This method WILL validate whether the incoming method/function name is an actual function or method.
     *
     * Since `::` and `\` is not accessible via javascript object dot notation. Umlauts (::) will be escaped with a
     * double underscore (__) and if the method belongs to a namespaced class, the backslashes will be escaped with a
     * single underscore (_).  So if your method was a part of namespaced class resulting in something like this:
     * EventEspresso\some\namespace\Class::myMethod
     *
     * ...then you would be able to access all the data attached to it in your js via:
     *
     * var myData = eejs.data.EventEspresso_some_namespace_Class__myMethod
     *
     *
     * @param string $method_name  Name of actual method or function.
     * @param string $key          Key used to access your data
     * @param string|array $value  Value to attach to key
     * @throws \InvalidArgumentException
     */
    public function addData($method_name, $key, $value)
    {
        $this->verifyMethod($method_name);

        //convert method name into js friendly string
        $method_name = $this->methodNameToJsFriendlyString($method_name);
        if ($this->verifyDataNotExisting($method_name, $key, $value)) {
            $this->jsdata[$method_name][$key] = $value;
        }
    }


    /**
     * Similar to addData except this allows for users to push values to an existing key where the values on key are
     * elements in an array.
     *
     * When you use this method, the value you include will be appended to the end of an array on $key.
     *
     * So if the $key was 'test' and you added a value of 'my_data' then it would be represented in the javascript object
     * like this,
     *
     * eejs.data.function_name.test = [
     *     my_data,
     * ]
     *
     * If there has already been a scalar value attached to the data object for the given method_name, then
     * this will throw an exception.
     *
     * @see Registry::addData for more info on purpose of $method_name
     *
     * @param string $method_name  Name of actual method or function.
     * @param string $key          Key to attach data to.
     * @param string|array $value  Value being registered.
     * @throws InvalidArgumentException
     */
    public function pushData($method_name, $key, $value)
    {
        $this->verifyMethod($method_name);
        $method_name = $this->methodNameToJsFriendlyString($method_name);

        if (isset($this->jsdata[$method_name], $this->jsdata[$method_name][$key])
            && ! is_array($this->jsdata[$method_name][$key])
        ) {
            throw new invalidArgumentException(
                sprintf(
                    __(
                        'The value for %1$s is already set and it is not an array. The %2$s method can only be used to
                         push values to this data element when it is an array.',
                        'event_espresso'
                    ),
                    $key,
                    __METHOD__
                )
            );
        }

        $this->jsdata[$method_name][$key][] = $value;
    }


    /**
     * Retrieve registered data.
     *
     * @param string $method_name   Name of actual method or function.
     * @param string $key           Name of key to attach data to.
     * @return mixed                If there is no for the given key, then false is returned.
     */
    public function getData($method_name, $key)
    {
        $method_name = $this->methodNameToJsFriendlyString($method_name);
        return isset($this->jsdata[$method_name], $this->jsdata[$method_name][$key])
            ? $this->jsdata[$method_name][$key]
            : false;
    }


    /**
     * Verifies the given string represents an actual function or method.
     * @param string $method_name
     * @throws InvalidArgumentException
     */
    protected function verifyMethod($method_name)
    {
        if (! is_callable($method_name)) {
            throw new InvalidArgumentException(
                sprintf(
                    __('The value for $method_name (%1$s) is not valid.  You must send in a valid function/method name that 
                    your key value pair for the data will be attached to.', 'event_espresso'),
                    $method_name
                )
            );
        }
    }




    /**
     * Verifies whether the given data exists already on the jsdata array.
     *
     * Overriding data is not allowed.
     *
     * @param string       $method_name  Name representing actual function or method.
     * @param string       $key          Index for data.
     * @param string|array $value        Value being stored.
     * @return bool        If valid then return true.
     * @throws InvalidArgumentException if data already exists.
     */
    protected function verifyDataNotExisting($method_name, $key, $value)
    {
        if (isset($this->jsdata[$method_name], $this->jsdata[$method_name][$key])) {
            if (is_array($this->jsdata[$method_name][$key])) {
                throw new InvalidArgumentException(
                    sprintf(
                        __(
                            'The value for %1$s already exists in the Registry::eejs object for %2$s.
                            Overrides are not allowed. Since the value of this data is an array, you may want to use the
                            %2$s method to push your value to the array.',
                            'event_espresso'
                        ),
                        $key,
                        $method_name,
                        'pushData'
                    )
                );
            } else {
                throw new InvalidArgumentException(
                    sprintf(
                        __(
                            'The value for %1$s already exists in the Registry::eejs object for %2$s. Overrides are not
                            allowed.  Consider attaching your value to a different key',
                            'event_espresso'
                        ),
                        $key,
                        $method_name
                    )
                );
            }
        }
        return true;
    }




    /**
     * Escapes backslash and umlauts existing in given string.
     *
     * '::' becomes '__'
     * '\'  becomes '_'
     *
     * @param string $method_name  The string to escape.
     * @return string
     */
    protected function methodNameToJsFriendlyString($method_name)
    {
        //all `\` from namespaces gets converted to single underscore
        $method_name = str_replace('\\', '_', $method_name);

        //all `::` for class::method formats gets converted to double underscore.
        return str_replace('::', '__', $method_name);
    }
}
