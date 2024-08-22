<?php

namespace EventEspresso\core\services\graphql\interfaces;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

interface GraphQLInterfaceInterface
{
    public function getName(): string;

    public function getDescription(): string;

    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array;
}
