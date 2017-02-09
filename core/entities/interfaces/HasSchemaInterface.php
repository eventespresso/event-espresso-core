<?php
namespace EventEspresso\core\entities\interfaces;

defined('EVENT_ESPRESSO_VERSION') || exit;

interface HasSchemaInterface
{
    /**
     * Returns whatever is set as the nicename for the object.
     *
     * @return string
     */
    public function getSchemaDescription();


    /**
     * Returns whatever is set as the $_schema_type property for the object.
     * Note: this will automatically add 'null' to the schema if the object is_nullable()
     *
     * @return string|array
     */
    public function getSchemaType();


    /**
     * This is usually present when the $_schema_type property is 'object'.  Any child classes will need to override
     * this method and return the properties for the schema.
     * The reason this is not a property on the class is because there may be filters set on the values for the property
     * that won't be exposed on construct.  For example enum type schemas may have the enum values filtered.
     *
     * @return array
     */
    public function getSchemaProperties();

    /**
     * If a child class has enum values, they should override this method and provide a simple array
     * of the enum values.
     * The reason this is not a property on the class is because there may be filterable enum values that
     * are set on the instantiated object that could be filtered after construct.
     *
     * @return array
     */
    public function getSchemaEnum();

    /**
     * This returns the value of the $_schema_format property on the object.
     *
     * @return string
     */
    public function getSchemaFormat();

    /**
     * This returns the value of the $_schema_readonly property on the object.
     *
     * @return bool
     */
    public function getSchemaReadonly();


    /**
     * This returns elements used to represent this field in the json schema.
     *
     * @link http://json-schema.org/
     * @return array
     */
    public function getSchema();
}