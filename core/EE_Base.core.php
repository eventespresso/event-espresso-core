<?php
/**
 * EE_Base
 *
 * @package               Event Espresso
 * @subpackage            core/
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Base
{

    /**
     *        @ override magic methods
     *        @ return void
     */
    public function __get($a)
    {
        return false;
    }

    public function __set($a, $b)
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
