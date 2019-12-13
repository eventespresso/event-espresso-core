<?php

namespace EventEspresso\core\services\orm\tree_traversal;

/**
 * Class ModelObjNodeTreeDTOTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNodeTreeDTOTest extends \EE_UnitTestCase
{
    protected function getSampleTreeData() {
        return [
            ModelObjNodeTreeDTO::INDEX_PATH => [0,0],
            ModelObjNodeTreeDTO::ROOTS => [
                [
                    ModelObjNodeTreeDTO::MODEL => 'Event',
                    ModelObjNodeTreeDTO::ITEMS => [
                        [
                            ModelObjNodeTreeDTO::ID => 123,
                            ModelObjNodeTreeDTO::RELATIONSHIPS => [
                                // ... I could put more data in here, for now I won't
                            ]
                        ],
                    ]
                ],
            ]
        ];
    }
    public function testLoadAndGetData(){
        $dto = new ModelObjNodeTreeDTO();
        $data = $this->getSampleTreeData();
        $dto->loadData($data);
        $this->assertTrue(
            $data === $dto->getData()
        );
    }

}
// End of file ModelObjNodeTreeDTOTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/ModelObjNodeTreeDTOTest.php
