<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Error;
use EE_Has_Many_Any_Relation;
use EE_Registry;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RelationNode
 *
 * Wraps a model object and one of its model's relations; stores how many related model objects exist across that
 * relation, and eventually creates a ModelObjNode for each of its related model objects.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.10.12.p
 *
 */
class RelationNode extends BaseNode
{
    /**
     * @var int
     */
    protected $count;

    /**
     * @var string|int
     */
    protected $id;

    /**
     * @var EEM_Base
     */
    protected $main_model;

    /**
     * @var ModelObjNode[]
     */
    protected $nodes;

    /**
     * @var EEM_Base
     */
    protected $related_model;



    /**
     * RelationNode constructor.
     *
     * @param          $main_model_obj_id
     * @param EEM_Base $main_model
     * @param EEM_Base $related_model
     * @param array    $dont_traverse_models array of model names we DON'T want to traverse
     */
    public function __construct(
        $main_model_obj_id,
        EEM_Base $main_model,
        EEM_Base $related_model,
        array $dont_traverse_models = []
    ) {
        $this->id                   = $main_model_obj_id;
        $this->main_model           = $main_model;
        $this->related_model        = $related_model;
        $this->nodes                = [];
        $this->dont_traverse_models = $dont_traverse_models;
    }


    /**
     * Here is where most of the work happens. We've counted how many related model objects exist, here we identify
     * them (ie, learn their IDs). But its recursive, so we'll also find their related dependent model objects etc.
     *
     * @param int $model_objects_to_identify
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function work($model_objects_to_identify)
    {
        $num_identified = $this->visitAlreadyDiscoveredNodes($this->nodes, $model_objects_to_identify);
        if ($num_identified < $model_objects_to_identify) {
            $related_model_objs = $this->related_model->get_all(
                [
                    $this->whereQueryParams(),
                    'limit' => [
                        count($this->nodes),
                        $model_objects_to_identify - $num_identified,
                    ],
                ]
            );
            $new_item_nodes     = [];

            // Add entity nodes for each of the model objects we fetched.
            foreach ($related_model_objs as $related_model_obj) {
                $entity_node                                = new ModelObjNode(
                    $related_model_obj->ID(),
                    $related_model_obj->get_model(),
                    $this->dont_traverse_models
                );
                $this->nodes[ $related_model_obj->ID() ]    = $entity_node;
                $new_item_nodes[ $related_model_obj->ID() ] = $entity_node;
            }
            $num_identified += count($new_item_nodes);
            if ($num_identified < $model_objects_to_identify) {
                // And lastly do the work.
                $num_identified += $this->visitAlreadyDiscoveredNodes(
                    $new_item_nodes,
                    $model_objects_to_identify - $num_identified
                );
            }
        }

        if (count($this->nodes) >= $this->count && $this->allChildrenComplete()) {
            $this->complete = true;
        }
        return $num_identified;
    }


    /**
     * Checks if all the identified child nodes are complete or not.
     *
     * @return bool
     */
    protected function allChildrenComplete()
    {
        foreach ($this->nodes as $model_obj_node) {
            if (! $model_obj_node->isComplete()) {
                return false;
            }
        }
        return true;
    }


    /**
     * Visits the provided nodes and keeps track of how much work was done, making sure to not go over budget.
     *
     * @param ModelObjNode[] $model_obj_nodes
     * @param                $work_budget
     * @return int
     */
    protected function visitAlreadyDiscoveredNodes($model_obj_nodes, $work_budget)
    {
        $work_done = 0;
        if (! $model_obj_nodes) {
            return 0;
        }
        foreach ($model_obj_nodes as $model_obj_node) {
            if ($work_done >= $work_budget) {
                break;
            }
            $work_done += $model_obj_node->visit($work_budget - $work_done);
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
     * @return boolean
     */
    public function isComplete()
    {
        if ($this->complete === null) {
            if (count($this->nodes) === $this->count) {
                $this->complete = true;
            } else {
                $this->complete = false;
            }
        }
        return $this->complete;
    }


    /**
     * Discovers how many related model objects exist.
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function discover()
    {
        $this->count = $this->related_model->count([$this->whereQueryParams()]);
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    protected function whereQueryParams()
    {
        $where_params = [
            $this->related_model->get_foreign_key_to(
                $this->main_model->get_this_model_name()
            )->get_name() => $this->id,
        ];
        try {
            $relation_settings = $this->main_model->related_settings_for($this->related_model->get_this_model_name());
        } catch (EE_Error $e) {
            // This will happen for has-and-belongs-to-many relations, when this node's related model is that join table
            // which hasn't been explicitly declared in the main model object's model's relations.
            $relation_settings = null;
        }
        if ($relation_settings instanceof EE_Has_Many_Any_Relation) {
            $where_params[ $this->related_model->get_field_containing_related_model_name()->get_name() ] =
                $this->main_model->get_this_model_name();
        }
        return $where_params;
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function toArray()
    {
        $tree = [
            'count'    => $this->count,
            'complete' => $this->isComplete(),
            'objs'     => [],
        ];
        foreach ($this->nodes as $id => $model_obj_node) {
            $tree['objs'][ $id ] = $model_obj_node->toArray();
        }
        return $tree;
    }


    /**
     * Gets the IDs of all the model objects to delete; indexed first by model object name.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getIds()
    {
        if (empty($this->nodes)) {
            return [];
        }
        $ids = [
            $this->related_model->get_this_model_name() => array_combine(
                array_keys($this->nodes),
                array_keys($this->nodes)
            ),
        ];
        foreach ($this->nodes as $model_obj_node) {
            $ids = array_replace_recursive($ids, $model_obj_node->getIds());
        }
        return $ids;
    }


    /**
     * Returns the number of sub-nodes found (ie, related model objects across this relation.)
     *
     * @return int
     */
    public function countSubNodes()
    {
        return count($this->nodes);
    }


    /**
     * Don't serialize the models. Just record their names on some dynamic properties.
     *
     * @return array
     */
    public function __sleep()
    {
        $this->m  = $this->main_model->get_this_model_name();
        $this->rm = $this->related_model->get_this_model_name();
        return array_merge(
            [
                'm',
                'rm',
                'id',
                'count',
                'nodes',
            ],
            parent::__sleep()
        );
    }


    /**
     * Use the dynamic properties to instantiate the models we use.
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function __wakeup()
    {
        $this->main_model    = EE_Registry::instance()->load_model($this->m);
        $this->related_model = EE_Registry::instance()->load_model($this->rm);
        parent::__wakeup();
    }
}
// End of file RelationNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNode.php
