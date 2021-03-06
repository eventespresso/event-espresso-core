<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Error;
use EE_UnitTestCase;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class EntityNodeTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.10.12.p
 *
 */
class ModelObjNodeTest extends EE_UnitTestCase
{
    public function testVisit(){
        $d = $this->new_model_obj_with_dependencies('Datetime');
        $e = $d->get_first_related('Event');
        $v = $this->new_model_obj_with_dependencies('Venue');
        $e->_add_relation_to($v, 'Venue');
        $qg = \EEM_Question_Group::instance()->get_one();
        $e->_add_relation_to($qg, 'Question_Group');

        $event_node = new ModelObjNode($e->ID(), $e->get_model());
        $work_done = $event_node->visit(10);
        $this->assertEquals(3, $work_done);
        $tree = $event_node->toArray();

        // We should know the ID of the main object.
        $this->assertEquals($e->ID(), $tree['id']);

        $this->assertEquals(true, $tree['complete']);

        // We should have a node for the datetime relation.
        $this->assertArrayHasKey('Datetime', $tree['rels']);

        // We should NOT have relation nodes for HABTM relations...
        $this->assertArrayNotHasKey('Question_Group', $tree['rels']);

        // ...but we should for their join tables...
        $this->assertArrayHasKey('Event_Question_Group', $tree['rels']);

        // ...even if they're only an implied relation.
        $this->assertArrayHasKey('Event_Venue', $tree['rels']);
    }

    public function testVisitRepeated(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $datetimes_count = 3;
        for($i=0;$i<$datetimes_count;$i++){
            $d = $this->new_model_obj_with_dependencies(
                'Datetime',
                [
                    'EVT_ID'=> $e->ID()
                ]
            );
            $this->new_ticket(
                [
                    'datetime_objects' => [
                        $d->ID()
                    ]
                ]
            );
        }

        $e_node = new ModelObjNode($e->ID(), $e->get_model());
        $work_budget = 2;

        // Ok traverse 2 objects in the tree. That means we'll grab two of the datetimes, but not finish visiting
        // their children.
        $work_done = $e_node->visit($work_budget);
        $this->assertEquals($work_budget, $work_done);
        $partial_tree = $e_node->toArray();
        $this->assertFalse($partial_tree['complete']);
        // It goes through the relations in alphabetical order. Change log is the first at the time of writing.
        // So we should have checked for change logs, found none (did not "work"), and then remove it as a relation.
        $this->assertArrayNotHasKey('Change_Log', $partial_tree['rels']);
        // Assert datetimes done as expected.
        $this->assertArrayHasKey('Datetime', $partial_tree['rels']);
        // Not complete, but did 2 of the 3.
        $this->assertFalse($partial_tree['rels']['Datetime']['complete']);
        $this->assertEquals( $datetimes_count, $partial_tree['rels']['Datetime']['count']);
        $this->assertEquals($work_done, count($partial_tree['rels']['Datetime']['objs']));
        // Their related ticket relations should not have been visited yet
        $a_datetime_node = reset($partial_tree['rels']['Datetime']['objs']);

        $this->assertFalse($a_datetime_node['complete']);

        // Verify serializing and unserializing the object doesn't hurt.
        $e_node_serialized = serialize($e_node);
        $e_node = unserialize($e_node_serialized);

        // Hit it again. Now we should visit the first datetime node.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        // still shouldn't be done. We haven't yet had a chance to see if the datetime's datetime-ticket relation
        // has any related items.
        $this->assertFalse($partial_tree['complete']);
        $this->assertFalse($partial_tree['rels']['Datetime']['complete']);
        // The first datetime should have been visited, and its ticket relation.
        $a_datetime_node = reset($partial_tree['rels']['Datetime']['objs']);
        $that_datetimes_ticket = reset($a_datetime_node['rels']['Datetime_Ticket']['objs']);
        $this->assertTrue($that_datetimes_ticket['complete']);
        $this->assertTrue($a_datetime_node['complete']);
        $another_datetime_node = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($another_datetime_node['complete']);

        // Again, verify serializing doesn't hurt.
        $e_node_serialized = serialize($e_node);
        $e_node = unserialize($e_node_serialized);

        // Hit it a third time. This time the other datetime should be visited and its ticket, but not the 3rd datetime.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        $first_datetime = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($first_datetime['complete']);
        $second_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($second_datetime['complete']);
        $third_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($third_datetime['complete']);

        // Again, verify serializing doesn't hurt.
        $e_node_serialized = serialize($e_node);
        $e_node = unserialize($e_node_serialized);

        // Hit it a fourth time. We'll fetch the last datetime, and then its datetime-ticket relation.
        // But we won't have time to finish checking if it has more related items.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        $first_datetime = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($first_datetime['complete']);
        $second_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($second_datetime['complete']);
        $third_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($third_datetime['complete']);
        $this->assertTrue($partial_tree['complete']);
    }

