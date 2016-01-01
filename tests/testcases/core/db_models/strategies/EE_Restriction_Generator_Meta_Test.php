<?php

/**
 *
 * Class EE_Restriction_Generator_Meta_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
class EE_Restriction_Generator_Meta_Test extends EE_UnitTestCase{
	public function test_no_caps() {
		$generator = new EE_Restriction_Generator_Meta( 'meta_key', 'meta_value' );
		$generator->_construct_finalize( EEM_Post_Meta::instance(), EEM_Base::caps_read );
		$restrictions = $generator->generate_restrictions();
		$this->assertArrayHasKey( EE_Restriction_Generator_Base::get_default_restrictions_cap(), $restrictions );
		$this->assertArrayHasKey( 'apply-to-all-queries-using-caps', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions[ EE_Restriction_Generator_Base::get_default_restrictions_cap() ] );
		$restrictions_for_all_cap_contexts = $restrictions[ 'apply-to-all-queries-using-caps' ];
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions_for_all_cap_contexts );
		$this->assertEquals( 
			array(
				'meta_key' => array( 'NOT_LIKE', "\\\\_%" ),
				'meta_value' => array( 'NOT_REGEXP', '^[aOs]:[\d]:.*$')					
			),
			$restrictions_for_all_cap_contexts->get_default_where_conditions() 
		);
	}
	
	public function test_no_caps__whitelisted_and_blacklisted() {
		add_filter( 'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__whitelisted_meta_keys', array( $this, '_whitelist_metas' ) );
		add_filter( 'FHEE__EE_Restriction_Generator_Meta___generate_restrictions__blacklisted_meta_keys', array( $this, '_blacklist_metas' ) );
		$generator = new EE_Restriction_Generator_Meta( 'meta_key', 'meta_value' );
		$generator->_construct_finalize( EEM_Post_Meta::instance(), EEM_Base::caps_read );
		$restrictions = $generator->generate_restrictions();
		$this->assertArrayHasKey( EE_Restriction_Generator_Base::get_default_restrictions_cap(), $restrictions );
		$this->assertArrayHasKey( 'apply-to-all-queries-using-caps', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions[ EE_Restriction_Generator_Base::get_default_restrictions_cap() ] );
		$restrictions_for_all_cap_contexts = $restrictions[ 'apply-to-all-queries-using-caps' ];
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions_for_all_cap_contexts );
		$this->assertEquals( 
			array( 
				'OR*whitelisted-or-normal' => array(
					'meta_key*whitelisted' => array( 'IN', array( 'white' ) ),
					'AND' => array(
						'meta_key' => array( 'NOT_LIKE', "\\\\_%" ),
						'meta_value' => array( 'NOT_REGEXP', '^[aOs]:[\d]:.*$'),
						'meta_key*blacklisted' => array( 'NOT_IN', array( 'black' ) ),
					),
				),
			),
			$restrictions_for_all_cap_contexts->get_default_where_conditions() 
		);
	}
	
	public function _whitelist_metas( $whitelisted_metas ) {
		return array( 'white' );
	}
	
	public function _blacklist_metas( $blacklisted_metas ) {
		return array( 'black' );
	}
}
