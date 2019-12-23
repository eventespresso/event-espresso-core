<?php

namespace EventEspresso\core\services\orm\tree_traversal;

/**
 * Class ModelObjNodeTreeDTOMock
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNodeTreeDTOMock extends ModelObjNodeTreeDTO
{

    /**
     * @since $VID:$
     * @param array $new_index_path
     */
    public function setIndexPath($new_index_path){
        $this->data[ModelObjNodeTreeDTO::INDEX_PATH] = $new_index_path;
    }

    /**
     * @since $VID:$
     * @return array
     */
    public function getIndexPath()
    {
        return parent::getIndexPath();
    }

}
// End of file ModelObjNodeTreeDTOMock.php
// Location: EventEspresso\core\services\cache/ModelObjNodeTreeDTOMock.php
