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



    protected function work($work_to_do){
        $items = $this->relation->get_this_model()->get_all_related(
            $this->mainEntity,
            $this->relation->get_other_model(),
            [
                'limit' => $work_to_do
            ]
        );
        foreach($items as $item){
            $this->itemNodes[] = new EntityNode($item);
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
        // TODO: Implement isComplete() method.
    }

    public function discover()
    {
        $this->count = $this->relation->get_this_model()->count_related($this->mainEntity, $this->relation->get_other_model());
    }
}
// End of file RelationNode.php
// Location: EventEspresso\core\services\orm\tree_traversal/RelationNode.php
