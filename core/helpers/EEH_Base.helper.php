<?php
/**
 * EEH_Base Helper
 *
 * @package         Event Espresso
 * @subpackage  /helpers/
 * @author              Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEH_Base
{

    /**
     *  @var    array   $uri_segment_array  URL segments
     *  @access     private
     */
//  final private function __construct() {}

    /**
     *      @ override magic methods
     *      @ return void
     */
    public function __set($a, $b)
    {
        return false;
    }
    public function __get($a)
    {
        return false;
    }
    public function __isset($a)
    {
        return false;
    }
    public function __unset($a)
    {
        return false;
    }
    public function __clone()
    {
        return false;
    }
    public function __wakeup()
    {
        return false;
    }
    public function __destruct()
    {
        return false;
    }
}