    public function testGetIds(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $datetimes_count = 3;
        for($i=0;$i<$datetimes_count;$i++){
            $d = $this->new_model_obj_with_dependencies(
                'Datetime',
                [
                    'EVT_ID'=> $e->ID()
                ]
            );
            $this->new_ticket(
                [
                    'datetime_objects' => [
                        $d->ID()
                    ]
                ]
            );
        }

        $e_node = new ModelObjNode($e->ID(), $e->get_model());
        $e_node->visit(999);
        $ids = $e_node->getIds();
        $this->assertArrayHasKey('Event', $ids);
        $this->assertArrayHasKey($e->ID(),$ids['Event']);
        $this->assertEquals(1, count($ids['Event']));
        $this->assertArrayHasKey('Datetime', $ids);
        $this->assertArrayHasKey('Datetime_Ticket', $ids);
        foreach($e->datetimes() as $datetime){
            $this->assertArrayHasKey($datetime->ID(), $ids['Datetime']);
            foreach($datetime->get_many_related('Datetime_Ticket') as $datetime_ticket){
                $this->assertArrayHasKey($datetime_ticket->ID(), $ids['Datetime_Ticket']);
            }
        }
        $this->assertEquals($datetimes_count, count($ids['Datetime']));
        // Check it doesn't have anything weird...
        $this->assertEquals(
            [
                'Event',
                'Datetime',
                'Datetime_Ticket',
            ],
            array_keys($ids)
        );
    }

    /**
     * @since 4.10.12.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testSerializesSmall()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $e_node = new ModelObjNode($e->ID(), $e->get_model());
        // Asserts that the serialized model object node stays small. Less than 125 would be great (half of it is taken
        // up by the classname
//        echo serialize($e_node);
        $this->assertLessThan(153, strlen(serialize($e_node)));

        // Also check that the fully discovered node isn't too big.
        $e_node->visit(100);
//        echo serialize($e_node);
        $this->assertLessThan(159, strlen(serialize($e_node)));
    }

    public function testDontVisitModelsDirectChildren()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $d = $this->new_model_obj_with_dependencies(
            'Datetime',
            [
                'EVT_ID' => $e->ID()
            ]
        );
        $t = $this->new_model_obj_with_dependencies('Ticket');
        $d->_add_relation_to($t, 'Ticket');
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'EVT_ID' => $e->ID(),
                'TKT_ID' => $t->ID()
            ]
        );
        $e_node = new ModelObjNode($e->ID(), $e->get_model(), ['Registration']);
        $e_node->visit(1000);
        $ids_found = $e_node->getIds();
        $this->assertArrayNotHasKey('Registration', $ids_found);
        $this->assertArrayHasKey('Datetime',$ids_found);
        $this->assertArrayHasKey('Datetime_Ticket',$ids_found);
    }

    public function testDontVisitModelsIndirectChildren()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $d = $this->new_model_obj_with_dependencies(
            'Datetime',
            [
                'EVT_ID' => $e->ID()
            ]
        );
        $t = $this->new_model_obj_with_dependencies('Ticket');
        $d->_add_relation_to($t, 'Ticket');
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'EVT_ID' => $e->ID(),
                'TKT_ID' => $t->ID()
            ]
        );
        $e_node = new ModelObjNode($e->ID(), $e->get_model(), ['Datetime_Ticket']);
        $e_node->visit(1000);
        $ids_found = $e_node->getIds();
        $this->assertArrayHasKey('Registration', $ids_found);
        $this->assertArrayHasKey('Datetime',$ids_found);
        $this->assertArrayNotHasKey('Datetime_Ticket',$ids_found);
    }
}
// End of file EntityNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/EntityNodeTest.php
