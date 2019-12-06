<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;
use EE_HABTM_Relation;
use EE_Has_Many_Relation;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class Visitor
 *
 * Stores info about an entity in a model relations tree.
 * When traversing the tree of objects, the pseudo code is this:
 *
 * Start off with a model object, and a budget of how many model objects we want to discover
 * For each of its relations:
 *      count the number of related model objects
 *      then fetch some of them from the DB (no more than what's in our budget)
 *      record how many we fetched, and compare it to our budget
 *      if we're at the budget's limit, stop.
 *      otherwise, for each of them:
 *          start again with it being the root model object.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNode extends BaseNode
{
    /**
     * @var EE_Base_Class
     */
    protected $model_obj;

    /**
     * @var RelationNode[]
     */
    protected $relation_nodes;

    public function __construct( $instance)
    {
        $this->model_obj = $instance;
    }

    /**
     * Creates a relation node for each relation of this model's relations.
     * Does NOT call `discover` on them yet though.
     * @since $VID:$
     * @throws \EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    protected function discover(){
        $this->relation_nodes = [];
        foreach($this->model_obj->get_model()->relation_settings() as $relationName => $relation){
            if($relation instanceof EE_Has_Many_Relation){
                $this->relation_nodes[$relationName] = new RelationNode($this->model_obj, $relation->get_other_model());
            } elseif($relation instanceof EE_HABTM_Relation){
                $this->relation_nodes[$relation->get_join_model()->get_this_model_name()] = new RelationNode($this->model_obj, $relation->get_join_model() );
            }
        }
        ksort($this->relation_nodes);
    }


    /**
     * Whether this item has already been initialized
     */
    protected function isDiscovered()
    {
        return $this->relation_nodes !== null && is_array($this->relation_nodes);
    }

    /**
     * @since $VID:$
     * @return boolean
     */
    public function isComplete()
    {
        if($this->complete === null){
            $this->complete = false;
        }
        return $this->complete;
    }

    /**
     * Triggers working on each child relation node that has work to do.
     * @since $VID:$
     * @param $model_objects_to_identify
     * @return int units of work done
     */
    protected function work($model_objects_to_identify)
    {
        $num_identified = 0;
        // Begin assuming we'll finish all the work on this node and its children...
        $this->complete = true;
        foreach($this->relation_nodes as $relation_node){
            $num_identified += $relation_node->visit($model_objects_to_identify);
            if($num_identified >= $model_objects_to_identify){
                // ...but admit we're wrong if the work exceeded the budget.
                $this->complete = false;
                break;
            }
        }
        return $num_identified;
    }

    /**
     * @since $VID:$
     * @return array
     * @throws \EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function toArray()
    {
        $tree = [
            'id' => $this->model_obj->ID(),
            'complete' => $this->isComplete(),
            'rels' => []
        ];
        if($this->relation_nodes === null){
            $tree['rels'] = null;
        } else {
            foreach($this->relation_nodes as $relation_name => $relation_node){
                $tree['rels'][$relation_name] = $relation_node->toArray();
            }
        }
        return $tree;
    }
}
// End of file Visitor.php
// Location: EventEspresso\core\services\orm\tree_traversal/Visitor.php
