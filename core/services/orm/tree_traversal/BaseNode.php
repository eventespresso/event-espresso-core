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
    public abstract function isDiscovered();

    /**
     * @since $VID:$
     * @return boolean
     */
    public abstract function isComplete();

    public abstract function discover();

    /**
     * @since $VID:$
     * @param $work_to_do
     * @return int units of work done
     */
    public function visit($work_to_do){
        if($this->isComplete()){
           return;
        }
        if(! $this->isDiscovered()){
            $this->discover();
        }
        return $this->work($work_to_do);
    }

    /**
     *
     * @since $VID:$
     * @param $work_to_do
     * @return int units of work done
     */
    protected abstract function work($work_to_do);
}
// End of file BaseNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/BaseNode.php
