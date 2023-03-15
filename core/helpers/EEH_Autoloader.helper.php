<?php

use EventEspresso\core\services\Benchmark;

/**
 * EEH_Autoloader
 *
 * This is a helper utility class for setting up autoloaders.
 *
 * @package     Event Espresso
 * @subpackage  /helpers/EEH_Autoloader.helper.php
 * @author      Darren Ethier
 */
class EEH_Autoloader extends EEH_Base
{
    /**
     * instance of the EE_System object
     *
     * @var $_instance
     */
    private static $_instance = null;

    /**
     * @var array $_autoloaders
     */
    private static $_autoloaders;

    /**
     * set to "paths" to display autoloader class => path mappings
     * set to "times" to display autoloader loading times
     * set to "all" to display both
     *
     * @var string $debug
     */
    public static $debug = false;


    /**
     * @throws Exception
     */
    private function __construct()
    {
        if (EEH_Autoloader::$_autoloaders === null) {
            EEH_Autoloader::$_autoloaders = [];
            $this->_register_custom_autoloaders();
            spl_autoload_register([$this, 'espresso_autoloader']);
        }
    }


    /**
     * @return EEH_Autoloader
     */
    public static function instance(): ?EEH_Autoloader
    {
        // check if class object is instantiated
        if (! EEH_Autoloader::$_instance instanceof EEH_Autoloader) {
            EEH_Autoloader::$_instance = new EEH_Autoloader();
        }
        return EEH_Autoloader::$_instance;
    }


    /**
     * @param   $class_name
     * @return  void
     * @internal  param string $class_name - simple class name ie: session
     * @internal  param $className
     */
    public static function espresso_autoloader($class_name)
    {
        if (isset(EEH_Autoloader::$_autoloaders[ $class_name ])) {
            require_once(EEH_Autoloader::$_autoloaders[ $class_name ]);
        }
    }


