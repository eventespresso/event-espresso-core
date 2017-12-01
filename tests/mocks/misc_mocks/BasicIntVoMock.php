<?php
namespace EventEspresso\tests\mocks\misc_mocks;

/**
 * BasicIntVoMock
 * Just a basic mock for various collection type tests.
 *
 * @package EventEspresso\tests\mocks\misc_mocks
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class BasicIntVoMock
{
    private $int;

    public function __construct($int_value)
    {
        $this->int = (int) $int_value;
    }


    public function intValue()
    {
        return $this->int;
    }
}