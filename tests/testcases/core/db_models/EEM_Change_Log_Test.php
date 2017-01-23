<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EEM_Change_Log_Test
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EEM_Change_Log_Test extends EE_UnitTestCase
{
    public function test_delete_gateway_logs_older_than(){
        $delete_me = $this->new_model_obj_with_dependencies(
            'Change_Log',
            array(
                'LOG_time' => new DateTime('-2 weeks'),
                'LOG_type' => EEM_Change_Log::type_gateway
            )
        );
        $wrong_type = $this->new_model_obj_with_dependencies(
            'Change_Log',
            array(
                'LOG_time' => new DateTime('-2 weeks'),
                'LOG_type' => EEM_Change_Log::type_create
            )
        );
        $too_new = $this->new_model_obj_with_dependencies(
            'Change_Log',
            array(
                'LOG_time' => new DateTime('-1 days'),
                'LOG_type' => EEM_Change_Log::type_gateway
            )
        );

        $result = EEM_Change_Log::instance()->delete_gateway_logs_older_than(date(EE_Datetime_Field::mysql_timestamp_format, strtotime('-1 week')));
        $this->assertTrue(EEM_Change_Log::instance()->exists_by_ID( $wrong_type->ID()));
        $this->assertTrue(EEM_Change_Log::instance()->exists_by_ID($too_new->ID()));
        $this->assertFalse(EEM_Change_Log::instance()->exists_by_ID($delete_me->ID()));
        $this->assertEquals( '1', $result );

    }


}
// End of file EEM_Change_Log_Test.php
// Location: ${NAMESPACE}/EEM_Change_Log_Test.php