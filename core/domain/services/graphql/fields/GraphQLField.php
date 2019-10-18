<?php

namespace EventEspresso\core\domain\services\graphql\fields;

use GraphQL\Type\Definition\ResolveInfo;
use LogicException;
use WPGraphQL\AppContext;

/**
 * Class GraphQLField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class GraphQLField
{

    /**
     * @var array $caps
     */
    protected $caps;

    /**
     * @var string $description
     */
    protected $description;

    /**
     * @var callable $formatter
     */
    protected $formatter;

    /**
     * @var string|null $key
     */
    protected $key;

    /**
     * @var string $name
     */
    protected $name;

    /**
     * @var callable $resolve
     */
    protected $resolver;

    /**
     * @var string|string[] $type
     */
    protected $type;


    /**
	 * @param string          $name
	 * @param string|string[] $type
     * @param string|null     $key
     * @param string          $description
     * @param callable|null   $formatter
     * @param callable|null   $resolver
     * @param array           $caps
     */
    public function __construct(
		$name,
        $type,
        $key = null,
        $description = '',
        callable $formatter = null,
        callable $resolver = null,
        array $caps = []
    ) {
        $this->key = $key;
        $this->name = $name;
        $this->type = $type;
        $this->description = $description;
        $this->formatter = $formatter;
        $this->resolver = $resolver;
        $this->caps = $caps;
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
     * @param mixed $value
     * @return mixed The formatted value.
     */
    public function mayBeFormatValue($value)
    {
        if (is_callable($this->formatter)) {
            // dynamic methods using $this don't play nice
            // so capture formatter to a single var first
            $formatter = $this->formatter;
            return $formatter($value);
        }
        return $value;
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
}
