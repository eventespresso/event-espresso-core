<?php

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\container\exceptions\ServiceExistsException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;

/**
 *    espresso_load_error_handling
 *    this function loads EE's class for handling exceptions and errors
 */
function espresso_load_error_handling()
{
    static $error_handling_loaded = false;
    if ($error_handling_loaded) {
        return;
    }
    // load debugging tools
    if (WP_DEBUG === true && is_readable(EE_HELPERS . 'EEH_Debug_Tools.helper.php')) {
        require_once EE_HELPERS . 'EEH_Debug_Tools.helper.php';
        EEH_Debug_Tools::instance();
    }
    // load error handling
    if (is_readable(EE_CORE . 'EE_Error.core.php')) {
        require_once EE_CORE . 'EE_Error.core.php';
        // if you're a dev and want to receive all errors via email
        // add this to your wp-config.php: define( 'EE_ERROR_EMAILS', TRUE );
        if (
            defined('WP_DEBUG')
            && WP_DEBUG === true
            && defined('EE_ERROR_EMAILS')
            && EE_ERROR_EMAILS === true
        ) {
            set_error_handler(['EE_Error', 'error_handler']);
            register_shutdown_function(['EE_Error', 'fatal_error_handler']);
        }
    } else {
        wp_die(esc_html__('The EE_Error core class could not be loaded.', 'event_espresso'));
    }
    $error_handling_loaded = true;
}


/**
 *    espresso_load_required
 *    given a class name and path, this function will load that file or throw an exception
 *
 * @param string $classname
 * @param string $full_path_to_file
 * @throws EE_Error
 */
function espresso_load_required(string $classname, string $full_path_to_file)
{
    if (is_readable($full_path_to_file)) {
        require_once $full_path_to_file;
    } else {
        throw new EE_Error(
            sprintf(
                esc_html__(
                    'The %1$s class file could not be located or is not readable due to file permissions. %3$s supplied path: %2$s',
                    'event_espresso'
                ),
                $classname,
                $full_path_to_file,
                '<br>'
            )
        );
    }
}


/**
 * @throws InvalidInterfaceException
 * @throws InvalidEntityException
 * @throws InvalidIdentifierException
 * @throws InvalidClassException
 * @throws InvalidDataTypeException
 * @throws ServiceExistsException
 * @throws ServiceNotFoundException
 * @throws OutOfBoundsException
 * @throws Exception
 * @since 4.9.27
 */
function bootstrap_espresso()
{
    require_once __DIR__ . '/espresso_definitions.php';
    try {
        espresso_load_error_handling();
        // include WordPress shims for functions introduced in later versions of WordPress
        espresso_load_required(
            '',
            EE_CORE . 'wordpress-shims.php'
        );
        espresso_load_required(
            '',
            EE_CORE . 'third-party-compatibility.php'
        );
        espresso_load_required(
            'EEH_Base',
            EE_CORE . 'helpers/EEH_Base.helper.php'
        );
        espresso_load_required(
            'EEH_File',
            EE_CORE . 'interfaces/EEHI_File.interface.php'
        );
        espresso_load_required(
            'EEH_File',
            EE_CORE . 'helpers/EEH_File.helper.php'
        );
        espresso_load_required(
            'EEH_Array',
            EE_CORE . 'helpers/EEH_Array.helper.php'
        );
        espresso_load_required(
            'EE_Base',
            EE_CORE . 'EE_Base.core.php'
        );
        // instantiate and configure PSR4 autoloader
        espresso_load_required(
            'Psr4Autoloader',
            EE_CORE . 'Psr4Autoloader.php'
        );
        espresso_load_required(
            'EE_Psr4AutoloaderInit',
            EE_CORE . 'EE_Psr4AutoloaderInit.core.php'
        );
        $AutoloaderInit = new EE_Psr4AutoloaderInit();
        $AutoloaderInit->initializeAutoloader();
        new EventEspresso\core\services\bootstrap\BootstrapCore();
    } catch (Exception $e) {
        require_once EE_CORE . 'exceptions/ExceptionStackTraceDisplay.php';
        new EventEspresso\core\exceptions\ExceptionStackTraceDisplay($e);
    }
}
