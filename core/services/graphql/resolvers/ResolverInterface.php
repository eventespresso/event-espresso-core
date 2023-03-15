<?php

namespace EventEspresso\core\services\graphql\resolvers;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Interface ResolverInterface
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface ResolverInterface
{
    /**
     * @param             $source
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return mixed
     * @since 5.0.0.p
     */
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info);
}
