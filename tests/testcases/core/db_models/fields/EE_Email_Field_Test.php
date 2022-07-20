<?php

use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationService;
use EventEspresso\core\domain\services\validation\email\EmailValidatorInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

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
     * @var EmailValidationService
     */
    private $orig_email_validation_service;

    /**
     * @var LoaderInterface
     */
    private $loader;

    /**
     * @var EE_Registration_Config
     */
    public $registration_config;

    /**
     * @var bool
     */
    private $mailcatcherActive = false;


    /**
     * @throws EE_Error
     */
    public function set_up()
    {
        parent::set_up();

        $this->loader              = LoaderFactory::getLoader();
        $this->mailcatcherActive   = strpos(ini_get('sendmail_path'), 'catchmail');

        // cache original email validator
        $this->orig_email_validation_service = $this->loader->getShared(EmailValidationService::class);
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_true');
    }


    public function tear_down()
    {
        EmailAddressFactory::setValidator($this->orig_email_validation_service);
        parent::tear_down();
    }


    public function emailData(): array
    {
        return [
            [
                'email_address'     => 'developers@eventespresso.com',
                'validation_levels' => [
                    'basic'      => true,
                    'wp_default' => true,
                    'i18n'       => true,
                    'i18n_dns'   => true,
                ],
            ],
            [
                'email_address'     => 'jägerjürgen@deutschland.de',
                'validation_levels' => [
                    'basic'      => true,
                    'wp_default' => false,
                    'i18n'       => true,
                    'i18n_dns'   => true,
                ],
            ],
        ];
    }


    /**
     * @dataProvider emailData
     */
    public function test_prepare_for_set($email_address, $email_validation_levels)
    {
        // only add `i18n_dns` validation check if mailcatcher isn't detected.  Mailcatcher hijacks that dns checks.
        if ($this->mailcatcherActive !== false) {
            unset($email_validation_levels['i18n_dns']);
        }
        foreach ($email_validation_levels as $email_validation_level => $test_should_pass) {
            $this->set_email_field_value($email_address, $email_validation_level, $test_should_pass);
        }
    }


    /**
     * @param string $email_address
     * @param string $email_validation_level
     * @param bool   $test_should_pass
     */
    public function set_email_field_value(
        string $email_address,
        string $email_validation_level,
        bool $test_should_pass
    ) {
        $registration_config = new EE_Registration_Config();
        $registration_config->email_validation_level = $email_validation_level;

        EmailAddressFactory::setValidator(
            new EmailValidationService($registration_config, $this->loader)
        );


        $email_field = new EE_Email_Field(
            'ATT_email',
            esc_html__('Email Address', 'event_espresso'),
            true,
            ''
        );
        $this->assertInstanceOf('EE_Email_Field', $email_field);

        $email_field->setShowErrors();
        $actual_email_address = $email_field->prepare_for_set($email_address);

        if ($test_should_pass) {
            $this->assertEquals(
                $email_address,
                $actual_email_address,
                $this->errorMessage($email_address, $actual_email_address, $email_validation_level)
            );
        } else {
            $this->assertNotEquals(
                '',
                $actual_email_address,
                $this->errorMessage($email_address, $actual_email_address, $email_validation_level)
            );
        }
    }


    /**
     * message translation:
     * What is this? The attendee's email address should be "", not "{actual result}"
     *
     * @param string $email_address
     * @param string $actual_email_address
     * @param string $email_validation_level
     * @return string
     * @since $VID:$
     */
    private function errorMessage(string $email_address, string $actual_email_address, string $email_validation_level): string
    {
        return sprintf(
            'Was ist das? Die E-Mail-Adresse des Teilnehmers sollte "%1$s", nicht "%2$s" sein (Validation Level: %3$s)!',
            $email_address,
            $actual_email_address,
            $email_validation_level
        );
    }

    public function test_get_wpdb_data_type()
    {
        $email_field = new EE_Email_Field(
            'ATT_email',
            esc_html__('Email Address', 'event_espresso'),
            true,
            ''
        );
        $this->assertEquals('%s', $email_field->get_wpdb_data_type());
    }

}
// End of file EE_Email_Field_Test.php
// Location: tests/testcases/core/db_models/fields/EE_Email_Field_Test.php
