<?php

namespace EventEspresso\core\services\graphql\types;

use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
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
    public function name();


    /**
     * @return string
     */
    public function description();


    /**
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function fields();


    /**
     * Creates a key map for internal resolver.
     *
     * @return array
     * @since $VID:$
     */
    public function getFieldsForResolver();


    /**
     * @return bool
     */
    public function isCustomPostType();


    /**
     * @param int $value
     * @return int
     * @since $VID:$
     */
    public function parseInfiniteValue($value);


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
    public function resolveField($source, $args, AppContext $context, ResolveInfo $info);


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
    public function resolveFromPayload($payload, $args, AppContext $context);
}
