<?php

use EventEspresso\tests\mocks\core\libraries\batch\JobHandlers\DatetimeOffsetFixMock;


/**
 * DatetimeOffsetFixTest
 *
 * @package EventEspresso/tests
 * @author  Darren Ethier
 * @since   4.9.46.rc.012
 * @group datetime
 */
class DatetimeOffsetFixTest extends EE_UnitTestCase
{

    /**
     * @var DatetimeOffsetFixMock;
     */
    protected $datetime_offset_fix_mock;


    public function set_up()
    {
        parent::set_up();
        $this->datetime_offset_fix_mock = new DatetimeOffsetFixMock();
    }

    /**
     * @group offset_fix_test
     * @throws EE_Error
     */
    public function testProcessModel()
    {
        $original_date_and_time = new DateTime('now');
        $expected_positive_offset_datetime = clone $original_date_and_time;
        $test_offsets = array(
            '2' => $expected_positive_offset_datetime->add(new DateInterval('PT2H')),
            //note we have the expectation set here back to the original date and time because offset test _should_ just
            //restore the original time.
            '-2' => $original_date_and_time
        );
        /** @var EE_Datetime $datetime */
        $datetime = $this->factory->datetime->create(
            array(
                'DTT_EVT_start' => $original_date_and_time->format('U'),
                'DTT_EVT_end' => $original_date_and_time->format('U')
            )
        );
        //k run our tests
        foreach ($test_offsets as $offset_to_test => $expected_datetime_object) {
            DatetimeOffsetFixMock::updateOffset((float) $offset_to_test);
            $this->datetime_offset_fix_mock->processModel('EEM_Datetime');
            //need to clear any entities cached in the model
            EEM_Datetime::instance()->clear_entity_map();
            $actual_datetime = EEM_Datetime::instance()->get_one_by_ID($datetime->ID());
            $this->assertEquals(
                $expected_datetime_object->format('U'),
                $actual_datetime->get_DateTime_object('DTT_EVT_start')->format('U'),
                sprintf('Offset being tested is %s', $offset_to_test)
            );
        }
    }
}
