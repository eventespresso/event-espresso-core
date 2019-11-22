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

    public function discover(){
        foreach($this->initialInstance->get_model()->relation_settings() as $relation){
            if($relation->block_delete_if_related_models_exist()){
                $this->relation_nodes[] = new RelationNode($this->initialInstance, $relation);
            }
        }
    }


    /**
     * Whether this item has already been initialized
     */
    public function isDiscovered()
    {
        // TODO: Implement isDiscovered() method.
    }

    /**
     * @since $VID:$
     * @return boolean
     */
    public function isComplete()
    {
        if($this->complete == null){
            $this->complete = true;
            foreach($this->relation_nodes as $relation_node){
                if(! $relation_node->isComplete()){
                    $this->complete = false;
                    break;
                }
            }
        }
        return $this->complete;
    }

    /**
     *
     * @since $VID:$
     * @param $work_to_do
     * @return int units of work done
     */
    protected function work($work_to_do)
    {
        $units_worked = 0;
        foreach($this->relation_nodes as $relation_node){
            if(! $relation_node->isComplete()){
                $units_worked += $relation_node->visit($work_to_do);
            }
            if($units_worked >= $work_to_do){
                break;
            }
        }
        return $units_worked;
    }
}
// End of file Visitor.php
// Location: EventEspresso\core\services\orm\tree_traversal/Visitor.php
