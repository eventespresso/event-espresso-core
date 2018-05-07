<?php
/**
 *
 * EE_Data_Mapper Class
 *
 * Centralized Application Data Storage and Management
 *
 * @package                   Event Espresso
 * @subpackage                core
 * @author                    Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Data_Mapper
{


    /**
     * instance of the EE_Data_Mapper Object
     *
     * @private _instance
     */
    private static $_instance = null;


    public $data = array();


    /**
     *private constructor to prevent direct creation
     *
     * @Constructor
     * @access private
     * @return void
     */
    private function __construct()
    {
    }


    /**
     *@ singleton method used to instantiate class object
     *@ access public
     *@ return class instance
     */
    public function &instance()
    {
        // check if class object is instantiated
        if (self::$_instance === null
            || ! is_object(self::$_instance)
            || ! self::$_instance instanceof EE_Data_Mapper
        ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     *        @ override magic methods
     *        @ return void
     */
    final public function __destruct()
    {
    }

    final public function __call($a, $b)
    {
    }

    public static function __callStatic($a, $b)
    {
    }

    final public function __get($a)
    {
    }

    final public function __set($a, $b)
    {
    }

    final public function __isset($a)
    {
    }

    final public function __unset($a)
    {
    }

    final public function __sleep()
    {
        return array();
    }

    final public function __wakeup()
    {
    }

    final public function __toString()
    {
        return '';
    }

    final public function __invoke()
    {
    }

    final public function __clone()
    {
    }
}
