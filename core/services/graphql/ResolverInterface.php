<?php

namespace EventEspresso\core\services\graphql;

use WPGraphQL\AppContext;
use WPGraphQL\ResolveInfo;

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
     * @return string
     * @since $VID:$
     */
    public function query();

    /**
     * @return string
     * @since $VID:$
     */
    public function field();

    /**
     * @return string
     * @since $VID:$
     */
    public function type();

    /**
     * @param             $root
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return mixed
     * @since $VID:$
     */
    public function resolve($root, array $args, AppContext $context, ResolveInfo $info);
}