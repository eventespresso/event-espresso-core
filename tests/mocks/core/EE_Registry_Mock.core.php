<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\container\Mirror;
use EventEspresso\core\services\loaders\ClassInterfaceCache;
use EventEspresso\core\services\loaders\ObjectIdentifier;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_Registry_Mock
 * For unit testing EE_Registry
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.7
 */
class EE_Registry_Mock extends EE_Registry
{

    /**
     * @var EE_Registry_Mock $_instance
     * @access    private
     */
    private static $_instance;

    /**
     * @access    public
     * @var    $Some_Class
     */
    public $Some_Class;


    /**
     * @singleton method used to instantiate class object
     * @param  EE_Dependency_Map       $dependency_map
     * @param Mirror|null              $mirror
     * @param ClassInterfaceCache|null $class_cache
     * @param ObjectIdentifier|null    $object_identifier
     * @return EE_Registry_Mock instance
     */
    public static function instance(
        EE_Dependency_Map $dependency_map = null,
        Mirror $mirror = null,
        ClassInterfaceCache $class_cache = null,
        ObjectIdentifier $object_identifier = null
    ) {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Registry_Mock) {
            self::$_instance = new EE_Registry_Mock($dependency_map, $mirror, $class_cache, $object_identifier);
        }
        return self::$_instance;
    }


    /**
     *    loads and tracks classes
     *
     * @param array       $file_paths
     * @param string      $class_prefix - EE  or EEM or... ???
     * @param bool|string $class_name   - $class name
     * @param string      $type         - file type - core? class? helper? model?
     * @param mixed       $arguments    - an argument or array of arguments to pass to the class upon instantiation
     * @param bool        $from_db      - some classes are instantiated from the db and thus call a different method to
     *                                  instantiate
     * @param bool        $cache
     * @param bool        $load_only
     * @return null|object|bool    null = failure to load or instantiate class object.
     *                                  object = class loaded and instantiated successfully.
     *                                  bool = fail or success when $load_only is true
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function load(
        $file_paths = array(),
        $class_prefix = 'EE_',
        $class_name = false,
        $type = 'class',
        $arguments = array(),
        $from_db = false,
        $cache = true,
        $load_only = false
    ) {
        return $this->_load($file_paths, $class_prefix, $class_name, $type, $arguments, $from_db, $cache, $load_only);
    }


    /**
     * @access public
     * @param string $class_name
     * @param string $class_prefix
     * @return null|object
     */
    public function get_cached_class($class_name, $class_prefix = '', $arguments = array())
    {
        return $this->_get_cached_class($class_name, $class_prefix, $arguments);
    }


    /**
     * @access public
     * @param string $class_name
     * @param string $type
     * @param array  $file_paths
     * @return string
     */
    public function resolve_path($class_name, $type = '', $file_paths = array())
    {
        return $this->_resolve_path($class_name, $type, $file_paths);
    }


    /**
     * @access public
     * @param string $path
     * @param string $class_name
     * @param string $type
     * @param array  $file_paths
     * @return void
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function require_file($path, $class_name, $type = '', $file_paths = array())
    {
        $this->_require_file($path, $class_name, $type, $file_paths);
    }


    /**
     * @access public
     * @param string $class_name
     * @param array  $arguments
     * @param string $type
     * @param bool   $from_db
     * @return null | object
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function create_object($class_name, $arguments = array(), $type = 'core', $from_db = false)
    {
        //echo "\n create_object";
        //echo "\n $class_name";
        //echo "\n resolve_dependencies: ";
        //var_dump( $resolve_dependencies );
        return $this->_create_object($class_name, $arguments, $type, $from_db);
    }


    /**
     * @access public
     * @param  object $class_obj
     * @param  string $class_name
     * @param  string $class_prefix
     * @param  bool   $from_db
     * @return void
     */
    public function set_cached_class($class_obj, $class_name, $class_prefix = '', $from_db = false)
    {
        $this->_set_cached_class($class_obj, $class_name, $class_prefix, $from_db);
    }


    /**
     * @access public
     * @param array $array
     * @return bool
     */
    public function array_is_numerically_and_sequentially_indexed(array $array)
    {
        return $this->_array_is_numerically_and_sequentially_indexed($array);
    }


    /**
     * @access public
     * @param string $class_name
     * @return bool
     */
    public function dependency_map_has($class_name = '')
    {
        return $this->_dependency_map->has($class_name);
    }


    /**
     * @access public
     * @param string $class_name
     * @param string $dependency
     * @return bool
     */
    public function has_dependency_for_class($class_name = '', $dependency = '')
    {
        return $this->_dependency_map->has_dependency_for_class($class_name, $dependency);
    }


    /**
     * @access public
     * @param string $class_name
     * @param string $dependency
     * @return bool
     */
    public function loading_strategy_for_class_dependency($class_name = '', $dependency = '')
    {
        return $this->_dependency_map->loading_strategy_for_class_dependency($class_name, $dependency);
    }


    /**
     * @access public
     * @param string $class_name
     * @return bool
     */
    public function dependency_map_class_loader($class_name = '')
    {
        return $this->_dependency_map->class_loader($class_name);
    }
}



// End of file EE_Registry_Mock.core.php
// Location: /tests/mocks/core/EE_Registry_Mock.core.php
