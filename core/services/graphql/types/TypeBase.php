<?php

namespace EventEspresso\core\services\graphql\types;

use EE_Error;
use EEM_Base;
use EE_Base_Class;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\domain\services\graphql\resolvers\FieldResolver;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Model\Post;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use WPGraphQL\Type\Object\RootQuery;
use DateTime;

/**
 * Class TypeBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class TypeBase implements TypeInterface
{

    /**
     * @var EEM_Base $model
     */
    protected $model;

    /**
     * @var string $name
     */
    protected $name = '';

    /**
     * @var string $description
     */
    protected $description = '';

    /**
     * @var GraphQLFieldInterface[] $fields
     */
    protected $fields = [];

    /**
     * @var array $graphql_to_model_map
     */
    protected $graphql_to_model_map = [];

    /**
     * @var FieldResolver $field_resolver
     */
    protected $field_resolver;

    /**
     * @var bool $is_custom_post_type
     */
    protected $is_custom_post_type = false;


    /**
     * TypeBase constructor.
     */
    public function __construct()
    {
        $this->setFields($this->getFields());
        $this->field_resolver = new FieldResolver(
            $this->model,
            $this->getFieldsForResolver()
        );
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    abstract protected function getFields();


    /**
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    protected function setName($name)
    {
        $this->name = $name;
    }


    /**
     * @return string
     */
    public function description()
    {
        return $this->description;
    }


    /**
     * @param string $description
     */
    protected function setDescription($description)
    {
        $this->description = $description;
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function fields()
    {
        return (array) $this->fields;
    }


    /**
     * @param GraphQLFieldInterface[] $fields
     */
    protected function setFields(array $fields)
    {
        foreach ($fields as $field) {
            if ($field instanceof GraphQLField) {
                $this->fields[] = $field;
            }
        }
    }


    /**
     * Creates a key map for internal resolver.
     *
     * @return array
     * @since $VID:$
     */
    public function getFieldsForResolver()
    {
        $fields = [];
        foreach ($this->fields() as $field) {
            if ($field->useForOutput()) {
                $fields[ $field->name() ] = $field;
            }
        }
        return $fields;
    }


    /**
     * @return bool
     */
    public function isCustomPostType()
    {
        return $this->is_custom_post_type;
    }


    /**
     * @param bool $is_custom_post_type
     */
    protected function setIsCustomPostType($is_custom_post_type)
    {
        $this->is_custom_post_type = filter_var($is_custom_post_type, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @param int $value
     * @return int
     * @since $VID:$
     */
    public function parseInfiniteValue($value)
    {
        $value = trim($value);
        return $value === null
               || $value === ''
               || $value === '&infin;'
               || $value === 'INF'
               || $value === INF
               || $value === EE_INF
               || is_infinite((float) $value)
            ? -1
            : $value;
    }


    /**
     * @param mixed $source
     * @return EE_Base_Class|null
     * @since $VID:$
     */
    private function getModel($source)
    {
        // If it comes from a custom connection
        // where the $source is already instantiated.
        if ($source instanceof EE_Base_Class) {
            return $source;
        }
        return $source instanceof Post ? $this->model->get_one_by_ID($source->ID) : null;
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveField($source, $args, AppContext $context, ResolveInfo $info)
    {
        $source = $source instanceof RootQuery ? $source : $this->getModel($source);

        return $this->field_resolver->resolve($source, $args, $context, $info);
    }


    /**
     * @param mixed      $payload The payload returned after mutation
     * @param array      $args    The inputArgs on the field
     * @param AppContext $context The AppContext passed down the GraphQL tree
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveFromPayload($payload, $args, AppContext $context)
    {
        if (empty($payload['id']) || ! absint($payload['id'])) {
            return null;
        }
        return $this->model->get_one_by_ID($payload['id']);
    }


    /**
     * Prepares a datetime value in ISO8601/RFC3339 format.
     * It is assumed that the value of $datetime is in the format
     * returned by EE_Base_Class::get_format().
     *
     * @param string        $datetime The datetime value.
     * @param EE_Base_Class $source   The source object.
     * @return string ISO8601/RFC3339 formatted datetime.
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function formatDatetime($datetime, EE_Base_Class $source)
    {
        $format   = $source->get_format();
        $datetime = DateTime::createFromFormat($format, $datetime);
        return $datetime->format(DateTime::RFC3339);
    }
}
