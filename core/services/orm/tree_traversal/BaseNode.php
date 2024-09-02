<?php

namespace EventEspresso\core\services\orm\tree_traversal;

/**
 * Class BaseNode
 *
 * Represents a task to be done when traversing a model object tree to identify all the dependent model objects.
 * See the concrete classes for details, but the basic structure is you have a starter ModelObjNode that wraps the
 * model object whose dependent related objects you want to identify, it has a list of RelationNodes (one for each of
 * its model's relations); each of those builds a list of ModelObjNodes for each of the related model objects,
 * recursively.
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
 * @since         4.10.12.p
 *
 */
abstract class BaseNode
{
    protected ?bool $complete = null;

    /**
     * @var array of model names we don't want to traverse
     */
    protected array $dont_traverse_models = [];


    public ?bool $sleep_complete = null;
    public ?array $sleep_dtm = null;


    /**
     * Whether this item has already been initialized
     */
    abstract protected function isDiscovered();

    /**
     * Determines if the work is done yet or not. Requires you to have first discovered what work exists by calling
     * discover().
     * @since 4.10.12.p
     * @return boolean
     */
    abstract public function isComplete();

    /**
     * Discovers what work needs to be done to complete traversing this node and its children.
     * Note that this is separate from the constructor, so we can create child nodes without
     * discovering them immediately.
     * @since 4.10.12.p
     * @return mixed
     */
    abstract protected function discover();

    /**
     * Identifies model objects, up to the limit $model_objects_to_identify.
     * @since 4.10.12.p
     * @param int $model_objects_to_identify
     * @return int units of work done
     */
    abstract protected function work($model_objects_to_identify);

    /**
     * Shows the entity/relation node as an array.
     * @since 4.10.12.p
     * @return array
     */
    abstract public function toArray();

    /**
     * Discovers how much work there is to do, double-checks the work isn't already finished, and then does the work.
     * Note: do not call when site is in maintenance mode level 2.
     *
     * @since 4.10.12.p
     * @param $model_objects_to_identify
     * @return int number of model objects we want to identify during this call. On subsequent calls we'll continue
     * where we left off.
     */
    public function visit($model_objects_to_identify)
    {
        if (! $this->isDiscovered()) {
            $this->discover();
        }
        if ($this->isComplete()) {
            return 0;
        }
        return $this->work($model_objects_to_identify);
    }

    /**
     * Gets the IDs of completely identified model objects that can be deleted.
     * @since 4.10.12.p
     * @return mixed
     */
    abstract public function getIds();

    /**
     * Make sure we encode whether its complete or not, but don't use such a long name.
     * @since 4.10.12.p
     * @return array
     */
    public function __sleep()
    {
        $this->sleep_complete = $this->complete;
        $this->sleep_dtm = $this->dont_traverse_models;
        return [
            'sleep_complete',
            'sleep_dtm'
        ];
    }

    /**
     * Use the dynamic property to set the "complete" property.
     * @since 4.10.12.p
     */
    public function __wakeup()
    {
        $this->complete = $this->sleep_complete;
        $this->dont_traverse_models = $this->sleep_dtm;
    }
}
// End of file BaseNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/BaseNode.php
