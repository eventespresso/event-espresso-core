<?php

namespace EventEspresso\core\services\assets;

use EE_Currency_Config;
use EE_Registry;
use EE_Template_Config;
use EEH_Qtip_Loader;
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
     * @var EE_Template_Config $template_config
     */
    protected $template_config;

    /**
     * @var EE_Currency_Config $currency_config
     */
    protected $currency_config;

    /**
     * This holds the jsdata data object that will be exposed on pages that enqueue the `eejs-core` script.
     *
     * @var array
     */
    protected $jsdata = array();


    /**
     * This keeps track of all scripts with registered data.  It is used to prevent duplicate data objects setup in the
     * page source.
     * @var array
     */
    protected $script_handles_with_data = array();



    /**
     * Registry constructor.
     * Hooking into WP actions for script registry.
     *
     * @param EE_Template_Config $template_config
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(EE_Template_Config $template_config, EE_Currency_Config $currency_config)
    {
        $this->template_config = $template_config;
        $this->currency_config = $currency_config;
        add_action('wp_enqueue_scripts', array($this, 'scripts'), 1);
        add_action('admin_enqueue_scripts', array($this, 'scripts'), 1);
        add_action('wp_enqueue_scripts', array($this, 'enqueueData'), 2);
        add_action('admin_enqueue_scripts', array($this, 'enqueueData'), 2);
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
            EVENT_ESPRESSO_VERSION,
            true
        );
        //only run this if WordPress 4.4.0 > is in use.
        if (version_compare($wp_version, '4.4.0', '>')) {
            //js.api
            wp_register_script(
                'eejs-api',
                EE_LIBRARIES_URL . 'rest_api/assets/js/eejs-api.min.js',
                array('underscore', 'eejs-core'),
                EVENT_ESPRESSO_VERSION,
                true
            );
            $this->jsdata['eejs_api_nonce'] = wp_create_nonce('wp_rest');
            $this->jsdata['paths'] = array('rest_route' => rest_url('ee/v4.8.36/'));
        }
        if (! is_admin()) {
            $this->loadCoreCss();
        }
        $this->loadCoreJs();
        $this->loadJqueryValidate();
        $this->loadAccountingJs();
        $this->loadQtipJs();
    }



    /**
     * Call back for the script print in frontend and backend.
     * Used to call wp_localize_scripts so that data can be added throughout the runtime until this later hook point.
     *
     * @since 4.9.31.rc.015
     */
    public function enqueueData()
    {
        $this->removeAlreadyRegisteredDataForScriptHandles();
        wp_localize_script('eejs-core', 'eejs', array('data' => $this->jsdata));
        wp_localize_script('espresso_core', 'eei18n', EE_Registry::$i18n_js_strings);
        $this->localizeAccountingJs();
        $this->addRegisteredScriptHandlesWithData('eejs-core');
        $this->addRegisteredScriptHandlesWithData('espresso_core');
    }



    /**
     * Used to add data to eejs.data object.
     * Note:  Overriding existing data is not allowed.
     * Data will be accessible as a javascript object when you list `eejs-core` as a dependency for your javascript.
     * If the data you add is something like this:
     *  $this->addData( 'my_plugin_data', array( 'foo' => 'gar' ) );
     * It will be exposed in the page source as:
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
     * When you use this method, the value you include will be appended to the end of an array on $key.
     * So if the $key was 'test' and you added a value of 'my_data' then it would be represented in the javascript
     * object like this, eejs.data.test = [ my_data,
     * ]
     * If there has already been a scalar value attached to the data object given key, then
     * this will throw an exception.
     *
     * @param string       $key   Key to attach data to.
     * @param string|array $value Value being registered.
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
        }
        $this->jsdata['templates'][$template_reference] = $template_content;
    }



    /**
     * Retrieve the template content already registered for the given reference.
     *
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
     * @param string $key Name of key to attach data to.
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
     * Overriding data is not allowed.
     *
     * @param string $key Index for data.
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
            }
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
        return true;
    }



    /**
     * registers core default stylesheets
     */
    private function loadCoreCss()
    {
        if ($this->template_config->enable_default_style) {
            $default_stylesheet_path = is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css')
                ? EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css'
                : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css';
            wp_register_style(
                'espresso_default',
                $default_stylesheet_path,
                array('dashicons'),
                EVENT_ESPRESSO_VERSION
            );
            //Load custom style sheet if available
            if ($this->template_config->custom_style_sheet !== null) {
                wp_register_style(
                    'espresso_custom_css',
                    EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $this->template_config->custom_style_sheet,
                    array('espresso_default'),
                    EVENT_ESPRESSO_VERSION
                );
            }
        }
    }



    /**
     * registers core default javascript
     */
    private function loadCoreJs()
    {
        // load core js
        wp_register_script(
            'espresso_core',
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            array('jquery'),
            EVENT_ESPRESSO_VERSION,
            true
        );
    }



    /**
     * registers jQuery Validate for form validation
     */
    private function loadJqueryValidate()
    {
        // register jQuery Validate and additional methods
        wp_register_script(
            'jquery-validate',
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js',
            array('jquery'),
            '1.15.0',
            true
        );
        wp_register_script(
            'jquery-validate-extra-methods',
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.additional-methods.min.js',
            array('jquery', 'jquery-validate'),
            '1.15.0',
            true
        );
    }



    /**
     * registers accounting.js for performing client-side calculations
     */
    private function loadAccountingJs()
    {
        //accounting.js library
        // @link http://josscrowcroft.github.io/accounting.js/
        wp_register_script(
            'ee-accounting-core',
            EE_THIRD_PARTY_URL . 'accounting/accounting.js',
            array('underscore'),
            '0.3.2',
            true
        );
        wp_register_script(
            'ee-accounting',
            EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js',
            array('ee-accounting-core'),
            EVENT_ESPRESSO_VERSION,
            true
        );
    }



    /**
     * registers accounting.js for performing client-side calculations
     */
    private function localizeAccountingJs()
    {
        wp_localize_script(
            'ee-accounting',
            'EE_ACCOUNTING_CFG',
            array(
                'currency' => array(
                    'symbol'    => $this->currency_config->sign,
                    'format'    => array(
                        'pos'  => $this->currency_config->sign_b4 ? '%s%v' : '%v%s',
                        'neg'  => $this->currency_config->sign_b4 ? '- %s%v' : '- %v%s',
                        'zero' => $this->currency_config->sign_b4 ? '%s--' : '--%s',
                    ),
                    'decimal'   => $this->currency_config->dec_mrk,
                    'thousand'  => $this->currency_config->thsnds,
                    'precision' => $this->currency_config->dec_plc,
                ),
                'number'   => array(
                    'precision' => $this->currency_config->dec_plc,
                    'thousand'  => $this->currency_config->thsnds,
                    'decimal'   => $this->currency_config->dec_mrk,
                ),
            )
        );
        $this->addRegisteredScriptHandlesWithData('ee-accounting');
    }



    /**
     * registers assets for cleaning your ears
     */
    private function loadQtipJs()
    {
        // qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_qtip', '__return_true' );
        if (apply_filters('FHEE_load_qtip', false)) {
            EEH_Qtip_Loader::instance()->register_and_enqueue();
        }
    }


    /**
     * This is used to set registered script handles that have data.
     * @param string $script_handle
     */
    private function addRegisteredScriptHandlesWithData($script_handle)
    {
        $this->script_handles_with_data[$script_handle] = $script_handle;
    }


    /**
     * Checks WP_Scripts for all of each script handle registered internally as having data and unsets from the
     * Dependency stored in WP_Scripts if its set.
     */
    private function removeAlreadyRegisteredDataForScriptHandles()
    {
        if (empty($this->script_handles_with_data)) {
            return;
        }
        foreach ($this->script_handles_with_data as $script_handle) {
            $this->removeAlreadyRegisteredDataForScriptHandle($script_handle);
        }
    }


    /**
     * Removes any data dependency registered in WP_Scripts if its set.
     * @param string $script_handle
     */
    private function removeAlreadyRegisteredDataForScriptHandle($script_handle)
    {
        if (isset($this->script_handles_with_data[$script_handle])) {
            global $wp_scripts;
            if ($wp_scripts->get_data($script_handle, 'data')) {
                unset($wp_scripts->registered[$script_handle]->extra['data']);
                unset($this->script_handles_with_data[$script_handle]);
            }
        }
    }


}
