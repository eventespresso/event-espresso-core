<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Error;
use EE_UnitTestCase;
use EEM_Event_Venue;
use EEM_Term_Relationship;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

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
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testVisitTermRelationshipZeroItems(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $term_relationship_relation_node = new RelationNode($e->ID(), $e->get_model(), EEM_Term_Relationship::instance());
        $work_done = $term_relationship_relation_node->visit(1);
        $this->assertEquals(0, $work_done);
        $tree = $term_relationship_relation_node->toArray();

        // We should have a count.
        $this->assertEquals(0, $tree['count']);
        $this->assertEquals([], $tree['objs']);
        $this->assertEquals(true, $tree['complete']);
    }

    public function testVisitTermRelationshipOneItem(){
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
        $term_relationship_relation_node = new RelationNode($e->ID(), $e->get_model(), EEM_Term_Relationship::instance());
        $work_done = $term_relationship_relation_node->visit(2);
        $this->assertEquals(1, $work_done);
        $tree = $term_relationship_relation_node->toArray();
        // We should have a count.
        $this->assertEquals(1, $tree['count']);
        $this->assertNotEmpty( $tree['objs']);
        $this->assertEquals(true, $tree['complete']);
    }

    /**
     * Verifies relation nodes work OK even for a join table across a HABTM relation.
     * Eg, events don't declare a relationship to "event venues"- it's implied by their HABTM relation to venues.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testVisitHABTM()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $v = $this->new_model_obj_with_dependencies('Venue');
        $ev = $this->new_model_obj_with_dependencies('Event_Venue',
            [
                'EVT_ID' => $e->ID(),
                'VNU_ID' => $v->ID()
            ]
        );

        $e_node = new RelationNode($e->ID(), $e->get_model(), EEM_Event_Venue::instance());
        $e_node->visit(2);
        $tree = $e_node->toArray();
        $this->assertEquals(1, $tree['count']);
        $this->assertNotEmpty($tree['objs']);
        $this->assertArrayHasKey($ev->ID(), $tree['objs']);
        $this->assertEquals($ev->ID(), $tree['objs'][$ev->ID()]['id']);
        $this->assertEquals(true, $tree['complete']);
    }

    public function testSerializesSmall()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $e_node = new RelationNode($e->ID(), $e->get_model(), EEM_Event_Venue::instance());
        // echo serialize($e_node);
        $this->assertLessThan(175, strlen(serialize($e_node)));
    }
}
// End of file RelationNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNodeTest.php
