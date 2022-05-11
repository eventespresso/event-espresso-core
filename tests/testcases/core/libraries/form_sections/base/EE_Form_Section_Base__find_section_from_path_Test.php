<?php

/**
 *
 * Class EE_Form_Section_Base__find_section_from_path_Test
 *
 * Verifies EE_Form_Section_base::find_section_from_path works as expected
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * 
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * @group 9571
 */
class EE_Form_Section_Base__find_section_from_path_Test extends EE_UnitTestCase{
	
	protected $_granparent_section;
	protected $_parent_section;
	protected $_child_section;
	protected $_sibling_section;
	protected $_aunt_section;
	protected $_cousin_section;
	
	public function set_up() {
		parent::set_up();
		$this->_child_section = new EE_Text_Input();
		$this->_sibling_section = new EE_Text_Input();
		$this->_parent_section = new EE_Form_Section_Proper( 
			array(
				'subsections' => array(
					'child' => $this->_child_section,
					'sibling' => $this->_sibling_section
				)
			)
		);
		$this->_cousin_section = new EE_Text_Input();
		$this->_aunt_section = new EE_Form_Section_Proper(
			array(
				'subsections' => array(
					'cousin' => $this->_cousin_section
				)
			)
		);
		$this->_granparent_section = new EE_Form_Section_Proper( 
			array(
				'name' => 'grandparent',
				'subsections' => array(
					'parent' => $this->_parent_section,
					'aunt' => $this->_aunt_section
				)
			)
		);
	}
	//put your code here
	public function test_sibling() {
		$this->assertEquals( $this->_sibling_section, $this->_child_section->find_section_from_path( '../sibling' ) );
	}
	public function test_parent() {
		$this->assertEquals( $this->_parent_section, $this->_child_section->find_section_from_path( '../' ) );
		$this->assertEquals( $this->_parent_section, $this->_child_section->find_section_from_path( '../../parent' ) );
	}
	public function test_aunt() {
		$this->assertEquals( $this->_aunt_section, $this->_child_section->find_section_from_path( '../../aunt' ) );
	}
	public function test_cousin() {
		$this->assertEquals( $this->_cousin_section, $this->_child_section->find_section_from_path( '../../aunt/cousin' ) );
	}
	public function test_nephew() {
		$this->assertEquals( $this->_cousin_section, $this->_parent_section->find_section_from_path( '../aunt/cousin' ) );
	}
	public function test_child() {
		$this->assertEquals( $this->_child_section, $this->_parent_section->find_section_from_path( 'child' ) );
	}
	
	
	public function test_grandparent(){
		$this->assertEquals( $this->_granparent_section, $this->_child_section->find_section_from_path( '../../' ) );
	}
	public function test_self() {
		$this->assertEquals( $this->_child_section, $this->_child_section->find_section_from_path( '' ) );
		$this->assertEquals( $this->_child_section, $this->_child_section->find_section_from_path( '../child' ) );
	}
	public function test_invalid_strings() {
		$invalid_strings = array(
			'child-of-child',
			'../child/child-of-child',
			'../brother-i-never-had'
		);
		foreach( $invalid_strings as $invalid_string ) {
				$this->assertNull( $this->_child_section->find_section_from_path( $invalid_string ), 'The string ' . $invalid_string . ' shouldnt be considered valid' );
		}
		
	}
}
