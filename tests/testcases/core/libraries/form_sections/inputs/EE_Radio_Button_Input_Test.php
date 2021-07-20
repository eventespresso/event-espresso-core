<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Radio_Button_Input_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Radio_Button_Input_Test extends EE_UnitTestCase{

	/**
	 * @group 7121
	 */
	public function test_normalized_value_int(){
		$form = new EE_Form_Section_Proper( array(
				'name' => 'test',
				'subsections' => array(
					'use_captcha' => new EE_Radio_Button_Input(
						array(
							1 => esc_html__( 'Yes', 'event_espresso' ),
							0  => esc_html__( 'No', 'event_espresso' )
						),
						array(
							'html_label_text'       => esc_html__( 'Use reCAPTCHA', 'event_espresso' ),
							'default'               => isset( EE_Registry::instance()->CFG->registration->use_captcha ) ? EE_Registry::instance()->CFG->registration->use_captcha : FALSE,
							'normalization_strategy' => new EE_Int_Normalization()
						)
					)
				)
				));
		$form->receive_form_submission( array(
			'test' => array(
				'use_captcha' => '1'
				)
			));
		$this->assertTrue( $form->is_valid() );
		$this->assertTrue( 1 === $form->get_input( 'use_captcha' )->normalized_value() );
		$this->assertTrue( '1' === $form->get_input( 'use_captcha' )->raw_value() );

		$form->receive_form_submission( array(
			'test' => array(
				'use_captcha' => '0'
			)
		));
		$this->assertTrue( $form->is_valid() );
		$this->assertTrue( 0 === $form->get_input( 'use_captcha' )->normalized_value() );
		$this->assertTrue( '0' === $form->get_input( 'use_captcha' )->raw_value() );
	}
}

// End of file EE_Radio_Button_Input_Test.php