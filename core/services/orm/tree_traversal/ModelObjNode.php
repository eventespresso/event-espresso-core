<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;
use EE_HABTM_Relation;
use EE_Has_Many_Relation;

/**
 * Class Visitor
 *
 * Stores info about an entity in a model relations tree
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
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
     * @param $work_budget
     * @return int units of work done
     */
    protected function work($work_budget)
    {
        $units_worked = 0;
        foreach($this->relation_nodes as $relation_node){
            $units_worked += $relation_node->visit($work_budget);
            if($units_worked >= $work_budget){
                break;
            }
        }
        if($units_worked < $work_budget){
            $this->complete = true;
        }
        return $units_worked;
    }

    /**
     * @since $VID:$
     * @return array
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    public function toArray()
    {
        $tree = [
            'id' => $this->model_obj->ID(),
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
