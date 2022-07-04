<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



class EED_Single_Page_Checkout_Test extends EE_UnitTestCase {

	/**
	 * Used to hold the EED_Single_Page_Checkout_Mock class.
	 *
	 * @var EED_Single_Page_Checkout_Mock $spco_mock
	 */
	protected $spco_mock;

	/**
	 * @var int $original_reg_page_id
	 */
	protected $original_reg_page_id = 0;

	/**
	 * @var int $new_page_id
	 */
	protected $new_page_id = 0;



	public function set_up() {
		parent::set_up();
		$this->loadModuleMocks( array( 'EED_Single_Page_Checkout' ) );
		$this->spco_mock = EED_Single_Page_Checkout_Mock::instance();
		//add filter on permalink to add some noise
		add_filter( 'page_link', array( $this, 'add_dummy_query_args' ) );
		// for some reason, whatever the reg_page_id is set on EE_Config is not an actual page in the db.
		// so we first setup a page and set it as the reg page for the purpose of this test
		$this->new_page_id = $this->factory->post->create( array( 'post_type' => 'page' ) );
		// then swap out existing reg page id with the new one
		$this->original_reg_page_id = EE_Config::instance()->core->reg_page_id;
		EE_Config::instance()->core->reg_page_id = $this->new_page_id;
	}



	public function tear_down() {
		EE_Config::instance()->core->reg_page_id = $this->original_reg_page_id;
		// remove filter on permalink
		remove_filter( 'page_link', array( $this, 'add_dummy_query_args' ) );
		parent::tear_down();
	}



	public function add_dummy_query_args( $link ) {
		return add_query_arg( array( 'some_dummy_arg' => 'crazy' ), $link );
	}



	/**
	 * because older versions of WP don't have \WP_UnitTestCase::set_permalink_structure()
	 *
	 * @param string $structure
	 */
	public function set_permalink_structure( $structure = '' ) {
		global $wp_rewrite;
		$wp_rewrite->init();
		$wp_rewrite->set_permalink_structure( $structure );
		$wp_rewrite->flush_rules();
	}



	/**
	 * @group 10220
	 * @group spco
	 */
	public function test_is_reg_page() {
		$permalink_structures = array(
			// plain /?p=123
			'plain'      => '',
			// Day and name 2016/11/07/sample-post/
			'day_name'   => '/%year%/%monthnum%/%day%/%postname%/',
			// Month and name 	http://local.wordpress.dev/2016/11/sample-post/
			'month_name' => '/%year%/%monthnum%/%postname%/',
			// Numeric 	http://local.wordpress.dev/archives/123
			'numeric'    => '/archives/%post_id%',
			// Post name 	http://local.wordpress.dev/sample-post/
			'post_name'  => '/%postname%/',
		);
		foreach ( $permalink_structures as $permalink_structure ) {
			$this->set_permalink_structure( $permalink_structure );
			// example reg_page_permalink where a plugin or theme adds query params
			// to links clicked by users for additional functionality that is NOT
			// generated via filtering get_permalink.
			$this->go_to(
				add_query_arg(
					array(
						'utm'      => '5677',
						'campaign' => 'analytics_campaign',
					),
					get_permalink( EE_Config::instance()->core->reg_page_id )
				)
			);
			//so we SHOULD be on the reg page
			$this->assertTrue( $this->spco_mock->is_reg_checkout() );
		}
	}


}
// End of file EED_Single_Page_Checkout_Test.php
// Location: tests/testcases/modules/EED_Single_Page_Checkout_Test.php