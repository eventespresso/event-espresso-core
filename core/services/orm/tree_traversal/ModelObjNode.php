<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_HABTM_Relation;
use EE_Has_Many_Relation;
use EE_Registry;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class ModelObjNode
 * Wraps a model object and stores which of its model's relations have already been traversed and which haven't.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNode extends BaseNode
{
    /**
     * @var int|string
     */
    protected $id;

    /**
     * @var EEM_Base
     */
    protected $model;

    /**
     * @var RelationNode[]
     */
    protected $nodes;

    /**
     * We don't pass the model objects because this needs to serialize to something tiny for effiency.
     * @param $model_obj_id
     * @param EEM_Base $model
     */
    public function __construct($model_obj_id, EEM_Base $model, $dont_traverse_models = array())
    {
        $this->id = $model_obj_id;
        $this->model = $model;
        $this->dont_traverse_models = $dont_traverse_models;
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
    protected function discover()
    {
        $this->nodes = [];
        foreach ($this->model->relation_settings() as $relationName => $relation) {
            // Make sure this isn't one of the models we were told to not traverse into.
            if(in_array($relationName,$this->dont_traverse_models)){
                continue;
            }
            if ($relation instanceof EE_Has_Many_Relation) {
                $this->nodes[ $relationName ] = new RelationNode(
                    $this->id,
                    $this->model,
                    $relation->get_other_model(),
                    $this->dont_traverse_models
                );
            } elseif ($relation instanceof EE_HABTM_Relation &&
                ! in_array(
                    $relation->get_join_model()->get_this_model_name(),
                    $this->dont_traverse_models
                )) {
                $this->nodes[ $relation->get_join_model()->get_this_model_name() ] = new RelationNode(
                    $this->id,
                    $this->model,
                    $relation->get_join_model(),
                    $this->dont_traverse_models
                );
            }
        }
        ksort($this->nodes);
    }


    /**
     * Whether this item has already been initialized
     */
    protected function isDiscovered()
    {
        return $this->nodes !== null && is_array($this->nodes);
    }

    /**
     * @since $VID:$
     * @return boolean
     */
    public function isComplete()
    {
        if ($this->complete === null) {
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
        foreach ($this->nodes as $model_name => $relation_node) {
            $num_identified += $relation_node->visit($model_objects_to_identify - $num_identified);
            // To save on space when serializing, only bother keeping a record of relation nodes that actually found
            // related model objects.
            if ($relation_node->isComplete() && $relation_node->countSubNodes() === 0) {
                unset($this->nodes[ $model_name ]);
            }
            if ($num_identified >= $model_objects_to_identify) {
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
            'id' => $this->id,
            'complete' => $this->isComplete(),
            'rels' => []
        ];
        if ($this->nodes === null) {
            $tree['rels'] = null;
        } else {
            foreach ($this->nodes as $relation_name => $relation_node) {
                $tree['rels'][ $relation_name ] = $relation_node->toArray();
            }
        }
        return $tree;
    }

    /**
     * @since $VID:$
     * @return array|mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws \EE_Error
     */
    public function getIds()
    {
        $ids = [
            $this->model->get_this_model_name() => [
                $this->id => $this->id
            ]
        ];
        if ($this->nodes && is_array($this->nodes)) {
            foreach ($this->nodes as $relation_node) {
                $ids = array_replace_recursive($ids, $relation_node->getIds());
            }
        }
        return $ids;
    }

    /**
     * Don't serialize the models. Just record their names on some dynamic properties.
     * @since $VID:$
     */
    public function __sleep()
    {
        $this->m = $this->model->get_this_model_name();
        return array_merge(
            [
                'm',
                'id',
                'nodes',
            ],
            parent::__sleep()
        );
    }

    /**
     * Use the dynamic properties to instantiate the models we use.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function __wakeup()
    {
        $this->model = EE_Registry::instance()->load_model($this->m);
        parent::__wakeup();
    }
}
// End of file Visitor.php
// Location: EventEspresso\core\services\orm\tree_traversal/Visitor.php
