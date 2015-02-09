<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEM_Term_Relationship_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_models
 */
class EEM_Term_Relationship_Test extends EE_UnitTestCase{

	public function test_insert_and_update_and_delete() {
		$term1 = EE_Term::new_instance( array( 'name' => 'monkey1', 'slug' => 'monkey1' ) );
		$term2 = EE_Term::new_instance( array( 'name' => 'monkey2', 'slug'=> 'monkey2' ) );
		$term1->save();
		$term2->save();
		$tt_1 = EE_Term_Taxonomy::new_instance( array( 'taxonomy' => 'whatever', 'term_id' => $term1->ID() ) );
		$tt_1->save();
		$tt_2 = EE_Term_Taxonomy::new_instance( array( 'taxonomy' => 'whatever', 'term_id' => $term2->ID() ) );
		$tt_2->save();
		$e = EE_Event::new_instance( array( 'EVT_name' => 'for_term_1' ) );
		$e->save();
		//ok done setup
		//test INSERT
		$this->assertEquals(0,$tt_1->count());
		$new_tr_id = EEM_Term_Relationship::instance()->insert( array( 'term_taxonomy_id'=>$tt_1->ID(), 'object_id' => $e->ID() ) );
		$this->assertNotNull( $new_tr_id );
		//refresh out term_taxonomy objects, as the database has changed
		$tt_1 = EEM_Term_Taxonomy::reset()->get_one_by_ID( $tt_1->ID() );
		$tt_2 = EEM_Term_Taxonomy::instance()->get_one_by_ID($tt_2->ID() );
		$this->assertEquals( 1, $tt_1->count() );
		$this->assertEquals(0,$tt_2->count() );

		//test UPDATE... except we can't update term_relationship because there's no Primary Key
		//on it. This should be fixed at some point
		//@todo: fix this test
//		$updated = EEM_Term_Relationship::instance()->update_by_ID(array('term_taxonomy_id'=>$tt_2->ID() ), $new_tr_id );
//		//refresh out term_taxonomy objects, as the database has changed
//		$tt_1 = EEM_Term_Taxonomy::reset()->get_one_by_ID( $tt_1->ID() );
//		$tt_2 = EEM_Term_Taxonomy::instance()->get_one_by_ID($tt_2->ID() );
//		$this->assertEquals( 0, $tt_1->count() );
//		$this->assertEquals(1,$tt_2->count() );

		//test DELETE
		//@todo: fix this test too. see above
//		$count_deleted = EEM_Term_Relationship::instance()->delete_by_ID($new_tr_id);
//		$this->assertNotEmpty( $count_deleted );
//		//refresh out term_taxonomy objects, as the database has changed
//		$tt_1 = EEM_Term_Taxonomy::reset()->get_one_by_ID( $tt_1->ID() );
//		$tt_2 = EEM_Term_Taxonomy::instance()->get_one_by_ID($tt_2->ID() );
//		$this->assertEquals( 0, $tt_1->count() );
//		$this->assertEquals(0,$tt_2->count() );
	}
}

// End of file EEM_Term_Relationship_Test.php