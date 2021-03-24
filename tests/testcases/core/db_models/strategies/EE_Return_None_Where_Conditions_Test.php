<?php

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 *
 * EE_Return_None_Where_Conditions_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * @group                 default_where_conditions
 *
 */
class EE_Return_None_Where_Conditions_Test extends EE_UnitTestCase
{
    /**
     * @throws EE_Error
     */
    function test_get_default_where_conditions()
    {
        $default_where_conditions = new EE_Return_None_Where_Conditions();
        $default_where_conditions->_finalize_construct(EEM_Registration::instance());
        $this->assertEquals(
            ['Event.Registration.REG_ID' => ['<', 0]],
            $default_where_conditions->get_default_where_conditions('Event.Registration')
        );
    }
}

// End of file EE_Return_None_Where_Conditions_Test.php