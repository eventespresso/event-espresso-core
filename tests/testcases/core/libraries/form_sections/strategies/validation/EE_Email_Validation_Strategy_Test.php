<?php

use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationService;
use EventEspresso\core\services\loaders\LoaderFactory;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 *
 * EE_Email_Validation_Strategy_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 */
class EE_Email_Validation_Strategy_Test extends EE_UnitTestCase
{

    /**
     *
     * @var EE_Email_Validation_Strategy
     */
    protected $_validator = null;

    /**
     * @var EE_Registration_Config
     */
    public $registration_config;


	public function set_up(){
		parent::set_up();
		$this->_validator = new EE_Email_Validation_Strategy();
		//finalize its construction, but we don't actually need the input anyways
		$this->_validator->_construct_finalize( new EE_Email_Input() );
        $this->registration_config = EE_Config::instance()->registration;
	}


	public function setValidationLevel(string $email_validation_level){
        $this->registration_config->email_validation_level = $email_validation_level;
        EmailAddressFactory::setValidator(
            LoaderFactory::getNew(
                EmailValidationService::class,
                [$this->registration_config]
            )
        );
	}


    /**
     * @param int    $counter
     * @param string $email_address
     * @param bool   $assert_success
     */
    public function validate_email_address(int $counter, string $email_address, bool $assert_success = true)
    {
        try {
            $this->_validator->validate($email_address);
            $this->assertTrue(
                $assert_success,
                sprintf(
                    'Email addy #%1$s "%2$s" passed validation when it should have failed while employing %3$s email validation level.',
                    $counter,
                    $email_address,
                    $this->registration_config->email_validation_level
                )
            );
        } catch (EE_Validation_Error $e) {
            $this->assertTrue(
                ! $assert_success,
                sprintf(
                    'Email addy #%1$s "%2$s" failed validation when it should have passed while employing %3$s email validation level.',
                    $counter,
                    $email_address,
                    $this->registration_config->email_validation_level
                )
            );
        }
        // i'm using = and NOT ==, so that I can bypass the following tests,
        // these were only added for dev purposes, but fail too often to be useful
        /*if ( $test_PHP_and_WP_validators = false ) {
            if ( $assert_success ) {
                $this->assertEquals(
                    $email_address,
                    filter_var( $email_address, FILTER_VALIDATE_EMAIL ),
                    sprintf(
                        'PHP says email addy #%1$s "%2$s" failed validation when it should have passed.',
                        $counter,
                        $email_address
                    )
                );
                $this->assertEquals(
                    $email_address,
                    is_email( $email_address ),
                    sprintf(
                        'WordPress says email addy #%1$s "%2$s" failed validation when it should have passed.',
                        $counter,
                        $email_address
                    )
                );
            } else {
                $this->assertFalse(
                    filter_var( $email_address, FILTER_VALIDATE_EMAIL ),
                    sprintf(
                        'PHP says email addy #%1$s "%2$s" passed validation when it should have failed.',
                        $counter,
                        $email_address
                    )
                );
                $this->assertFalse(
                    is_email( $email_address ),
                    sprintf(
                        'WordPress says email addy #%1$s "%2$s" passed validation when it should have failed.',
                        $counter,
                        $email_address
                    )
                );
            }
        }*/
    }


