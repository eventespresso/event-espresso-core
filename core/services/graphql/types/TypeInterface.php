<?php

namespace EventEspresso\core\services\graphql\types;

use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\AppContext;

/**
 * Class TypeBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface TypeInterface
{
    /**
     * @return string
     */
    public function name(): string;


    /**
     * @return string
     */
    public function description(): string;


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function fields(): array;


    /**
     * Creates a key map for internal resolver.
     *
     * @return array
     * @since $VID:$
     */
    public function getFieldsForResolver(): array;


    /**
     * @return bool
     */
    public function isCustomPostType(): bool;


    /**
     * @param int|float $value
     * @return int
     * @since $VID:$
     */
    public function parseInfiniteValue($value): int;


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
    public function resolveField($source, array $args, AppContext $context, ResolveInfo $info);


    /**
     * @param mixed      $payload The payload returned after mutation
     * @param array      $args    The inputArgs on the field
     * @param AppContext $context The AppContext passed down the GraphQL tree
     * @return string|null
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveFromPayload($payload, array $args, AppContext $context);
}
