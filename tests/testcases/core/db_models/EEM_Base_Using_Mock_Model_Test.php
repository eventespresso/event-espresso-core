<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EEM_Base_Using_Mock_Model_Test
 * For more isolated tests of `EEM_Base` functionality by using a mock model, EEM_Mock.
 * (This way model changes to specific children models won't affect these unit tests)
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * 
 */
class EEM_Base_Using_Mock_Model_Test extends EE_UnitTestCase
{

    public function setUp()
    {
        parent::setUp();
        $this->_stop_pretending_addon_hook_time();
        $this->_pretend_addon_hook_time();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        //register it for realz
        EE_Register_Model::register(
            'Mock',
            array(
                'model_paths' => array(EE_MOCKS_DIR . 'core/db_models/'),
                'class_paths' => array(EE_MOCKS_DIR . 'core/db_classes/'),
            )
        );
        //whitelist the table we're about to add
        add_filter('FHEE__EEH_Activation__create_table__short_circuit', array($this, 'dont_short_circuit_mock_table'), 25, 3);
        //add table from related DMS
        EEH_Activation::create_table('esp_mock', '
			MCK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			MCK_value varchar(100),
			MCK_datetime DATETIME NOT NULL DEFAULT "0000-00-00 00:00:00",
			PRIMARY KEY  (MCK_ID)'
        );
        $this->assertTableExists('esp_mock');
        EE_System::instance()->load_core_configuration();
        $this->assertArrayContains('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayContains('EEM_Mock', EE_Registry::instance()->models);
    }



    /**
     * OK's the creation of the esp_new_addon table, because this hooks in AFTER EE_UNitTestCase's callback on this same hook
     *
     * @param bool   $short_circuit
     * @param string $table_name
     * @param string $create_sql
     * @return array
     */
    public function dont_short_circuit_mock_table($short_circuit = false, $table_name = '', $create_sql = '')
    {
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        if ($table_name == 'esp_mock' && ! $table_analysis->tableExists($table_name)) {
            //			echo "\r\n\r\nDONT short circuit $sql";
            //it's not altering. it's ok to allow this
            return false;
        } else {
            //			echo "3\r\n\r\n short circuit:$sql";
            return $short_circuit;
        }
    }



    /**
     */
    public function test_get_all()
    {
        //there should be nothing in here
        $this->assertFalse(EEM_Mock::instance()->exists(array()));
        $mock_thing = EE_Mock::new_instance(
            array(
                'MCK_value' => 'foobar',
            )
        );
        $id = $mock_thing->save();
        $found_mock_thing = EEM_Mock::instance()->get_one();
        $this->assertEquals($mock_thing, $found_mock_thing);
    }



    /**
     */
    public function test_get_qualified_columns_for_all_fields__as_string()
    {
        $this->assertEquals(
            'Mock.MCK_ID, Mock.MCK_value, Mock.MCK_datetime',
            EEM_Mock::instance()->get_qualified_columns_for_all_fields()
        );
    }



    /**
     */
    public function test_get_qualified_columns_for_all_fields__as_array()
    {
        $this->assertEquals(
            array(
                'Mock.MCK_ID',
                'Mock.MCK_value',
                'Mock.MCK_datetime',
            ),
            EEM_Mock::instance()->get_qualified_columns_for_all_fields('', false)
        );
    }



    /**
     */
    public function test_get_qualified_columns_for_all_fields__with_prefix()
    {
        $this->assertEquals(
            array(
                'Extra_Meta__Mock.MCK_ID',
                'Extra_Meta__Mock.MCK_value',
                'Extra_Meta__Mock.MCK_datetime',
            ),
            EEM_Mock::instance()->get_qualified_columns_for_all_fields('Extra_Meta', false)
        );
    }



    /**
     * Make up a really long model chain. It doesn't need to be actual model names (at least right now; if that
     * ever becomes a requirement then we'll need to hae EEM_Mock actually related to some more mock models)
     */
    public function test_get_qualified_columns_for_all_fields__with_big_prefix()
    {
        $this->assertEquals(
            array(
                'Some__Model__Chain__Mock.MCK_ID',
                'Some__Model__Chain__Mock.MCK_value',
                'Some__Model__Chain__Mock.MCK_datetime',
            ),
            EEM_Mock::instance()->get_qualified_columns_for_all_fields('Some.Model.Chain', false)
        );
    }



    public function tearDown()
    {
        EE_Register_Model::deregister('Mock');
        EE_System::instance()->load_core_configuration();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        $this->_stop_pretending_addon_hook_time();
        parent::tearDown();
    }


}
// End of file EEM_Base_Using_Mock_Model_Test.php
// Location: tests\testcases\core\db_models/EEM_Base_Using_Mock_Model_Test.php