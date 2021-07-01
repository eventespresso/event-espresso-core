<?php

/**
 * This interface is used to define the common methods shared by all "plugin api" classes.
 *
 * Used internally by EE for registering some caffeinated components,
 * and provided as an easy method for defining classes that plugins can use to register entire components.
 * To be clear, there are certain systems in EE where implementing them for a plugin requires multiple actions and
 * filters being hooked into.
 * Within this class are wrappers for "registering" with a few parameters and then the registry method
 * will take care of setting up all the required filters and hooks for that system to be successfully hooked into.
 *
 * @package          Event Espresso
 * @subpackage       plugin api
 * @since            4.3.0
 * @author           Darren Ethier
 */
interface EEI_Plugin_API
{

    /**
     * Used to register a component with EE.
     *
     * @param string $identifier a unique name for the component being registered
     * @param array  $setup_args an array of key value pairs of info for registering the component
     * @return void
     * @since 4.3.0
     */
    public static function register($identifier = '', array $setup_args = []);


    /**
     * Used to deregister a component with EE.
     *
     * @param string $identifier a unique name for the component being registered
     * @return void
     * @since 4.3.0
     */
    public static function deregister($identifier = '');
}
