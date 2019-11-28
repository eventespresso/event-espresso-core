<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_UnitTestCase;

/**
 * Class EntityNodeTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNodeTest extends EE_UnitTestCase
{
    public function testDiscoverSimple(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $event_node = new ModelObjNode($e);
        $work_done = $event_node->visit(1);
        $this->assertEquals(0, $work_done);
        $tree = $event_node->toArray();

        // We should know the ID of the main object.
        $this->assertEquals($e->ID(), $tree['id']);

        // We should have a node for the datetime relation.
        $this->assertArrayHasKey('Datetime', $tree['rels']);
        $this->assertEquals(0, $tree['rels']['Datetime']['count']);
        $this->assertEquals([], $tree['rels']['Datetime']['objs']);

        // We should NOT have relation nodes for HABTM relations...
        $this->assertArrayNotHasKey('Question_Group', $tree['rels']);

        // ...but we should for their join tables...
        $this->assertArrayHasKey('Event_Question_Group', $tree['rels']);

        // ...even if they're only an implied relation.
        $this->assertArrayHasKey('Event_Venue', $tree['rels']);
    }

}
// End of file EntityNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/EntityNodeTest.php
