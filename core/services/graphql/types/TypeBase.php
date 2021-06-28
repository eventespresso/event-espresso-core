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
use WPGraphQL\Type\ObjectType\RootQuery;
use DateTime;
use DateTimeZone;

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
     * @var string $namespace The graphql namespace/prefix.
     */
    protected $namespace = 'Espresso';

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
     *
     * @param EEM_Base|null $model
     */
    public function __construct(EEM_Base $model = null)
    {
        $this->model = $model;
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
    abstract protected function getFields(): array;


    /**
     * @return string
     */
    public function name(): string
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    protected function setName(string $name)
    {
        $this->name = $name;
    }


    /**
     * @return string
     */
    public function description(): string
    {
        return $this->description;
    }


    /**
     * @param string $description
     */
    protected function setDescription(string $description)
    {
        $this->description = $description;
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function fields(): array
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
    public function getFieldsForResolver(): array
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
    public function isCustomPostType(): bool
    {
        return $this->is_custom_post_type;
    }


    /**
     * @param bool $is_custom_post_type
     */
    protected function setIsCustomPostType(bool $is_custom_post_type)
    {
        $this->is_custom_post_type = filter_var($is_custom_post_type, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @param int|float $value
     * @return int
     * @since $VID:$
     */
    public function parseInfiniteValue($value): int
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
     * @throws EE_Error
     */
    private function getModel($source): ?EE_Base_Class
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
     * @return mixed
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveField($source, array $args, AppContext $context, ResolveInfo $info)
    {
        $source = $source instanceof RootQuery ? $source : $this->getModel($source);

        return $this->field_resolver->resolve($source, $args, $context, $info);
    }


    /**
     * @param mixed      $payload The payload returned after mutation
     * @param array      $args    The inputArgs on the field
     * @param AppContext $context The AppContext passed down the GraphQL tree
     * @return string|null
     * @throws EE_Error
     */
    public function resolveFromPayload($payload, array $args, AppContext $context)
    {
        if (empty($payload['id'])) {
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
     */
    public function formatDatetime(string $datetime, EE_Base_Class $source): string
    {
        $format   = $source->get_format();
        // create date object based on local timezone
        $datetime = DateTime::createFromFormat($format, $datetime, new DateTimeZone($source->get_timezone()));
        // change the timezone to UTC
        $datetime->setTimezone(new DateTimeZone('UTC'));

        return $datetime->format(DateTime::RFC3339);
    }
}
