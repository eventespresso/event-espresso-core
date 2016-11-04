<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

class EED_Single_Page_CheckoutTest extends EE_UnitTestCase
{
    
    /**
     * Used to hold the EED_Single_Page_Checkout_Mock class.
     * @var
     */
    protected $spco_mock;
    
    
    public function setUp()
    {
        parent::setUp();
        $this->loadModuleMocks(array('EED_Single_Page_Checkout'));
        $this->spco_mock = EED_Single_Page_Checkout_Mock::instance();
    }
    
    public function tearDown()
    {
        remove_all_filters('page_link');
        parent::tearDown();
    }
    
    
    /**
     * @group 10220
     * @group spco
     */
    public function test_is_reg_page()
    {
        //add filter on permalink because that will
        add_filter('page_link', function ($link) {
            return add_query_arg(array('some_dummy_arg' => 'crazy'), $link);
        });/**/
        
        //for some reason, whatever the reg_page_id is set on EE_Config is not an actual page in the db.
        //so we first setup a page and set it as the reg page for the purpose of this test
        $original_reg_page_id = EE_Config::instance()->core->reg_page_id;
        $new_page_id = $this->factory->post->create( array( 'post_type' => 'page' ) );
        EE_Config::instance()->core->reg_page_id = $new_page_id;
        
        
        $actual_reg_page_permalink = get_permalink(EE_Config::instance()->core->reg_page_id);
        
        //example reg_page_permalink where a plugin or theme adds query params to links clicked by users for additional functionality that is NOT
        //generated via filtering get_permalink.
        $current_url_from_clicking_other_source = add_query_arg(
            array(
                'utm'      => '5677',
                'campaign' => 'analytics_campaign'
            ),
            $actual_reg_page_permalink
        );
        
        //goto the current url.
        $this->go_to( $current_url_from_clicking_other_source );
        
        //so we SHOULD be on the reg page
        $this->assertTrue($this->spco_mock->is_reg_checkout());
        EE_Config::instance()->core->reg_page_id = $original_reg_page_id;
    }
    
}
// End of file EE_CheckoutTest.php
// Location: /EE_CheckoutTest.php