<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Base_Class;
use Exception;

/**
 * Class ModelObjNodeTreeDTO
 *
 * Class for storing the discovered tree of model object dependencies. It is stored in a format that can be easily and
 * efficiently serialized for persistence, and unserialized with minimal memory usage, and so we can pickup where
 * we left off.
 * A tree of objects would be more convenient (my original implementation used that) but we'd need to either unserialize
 * to a PHP array and then ALSO build that data structure (which would be trouble when there could be thousands of
 * entries); or we'd need to write our own parser (which was fun excercise in school, but no thank you.)
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNodeTreeDTO
{
    const INDEX_PATH = 'ip';
    const ROOTS = 'rts';
    const MODEL = 'm';
    const ITEMS = 'i';
    const ID = 'id';
    const RELATIONSHIPS = 'r';
    const COUNT = 'c';
    /**
     * @var array with a special structure. Like the following:
     * {
     *  "index_path": [0,3,1,2],
     *  "roots": [
     *      {
     *          "model": "Event",
     *          "items": [
     *              {
     *                  "id": 123,
     *                  "rels": [
     *                      {
     *                          "model": "Datetime"
     *                          "count": 3
     *                          "items": [
     *                              {
     *                                  "id": 456,
     *                                  "rels": [
     *                                      {
     *                                          "model": "Datetime_Ticket",
     *                                          "count": 1,
     *                                          "items": [
     *                                              {
     *                                                  "id": 789,
     *                                                  "rels": [
     *                                                      {
     *                                                          "model": "Extra_Meta",
     *                                                          "count": 0,
     *                                                          "items":[],
     *                                                      }
     *                                                      // ... other models that have foreign keys to Datetime_Ticket
     *                                                  ]
     *                                              }.
     *                                          ]
     *                                      },
     *                                      // ... other models that have foreign keys to Datetime
     *                                  ]
     *                              },
     *                              // ... 2 more datetimes (unless we haven't fetched them from the DB yet. The count
     *                              // is useful here to know if we need to fetch more or not
     *                          ]
     *                      },
     *                      //  ...other models that have foreign keys to events, including implicit join models
     *                  ]
     *              },
     *              // ...other root events that we want to traverse
     *          ],
     *          /// ...other models with root nodes
     *      }
     */
    protected $data;

    /**
     * @since $VID:$
     * @param EE_Base_Class[] $model_objs
     */
    public function initializeRootNodes($model_objs){
        $this->data = [
            self::INDEX_PATH => [0,0],
            self::ROOTS => []
        ];
        foreach($model_objs as $model_obj) {
            if (!$model_obj instanceof EE_Base_Class) {
                throw new \InvalidArgumentException(esc_html__('You must initialize a ModelObjNodeTreeDTO with an array of EE_Base_Class.', 'event_espresso'));
            }
            if (!isset($this->data[ self::ROOTS ])){
                $this->data[ self::ROOTS ][ $model_obj->get_model()->get_this_model_name() ] = [];
            }
            $this->data[self::ROOTS][$model_obj->get_model()->get_this_model_name()][] = [
                self::ID => $model_obj->ID(),
                self::RELATIONSHIPS => []
            ];
        }
    }

    /**
     * @since $VID:$
     * @param array $data
     */
    public function loadData(&$data)
    {
        $this->data = $data;
    }

    /**
     * Returns a reference to the data (so it's not duplicated, because it could be really big).
     * @since $VID:$
     * @return array
     */
    public function &getData()
    {
        return $this->data;
    }

    /**
     * @since $VID:$
     * @param EE_Base_Class $model_obj
     */
    public function addDiscoveredItem($model_obj){

    }

    /**
     * Returns a list of indexes to follow.
     * @since $VID:$
     * @return array
     */
    protected function getIndexPath()
    {
        return $this->data[self::INDEX_PATH];
    }

    /**
     * @since $VID:$
     */
    public function getCurrentItemList()
    {
        $traverser = &$this->data[ self::ROOTS ];
        foreach ($this->getIndexPath() as $index) {
            if (isset($traverser[ $index ])) {
                if (isset($traverser[ $index ][ self::ID ])) {
                    $traverser = &$traverser[ $index ][ self::RELATIONSHIPS ];
                } else {
                    $traverser = &$traverser[ $index ][ self::ITEMS ];
                }

            } else {
                throw new Exception(esc_html__('Index out of sync', 'event_espresso'));
            }
        }
        return $traverser;
    }
}
// End of file ModelObjNodeTreeDTO.php
// Location: EventEspresso\core\services\orm\tree_traversal/ModelObjNodeTreeDTO.php
