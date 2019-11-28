<?php

namespace EventEspresso\core\services\orm\tree_traversal;

/**
 * Class BaseNode
 *
 * Description
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
    protected abstract function isDiscovered();

    /**
     * Determines if the work is done yet or not. Requires you to have first discovered what work exists by calling
     * discover().
     * @since $VID:$
     * @return boolean
     */
    public abstract function isComplete();

    /**
     * Discovers what work needs to be done to complete traversing this node and its children.
     * Note that this is separate from the constructor, so we can create child nodes without
     * discovering them immediately.
     * @since $VID:$
     * @return mixed
     */
    protected abstract function discover();

    /**
     * @since $VID:$
     * @param $work_to_do
     * @return int units of work done
     */
    public function visit($work_to_do){
        if(! $this->isDiscovered()){
            $this->discover();
        }
        if($this->isComplete()){
           return 0;
        }
        return $this->work($work_to_do);
    }

    /**
     *
     * @since $VID:$
     * @param $work_budget
     * @return int units of work done
     */
    protected abstract function work($work_budget);

    /**
     * Shows the entity/relation node as an array.
     * @since $VID:$
     * @return array
     */
    public abstract function toArray();

}
// End of file BaseNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/BaseNode.php
