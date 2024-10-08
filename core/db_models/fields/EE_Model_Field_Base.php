<?php

use EventEspresso\core\entities\interfaces\HasSchemaInterface;
use EventEspresso\core\services\database\WpdbDataFormat;
use EventEspresso\core\services\orm\model_field\SchemaFormat;
use EventEspresso\core\services\orm\model_field\SchemaType;

/**
 * EE_Model_Field_Base class
 * Base class for all EE_*_Field classes. These classes are for providing information and functions specific to each
 * field. They define the field's data type for insertion into the db (eg, if the value should be treated as an int,
 * float, or string), what values for the field are acceptable (eg, if setting EVT_ID to a float is acceptable), and
 * generally any functionality within EEM_Base or EE_Base_Class which depend on the field's type. (ie, you shouldn't
 * need any logic within your model or model object which are dependent on the field's type, ideally). For example,
 * EE_Serialized_Text_Field, specifies that any fields of this type should be serialized before insertion into the db
 * (prepare_for_insertion_into_db()), should be considered a string when inserting, updating, or using in a where
 * clause for any queries (get_wpdb_data_type()), should be unserialized when being retrieved from the db
 * (prepare_for_set_from_db()), and whatever else.
 *
 * @package               Event Espresso
 * @subpackage            /core/db_models/fields/EE_Model_Field_Base.php
 * @author                Michael Nelson
 */
abstract class EE_Model_Field_Base implements HasSchemaInterface
{
    /**
     * The alias for the table the column belongs to.
     */
    protected ?string $_table_alias = '';

    /**
     * The actual db column name for the table
     */
    protected ?string $_table_column;


    /**
     * The authoritative name for the table column (used by client code to reference the field).
     */
    protected ?string $_name = '';


    /**
     * A description for the field.
     */
    protected ?string $_nicename;


    /**
     * Whether the field is nullable or not
     */
    protected ?bool $_nullable;


    /**
     * What the default value for the field should be.
     *
     * @var mixed
     */
    protected $_default_value;


    /**
     * Other configuration for the field
     *
     * @var mixed
     */
    protected $_other_config;


    /**
     * The name of the model this field is instantiated for.
     */
    protected ?string $_model_name = '';


    /**
     * This should be a json-schema valid data type for the field.
     *
     * @link http://json-schema.org/latest/json-schema-core.html#rfc.section.4.2
     * @var string|string[]
     */
    private $_schema_type = [];


    /**
     * If the schema has a defined format then it should be defined via this property.
     *
     * @link http://json-schema.org/latest/json-schema-validation.html#rfc.section.7
     */
    private ?string $_schema_format = '';


