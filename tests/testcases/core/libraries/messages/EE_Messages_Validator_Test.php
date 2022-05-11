<?php
/**
 * Contains tests for the EE_Messages_Validator system.
 *
 * @since  		4.6.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Messages_Validator class.
 *
 * @since 		4.6.0
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Messages_Validator_Test extends EE_UnitTestCase {


	private $_messagesValidatorMock;


	public function set_up() {
		parent::set_up();
		$this->loadMessagesMocks();
		$this->_messagesValidatorMock = new EE_Messages_Validator_Mock();
	}



	/**
	 * This tests validating dynamic messages shortcodes against the  _invalid_shortcodes
	 * method in the EE_Messages_Validator class.
	 *
	 * @since @4.6.0
	 * @group 7534
	 */
	public function test_validating_dynamic_shortcodes() {

		$valid_shortcodes_array = array(
			'[LINE_ITEM_TAXABLE_*]',
			'[CO_TAX_NUMBER_*]',
			'[PAYMENT_LIST_*]',
			'[RECIPIENT_ANSWER_*]',
			'[TKT_USES_*]',
			'[INVOICE_PAYEE_TAX_NUMBER_*]',
			'[OWING_STATUS_MESSAGE_*]',
			'[ANSWER_*]'
			);
		$valid_shortcodes_array = array_flip( $valid_shortcodes_array );

		$string_with_valid_shortcodes = '[LINE_ITEM_TAXABLE_* some_param="this" or this ?] with [CO_TAX_NUMBER_* some_param="this" or this ?] and [PAYMENT_LIST_* some_param="this" or this ?].  But don\'t forget [RECIPIENT_ANSWER_* some_param="this" or this ?] or [TKT_USES_* some_param="this" or this ?] because [INVOICE_PAYEE_TAX_NUMBER_* some_param="this" or this ?] has [OWING_STATUS_MESSAGE_* some_param="this" or this ?] and finally, [ANSWER_* some_param="this" or this ?]';

		$string_with_invalid_shortcodes = '[JUST_AN_INVALID*_] and another that is [SOMEWHAT_INVALID missing a bracket of course.  But then there is [THIS_ONE_* (that does have a bracket)], and finally [JUST_A_PLAIN_INVALID_SHORTCODE]';

		//test valid shortcodes
		$this->assertFalse( $this->_messagesValidatorMock->invalid_shortcodes( $string_with_valid_shortcodes, $valid_shortcodes_array ) );

		//test invalid shortcodes
		$this->assertStringContainsString( '[JUST_AN_INVALID*_]', $this->_messagesValidatorMock->invalid_shortcodes( $string_with_invalid_shortcodes, $valid_shortcodes_array ) );
		$this->assertStringContainsString( '[THIS_ONE_* (that does have a bracket)]', $this->_messagesValidatorMock->invalid_shortcodes( $string_with_invalid_shortcodes, $valid_shortcodes_array ) );
		$this->assertStringContainsString( '[JUST_A_PLAIN_INVALID_SHORTCODE]', $this->_messagesValidatorMock->invalid_shortcodes( $string_with_invalid_shortcodes, $valid_shortcodes_array ) );
		$this->assertStringContainsString( '[SOMEWHAT_INVALID', $this->_messagesValidatorMock->invalid_shortcodes( $string_with_invalid_shortcodes, $valid_shortcodes_array ) );
	}
}
