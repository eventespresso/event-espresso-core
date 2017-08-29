<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * This scenario creates an event that has:
 * - Two Datetimes
 *      - D1 - reg limit 10 (TA, TC)    << can sell 10 max (either 10 TA or 10 TC)
 *      - D2 - reg limit 12 (TB, TC)    << can sell 2 max ( 10 TA/TC sold above + 2 TB )
 * - Three Tickets
 *      - TA - qty 10 (D1)
 *      - TB - qty 12 (D2)
 *      - TC - qty 10 (D1, D2)
 *  MAX SELLOUT:
 *        D1 :  10 TA tickets ( D1 sold out + TA & TC sold out )
 *        D2 :  12 TB tickets ( TB sold out )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Brent Christensen
 */
class EE_Event_Scenario_K extends EE_Test_Scenario
{

    public function __construct(EE_UnitTestCase $eetest)
    {
        $this->type = 'event';
        $this->name = 'Event Scenario K';
        parent::__construct($eetest);
    }

    protected function _set_up_expected()
    {
        $this->_expected_values = array(
            'total_available_spaces' => 22,
            'total_remaining_spaces' => 1,
        );
    }


    protected function _set_up_scenario()
    {
        $build_artifact = array(
            'Event'    => array(
                0 => array(
                    'fields' => array('EVT_name' => 'Test Scenario EVT K'),
                ),
            ),
            'Datetime' => array(
                0 => array(
                    'fields'    => array(
                        'DTT_name'      => 'Datetime 1',
                        'DTT_reg_limit' => 10,
                        'DTT_sold'      => 10,
                    ),
                    'relations' => array(
                        'Event' => array(0),
                    ),
                ),
                1 => array(
                    'fields'    => array(
                        'DTT_name'      => 'Datetime 2',
                        'DTT_reg_limit' => 12,
                        'DTT_sold'      => 11,
                    ),
                    'relations' => array(
                        'Event' => array(0),
                    ),
                ),
            ),
            'Ticket'   => array(
                0 => array(
                    'fields'    => array(
                        'TKT_name' => 'Ticket A',
                        'TKT_qty'  => 10,
                        'TKT_sold' => 0,
                    ),
                    'relations' => array(
                        'Datetime' => array(0),
                    ),
                ),
                1 => array(
                    'fields'    => array(
                        'TKT_name' => 'Ticket B',
                        'TKT_qty'  => 12,
                        'TKT_sold' => 1,
                    ),
                    'relations' => array(
                        'Datetime' => array(1),
                    ),
                ),
                2 => array(
                    'fields'    => array(
                        'TKT_name' => 'Ticket C',
                        'TKT_qty'  => 10,
                        'TKT_sold' => 10,
                    ),
                    'relations' => array(
                        'Datetime' => array(0, 1),
                    ),
                ),
            ),
        );
        $build_objects  = $this->_eeTest->factory->complex_factory->build($build_artifact);
        //assign the event object as the scenario object
        $this->_scenario_object = reset($build_objects['Event']);
    }



    protected function _get_scenario_object()
    {
        return $this->_scenario_object;
    }
}
// Location: EE_Event_Scenario_K.scenario.php
