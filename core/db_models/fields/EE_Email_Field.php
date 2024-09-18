<?php

use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\values\EmailAddress;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\orm\model_field\SchemaFormat;

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
        $this->setSchemaFormat(SchemaFormat::EMAIL);
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
        if (empty($email_address)) {
            return '';
        }
        try {
            $email_address_obj = EmailAddressFactory::create($email_address);
            return $email_address_obj instanceof EmailAddress ? $email_address_obj->get() : '';
        } catch (EmailValidationException $e) {
            return '';
        }
    }
}
