<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEH_Inflector_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * @group helpers
 */
class EEH_Inflector_Test extends EE_UnitTestCase{
	public function __construct( $name = NULL, array $data = array( ), $dataName = '' ) {
		parent::__construct( $name, $data, $dataName );
	}
	public function test_pluralize_and_lower__basic() {
		$this->assertEquals( 'events', EEH_Inflector::pluralize_and_lower( 'Event' ) );
	}
	/**
	 * at first EEH_Inflector had trouble with the word 'price' because it contains the word
	 * 'rice', which word pluralizes to 'rice', not 'rices'; so it made the mistake of thinking
	 * the plural of 'price' was 'price' (not 'priceS')
	 */
	public function test_pluralize_and_lower__price() {
		$this->assertEquals( 'prices', EEH_Inflector::pluralize_and_lower( 'Price' ) );
	}

	public function test_pluralize_and_lower__two_words() {
		$this->assertEquals( 'price_types', EEH_Inflector::pluralize_and_lower( 'Price_Type' ) );
	}

	public function test_pluralize_and_lower__three_words() {
		$this->assertEquals( 'question_group_questions', EEH_Inflector::pluralize_and_lower( 'Question_Group_Question' ) );
	}

	public function test_pluralize_and_lower__funny_plural() {
		$this->assertEquals( 'term_taxonomies', EEH_Inflector::pluralize_and_lower( 'Term_Taxonomy' ) );
	}
	public function test_singuralize_and_upper__basic() {
		$this->assertEquals( 'Attendee', EEH_Inflector::singularize_and_upper( 'attendees' ) );
	}
	public function test_singuralize_and_upper__price() {
		$this->assertEquals( 'Price', EEH_Inflector::singularize_and_upper( 'prices' ) );
	}
	public function test_singuralize_and_upper__two_words() {
		$this->assertEquals( 'Datetime_Ticket', EEH_Inflector::singularize_and_upper( 'datetime_tickets' ) );
	}
	public function test_singuralize_and_upper__three_words() {
		$this->assertEquals( 'Question_Group_Question', EEH_Inflector::singularize_and_upper( 'question_group_questions' ) );
	}
	public function test_singuralize_and_upper__funny_plural() {
		$this->assertEquals( 'Term_Taxonomy', EEH_Inflector::singularize_and_upper( 'term_taxonomies' ) );
	}
}

// End of file EEH_Inflector_Test.php