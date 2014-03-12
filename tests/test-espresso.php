<?php

class EspressoTest extends WP_UnitTestCase {

	function test_version_check() {
            $this->assertTrue( espresso_version() >= '4.1.8.reg' );
	}
        function test_system_instantiation() {
            $EE_System = EE_System::instance();
            $this->assertTrue( $EE_System instanceof  EE_System);
        }
        function test_has_action_init() {
            $EE_System = EE_System::instance();
            $this->assertTrue( 3 == has_action('init', array($EE_System, 'init')));
        }
}

