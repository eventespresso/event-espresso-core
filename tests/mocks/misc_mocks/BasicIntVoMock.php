<?php
namespace EventEspresso\tests\mocks\misc_mocks;

/**
 * BasicIntVoMock
 * Just a basic mock for various collection type tests.
 *
 * @package EventEspresso\tests\mocks\misc_mocks
 * @author  Darren Ethier
 * @since   1.0.0
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