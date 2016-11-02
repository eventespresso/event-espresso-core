<?php
use EventEspresso\modules\invalid_checkout_access\InvalidCheckoutAccess;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidCheckoutAccess
 * module for controlling and tracking invalid access to the registration checkout page
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.17
 */
class EED_Invalid_Checkout_Access extends EED_Module {

	/**
	 * @var InvalidCheckoutAccess $invalid_checkout_access_form
	 */
	private static $invalid_checkout_access_form;

	/**
	 * set_hooks - for hooking into EE Core, other modules, etc
	 */
	public static function set_hooks() {
	}



	/**
	 * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 */
	public static function set_hooks_admin() {
		add_action(
			'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template',
			array( 'EED_Invalid_Checkout_Access', 'display_invalid_checkout_access_form' ),
			15
		);
		add_filter(
			'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration',
			array( 'EED_Invalid_Checkout_Access', 'process_invalid_checkout_access_form' )
		);
	}



	/**
	 * run - initial module setup
	 * this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
	 *
	 * @var WP $WP
	 */
	public function run( $WP ) {
		// TODO: Implement run() method.
	}



	/**
	 * @return InvalidCheckoutAccess
	 */
	public static function getInvalidCheckoutAccess() {
		if ( ! self::$invalid_checkout_access_form instanceof InvalidCheckoutAccess ) {
			self::$invalid_checkout_access_form = new InvalidCheckoutAccess();
		}
		return self::$invalid_checkout_access_form;
	}



	/**
	 * email_validation_settings_form
	 *
	 * @return    void
	 * @throws \EE_Error
	 */
	public static function display_invalid_checkout_access_form() {
		$invalid_checkout_access_form = \EED_Invalid_Checkout_Access::getInvalidCheckoutAccess();
		echo $invalid_checkout_access_form->getForm()->get_html();
	}



	/**
	 * email_validation_settings_form
	 *
	 * @param \EE_Registration_Config $EE_Registration_Config
	 * @return \EE_Registration_Config
	 */
	public static function process_invalid_checkout_access_form( \EE_Registration_Config $EE_Registration_Config ) {
		$invalid_checkout_access_form = \EED_Invalid_Checkout_Access::getInvalidCheckoutAccess();
		return $invalid_checkout_access_form->processForm( $EE_Registration_Config );
	}




}
// End of file EED_Invalid_Checkout_Access.module.php
// Location: EventEspresso\modules\invalid_checkout_access/EED_Invalid_Checkout_Access.module.php