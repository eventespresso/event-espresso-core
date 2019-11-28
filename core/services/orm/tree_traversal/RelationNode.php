<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;
use EE_Error;
use EE_Model_Relation_Base;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RelationNode
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class RelationNode extends BaseNode
{
    /**
     * @var EE_Base_Class
     */
    protected $main_model_obj;

    /**
     * @var int
     */
    protected $count;

    /**
     * @var EEM_Base
     */
    protected $related_model;


    protected $model_obj_nodes;

    public function __construct($main_model_obj, $related_model)
    {
        $this->main_model_obj = $main_model_obj;
        $this->related_model = $related_model;
    }


    /**
     * Here is where most of the work happens. We've counted how many related model objects exist, but now we need to
     * trigger visiting each of them, and then visiting their children etc.
     * @since $VID:$
     * @param $work_budget
     * @return int|void
     * @throws EE_Error
     */
    protected function work($work_budget){
        $work_done = 0;
        if(is_array($this->model_obj_nodes)) {
            foreach ($this->model_obj_nodes as $entity_node) {
                if ($work_done < $work_budget) {
                    $work_done += $entity_node->visit($work_budget);
                }
            }
        } else {
            $this->model_obj_nodes = [];
        }
        if($work_done < $work_budget){
            $related_model_objs = $this->related_model->get_all(
                [
                    $this->whereQueryParams(),
                    'limit' => [
                        count($this->model_obj_nodes),
                        $work_budget
                    ]
                ]
            );
            $work_done += count($related_model_objs);
            $new_item_nodes = [];

            // Add entity nodes for each of the model objects we fetched.
            foreach($related_model_objs as $related_model_obj){
                $entity_node = new ModelObjNode($related_model_obj);
                $this->model_obj_nodes[$related_model_obj->ID()] = $entity_node;
                $new_item_nodes[$related_model_obj->ID()] = $entity_node;
            }

            // And lastly do the work.
            foreach($new_item_nodes as $new_item_node){
                if($work_done >= $work_budget){
                    break;
                }
                $work_done += $new_item_node->visit($work_budget - $work_done);
            }
        }
        // We're all done this node if we've done everything here and still have budget for more.
        if($work_done < $work_budget){
            $this->complete = true;
        }
        return $work_done;
    }

    /**
     * Whether this item has already been initialized
     */
    protected function isDiscovered()
    {
        return $this->count !== null;
    }

    /**
     * @since $VID:$
     * @return boolean
     */
    public function isComplete()
    {
        return $this->complete;
    }

    /**
     * Discovers how many related model objects exist.
     * @since $VID:$
     * @return mixed|void
     * @throws EE_Error
     */
    protected function discover()
    {
        $this->count = $this->related_model->count([$this->whereQueryParams()]);
    }

    /**
     * @since $VID:$
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    protected function whereQueryParams(){
        return [
            $this->related_model->get_foreign_key_to($this->main_model_obj->get_model()->get_this_model_name())->get_name() => $this->main_model_obj->ID()
        ];
    }
    /**
     * @since $VID:$
     * @return array
     */
    public function toArray(){
        $tree = [
            'count' => $this->count,
            'objs' => []
        ];
        foreach($this->model_obj_nodes as $id => $model_obj_node){
            $tree['objs'][$id] = $model_obj_node->toArray();
        }
        return $tree;
    }
}
// End of file RelationNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNode.php