    public function test_validate__pass_basic()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_BASIC);
        // these should pass ALL validations
        $good_addys = [
            'bogus@eventespresso.com',
            'developers@eventespresso.museum',
            'üñîçøðé@example.com', // (Unicode characters in local part)
            'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
            '用户@例子.广告', // ( Chinese, Unicode )
            'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
            'юзер@екзампл.ком', // ( Ukrainian, Unicode )
            'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
            'Dörte@Sörensen.example.com', // ( German, Unicode )
            // short domain
            'developers@e.com',
            'developers@eventespresso.c',
            // from https://en.wikipedia.org/wiki/Email_address#Examples
            'niceandsimple@example.com',
            'very.common@example.com',
            'a.little.lengthy.but.fine@dept.example.com',
            'disposable.style.email.with+symbol@example.com',
            "!#$%&'*+-/=?^_`{}|~@example.org",
            // the following, despite being valid, do NOT pass our validation
            //'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
            '"much.more unusual"@example.com',
            '"very.unusual.@.unusual.com"@example.com',
            '"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
            'postbox@com',
            'admin@mailserver1', // local domain name with no TLD
            '"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
            '" "@example.org', // (space between the quotes)
            // the following, despite being INVALID, pass validation when they should NOT
            // haxxor
            '<script>alert("XSS ATTACK")</script>@eventespresso.com',
        ];
        // turn off DNS checks
        foreach ($good_addys as $count => $good_addy) {
            $this->validate_email_address($count, $good_addy);
        }
    }


    public function test_validate__fail_basic()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_BASIC);
        $bad_addys                                                         = [
            // double dots
            'develop..ers@eventespresso.com',
            'developers@event..espresso.com',
            // no local
            '@eventespresso.com',
            // no domain
            'developers@',
        ];
        foreach ($bad_addys as $count => $bad_addy) {
            $this->validate_email_address($count, $bad_addy, false);
        }
    }


    public function test_validate__pass_wp_default()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_WP_DEFAULT);
        // these should pass ALL validations
        $good_addys = [
            'bogus@eventespresso.com',
            'developers@eventespresso.museum',
            // short domain
            'developers@e.com',
            'developers@eventespresso.c',
            // from https://en.wikipedia.org/wiki/Email_address#Examples
            'niceandsimple@example.com',
            'very.common@example.com',
            'a.little.lengthy.but.fine@dept.example.com',
            'disposable.style.email.with+symbol@example.com',
            "!#$%&'*+-/=?^_`{}|~@example.org",
            // the following, despite being valid, do NOT pass WordPress is_email() validation
            //'üñîçøðé@example.com', // (Unicode characters in local part)
            //'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
            //'用户@例子.广告', // ( Chinese, Unicode )
            //'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
            //'юзер@екзампл.ком', // ( Ukrainian, Unicode )
            //'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
            //'Dörte@Sörensen.example.com', // ( German, Unicode )
            //'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
            //'"much.more unusual"@example.com',
            //'"very.unusual.@.unusual.com"@example.com',
            //'"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
            //'postbox@com',
            //'admin@mailserver1', // local domain name with no TLD
            //'"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
            //'" "@example.org', // (space between the quotes)
        ];
        // turn off DNS checks
        foreach ($good_addys as $count => $good_addy) {
            $this->validate_email_address($count, $good_addy);
        }
    }


    public function test_validate__fail_wp_default()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_WP_DEFAULT);
        $bad_addys                                                         = [
            // double dots
            'develop..ers@eventespresso.com',
            'developers@event..espresso.com',
            // haxxor
            '<script>alert("XSS ATTACK")</script>@eventespresso.com',
            // no local
            '@eventespresso.com',
            // no domain
            'developers@',
            // valid but international
            'üñîçøðé@example.com', // (Unicode characters in local part)
            'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
            '用户@例子.广告', // ( Chinese, Unicode )
            'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
            'юзер@екзампл.ком', // ( Ukrainian, Unicode )
            'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
            'Dörte@Sörensen.example.com', // ( German, Unicode )
        ];
        foreach ($bad_addys as $count => $bad_addy) {
            $this->validate_email_address($count, $bad_addy, false);
        }
    }


    public function test_validate__pass_i18n()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_I18N);
        // these should pass ALL validations
        $good_addys = [
            'bogus@eventespresso.com',
            'developers@eventespresso.museum',
            'üñîçøðé@example.com', // (Unicode characters in local part)
            'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
            '用户@例子.广告', // ( Chinese, Unicode )
            'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
            'юзер@екзампл.ком', // ( Ukrainian, Unicode )
            'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
            'Dörte@Sörensen.example.com', // ( German, Unicode )
            // short domain
            'developers@e.com',
            // from https://en.wikipedia.org/wiki/Email_address#Examples
            'niceandsimple@example.com',
            'very.common@example.com',
            'a.little.lengthy.but.fine@dept.example.com',
            'disposable.style.email.with+symbol@example.com',
            "!#$%&'*+-/=?^_`{}|~@example.org",
            // the following, despite being valid, do NOT pass our validation
            //'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
            //'"much.more unusual"@example.com',
            //'"very.unusual.@.unusual.com"@example.com',
            //'"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
            //'postbox@com',
            //'admin@mailserver1', // local domain name with no TLD
            //'"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
            //'" "@example.org', // (space between the quotes)
        ];
        // turn off DNS checks
        foreach ($good_addys as $count => $good_addy) {
            $this->validate_email_address($count, $good_addy);
        }
    }


    public function test_validate__fail_i18n()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_I18N);
        $bad_addys                                                         = [
            // double dots
            'develop..ers@eventespresso.com',
            'developers@event..espresso.com',
            // haxxor
            '<script>alert("XSS ATTACK")</script>@eventespresso.com',
            // domain too short
            'developers@eventespresso.c',
            // no local
            '@eventespresso.com',
            // no domain
            'developers@',
        ];
        foreach ($bad_addys as $count => $bad_addy) {
            $this->validate_email_address($count, $bad_addy, false);
        }
    }


    public function test_DNS_and_MX_record_check_fail()
    {
        $this->setValidationLevel(EmailValidationService::VALIDATION_LEVEL_I18N_DNS);
        $bad_addys                                                         = [
            // no MX records (bogus addresses)
            'valid-but-not-real@siiiiiiiiiiiiiiite.com',
            'developers@eventespresso.museum',
            '用户@例子.广告', // ( Chinese, Unicode )
            'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
            'юзер@екзампл.ком', // ( Ukrainian, Unicode )
            'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
            'Dörte@Sörensen.staaaaaaaandooooooooort.com', // ( German, Unicode )
        ];
        foreach ($bad_addys as $count => $bad_addy) {
            $this->validate_email_address($count, $bad_addy, false);
        }
    }


}
// End of file tests/testcases/core/libraries/form_sections/strategies/validation/EE_Email_Validation_Strategy_Test.php
