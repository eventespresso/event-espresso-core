<?php

/**
 * Class EE_Injector_Tester_With_Numerically_Indexed_Array_And_Session
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 */
class EE_Injector_Tester_With_Array_Session_Int_Constructor_Params
{
    protected $array_property;

    protected $session_property;

    protected $integer_property;


    /**
     * injector_tester constructor.
     *
     * @param array                $some_array
     * @param EE_Session_Mock|null $session
     * @param int                  $some_int
     */
    public function __construct(array $some_array = [], EE_Session_Mock $session = null, int $some_int = 0)
    {
        $this->array_property   = $some_array;
        $this->session_property = $session;
        $this->integer_property = $some_int;
    }


    /**
     * @return array
     */
    public function array_property(): array
    {
        return $this->array_property;
    }


    /**
     * @return EE_Session_Mock
     */
    public function session_property(): ?EE_Session_Mock
    {
        return $this->session_property;
    }


    /**
     * @return int
     */
    public function integer_property(): int
    {
        return $this->integer_property;
    }
}
// Location: tests/mocks/core/services/EE_Injector_Tester_With_Array_Session_Int_Constructor_Params.class.php
