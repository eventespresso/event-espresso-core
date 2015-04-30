<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Inflector_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Inflector_Test extends EE_UnitTestCase{
	public function test_pluralize_and_lower__basic() {
		$this->assertEquals( 'events', EE_Inflector::pluralize_and_lower( 'Event' ) );
	}
	/**
	 * at first EE_Inflector had trouble with the word 'price' because it contains the word
	 * 'rice', which word pluralizes to 'rice', not 'rices'; so it made the mistake of thinking
	 * the plural of 'price' was 'price' (not 'priceS')
	 */
	public function test_pluralize_and_lower__price() {
		$this->assertEquals( 'prices', EE_Inflector::pluralize_and_lower( 'Price' ) );
	}

	public function test_pluralize_and_lower__two_words() {
		$this->assertEquals( 'price_types', EE_Inflector::pluralize_and_lower( 'Price_Type' ) );
	}

	public function test_pluralize_and_lower__three_words() {
		$this->assertEquals( 'question_group_questions', EE_Inflector::pluralize_and_lower( 'Question_Group_Question' ) );
	}

	public function test_pluralize_and_lower__funny_plural() {
		$this->assertEquals( 'term_taxonomies', EE_Inflector::pluralize_and_lower( 'Term_Taxonomy' ) );
	}
	public function test_singuralize_and_upper__basic() {
		$this->assertEquals( 'Attendee', EE_Inflector::singularize_and_upper( 'attendees' ) );
	}
	public function test_singuralize_and_upper__price() {
		$this->assertEquals( 'Price', EE_Inflector::singularize_and_upper( 'prices' ) );
	}
	public function test_singuralize_and_upper__two_words() {
		$this->assertEquals( 'Datetime_Ticket', EE_Inflector::singularize_and_upper( 'datetime_tickets' ) );
	}
	public function test_singuralize_and_upper__three_words() {
		$this->assertEquals( 'Currency_Payment_Method', EE_Inflector::singularize_and_upper( 'currency_payment_methods' ) );
	}
	public function test_singuralize_and_upper__funny_plural() {
		$this->assertEquals( 'Term_Taxonomy', EE_Inflector::singularize_and_upper( 'term_taxonomies' ) );
	}
}

// End of file EE_Inflector_Test.php