<?php

namespace EventEspresso\core\services\orm;

use EE_All_Caps_Text_Field;
use EE_Any_Foreign_Model_Name_Field;
use EE_Boolean_Field;
use EE_Datetime_Field;
use EE_DB_Only_Float_Field;
use EE_DB_Only_Int_Field;
use EE_DB_Only_Text_Field;
use EE_Email_Field;
use EE_Enum_Integer_Field;
use EE_Enum_Text_Field;
use EE_Error;
use EE_Float_Field;
use EE_Foreign_Key_Int_Field;
use EE_Foreign_Key_String_Field;
use EE_Full_HTML_Field;
use EE_Infinite_Integer_Field;
use EE_Integer_Field;
use EE_Maybe_Serialized_Simple_HTML_Field;
use EE_Maybe_Serialized_Text_Field;
use EE_Money_Field;
use EE_Plain_Text_Field;
use EE_Post_Content_Field;
use EE_Primary_Key_Int_Field;
use EE_Primary_Key_String_Field;
use EE_Serialized_Text_Field;
use EE_Simple_HTML_Field;
use EE_Slug_Field;
use EE_Trashed_Flag_Field;
use EE_WP_Post_Status_Field;
use EE_WP_Post_Type_Field;
use EE_WP_User_Field;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;

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
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_All_Caps_Text_Field
     */
    public function createAllCapsTextField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_All_Caps_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @param string $model_name
     * @return EE_Any_Foreign_Model_Name_Field
     */
    public function createAnyForeignModelNameField(
        $table_column,
        $nice_name,
        $nullable,
        $default_value = null,
        $model_name
    ) {
        return $this->loader->getNew(
            'EE_Any_Foreign_Model_Name_Field',
            array($table_column, $nice_name, $nullable, $default_value, $model_name)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Boolean_Field
     */
    public function createBooleanField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Boolean_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param string $timezone_string
     * @param bool   $nullable
     * @param string $default_value
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @return EE_Datetime_Field
     */
    public function createDatetimeField(
        $table_column,
        $nice_name,
        $nullable = false,
        $default_value = EE_Datetime_Field::now
    ) {
        return $this->loader->getNew(
            'EE_Datetime_Field',
            array(
                $table_column,
                $nice_name,
                $nullable,
                $default_value
            )
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_DB_Only_Float_Field
     */
    public function createDbOnlyFloatField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_DB_Only_Float_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_DB_Only_Int_Field
     */
    public function createDbOnlyIntField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_DB_Only_Int_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_DB_Only_Text_Field
     */
    public function createDbOnlyTextField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_DB_Only_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param string $default_value
     * @return EE_Email_Field
     */
    public function createEmailField($table_column, $nice_name, $nullable = true, $default_value = '')
    {
        return $this->loader->getNew(
            'EE_Email_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @param array  $allowed_enum_values keys are values to be used in the DB,
     *                                    values are how they should be displayed
     * @return EE_Enum_Integer_Field
     */
    public function createEnumIntegerField(
        $table_column,
        $nice_name,
        $nullable,
        $default_value = null,
        array $allowed_enum_values
    ) {
        return $this->loader->getNew(
            'EE_Enum_Integer_Field',
            array($table_column, $nice_name, $nullable, $default_value, $allowed_enum_values)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @param array  $allowed_enum_values keys are values to be used in the DB,
     *                                    values are how they should be displayed
     * @return EE_Enum_Text_Field
     */
    public function createEnumTextField(
        $table_column,
        $nice_name,
        $nullable,
        $default_value,
        array $allowed_enum_values
    ) {
        return $this->loader->getNew(
            'EE_Enum_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value, $allowed_enum_values)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Float_Field
     */
    public function createFloatField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Float_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @param string $model_name
     * @return EE_Foreign_Key_Int_Field
     */
    public function createForeignKeyIntField($table_column, $nice_name, $nullable, $default_value, $model_name)
    {
        return $this->loader->getNew(
            'EE_Foreign_Key_Int_Field',
            array($table_column, $nice_name, $nullable, $default_value, $model_name)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @param string $model_name
     * @return EE_Foreign_Key_String_Field
     */
    public function createForeignKeyStringField(
        $table_column,
        $nice_name,
        $nullable,
        $default_value,
        $model_name
    ) {
        return $this->loader->getNew(
            'EE_Foreign_Key_String_Field',
            array($table_column, $nice_name, $nullable, $default_value, $model_name)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Full_HTML_Field
     */
    public function createFullHtmlField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Full_HTML_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Infinite_Integer_Field
     */
    public function createInfiniteIntegerField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Infinite_Integer_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string  $table_column
     * @param string  $nice_name
     * @param bool    $nullable
     * @param integer $default_value
     * @return EE_Integer_Field
     */
    public function createIntegerField($table_column, $nice_name, $nullable = false, $default_value = 0)
    {
        return $this->loader->getNew(
            'EE_Integer_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Maybe_Serialized_Simple_HTML_Field
     */
    public function createMaybeSerializedSimpleHtmlField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Maybe_Serialized_Simple_HTML_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Maybe_Serialized_Text_Field
     */
    public function createMaybeSerializedTextField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Maybe_Serialized_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Money_Field
     */
    public function createMoneyField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Money_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param string $default_value
     * @return EE_Plain_Text_Field
     */
    public function createPlainTextField($table_column, $nice_name, $nullable = true, $default_value = '')
    {
        return $this->loader->getNew(
            'EE_Plain_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Post_Content_Field
     */
    public function createPostContentField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Post_Content_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @return EE_Primary_Key_Int_Field
     */
    public function createPrimaryKeyIntField($table_column, $nice_name)
    {
        return $this->loader->getNew('EE_Primary_Key_Int_Field', array($table_column, $nice_name));
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @return EE_Primary_Key_String_Field
     */
    public function createPrimaryKeyStringField($table_column, $nice_name)
    {
        return $this->loader->getNew('EE_Primary_Key_String_Field', array($table_column, $nice_name));
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Serialized_Text_Field
     */
    public function createSerializedTextField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Serialized_Text_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Simple_HTML_Field
     */
    public function createSimpleHtmlField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Simple_HTML_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Slug_Field
     */
    public function createSlugField($table_column, $nice_name, $nullable = false, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Slug_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param null   $default_value
     * @return EE_Trashed_Flag_Field
     */
    public function createTrashedFlagField($table_column, $nice_name, $nullable, $default_value = null)
    {
        return $this->loader->getNew(
            'EE_Trashed_Flag_Field',
            array($table_column, $nice_name, $nullable, $default_value)
        );
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param mixed  $default_value
     * @param array  $values        If additional stati are to be used other than the default WP statuses,
     *                              then they can be registered via this property.
     *                              The format of the array should be as follows:
     *  array(
     *      'status_reference' => array(
     *          'label' => __('Status Reference Label', 'event_espresso'),
     *          'public' => true,                 // whether this status should be shown on the frontend of the site
     *          'exclude_from_search' => false,   // whether this status should be excluded from wp searches
     *          'show_in_admin_all_list' => true, // whether this status is included in queries
     *                                               for the admin "all" view in list table views.
     *          'show_in_admin_status_list' => true, // show in the list of statuses with post counts at the top
     *                                                  of the admin list tables (i.e. Status Reference(2) )
     *          'label_count' => _n_noop(
     *              'Status Reference <span class="count">(%s)</span>',
     *              'Status References <span class="count">(%s)</span>'
     *          ),                                   // the text to display on the admin screen
     *                                                  ( or you won't see your status count ).
     *      )
     *  )
     * @link http://codex.wordpress.org/Function_Reference/register_post_status for more info
     * @return EE_WP_Post_Status_Field
     */
    public function createWpPostStatusField(
        $table_column,
        $nice_name,
        $nullable,
        $default_value = null,
        array $values = array()
    ) {
        return $this->loader->getNew(
            'EE_WP_Post_Status_Field',
            array($table_column, $nice_name, $nullable, $default_value, $values)
        );
    }



    /**
     * @param string $post_type
     * @return EE_WP_Post_Type_Field
     */
    public function createWpPostTypeField($post_type)
    {
        return $this->loader->getNew('EE_WP_Post_Type_Field', array($post_type));
    }



    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @return EE_WP_User_Field
     */
    public function createWpUserField($table_column, $nice_name, $nullable)
    {
        return $this->loader->getNew('EE_WP_User_Field', array($table_column, $nice_name, $nullable));
    }



}
// Location: core/services/database/ModelFieldFactory.php
