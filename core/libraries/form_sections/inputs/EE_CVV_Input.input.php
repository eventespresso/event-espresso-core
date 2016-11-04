<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_CCV_Input
 * Text-field, except should evaluate to a number, and should be completely emptied
 * when cleaning out sensitive data
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_CVV_Input extends EE_Text_Input{

	/**
	 * @param array $input_settings {
	 *	@type boolean $include_whats_this_link defaults to true
	 * }
	 */
	public function __construct($input_settings = array()) {
		$this->set_sensitive_data_removal_strategy(new EE_CCV_Sensitive_Data_Removal());
		$this->_add_validation_strategy(
			new EE_Text_Validation_Strategy(
				isset( $input_settings[ 'validation_error_message' ] )
					?  $input_settings[ 'validation_error_message' ]
					: __(
						'The CVV is either a 3 digit number on the back of your card, or 4 digit number on the front',
						'event_espresso'
					),
				'~^\d{3,4}$~'
			)
		);
		parent::__construct($input_settings);
		if(
			! isset( $input_settings['include_whats_this_link'] )
			|| (
				isset( $input_settings['include_whats_this_link'] )
			     && $input_settings['include_whats_this_link'] === true
			)
		) {
			$this->_html_label_text = sprintf(
				_x(
					'%1$s %2$s(What\'s this?)%3$s',
					'CVV (What\'s this?)',
					'event_espresso'
				),
				$this->_html_label_text,
				'<a href="https://www.cvvnumber.com/" target="_blank">',
				'</a>');
		}
	}
}

// End of file EE_CCV_Input.input.php