<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;

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
class EntityNode extends BaseNode
{
    /**
     * @var EE_Base_Class
     */
    protected $initialInstance;

    /**
     * @var RelationNode[]
     */
    protected $relation_nodes;

    public function __construct( $instance)
    {
        $this->initialInstance = $instance;
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
        foreach($this->initialInstance->get_model()->relation_settings() as $relation){
            if($relation->block_delete_if_related_models_exist()){
                $this->relation_nodes[] = new RelationNode($this->initialInstance, $relation);
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
}
// End of file Visitor.php
// Location: EventEspresso\core\services\orm\tree_traversal/Visitor.php
