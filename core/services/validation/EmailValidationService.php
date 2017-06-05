<?php

namespace EventEspresso\core\services\validation;

use EventEspresso\core\services\validation\strategies\Basic;
use EventEspresso\core\services\validation\strategies\WordPress;
use EventEspresso\core\domain\services\validation\EmailValidationException;
use EventEspresso\core\domain\services\validation\EmailValidationServiceInterface;
use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\services\validation\strategies\International;
use EventEspresso\core\services\validation\strategies\InternationalDNS;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidator
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EmailValidationService extends DomainService implements EmailValidationServiceInterface
{



    /**
     * @var string $validation_level
     */
    protected $validation_level;



    /**
     * EmailValidationService constructor.
     * Accepts an \EE_Config as an argument.
     *
     * @param string $validation_level
     */
    public function __construct($validation_level)
    {
        $this->validation_level = $validation_level;
        parent::__construct();
    }



    /**
     * Validates the email address. If it's invalid, an EmailValidationException
     * is thrown that describes why its invalid.
     *
     * @param $input
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($input)
    {
        //pick the correct validator according to the config
        switch ($this->validation_level) {
            case 'basic':
                $validator = new Basic();
                break;
            case 'i18n':
                $validator = new International();
                break;
            case 'i18n_dns':
                $validator = new InternationalDNS();
                break;
            case 'wp_default':
            default:
                $validator = new WordPress();
                break;
        }
        return $validator->validate($input);
    }
}
// End of file EmailValidator.php
// Location: core\services\validation/EmailValidator.php
