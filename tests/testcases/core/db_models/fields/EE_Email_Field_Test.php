<?php

use EventEspresso\core\domain\services\validation\email\EmailValidationService;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EE_Email_Field_Test
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 * @group         model_fields
 * @group         models
 */
class EE_Email_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_Email_Field
     */
    protected $_field;

    /**
     * @var EE_Registration_Config
     */
    public $registration_config;


    /**
     * @throws EE_Error
     */
    public function setUp()
    {
        parent::setUp();
        $this->_field = EEM_Attendee::instance()->field_settings_for('ATT_email');
        $this->assertInstanceOf('EE_Email_Field', $this->_field);
        // $this->registration_config                 = $this->loader()->getShared('EE_Registration_Config');
        $this->registration_config                 = EE_Config::instance()->registration;

        // $this->loader()->remove('EE_Registration_Config', $this->registration_config);
        // $this->registration_config = $this->loader()->getShared('EE_Registration_Config');
        // nuke EmailValidationService so that it gets replaced
        // $validator = $this->loader()->getShared(EmailValidationService::class);
        // $this->loader()->remove(EmailValidationService::class, $validator);
    }


    public function tearDown()
    {
        $this->_field = null;
        // $this->registration_config = $this->registration_config;
        parent::tearDown();
    }


    // public function test_getSchemaType()
    // {
    //     $this->assertEquals(array('string','null'), $this->_field->getSchemaType());
    // }

    public function test_prepare_for_set()
    {
        $email_validation_levels = array(
            'basic'      => true,
            'wp_default' => false,
            'i18n'       => true,
        );
        //only add `i18n_dns` validation check if mailcatcher isn't detected.  Mailcatcher hijacks that dns checks.
        if (strpos(ini_get('sendmail_path'), 'catchmail') === false) {
            $email_validation_levels['i18n_dns'] = true;
        }
        foreach ($email_validation_levels as $email_validation_level => $test_should_pass) {
            $this->registration_config->email_validation_level = $email_validation_level;
            $this->set_email_field_value($email_validation_level, $test_should_pass);
        }
    }


    /**
     * @param string $validation_being_tested
     * @param bool   $test_should_pass
     */
    public function set_email_field_value($validation_being_tested, $test_should_pass = true)
    {
        // echo "\n\n" . strtoupper(__METHOD__);
        // \EEH_Debug_Tools::printr(spl_object_hash($this->registration_config), ' > spl', __FILE__, __LINE__);
        // \EEH_Debug_Tools::printr(
        //     $this->registration_config->email_validation_level,
        //     ' > email_validation_level',
        //     __FILE__,
        //     __LINE__
        // );
        // 0000000029632c9d000000007c419ece
        // 0000000029633ea9000000007c419ece
        $international_email_address = 'jägerjürgen@deutschland.com';
        /** @var EE_Email_Field $email_field */
        $email_field          = $this->_field;
        $email_field->setShowErrors();
        $actual_email_address = $email_field->prepare_for_set($international_email_address);

        //
        // \EEH_Debug_Tools::printr(
        //     $this->registration_config->email_validation_level,
        //     '$this->registration_config->email_validation_level',
        //     __FILE__,
        //     __LINE__
        // );
        $this->assertEquals(
            $this->registration_config->email_validation_level,
            $validation_being_tested
        );
        if ($test_should_pass) {
            $this->assertEquals(
                $international_email_address,
                $actual_email_address,
                sprintf(
                    'Was ist das? Die E-Mail-Adresse des Teilnehmers sollte "%1$s", nicht "%2$s" sein (Validation Level: %3$s)!',
                    $international_email_address,
                    $actual_email_address,
                    $validation_being_tested
                )
            // translation:
            // What is this? The attendee's email address should be "jägerjürgen@deutschland.com", not "{actual result}"
            );
        } else {
            $this->assertNotEquals(
                $international_email_address,
                $actual_email_address,
                sprintf(
                    'Was ist das? Die E-Mail-Adresse des Teilnehmers sollte "", nicht "%1$s" sein (Validation Level: %2$s!',
                    $actual_email_address,
                    $validation_being_tested
                )
            // translation:
            // What is this? The attendee's email address should be "", not "{actual result}"
            );
        }
    }

    // public function test_get_wpdb_data_type()
    // {
    //     $this->assertEquals('%s', $this->_field->get_wpdb_data_type());
    // }

}
// End of file EE_Email_Field_Test.php
// Location: tests/testcases/core/db_models/fields/EE_Email_Field_Test.php
