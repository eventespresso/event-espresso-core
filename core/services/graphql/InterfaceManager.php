<?php

namespace EventEspresso\core\services\graphql;

use Exception;
use WPGraphQL\Registry\TypeRegistry;
use EventEspresso\core\services\graphql\interfaces\GraphQLInterface;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\interfaces\InterfaceCollection;

class InterfaceManager implements GQLManagerInterface
{
    /**
     * @var InterfaceCollection|GraphQLInterface[]
     */
    protected InterfaceCollection $interfaces;


    public function __construct(InterfaceCollection $interfaces)
    {
        $this->interfaces = $interfaces;
    }


    public function init(): void
    {
        $this->interfaces->loadInterfaces();
        add_action('graphql_register_types', [$this, 'callback']);
    }


    /**
     * @param TypeRegistry $registry
     * @return void
     * @throws Exception
     */
    public function callback(TypeRegistry $registry): void
    {
        foreach ($this->interfaces as $interface) {
            $registry->register_interface_type(
                $interface->getName(),
                [
                    'description' => $interface->getDescription(),
                    'fields' => $this->fieldsToArray($interface->getFields()),
                ]
            );
        }
    }

    /**
     * Convert an array of GraphQLFieldInterface into compatible format with WPGraphQL
     * @param GraphQLFieldInterface[] $fields
     * @return array
     */
    protected function fieldsToArray(array $fields): array
    {
        $array = [];
        foreach ($fields as $f) {
            $name = $f->name();
            $array[$name] = $f->toArray();
            if ($f->useForOutput()) {
                $array[$name]['resolve'] = [$f, 'resolve'];
            }
        }
        return $array;
    }
}
