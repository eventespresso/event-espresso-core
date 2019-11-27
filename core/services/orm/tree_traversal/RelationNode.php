<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;
use EventEspresso\core\libraries\rest_api\controllers\Base;

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
    protected $mainEntity;

    /**
     * @var int
     */
    protected $count;

    /**
     * @var \EE_Model_Relation_Base
     */
    protected $relation;


    protected $itemNodes;

    public function __construct($mainEntity, $relation)
    {
        $this->mainEntity = $mainEntity;
        $this->relation = $relation;
    }


    /**
     * Here is where most of the work happens. We've counted how many related model objects exist, but now we need to
     * trigger visiting each of them, and then visiting their children etc.
     * @since $VID:$
     * @param $work_budget
     * @return int|void
     * @throws \EE_Error
     */
    protected function work($work_budget){
        $work_done = 0;
        foreach($this->itemNodes as $entity_node){
            if($work_done < $work_budget){
                $work_done += $entity_node->visit($work_budget);
            }
        }
        if($work_done < $work_budget){
            $items = $this->relation->get_this_model()->get_all_related(
                $this->mainEntity,
                $this->relation->get_other_model(),
                [
                    'limit' => [
                        count($this->itemNodes),
                        $work_budget
                    ]
                ]
            );
            $work_done += count($items);
            $new_item_nodes = [];

            // Add entity nodes for each of the model objects we fetched.
            foreach($items as $item){
                $entity_node = new EntityNode($item);
                $this->itemNodes[] = $entity_node;
                $new_item_nodes[] = $entity_node;
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
     * @throws \EE_Error
     */
    protected function discover()
    {
        $this->count = $this->relation->get_this_model()->count_related($this->mainEntity, $this->relation->get_other_model());
    }
}
// End of file RelationNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNode.php
