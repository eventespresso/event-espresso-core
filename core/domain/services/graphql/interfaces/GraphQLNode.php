<?php

namespace EventEspresso\core\domain\services\graphql\interfaces;

use GraphQL\Type\Definition\Type;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\interfaces\GraphQLInterface;

class GraphQLNode extends GraphQLInterface
{
    protected function getShortName(): string
    {
        return 'Node';
    }

    protected function getArrayOfFields(): array
    {
        return [
            new GraphQLOutputField(
                'id',
                Type::nonNull(Type::string()),
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'dbId',
                Type::nonNull(Type::string()),
                'ID',
                esc_html__('Database table ID', 'event_espresso')
            ),
        ];
    }
}
