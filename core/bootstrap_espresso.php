<?php

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
        \EEH_Debug_Tools::instance();
    }
    // load error handling
    if (is_readable(EE_CORE . 'EE_Error.core.php')) {
        require_once EE_CORE . 'EE_Error.core.php';
    } else {
        wp_die(esc_html__('The EE_Error core class could not be loaded.', 'event_espresso'));
    }
    $error_handling_loaded = true;
}


/**
 *    espresso_load_required
 *    given a class name and path, this function will load that file or throw an exception
 *
 * @param    string $classname
 * @param    string $full_path_to_file
 * @throws    EE_Error
 */
function espresso_load_required($classname, $full_path_to_file)
{
    if (is_readable($full_path_to_file)) {
        require_once $full_path_to_file;
    } else {
        throw new \EE_Error(
            sprintf(
                esc_html__(
                    'The %s class file could not be located or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $classname
            )
        );
    }
}


/**
 * @since 4.9.27
 * @throws \EE_Error
 * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
 * @throws \EventEspresso\core\exceptions\InvalidEntityException
 * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
 * @throws \EventEspresso\core\exceptions\InvalidClassException
 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
 * @throws \EventEspresso\core\services\container\exceptions\ServiceExistsException
 * @throws \EventEspresso\core\services\container\exceptions\ServiceNotFoundException
 * @throws \OutOfBoundsException
 * @throws Exception
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
            'EEH_Base',
            EE_CORE . 'helpers' . DS . 'EEH_Base.helper.php'
        );
        espresso_load_required(
            'EEH_File',
            EE_CORE . 'interfaces' . DS . 'EEHI_File.interface.php'
        );
        espresso_load_required(
            'EEH_File',
            EE_CORE . 'helpers' . DS . 'EEH_File.helper.php'
        );
        espresso_load_required(
            'EEH_Array',
            EE_CORE . 'helpers' . DS . 'EEH_Array.helper.php'
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
        require_once EE_CORE . 'exceptions' . DS . 'ExceptionStackTraceDisplay.php';
        new EventEspresso\core\exceptions\ExceptionStackTraceDisplay($e);
    }
}
