<?php
namespace EventEspresso\tests\testcases\core\services\collections\iterators;

use EE_UnitTestCase;
use EventEspresso\core\services\collections\iterators\CollectionFilterCallbackIterator;
use EventEspresso\core\services\collections\LooseCollection;
use EventEspresso\tests\mocks\misc_mocks\BasicIntVoMock;

/**
 * CollectionFilterCallbackIteratorTest
 *
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
class CollectionFilterCallbackIteratorTest extends EE_UnitTestCase
{

    /**
     * Used for testing with.
     * @var LooseCollection
     */
    private $loose_collection;


    public function set_up()
    {
        $this->loose_collection = new LooseCollection('');
        parent::set_up();
    }



    public function tear_down()
    {
        parent::tear_down();
        $this->loose_collection = null;
    }


    public function testGetFiltered(){
        $ints = array(1,2,6,10,5,4,7,9,3,8);
        foreach ($ints as $int) {
            $this->loose_collection->add(new BasicIntVoMock($int));
        }
        $filter_only_even_values = new CollectionFilterCallbackIterator(
            $this->loose_collection,
            function (BasicIntVoMock $int_vo) {
                return $int_vo->intValue() % 2 === 0;
            }
        );
        $this->assertCount(5, $filter_only_even_values->getFiltered());
        //filter a specific number
        $filter_num_six = new CollectionFilterCallbackIterator(
            $this->loose_collection,
            function (BasicIntVoMock $int_vo) {
                return $int_vo->intValue() === 6;
            }
        );
        $filtered = $filter_num_six->getFiltered();
        $this->assertEquals(6, reset($filtered)->intValue());
    }
}