<?php

namespace EventEspresso\core\services\graphql\interfaces;

use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

interface GraphQLInterfaceInterface
{
    public function getName(): string;

    public function getDescription(): string;

    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array;

    /**
     * @param mixed $source
     * @return mixed
     */
    public function resolveField($source, array $args, AppContext $context, ResolveInfo $info);
}
