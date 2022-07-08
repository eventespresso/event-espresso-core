<?php

/**
 * Class EEM_Extra_Join_Test
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EEM_Extra_Join_Test extends EE_UnitTestCase
{

    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_up()
    {
        parent::set_up();
        // for the testing's sake, we want events to be related to payment methods via a HABTM_Any relation
        add_filter('FHEE__EEM_Event__construct__model_relations', [$this, 'relate_events_to_payment_methods']);
        add_filter(
            'FHEE__EEM_Payment_Method__construct__model_relations',
            [$this, 'relate_payment_methods_to_events']
        );
        // do another reset on the registry now
        EE_Registry::reset(true);
        // then reload those models so those filters take effect
        EEM_Event::reset();
        EEM_Payment_Method::reset();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function tear_down()
    {
        parent::tear_down();
        // reset those models so they don't adversely affect other tests
        EEM_Event::reset();
        EEM_Payment_Method::reset();
    }


    /**
     * @param $event_relations
     * @return mixed
     */
    public function relate_events_to_payment_methods($event_relations)
    {
        $event_relations['Payment_Method'] = new EE_HABTM_Any_Relation();
        return $event_relations;
    }


    /**
     * @param $pm_relations
     * @return mixed
     */
    public function relate_payment_methods_to_events($pm_relations)
    {
        $pm_relations['Event'] = new EE_HABTM_Any_Relation();
        return $pm_relations;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @group 9113
     */
    public function test_get_related()
    {
        $e  = $this->new_model_obj_with_dependencies('Event');
        $pm = $this->new_model_obj_with_dependencies('Payment_Method', ['PMD_type' => 'Invoice']);
        //add a few extra events and payment methods, just to make sure we are
        //only relating the things we intended
        $this->new_model_obj_with_dependencies('Event');
        $this->new_model_obj_with_dependencies('Payment_Method', ['PMD_type' => 'Invoice']);
        $this->new_model_obj_with_dependencies(
            'Extra_Join',
            [
                'EXJ_first_model_ID'    => $e->ID(),
                'EXJ_first_model_name'  => 'Event',
                'EXJ_second_model_ID'   => $pm->ID(),
                'EXJ_second_model_name' => 'Payment_Method',
            ]
        );
        $this->assertEquals([$pm->ID() => $pm], $e->get_many_related('Payment_Method'));
        $this->assertEquals([$e->ID() => $e], $pm->get_many_related('Event'));
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @group 9113
     */
    public function test_add()
    {
        $e  = $this->new_model_obj_with_dependencies('Event');
        $pm = $this->new_model_obj_with_dependencies('Payment_Method', ['PMD_type' => 'Invoice']);
        $e->_add_relation_to($pm, 'Payment_Method');
        $this->assertEquals([$pm->ID() => $pm], $e->get_many_related('Payment_Method'));
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @group 9113
     */
    public function test_delete()
    {
        $e  = $this->new_model_obj_with_dependencies('Event');
        $pm = $this->new_model_obj_with_dependencies('Payment_Method', ['PMD_type' => 'Invoice']);
        $e->_add_relation_to($pm, 'Payment_Method');
        $this->assertEquals([$pm->ID() => $pm], $e->get_many_related('Payment_Method'));
        $e->_remove_relation_to($pm, 'Payment_Method');
        $this->assertEquals([], $e->get_many_related('Payment_Method'));
    }
}
// Location: testcases/core/db_models/EEM_Extra_Join_Test.php
