<?php

namespace EventEspresso\core\services\orm\tree_traversal;

/**
 * Class BaseNode
 *
 * Represents a task to be done when traversing a model object tree to identify all the dependent model objects.
 * See the concrete classes for details, but the basic structure is you have a starter ModelObjNode that wraps the
 * model object whose dependent related objects you want to identify, it has a list of RelationNodes (one for each of
 * its model's relations); each of those builds a list of ModelObjNodes for each of the related model objects, recursively.
 * Client code creates a ModelObjNode, provides  it with a model object, and repeatedly `visit()` on it until all of its
 * related model objects are identified.
 *
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
abstract class BaseNode
{
    /**
     * @var boolean
     */
    protected $complete;
    /**
     * Whether this item has already been initialized
     */
    abstract protected function isDiscovered();

    /**
     * Determines if the work is done yet or not. Requires you to have first discovered what work exists by calling
     * discover().
     * @since $VID:$
     * @return boolean
     */
    abstract public function isComplete();

    /**
     * Discovers what work needs to be done to complete traversing this node and its children.
     * Note that this is separate from the constructor, so we can create child nodes without
     * discovering them immediately.
     * @since $VID:$
     * @return mixed
     */
    abstract protected function discover();

    /**
     * @since $VID:$
     * @param $work_to_do
     * @return int units of work done
     */
    public function visit($work_to_do)
    {
        if (! $this->isDiscovered()) {
            $this->discover();
        }
        if ($this->isComplete()) {
            return 0;
        }
        return $this->work($work_to_do);
    }

    /**
     *
     * @since $VID:$
     * @param $model_objects_to_identify
     * @return int units of work done
     */
    abstract protected function work($model_objects_to_identify);

    /**
     * Shows the entity/relation node as an array.
     * @since $VID:$
     * @return array
     */
    abstract public function toArray();
}
// End of file BaseNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/BaseNode.php
