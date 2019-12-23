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
    public function setUp()
    {
        require_once(EE_TESTS_DIR . 'mocks/core/services/orm/tree_traversal/ModelObjNodeTreeDTOMock.php');
        parent::setUp();
    }

    protected function getSampleTreeData() {
        return [
            ModelObjNodeTreeDTO::INDEX_PATH => [0,0],
            ModelObjNodeTreeDTO::ROOTS => [
                0 => [
                    ModelObjNodeTreeDTO::MODEL => 'Event',
                    ModelObjNodeTreeDTO::ITEMS => [
                        0 => [
                            ModelObjNodeTreeDTO::ID => 123,
                            ModelObjNodeTreeDTO::RELATIONSHIPS => [
                                    // ... I could put more data in here, for now I won't
                            ]
                        ],
                        1 => [
                            ModelObjNodeTreeDTO::ID => 123,
                            ModelObjNodeTreeDTO::RELATIONSHIPS => [
                                0 => [
                                    // ... I could put more data in here, for now I won't
                                ],
                                1 => [
                                    // ... I could put more data in here, for now I won't
                                ],
                                2  => [
                                    ModelObjNodeTreeDTO::MODEL => 'Datetime',
                                    ModelObjNodeTreeDTO::COUNT => 1,
                                    ModelObjNodeTreeDTO::ITEMS => [
                                        0 => [
                                            ModelObjNodeTreeDTO::ID => 456,
                                            ModelObjNodeTreeDTO::RELATIONSHIPS => [
                                                // ... I could put more data in here, for now I won't
                                            ]
                                        ]
                                    ]
                                ]

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
        // verify its not a copy. It could be crazy big so let's not copy it pleaaase.
        $fetched_data = &$dto->getData();
        $fetched_data2 = &$dto->getData();
        $fetched_data['same_array'] = 'yep';
        $this->assertEquals('yep', $fetched_data2['same_array']);
    }

    public function testGetCurrentItemList()
    {
        $dto = new ModelObjNodeTreeDTOMock();
        $data = $this->getSampleTreeData();
        $dto->loadData($data);
        $dto->setIndexPath(
            [
                0, // The first array index selects which root model to use (Event, as its first)
                1, // The second array index selects which event (2nd)
                2  // The third array index selects which relation (Datetimes)
            ]
        );
        $datetimes_data = $dto->getCurrentItemList();

        $this->assertArrayHasKey(0, $datetimes_data);
        $first_datetime_data = $datetimes_data[0];

        $this->assertArrayHasKey(ModelObjNodeTreeDTO::ID,$first_datetime_data);
        $this->assertEquals(456, $first_datetime_data[ModelObjNodeTreeDTO::ID]);
//
//        $this->assertArrayHasKey(ModelObjNodeTreeDTO::MODEL, $first_datetime_data);
//        $this->assertArrayHasKey(ModelObjNodeTreeDTO::COUNT, $first_datetime_data);
//        $this->assertArrayHasKey(ModelObjNodeTreeDTO::ITEMS, $first_datetime_data);
//        $this->assertEquals('Datetime', $first_datetime_data[ModelObjNodeTreeDTO::MODEL]);

    }

}
// End of file ModelObjNodeTreeDTOTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/ModelObjNodeTreeDTOTest.php
