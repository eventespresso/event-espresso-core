<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.6
 *
 * ------------------------------------------------------------------------
 *
 * EE_Datepicker_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Datepicker_Input extends EE_Text_Input{

	/**
	 * @param array $input_settings
	 */
	function __construct( $input_settings = array() ){
		$input_settings['html_class'] = isset( $input_settings['html_class'] ) ? $input_settings['html_class'] . ' datepicker' : 'datepicker';
		$this->_set_display_strategy( new EE_Text_Input_Display_Strategy() );
		$this->_set_normalization_strategy( new EE_Text_Normalization() );
		parent::__construct( $input_settings );
		// add some style and make it dance
		add_action( 'wp_enqueue_scripts', array( 'EE_Datepicker_Input', 'enqueue_styles_and_scripts' ));
		add_action( 'admin_enqueue_scripts', array( 'EE_Datepicker_Input', 'enqueue_styles_and_scripts' ));
	}



	/**
	 * 	enqueue_styles_and_scripts
	 *
	 * 	@access 		public
	 * 	@return 		void
	 */
	public static function enqueue_styles_and_scripts() {
		// load css
		wp_register_style( 'espresso-ui-theme', EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css', array(), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_style( 'espresso-ui-theme');
		// i18n
		// load JS
		wp_enqueue_script( 'jquery-ui-datepicker' );
	}



}
// End of file EE_Datepicker_Input.php
// Location: /EE_Datepicker_Input.php