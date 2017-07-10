<?php

namespace EventEspresso\core\services\database;

use EE_Email_Field;
use EE_Model_Field_Base;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ModelFieldFactory
 * Factory class for generating Model Field objects
 *
 * @package EventEspresso\core\services\database
 * @author  Brent Christensen
 * @since   4.9.45
 */
class ModelFieldFactory
{

    /**
     * @var LoaderInterface $loader
     */
    private $loader;



    /**
     * ModelFieldFactory constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }



    /**
     * @param string $field_type class name for the model field to be created
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Model_Field_Base
     */
    public function create($field_type, $table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            $field_type,
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Email_Field
     */
    public function createEmailField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Email_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }

}
// Location: core/services/database/ModelFieldFactory.php
