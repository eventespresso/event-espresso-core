<?php

namespace EventEspresso\core\services\graphql\fields;

use EE_Base_Class;
use GraphQL\Type\Definition\ResolveInfo;
use LogicException;
use WPGraphQL\AppContext;

/**
 * Class GraphQLField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
interface GraphQLFieldInterface
{

    /**
     * @return array
     */
    public function caps();


    /**
     * @return string
     */
    public function description();


    /**
     * @return string
     */
    public function key();


    /**
     * @return string
     */
    public function name();


    /**
     * @return string|string[]
     */
    public function type();


    /**
     * Convert the field to array to be
     * able to pass as config to WP GraphQL
     *
     * @return array
     */
    public function toArray();


    /**
     * Whether the field should be used for
     * mutation inputs.
     *
     * @return bool
     */
    public function useForInput();


    /**
     * Whether the field should be used for
     * query outputs.
     *
     * @return bool
     */
    public function useForOutput();


    /**
     * Whether the field should resolve
     * based on the user caps etc.
     *
     * @return boolean
     */
    public function shouldResolve();


    /**
     * Whether the field has an explicit resolver set.
     *
     * @return boolean
     */
    public function hasInternalResolver();


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
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info);


    /**
     * Checks if the format callback is set.
     * If yes, then uses it to format the value.
     *
     * @param mixed         $value
     * @param EE_Base_Class $source
     * @return mixed The formatted value.
     */
    public function mayBeFormatValue($value, EE_Base_Class $source);
}
