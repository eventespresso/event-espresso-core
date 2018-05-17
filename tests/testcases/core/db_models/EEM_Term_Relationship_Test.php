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


    /**
     * Verifies that when EEM_Term_Relationship::update_term_taxonomy_counts is called with no arguments,
     * the counts are correct
     */
	public function testUpdateTermTaxonomyCountsPassNull()
    {
        $terms = $this->setupTerms();
        //verify that when we update the counts, they aren't set to zero
        EEM_Term_Relationship::instance()->update_term_taxonomy_counts();
        $this->assertTermCountsCorrect($terms);
    }


    /**
     * Verifies that when EEM_Term_Relationship::update_term_taxonomy_counts is called with a term ID, that
     * the term counts are afterwards correct still.
     */
    public function testUpdateTermTaxonomyCountsPassInt()
    {
        $terms = $this->setupTerms();
        $term2 = $terms[1];
        //verify that when we update the counts, they aren't set to zero
        EEM_Term_Relationship::instance()->update_term_taxonomy_counts($term2->term_id);
        $this->assertTermCountsCorrect($terms);
    }


    /**
     * Sets up 3 terms, and some related posts, and associates them so that the term counts are :1, 2, 1, respectively.
     * Returns a numerically-indexed array of these WP_Term objects
     * @return WP_Term[]
     */
    protected function setupTerms()
    {
        //create a few term taxonomies
        $term1 = $this->factory()->term->create_and_get();
        $term2 = $this->factory()->term->create_and_get();
        $term3 = $this->factory()->term->create_and_get();
        //add them to some posts
        $post1 = $this->factory()->post->create_and_get();
        $post2 = $this->factory()->post->create_and_get();
        wp_set_post_terms($post1->ID, array($term1->term_id, $term2->term_id));
        wp_set_post_terms($post2->ID,array($term2->term_id, $term3->term_id));
        wp_cache_flush();
        $term1 = get_term($term1->term_id);
        $term2 = get_term($term2->term_id);
        $term3 = get_term($term3->term_id);

        $this->assertEquals(1, $term1->count);
        $this->assertEquals(2, $term2->count);
        $this->assertEquals(1, $term3->count);
        return array(
            $term1,
            $term2,
            $term3
        );
    }


    /**
     * Asserts that the terms received were from setupTerms() and have the correct counts
     * @param WP_Term[] $terms
     */
    protected function assertTermCountsCorrect(array $terms)
    {
        $term1 = $terms[0];
        $term2 = $terms[1];
        $term3 = $terms[2];
        wp_cache_flush();
        $term1 = get_term($term1->term_id);
        $term2 = get_term($term2->term_id);
        $term3 = get_term($term3->term_id);
        $this->assertEquals(1, $term1->count);
        $this->assertEquals(2, $term2->count);
        $this->assertEquals(1, $term3->count);
    }
}

// End of file EEM_Term_Relationship_Test.php