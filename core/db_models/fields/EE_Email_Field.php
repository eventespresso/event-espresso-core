<?php
use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

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
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @throws InvalidArgumentException
     */
    public function __construct($table_column, $nice_name, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nice_name, $nullable, $default_value);
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
        try {
            $email_address = EmailAddressFactory::create($email_address);
            return $email_address->get();
        } catch (EmailValidationException $e) {
            return '';
        }
    }
}
