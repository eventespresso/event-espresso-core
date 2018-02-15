<?php
namespace EventEspresso\tests\testcases\core\domain\values\model;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\model\CustomSelects;
use InvalidArgumentException;
use PHPUnit\Framework\Exception;

/**
 * CustomSelectsTests
 *
 *
 * @package EventEspresso\tests\testcases\core\domain\values\model
 * @author  Darren Ethier
 * @since   4.9.57.p
 * @group customselects
 */
class CustomSelectsTests extends EE_UnitTestCase
{

    /**
     * @return array
     */
    public function typesSelectProvider()
    {
        return array(
            array(
                CustomSelects::TYPE_SIMPLE,
                array('ATT_ID', 'REG_ID', 'TXN_ID'),
                'ATT_ID, REG_ID, TXN_ID',
                array('ATT_ID', 'REG_ID', 'TXN_ID'),
                array('ATT_ID' => '%s', 'REG_ID' => '%s', 'TXN_ID' => '%s')
            ),
            array(
                CustomSelects::TYPE_COMPLEX,
                array(
                    'attendee_id' => array('ATT_ID', '%s'),
                    'registration_count' => array('count(REG_ID)', '%d'),
                    'transaction_total' => array('sum(TXN_total)', '%f')
                ),
                'ATT_ID AS attendee_id, count(REG_ID) AS registration_count, sum(TXN_total) AS transaction_total',
                array('attendee_id', 'registration_count', 'transaction_total'),
                array('attendee_id' => '%s', 'registration_count' => '%d', 'transaction_total' => '%f')
            ),
            array(
                CustomSelects::TYPE_STRUCTURED,
                array(
                    'attendee_id' => array('ATT_ID', '', '%s'),
                    'registration_count' => array('REG_ID', 'count', '%d'),
                    'transaction_total' => array('TXN_total', 'sum', '%f')
                ),
                'ATT_ID AS attendee_id, COUNT(REG_ID) AS registration_count, SUM(TXN_total) AS transaction_total',
                array('attendee_id', 'registration_count', 'transaction_total'),
                array('attendee_id' => '%s', 'registration_count' => '%d', 'transaction_total' => '%f')
            )
        );
    }


    /**
     * @return array
     */
    public function typeSelectFailsProvider()
    {
        return array(
            array(
                array('ATT_ID', 'REG_ID' => 2)
            ),
            array(
                array('attendee_id' => 'something')
            ),
            array(
                array('attendee_id' => array('count(REG_ID)', '%d', 'count'))
            )
        );
    }


    /**
     * @dataProvider typesSelectProvider
     * @param string $type
     * @param array  $incoming_select_array
     * @param string $expected__columns_to_select
     * @param array  $expected_column_aliases
     * @param array  $expected_data_types_for_aliases
     * @throws InvalidArgumentException
     */
    public function testTypes(
        $type,
        array $incoming_select_array,
        $expected__columns_to_select,
        array $expected_column_aliases,
        array $expected_data_types_for_aliases
    ) {
        $select = new CustomSelects($incoming_select_array);
        $this->assertEquals($incoming_select_array, $select->originalSelects());
        $this->assertEquals(
            $expected__columns_to_select,
            $select->columnsToSelectExpression()
        );
        $this->assertEquals(
            $expected_column_aliases,
            $select->columnAliases()
        );
        $this->assertEquals(
            $type,
            $select->type()
        );
        //data types
        foreach ($expected_data_types_for_aliases as $alias => $data_type) {
            $this->assertEquals($data_type, $select->getDataTypeForAlias($alias));
        }
        $this->assertEquals(
            '%s',
            $select->getDataTypeForAlias('ATT_ID')
        );
    }


    /**
     * @dataProvider typeSelectFailsProvider
     * @param array $incoming_select_array
     * @throws InvalidArgumentException
     * @throws Exception
     */
    public function testTypeFails(array $incoming_select_array)
    {
        $this->setExceptionExpected('InvalidArgumentException');
        $select = new CustomSelects($incoming_select_array);
    }
}
