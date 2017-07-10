<?php

namespace EventEspresso\tests\mocks\core;

use EE_Maintenance_Mode;
use EE_Registry;
use EE_System;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EE_System_Mock
 * basically overrides everything in EE_System
 *
 * @package EventEspresso\tests\mocks\core
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_System_Mock extends EE_System
{


    /**
     * @var EE_System_Mock $_instance
     */
    private static $_instance;



    /**
     * @param EE_Registry|null         $registry
     * @param LoaderInterface|null     $loader
     * @param EE_Maintenance_Mode|null $maintenance_mode
     * @return EE_System|void
     */
    public static function instance(
        EE_Registry $registry = null,
        LoaderInterface $loader = null,
        EE_Maintenance_Mode $maintenance_mode = null
    ) {
    }



    /**
     */
    public static function reset()
    {
    }



    /**
     */
    public function __construct()
    {
    }



    /**
     * @return void
     */
    public function detect_activations_or_upgrades()
    {
    }



    /**
     * @return void
     */
    public function perform_activations_upgrades_and_migrations()
    {
        do_action('AHEE__EE_System__perform_activations_upgrades_and_migrations');
    }



    /**
     * @return void
     */
    public function load_espresso_addons()
    {
    }



    /**
     * @return void
     */
    public function load_core_configuration()
    {
    }


    /**
     * @return void
     */
    public function register_shortcodes_modules_and_widgets()
    {
    }



    /**
     * @return void
     */
    public function brew_espresso()
    {
    }



    /**
     * @return    void
     */
    public function set_hooks_for_core()
    {
    }



    /**
     * @return    void
     */
    public function load_CPTs_and_session()
    {
    }



    /**
     * @return void
     */
    public function load_controllers()
    {
    }



    /**
     * @return void
     */
    public function core_loaded_and_ready()
    {
    }



    /**
     * @return void
     */
    public function initialize()
    {
    }


    /**
     * @return void
     */
    public function initialize_last()
    {
    }



    /**
     * @return void
     */
    public function addEspressoToolbar()
    {
    }



    /**
     * @return void
     */
    public static function do_not_cache()
    {
    }



    /**
     *    extra_nocache_headers
     *
     * @access    public
     * @param $headers
     * @return    array
     */
    public static function extra_nocache_headers($headers)
    {
        return $headers;
    }



    /**
     * @return    void
     */
    public static function nocache_headers()
    {
    }



    /**
     * @param  array $exclude_array any existing pages being excluded are in this array.
     * @return array
     */
    public function remove_pages_from_wp_list_pages($exclude_array)
    {
        return $exclude_array;
    }



}
// Location: EE_System_Mock.php