    /**
     * Indicates that the value of the field is managed exclusively by the server/model and not something
     * settable by client code.
     *
     * @link http://json-schema.org/latest/json-schema-hypermedia.html#rfc.section.4.4
     */
    private bool $_schema_readonly = false;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        $this->_table_column  = $table_column;
        $this->_nicename      = $nicename;
        $this->_nullable      = $nullable;
        $this->_default_value = $default_value;
    }


    /**
     * @param string $table_alias
     * @param string $name
     * @param string $model_name
     */
    public function _construct_finalize(string $table_alias, string $name, string $model_name)
    {
        $this->_table_alias = $table_alias;
        $this->_name        = $name;
        $this->_model_name  = $model_name;
        /**
         * allow for changing the defaults
         */
        $this->_nicename      = apply_filters(
            'FHEE__EE_Model_Field_Base___construct_finalize___nicename',
            $this->_nicename,
            $this
        );
        $this->_default_value = apply_filters(
            'FHEE__EE_Model_Field_Base___construct_finalize___default_value',
            $this->_default_value,
            $this
        );
    }


    public function get_table_alias(): string
    {
        return $this->_table_alias;
    }


    public function get_table_column(): string
    {
        return $this->_table_column;
    }


    /**
     * Returns the name of the model this field is on. Eg 'Event' or 'Ticket_Datetime'
     *
     * @return string
     */
    public function get_model_name(): string
    {
        return $this->_model_name;
    }


    /**
     * @return string
     * @throws EE_Error
     */
    public function get_name(): string
    {
        if ($this->_name) {
            return $this->_name;
        }
        throw new EE_Error(
            sprintf(
                esc_html__(
                    "Model field '%s' has no name set. Did you make a model and forget to call the parent model constructor?",
                    "event_espresso"
                ),
                get_class($this)
            )
        );
    }


    public function get_nicename(): string
    {
        return $this->_nicename;
    }


    public function is_nullable(): bool
    {
        return $this->_nullable;
    }


    /**
     * returns whether this field is an auto-increment field or not. If it is, then
     * on insertion it can be null. However, on updates it must be present.
     *
     * @return bool
     */
    public function is_auto_increment(): bool
    {
        return false;
    }


    /**
     * The default value in the model object's value domain. See lengthy comment about
     * value domains at the top of EEM_Base
     *
     * @return mixed
     */
    public function get_default_value()
    {
        return $this->_default_value;
    }


    /**
     * Returns the table alias joined to the table column, however this isn't the right
     * table alias if the aliased table is being joined to. In that case, you can use
     * EE_Model_Parser::extract_table_alias_model_relation_chain_prefix() to find the table's current alias
     * in the current query
     *
     * @return string
     */
    public function get_qualified_column()
    {
        return $this->get_table_alias() . "." . $this->get_table_column();
    }


    /**
     * When get() is called on a model object (eg EE_Event), before returning its value,
     * call this function on it, allowing us to customize the returned value based on
     * the field's type. Eg, we may want to unserialize it, strip tags, etc. By default,
     * we simply return it.
     *
     * @param mixed $value_of_field_on_model_object
     * @return mixed
     */
    public function prepare_for_get($value_of_field_on_model_object)
    {
        return $value_of_field_on_model_object;
    }


    /**
     * When inserting or updating a field on a model object, run this function on each
     * value to prepare it for insertion into the db. Generally this converts
     * the validated input on the model object into the format used in the DB.
     *
     * @param mixed $value_of_field_on_model_object
     * @return mixed
     */
    public function prepare_for_use_in_db($value_of_field_on_model_object)
    {
        return $value_of_field_on_model_object;
    }


    /**
     * When creating a brand-new model object, or setting a particular value for one of its fields, this function
     * is called before setting it on the model object. We may want to strip slashes, unserialize the value, etc.
     * By default, we do nothing.
     * If the model field is going to perform any validation on the input, this is where it should be done
     * (once the value is on the model object, it may be used in other ways besides putting it into the DB
     * so it's best to validate it right away).
     *
     * @param mixed $value_inputted_for_field_on_model_object
     * @return mixed
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return $value_inputted_for_field_on_model_object;
    }


    /**
     * When instantiating a model object from DB results, this function is called before setting each field.
     * We may want to serialize the value, etc. By default, we return the value using prepare_for_set() method as that
     * is the one child classes will most often define.
     *
     * @param mixed $value_found_in_db_for_model_object
     * @return mixed
     */
    public function prepare_for_set_from_db($value_found_in_db_for_model_object)
    {
        return $this->prepare_for_set($value_found_in_db_for_model_object);
    }


    /**
     * When echoing a field's value on a model object, this function is run to prepare the value for presentation in a
     * webpage. For example, we may want to output floats with 2 decimal places by default, dates as "Monday Jan 12,
     * 2013, at 3:23pm" instead of
     * "8765678632", or any other modifications to how the value should be displayed, but not modified itself.
     *
     * @param mixed $value_on_field_to_be_outputted
     * @return mixed
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted)
    {
        return $value_on_field_to_be_outputted;
    }


    /**
     * Returns whatever is set as the nicename for the object.
     *
     * @return string
     */
    public function getSchemaDescription(): string
    {
        return $this->get_nicename();
    }


    /**
     * Returns whatever is set as the $_schema_type property for the object.
     * Note: this will automatically add 'null' to the schema if the object is_nullable()
     *
     * @return string|string[]
     */
    public function getSchemaType()
    {
        return $this->_schema_type;
    }


    /**
     * Sets the _schema_type property.  Child classes should call this in their constructors to override the default
     * state for this property.
     *
     * @param string|string[] $type
     * @throws InvalidArgumentException
     */
    protected function setSchemaType($type)
    {
        $this->_schema_type = [];
        foreach ((array) $type as $field_type) {
            SchemaType::validateSchemaType($field_type);
            $this->_schema_type[] = $field_type;
        }
        // if the field is nullable, then add null to the schema type, if it isn't already there
        if ($this->is_nullable() && ! in_array(SchemaType::NULL, $this->_schema_type, true)) {
            $this->_schema_type[] = SchemaType::NULL;
        }
        // if there is only one type, then just set that type, otherwise leave it as an array
        $this->_schema_type = count($this->_schema_type) === 1 ? $this->_schema_type[0] : $this->_schema_type;
    }


    /**
     * This is usually present when the $_schema_type property is SchemaType::OBJECT.  Any child classes will need to
     * override this method and return the properties for the schema. The reason this is not a property on the class is
     * because there may be filters set on the values for the property that won't be exposed on construct.  For example
     * enum type schemas may have the enum values filtered.
     *
     * @return array
     */
    public function getSchemaProperties(): array
    {
        return [];
    }


    /**
     * By default this returns the scalar default value that was sent in on the class prepped according to the class
     * type as the default.  However, when there are schema properties, then the default property is setup to mirror
     * the property keys and correctly prepare the default according to that expected property value. The getSchema
     * method validates whether the schema for default is setup correctly or not according to the schema type
     *
     * @return mixed
     */
    public function getSchemaDefault()
    {
        $default_value     = $this->prepare_for_use_in_db($this->prepare_for_set($this->get_default_value()));
        $schema_properties = $this->getSchemaProperties();

        // if this schema has properties than shape the default value to match the properties shape.
        if ($schema_properties) {
            $value_to_return = [];
            foreach ($schema_properties as $property_key => $property_schema) {
                switch ($property_key) {
                    case 'pretty':
                    case 'rendered':
                        $value_to_return[ $property_key ] =
                            $this->prepare_for_pretty_echoing($this->prepare_for_set($default_value));
                        break;
                    default:
                        $value_to_return[ $property_key ] = $default_value;
                        break;
                }
            }
            $default_value = $value_to_return;
        }
        return $default_value;
    }


    /**
     * If a child class has enum values, they should override this method and provide a simple array
     * of the enum values.
     * The reason this is not a property on the class is because there may be filterable enum values that
     * are set on the instantiated object that could be filtered after construct.
     *
     * @return array
     */
    public function getSchemaEnum(): array
    {
        return [];
    }


    /**
     * This returns the value of the $_schema_format property on the object.
     *
     * @return string
     */
    public function getSchemaFormat(): string
    {
        return $this->_schema_format;
    }


    /**
     * Sets the schema format property.
     *
     * @param string $format
     * @throws InvalidArgumentException
     */
    protected function setSchemaFormat(string $format)
    {
        SchemaFormat::validateSchemaFormat($format);
        $this->_schema_format = $format;
    }


    /**
     * This returns the value of the $_schema_readonly property on the object.
     *
     * @return bool
     */
    public function getSchemaReadonly(): bool
    {
        return $this->_schema_readonly;
    }


    /**
     * This sets the value for the $_schema_readonly property.
     *
     * @param bool $readonly (only explicit boolean values are accepted)
     */
    protected function setSchemaReadOnly(bool $readonly)
    {
        $this->_schema_readonly = $readonly;
    }


    /**
     * Return `%d`, `%s` or `%f` to indicate the data type for the field.
     *
     * @return string
     * @uses _get_wpdb_data_type()
     */
    public function get_wpdb_data_type(): string
    {
        return $this->_get_wpdb_data_type();
    }


    /**
     * Return `%d`, `%s` or `%f` to indicate the data type for the field that should be indicated in wpdb queries.
     *
     * @param string $type Included if a specific type is requested.
     * @return string
     * @uses get_schema_type()
     */
    protected function _get_wpdb_data_type(string $type = ''): string
    {
        $type = empty($type) ? $this->getSchemaType() : $type;
        // if type is an array, then different parsing is required.
        if (is_array($type)) {
            return WpdbDataFormat::getWpdbDataTypeForTypeArray($type);
        }
        if ($type === SchemaType::OBJECT) {
            $properties = $this->getSchemaProperties();
            if (isset($properties['raw'], $properties['raw']['type'])) {
                return WpdbDataFormat::getWpdbDataType($properties['raw']['type']);
            }
        }
        return WpdbDataFormat::getWpdbDataType($type);
    }


    protected function _get_wpdb_data_type_for_type_array($type): string
    {
        return WpdbDataFormat::getWpdbDataTypeForTypeArray((array) $type);
    }


    /**
     * This returns elements used to represent this field in the json schema.
     *
     * @link http://json-schema.org/
     * @return array
     */
    public function getSchema(): array
    {
        $schema = [
            'description' => $this->getSchemaDescription(),
            'type'        => $this->getSchemaType(),
            'readonly'    => $this->getSchemaReadonly(),
            'default'     => $this->getSchemaDefault(),
        ];

        // optional properties of the schema
        $enum       = $this->getSchemaEnum();
        $properties = $this->getSchemaProperties();
        $format     = $this->getSchemaFormat();
        if ($enum) {
            $schema['enum'] = $enum;
        }

        if ($properties) {
            $schema['properties'] = $properties;
        }

        if ($format) {
            $schema['format'] = $format;
        }
        return $schema;
    }


    /**
     * Some fields are in the database-only, (ie, used in queries etc), but shouldn't necessarily be part
     * of the model objects (ie, client code shouldn't care to ever see their value... if client code does
     * want to see their value, then they shouldn't be db-only fields!)
     * Eg, when doing events as custom post types, querying the post_type is essential, but
     * post_type is irrelevant for EE_Event objects (because they will ALL be of post_type 'esp_event').
     * By default, all fields aren't db-only.
     *
     * @return bool
     */
    public function is_db_only_field(): bool
    {
        return false;
    }
}
