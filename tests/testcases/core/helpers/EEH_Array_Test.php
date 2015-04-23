<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEH_Array_Test
 *
 * to run individually
 * 	phpunit testcases/core/helpers/EEH_Array_Test.php
 * or
 * phpunit --group helpersArray
 *
 * @package 			Event Espresso
 * @subpackage 	tests
 * @author 				Brent Christensen
 *
 * Based off wp core's tests/phpunit/tests/filesystem/base.php
 * @group helpers
 * @group helpersArray
 *
 */
class EEH_Array_Test extends EE_UnitTestCase {

	/**
	 * 	setUpBeforeClass
	 */
	static function setUpBeforeClass() {
		EE_Registry::instance()->load_helper( 'Array' );
	}



	/**
	 *    test_insert_into_array_with_string_indexes
	 */
	function test_insert_into_array_with_string_indexes() {
		// starting data
		$fruits = array(
			'a' => 'apple',
			'b' => 'banana',
		);
		// add to start
		//echo "\nadd to start\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 'c' => 'coconut' ) );
		//var_dump( $fruits );
		$this->assertEquals( 'coconut', reset( $fruits ) );
		$this->assertEquals( 'apple', next( $fruits ) );
		$this->assertEquals( 'banana', next( $fruits ) );
		// add to end
		//echo "\nadd to end\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 'd' => 'date' ), null, false );
		//var_dump( $fruits );
		$this->assertEquals( 'coconut', reset( $fruits ) );
		$this->assertEquals( 'apple', next( $fruits ) );
		$this->assertEquals( 'banana', next( $fruits ) );
		$this->assertEquals( 'date', next( $fruits ) );
		// add to middle BEFORE 'banana'
		//echo "\nadd to middle\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 'e' => 'elderberry' ), 'b' );
		//var_dump( $fruits );
		$this->assertEquals( 'coconut', reset( $fruits ) );
		$this->assertEquals( 'apple', next( $fruits ) );
		$this->assertEquals( 'elderberry', next( $fruits ) );
		$this->assertEquals( 'banana', next( $fruits ) );
		$this->assertEquals( 'date', next( $fruits ) );
	}



	/**
	 *    test_insert_into_array_with_numeric_indexes
	 */
	function test_insert_into_array_with_numeric_indexes() {
		// starting data
		$fruits = array(
			1 => 'one',
			2 => 'two'
		);
		//echo '$fruits: ', var_dump( $fruits );
		// add to start
		//echo "\nadd to start\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 3 => 'three' ) );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'three', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'two', next( $fruits ) );
		// add to end
		//echo "\nadd to end\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 4 => 'four' ), null, false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'three', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'two', next( $fruits ) );
		$this->assertEquals( 'four', next( $fruits ) );
		// add to middle before 2
		//echo "\nadd to middle before 2\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 5 => 'five' ), 2 );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'three', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'five', next( $fruits ) );
		$this->assertEquals( 'two', next( $fruits ) );
		$this->assertEquals( 'four', next( $fruits ) );
		// try to bork keys and add onto the end while also specifying the last known key
		//echo "\ntry to bork keys and add onto the end while also specifying a key\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 6 => 'six' ), 4, false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'three', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'five', next( $fruits ) );
		$this->assertEquals( 'two', next( $fruits ) );
		$this->assertEquals( 'four', next( $fruits ) );
		$this->assertEquals( 'six', next( $fruits ) );
		// add to end and reindex keys
		//echo "\nadd to end and reindex keys\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 7 => 'seven' ), null, false, false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'three', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'five', next( $fruits ) );
		$this->assertEquals( 'two', next( $fruits ) );
		$this->assertEquals( 'four', next( $fruits ) );
		$this->assertEquals( 'six', next( $fruits ) );
		$this->assertEquals( 'seven', next( $fruits ) );
		// now test keys
		reset( $fruits );
		$this->assertEquals( 0, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 1, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 2, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 3, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 4, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 5, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 6, key( $fruits ) );
	}



	/**
	 *    test_insert_into_array_with_mixed_indexes
	 */
	function test_insert_into_array_with_mixed_indexes() {
		// starting data
		$fruits = array(
			1   => 'one',
			'p' => 'potato'
		);
		//echo '$fruits: ', var_dump( $fruits );
		// add to start
		//echo "\nadd to start\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 2 => 'two' ) );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'two', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'potato', next( $fruits ) );
		// add to end
		//echo "\nadd to end\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 't' => 'tomato' ), null, false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'two', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'potato', next( $fruits ) );
		$this->assertEquals( 'tomato', next( $fruits ) );
		// add to middle before potato
		//echo "\nadd to middle before potato\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 3 => 'three' ), 'p' );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'two', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'three', next( $fruits ) );
		$this->assertEquals( 'potato', next( $fruits ) );
		$this->assertEquals( 'tomato', next( $fruits ) );
		// try to bork keys and add onto the end while also specifying the last known key
		//echo "\ntry to bork keys and add onto the end while also specifying a key\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 6 => 'tornado' ), 't', false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'two', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'three', next( $fruits ) );
		$this->assertEquals( 'potato', next( $fruits ) );
		$this->assertEquals( 'tomato', next( $fruits ) );
		$this->assertEquals( 'tornado', next( $fruits ) );
		// add to end and reindex keys
		//echo "\nadd to end and reindex keys\n";
		$fruits = EEH_Array::insert_into_array( $fruits, array( 'g' => 'GO NATO' ), null, false, false );
		//echo '$fruits: ', var_dump( $fruits );
		$this->assertEquals( 'two', reset( $fruits ) );
		$this->assertEquals( 'one', next( $fruits ) );
		$this->assertEquals( 'three', next( $fruits ) );
		$this->assertEquals( 'potato', next( $fruits ) );
		$this->assertEquals( 'tomato', next( $fruits ) );
		$this->assertEquals( 'tornado', next( $fruits ) );
		$this->assertEquals( 'GO NATO', next( $fruits ) );
		// now test keys
		reset( $fruits );
		$this->assertEquals( 0, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 1, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 2, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 'p', key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 't', key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 3, key( $fruits ) );
		next( $fruits );
		$this->assertEquals( 4, key( $fruits ) );
	}

}

// End of file EEH_Array_Test.php