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
        add_action('wp_print_footer_scripts', array($this, 'enqueueData'), 1);
        add_action('admin_print_footer_scripts', array($this, 'enqueueData'), 1);
    }


    /**
     * Callback for the WP script actions.
     * Used to register globally accessible core scripts.
     * Also used to add the eejs.data object to the source for any js having eejs-core as a dependency.
     */
    public function scripts()
    {
        global $wp_version;
        wp_register_script(
            'eejs-core',
            EE_PLUGIN_DIR_URL . 'core/services/assets/core_assets/eejs-core.js',
            array(),
            espresso_version(),
            true
        );
        //only run this if WordPress 4.4.0 > is in use.
        if (version_compare($wp_version, '4.4.0', '>')) {
            //js.api
            wp_register_script(
                'eejs-api',
                EE_LIBRARIES_URL . 'rest_api/assets/js/eejs-api.min.js',
                array('underscore', 'eejs-core'),
                espresso_version(),
                true
            );
            $this->jsdata['eejs_api_nonce'] = wp_create_nonce('wp_rest');
            $this->jsdata['paths'] = array('rest_route' => rest_url('ee/v4.8.36/'));
        }
    }


    /**
     * Call back for the script print in frontend and backend.
     * Used to call wp_localize_scripts so that data can be added throughout the runtime until this later hookpoint.
     * @since 4.9.31.rc.015
     */
    public function enqueueData()
    {
        wp_localize_script('eejs-core', 'eejs', array('data' => $this->jsdata));
    }


    /**
     * Used to add data to eejs.data object.
     *
     * Note:  Overriding existing data is not allowed.
     *
     * Data will be accessible as a javascript object when you list `eejs-core` as a dependency for your javascript.
     * If the data you add is something like this:
     *
     *  $this->addData( 'my_plugin_data', array( 'foo' => 'gar' ) );
     *
     * It will be exposed in the page source as:
     *
     *  eejs.data.my_plugin_data.foo == gar
     *
     * @param string       $key   Key used to access your data
     * @param string|array $value Value to attach to key
     * @throws InvalidArgumentException
     */
    public function addData($key, $value)
    {
        if ($this->verifyDataNotExisting($key)) {
            $this->jsdata[$key] = $value;
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
     * eejs.data.test = [
     *     my_data,
     * ]
     *
     * If there has already been a scalar value attached to the data object given key, then
     * this will throw an exception.
     *
     * @param string $key          Key to attach data to.
     * @param string|array $value  Value being registered.
     * @throws InvalidArgumentException
     */
    public function pushData($key, $value)
    {
        if (isset($this->jsdata[$key])
            && ! is_array($this->jsdata[$key])
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

        $this->jsdata[$key][] = $value;
    }


    /**
     * Used to set content used by javascript for a template.
     * Note: Overrides of existing registered templates are not allowed.
     *
     * @param string $template_reference
     * @param string $template_content
     * @throws InvalidArgumentException
     */
    public function addTemplate($template_reference, $template_content)
    {
        if (! isset($this->jsdata['templates'])) {
            $this->jsdata['templates'] = array();
        }

        //no overrides allowed.
        if (isset($this->jsdata['templates'][$template_reference])) {
            throw new invalidArgumentException(
                sprintf(
                    __(
                        'The %1$s key already exists for the templates array in the js data array.  No overrides are allowed.',
                        'event_espresso'
                    ),
                    $template_reference
                )
            );
        } else {
            $this->jsdata['templates'][$template_reference] = $template_content;
        }
    }


    /**
     * Retrieve the template content already registered for the given reference.
     * @param string $template_reference
     * @return string
     */
    public function getTemplate($template_reference)
    {
        return isset($this->jsdata['templates'], $this->jsdata['templates'][$template_reference])
            ? $this->jsdata['templates'][$template_reference]
            : '';
    }


    /**
     * Retrieve registered data.
     *
     * @param string $key           Name of key to attach data to.
     * @return mixed                If there is no for the given key, then false is returned.
     */
    public function getData($key)
    {
        return isset($this->jsdata[$key])
            ? $this->jsdata[$key]
            : false;
    }




    /**
     * Verifies whether the given data exists already on the jsdata array.
     *
     * Overriding data is not allowed.
     *
     * @param string       $key          Index for data.
     * @return bool        If valid then return true.
     * @throws InvalidArgumentException if data already exists.
     */
    protected function verifyDataNotExisting($key)
    {
        if (isset($this->jsdata[$key])) {
            if (is_array($this->jsdata[$key])) {
                throw new InvalidArgumentException(
                    sprintf(
                        __(
                            'The value for %1$s already exists in the Registry::eejs object.
                            Overrides are not allowed. Since the value of this data is an array, you may want to use the
                            %2$s method to push your value to the array.',
                            'event_espresso'
                        ),
                        $key,
                        'pushData()'
                    )
                );
            } else {
                throw new InvalidArgumentException(
                    sprintf(
                        __(
                            'The value for %1$s already exists in the Registry::eejs object. Overrides are not
                            allowed.  Consider attaching your value to a different key',
                            'event_espresso'
                        ),
                        $key
                    )
                );
            }
        }
        return true;
    }
}
