<?php

namespace EventEspresso\core\services\graphql;

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
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return mixed
     * @since $VID:$
     */
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info);
}