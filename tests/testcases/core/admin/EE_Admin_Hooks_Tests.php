<?php
/**
 * Contains test class for /core/admin/EE_Admin_Hooks.core.php
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Admin_Hooks class.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Admin_Hooks_Tests extends EE_UnitTestCase {

	public $extended_ee_admin;


	/**
	 * used to set the admin page mock
	 */
	public function setUp() {
		parent::setUp();
		EE_Registry::instance()->load_core('Admin_Page');
		$this->extended_ee_admin = $this->getMockForAbstractClass( 'EE_Admin_Page' );
	}
}

/**
 * Notes:
 * 1. Set up a Hooks class that will fail because it doesn't have a corresponding admin page class
 * 2. Setup a dumy admin page class object that will get instantiated with the ...
 * 3. Setup Hooks class that will instantiate the dummy admin page class object (set page object).
 * 4. There will need to be two versions of tests for the above.
 * 5. In the dummy classes, add a public method for setting different protected/private properties to
 * the wrong values so we can test errors/exceptions etc.
 * 6. For the incoming EE_Admin_Page object via the constructor, we'll use a mock (see what I started).
 * This is so we don't have to build a whole other admin page.
 */

//class EE_Admin_Hook
