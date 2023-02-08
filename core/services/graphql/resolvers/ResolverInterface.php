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
 * @since   $VID:$
 */
interface ResolverInterface
{
    /**
     * @param             $source
     * @param array       $args
     * @param \WPGraphQL\AppContext $context
     * @param \GraphQL\Type\Definition\ResolveInfo $info
     * @return mixed
     * @since $VID:$
     */
    public function resolve($source, $args, $context, $info);
}
