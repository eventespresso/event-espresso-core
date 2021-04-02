<?php

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * EE_Default_Where_Conditions_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @group                 default_where_conditions
 * @group                 core/db_models
 */
class EE_Default_Where_Conditions_Test extends EE_UnitTestCase
{

    /**
     * @throws EE_Error
     */
    function test_add_model_relation_chain_onto_where_conditions()
    {
        $this->loadFactories();
        global $current_user;
        $current_user             = $this->factory->user->create_and_get();
        $value1                   = 12;
        $value2                   = 23;
        $value3                   = [1, 2, 3];
        $value4                   = 'eee';
        $default_where_conditions = new EE_Default_Where_Conditions();
        $default_where_conditions->_finalize_construct(EEM_Event::instance());
        $this->assertEquals(
            [
                'OR*'               => [
                    'Event.EVT_ID'          => $value1,
                    'Event.Datetime.DTT_ID' => $value2,
                ],
                'AND'               => [
                    'Event.EVT_name'          => ['IN', $value3],
                    'Event.Datetime.DTT_name' => $value4,
                ],
                'Event.EVT_wp_user' => $current_user->ID,
            ],
            $default_where_conditions->prepare_where_conditions_for_querying(
                [
                    'OR*'                                       => [
                        'EVT_ID'          => $value1,
                        'Datetime.DTT_ID' => $value2,
                    ],
                    'AND'                                       => [
                        'EVT_name'          => ['IN', $value3],
                        'Datetime.DTT_name' => $value4,
                    ],
                    EEM_Event::instance()->wp_user_field_name() => EE_QUERY_PLACEHOLDER_CURRENT_USER,
                ],
                'Event.'
            )
        );
    }


    /**
     * @throws EE_Error
     */
    function test_wp_user_field_name()
    {
        $this->assertEquals(
            'EVT_wp_user',
            EEM_Event::instance()->wp_user_field_name()
        );
        $this->assertEquals(
            'Registration.Event.EVT_wp_user',
            EEM_Transaction::instance()->wp_user_field_name()
        );
        $this->assertEquals(
            'TKT_wp_user',
            EEM_Ticket::instance()->wp_user_field_name()
        );
    }

    /**
     * tests teh odd case where we want to add a model relation chain that goes
     * back on itself
     */
    //	function test_add_model_relation_chain_onto_where_conditions__reciprocal_relation(){
    //		$value1 = 12;
    //		$default_where_conditions = new EE_Default_Where_Conditions( array( 'Event.EVT_wp_user' => $value1 ) );
    //		$default_where_conditions->_finalize_construct( EEM_Registration::instance() );
    //		//pretend we were querying events, and we joined to the registrations model, and so the
    //		//registration's model added a default where condition to only return registrations for events owned
    //		//by teh current user. eg EEM_Event::instance()->get_all( array( array( 'Registration.REG_ID' => 12 ) );
    //		$this->assertEquals(
    //				array(
    //					'EVT_wp_user' => $value1
    //					//NOT Event.Event.EVT_wp_user
    //				)
    //			,
    //				$default_where_conditions->add_model_relation_chain_onto_where_conditions( array( 'Event.EVT_wp_user' => $value1 ), 'Registration.' ));
    //	}
}
// End of file EE_Default_Where_Conditions_Test.php
