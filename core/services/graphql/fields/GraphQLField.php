<?php

namespace EventEspresso\core\services\graphql\fields;

use EE_Base_Class;
use GraphQL\Type\Definition\ResolveInfo;
use LogicException;
use WPGraphQL\AppContext;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class GraphQLField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class GraphQLField implements GraphQLFieldInterface
{

    /**
     * @var string $name
     */
    protected $name;

    /**
     * @var string|string[] $type
     */
    protected $type;

    /**
     * @var string|null $key
     */
    protected $key;

    /**
     * @var string $description
     */
    protected $description;

    /**
     * @var callable $formatter
     */
    protected $formatter;

    /**
     * @var callable $resolve
     */
    protected $resolver;

    /**
     * @var array $args
     */
    protected $args;

    /**
     * @var array $caps
     */
    protected $caps;

    /**
     * @var bool $use_for_input
     */
    protected $use_for_input = true;

    /**
     * @var bool $use_for_output
     */
    protected $use_for_output = true;


    /**
     * @param string          $name
     * @param string|string[] $type
     * @param string|null     $key
     * @param string          $description
     * @param callable|null   $formatter
     * @param callable|null   $resolver
     * @param array           $args
     * @param array           $caps
     */
    public function __construct(
        $name,
        $type,
        $key = null,
        $description = '',
        callable $formatter = null,
        callable $resolver = null,
        array $args = [],
        array $caps = []
    ) {
        $this->name = $name;
        $this->type = $type;
        $this->key = $key;
        $this->description = $description;
        $this->formatter = $formatter;
        $this->resolver = $resolver;
        $this->args = $args;
        $this->caps = $caps;
    }


    /**
     * @return array
     */
    public function args()
    {
        return $this->args;
    }


    /**
     * @return array
     */
    public function caps()
    {
        return $this->caps;
    }


    /**
     * @return string
     */
    public function description()
    {
        return $this->description;
    }


    /**
     * @return string
     */
    public function key()
    {
        return $this->key;
    }


    /**
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * @return string|string[]
     */
    public function type()
    {
        return $this->type;
    }


    /**
     * Convert the field to array to be
     * able to pass as config to WP GraphQL
     *
     * @return array
     */
    public function toArray()
    {
        return get_object_vars($this);
    }


    /**
     * Sets the value for use_for_input.
     *
     * @param bool $use_for_input
     */
    protected function setUseForInput($use_for_input)
    {
        $this->use_for_input = filter_var($use_for_input, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Whether the field should be used for
     * mutation inputs.
     *
     * @return bool
     */
    public function useForInput()
    {
        return (bool) $this->use_for_input;
    }


    /**
     * Whether the field should be used for
     * query outputs.
     *
     * @return bool
     */
    public function useForOutput()
    {
        return (bool) $this->use_for_output;
    }


    /**
     * Sets the value for use_for_output
     *
     * @param bool $use_for_output
     */
    protected function setUseForOutput($use_for_output)
    {
        $this->use_for_output = filter_var($use_for_output, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Whether the field should resolve
     * based on the user caps etc.
     *
     * @return boolean
     */
    public function shouldResolve()
    {
        foreach ($this->caps as $cap) {
            if (! current_user_can($cap)) {
                return false;
            }
        }
        return true;
    }


    /**
     * Whether the field has an explicit resolver set.
     *
     * @return boolean
     */
    public function hasInternalResolver()
    {
        return is_callable($this->resolver);
    }


    /**
     * Whether the field has an explicit resolver set.
     *
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return mixed
     * @throws LogicException
     */
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info)
    {
        if (! $this->hasInternalResolver()) {
            throw new LogicException('GraphQLField has no internal resolver.');
        }
        // dynamic methods using $this don't play nice
        // so capture resolver to a single var first
        $resolver = $this->resolver;
        return $resolver($source, $args, $context, $info);
    }


    /**
     * Checks if the format callback is set.
     * If yes, then uses it to format the value.
     *
     * @param mixed         $value
     * @param EE_Base_Class $source
     * @return mixed The formatted value.
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function mayBeFormatValue($value, EE_Base_Class $source)
    {
        if (is_callable($this->formatter)) {
            // dynamic methods using $this don't play nice
            // so capture formatter to a single var first
            $formatter = $this->formatter;
            return $formatter($value, $source);
        }
        return $value;
    }
}