    /**
     * @param array | string $class_paths - array of key => value pairings between class names and paths
     * @param bool           $read_check  true if we need to check whether the file is readable or not.
     * @param bool           $debug       **deprecated**
     * @throws EE_Error
     */
    public static function register_autoloader($class_paths, bool $read_check = true, bool $debug = false)
    {
        $class_paths = is_array($class_paths) ? $class_paths : [$class_paths];
        foreach ($class_paths as $class => $path) {
            // skip all files that are not PHP
            if (substr($path, strlen($path) - 3) !== 'php') {
                continue;
            }
            // don't give up! you gotta...
            // get some class
            if (empty($class)) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'No Class name was specified while registering an autoloader for the following path: %s.',
                            'event_espresso'
                        ),
                        $path
                    )
                );
            }
            // one day you will find the path young grasshopper
            if (empty($path)) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'No path was specified while registering an autoloader for the %s class.',
                            'event_espresso'
                        ),
                        $class
                    )
                );
            }
            // is file readable ?
            if ($read_check && ! is_readable($path)) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'The file for the %s class could not be found or is not readable due to file permissions. Please ensure the following path is correct: %s',
                            'event_espresso'
                        ),
                        $class,
                        $path
                    )
                );
            }
            if (! isset(EEH_Autoloader::$_autoloaders[ $class ])) {
                EEH_Autoloader::$_autoloaders[ $class ] = str_replace(['/', '\\'], '/', $path);
                if (EE_DEBUG && (EEH_Autoloader::$debug === 'paths' || EEH_Autoloader::$debug === 'all' || $debug)) {
                    EEH_Debug_Tools::printr(EEH_Autoloader::$_autoloaders[ $class ], $class, __FILE__, __LINE__);
                }
            }
        }
    }


    /**
     * @return array
     */
    public static function get_autoloaders(): array
    {
        return EEH_Autoloader::$_autoloaders;
    }


    /**
     *  register core, model and class 'autoloaders'
     *
     * @return void
     * @throws EE_Error
     */
    private function _register_custom_autoloaders()
    {
        EEH_Autoloader::$debug = '';
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_INTERFACES, true);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_HELPERS);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_MODELS, true);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CLASSES);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_FORM_SECTIONS, true);
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'messages');
        if (EEH_Autoloader::$debug === 'times' || EEH_Autoloader::$debug === 'all') {
            Benchmark::displayResults();
        }
    }


    public static function register_helpers_autoloaders()
    {
        // EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_HELPERS);
    }

    public static function register_form_sections_autoloaders()
    {
        // EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_FORM_SECTIONS, true );
    }


    /**
     *  register core, model and class 'autoloaders'
     *
     * @return void
     * @throws EE_Error
     */
    public static function register_line_item_display_autoloaders()
    {
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'line_item_display', true);
    }


    /**
     *  register core, model and class 'autoloaders'
     *
     * @return void
     * @throws EE_Error
     */
    public static function register_line_item_filter_autoloaders()
    {
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'line_item_filters', true);
    }


    /**
     *  register template part 'autoloaders'
     *
     * @return void
     * @throws EE_Error
     */
    public static function register_template_part_autoloaders()
    {
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'template_parts', true);
    }


    /**
     * @return void
     * @throws EE_Error
     */
    public static function register_business_classes()
    {
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE . 'business');
    }


    /**
     * Assumes all the files in this folder have the normal naming scheme (namely that their classname
     * is the file's name, plus ".whatever.php".) and adds each of them to the autoloader list.
     * If that's not the case, you'll need to improve this function or just use
     * EEH_File::get_classname_from_filepath_with_standard_filename() directly. Yes this has to scan the directory for
     * files, but it only does it once -- not on EACH time the autoloader is used
     *
     * @param string $folder name, with or without trailing /, doesn't matter
     * @param bool   $recursive
     * @param bool   $debug  **deprecated**
     * @throws EE_Error
     */
    public static function register_autoloaders_for_each_file_in_folder(
        string $folder,
        bool $recursive = false,
        bool $debug = false
    ) {
        if (EEH_Autoloader::$debug === 'times' || EEH_Autoloader::$debug === 'all' || $debug) {
            Benchmark::startTimer(basename($folder));
        }
        // make sure last char is a /
        $folder .= $folder[ strlen($folder) - 1 ] !== '/' ? '/' : '';
        $class_to_filepath_map = [];
        $exclude = ['index'];
        // get all the files in that folder that end in php
        $filepaths = glob($folder . '*');

        if (empty($filepaths)) {
            return;
        }

        foreach ($filepaths as $filepath) {
            if (substr($filepath, -4, 4) === '.php') {
                $class_name = EEH_File::get_classname_from_filepath_with_standard_filename($filepath);
                if (! in_array($class_name, $exclude)) {
                    $class_to_filepath_map [ $class_name ] = $filepath;
                }
            } elseif ($recursive) {
                EEH_Autoloader::register_autoloaders_for_each_file_in_folder($filepath, $recursive, $debug);
            }
        }
        // we remove the necessity to do a is_readable() check via the $read_check flag because glob by nature will not return non_readable files/directories.
        EEH_Autoloader::register_autoloader($class_to_filepath_map, false, $debug);
        if (EEH_Autoloader::$debug === 'times' || EEH_Autoloader::$debug === 'all') {
            Benchmark::stopTimer(basename($folder));
        }
    }


    /**
     * register additional autoloader based on variation of the classname for an existing autoloader
     *
     * @param string $class_name - simple class name ie: EE_Session
     * @param string $alias      - variation on class name ie: EE_session, session, etc
     */
    public static function add_alias(string $class_name, string $alias)
    {
        if (isset(EEH_Autoloader::$_autoloaders[ $class_name ])) {
            EEH_Autoloader::$_autoloaders[ $alias ] = EEH_Autoloader::$_autoloaders[ $class_name ];
        }
    }
}
