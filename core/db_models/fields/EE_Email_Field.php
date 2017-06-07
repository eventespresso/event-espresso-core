<?php
use EventEspresso\core\domain\services\validation\EmailValidationException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\Loader;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class EE_Email_Field
 *
 * @package       Event Espresso
 * @author        Mike Nelson
 */
class EE_Email_Field extends EE_Text_Field_Base
{
    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaFormat('email');
    }



    /**
     * In form inputs, we should have called htmlentities and addslashes() on form inputs,
     * so we need to undo that on setting of these fields
     *
     * @param string $email_address
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public function prepare_for_set($email_address)
    {
        $loader = new Loader();
        $validation_service = $loader->getShared(
            'EventEspresso\core\domain\services\validation\EmailValidatorInterface'
        );
        try {
            $validation_service->validate($email_address);
            return $email_address;
        } catch (EmailValidationException $e) {
            return '';
        }
    }
}
