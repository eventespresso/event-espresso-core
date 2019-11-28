<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_UnitTestCase;
use EEM_Term_Relationship;

/**
 * Class RelationNodeTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class RelationNodeTest extends EE_UnitTestCase
{
    /**
     * The Term Relationship is the only model with no primary key. And its the bane of my existence.
     * Try it.
     * @since $VID:$
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    public function testDiscoverTermRelationshipZeroItems(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $term_relationship_relation_node = new RelationNode($e, EEM_Term_Relationship::instance());
        $work_done = $term_relationship_relation_node->visit(1);
        $this->assertEquals(0, $work_done);
        $tree = $term_relationship_relation_node->toArray();

        // We should have a count.
        $this->assertEquals(0, $tree['count']);
        $this->assertEquals([], $tree['objs']);
    }

    public function testDiscoverTermRelationshipOneItem(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $term = wp_insert_term(
            'forceful',
            'espresso_event_categories'
        );
        wp_add_object_terms(
            $e->ID(),
            [
                $term['term_id']
            ],
            'espresso_event_categories'
        );
        $term_relationship_relation_node = new RelationNode($e, EEM_Term_Relationship::instance());
        $work_done = $term_relationship_relation_node->visit(1);
        $this->assertEquals(1, $work_done);
        $tree = $term_relationship_relation_node->toArray();
        // We should have a count.
        $this->assertEquals(1, $tree['count']);
        $this->assertNotEmpty( $tree['objs']);
    }


}
// End of file RelationNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNodeTest.php
