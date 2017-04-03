<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * EE_State_Select_Input_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author			Brent Christensen
 */
class EE_State_Select_Input_Test extends EE_UnitTestCase{


    /**
     * @group 10643
     * @throws EE_Error
     */
    public function test_EE_State_Input_with_input()
    {
        $form = new EE_Form_Section_Proper(
            array(
                'name'        => 'where-you-live',
                'subsections' => array(
                    'state' => new EE_State_Select_Input(null)
                )
            )
        );
        $submitted_data = array('where-you-live' => array('state' => 61));
        $form->receive_form_submission($submitted_data);
        $this->assertEquals(
            61,
            $form->get_input('state')->normalized_value()
        );
        $this->assertEquals(
            '61',
            $form->get_input('state')->raw_value()
        );
        $this->assertEquals(
            $submitted_data,
            $form->submitted_values(true)
        );
    }


    /**
     * @group 10643
     * @throws EE_Error
     */
    public function test_EE_State_Input_with_no_input()
    {
        $form = new EE_Form_Section_Proper(
            array(
                'name'        => 'where-you-live',
                'subsections' => array(
                    'state' => new EE_State_Select_Input(null)
                )
            )
        );
        $submitted_data = array('where-you-live' => array());
        $form->receive_form_submission($submitted_data);
        $this->assertTrue($form->is_valid());
        $this->assertEquals(
            null,
            $form->get_input('state')->normalized_value()
        );
        $this->assertEquals(
            '',
            $form->get_input('state')->raw_value()
        );
        $this->assertEquals(
            array('where-you-live' => array('state' => '')),
            $form->submitted_values(true)
        );
    }


    /**
     * @group 10643
     * @throws EE_Error
     */
    public function test_required_EE_State_Input_with_no_input()
    {
        $form = new EE_Form_Section_Proper(
            array(
                'name'        => 'where-you-live',
                'subsections' => array(
                    'state' => new EE_State_Select_Input(null, array('required' => true))
                )
            )
        );
        $submitted_data = array('where-you-live' => array());
        $form->receive_form_submission($submitted_data);
        $this->assertFalse($form->is_valid());
        $this->assertNotEmpty($form->submission_error_message());
    }
}

// End of file EE_Radio_Button_Input_Test.php