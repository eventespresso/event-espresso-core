<?php

namespace EventEspresso\core\services\graphql;

use Exception;
use RuntimeException;
use WPGraphQL\Registry\TypeRegistry;
use EventEspresso\core\services\graphql\interfaces\GraphQLInterface;
use EventEspresso\core\services\graphql\interfaces\InterfaceCollection;
use EventEspresso\core\services\graphql\interfaces\GraphQLInterfaceInterface;

class InterfaceManager implements GQLManagerInterface
{
    /**
     * @var InterfaceCollection|GraphQLInterface[]
     */
    protected InterfaceCollection $interfaces;

    /**
     * Method name used for resolving fields
     */
    protected string $methodName = 'resolveField';


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
                    'fields' => $this->fieldsToArray($interface),
                ]
            );
        }
    }

    /**
     * Convert an array of GraphQLFieldInterface into compatible format with WPGraphQL
     * @param GraphQLInterfaceInterface $interface
     * @return array
     */
    protected function fieldsToArray(GraphQLInterfaceInterface $interface): array
    {
        $this->validateMethodResolve($interface);
        $array = [];
        foreach ($interface->getFields() as $f) {
            $name = $f->name();
            $array[ $name ] = $f->toArray();
            if ($f->useForOutput()) {
                $array[ $name ]['resolve'] = [$interface, $this->methodName];
            }
        }
        return $array;
    }

    protected function validateMethodResolve(GraphQLInterfaceInterface $interface): void
    {
        if (! is_callable([$interface, $this->methodName])) {
            throw new RuntimeException(
                __(
                    sprintf(
                        'GraphQL interface "%1$s" has no accessible method "%2$s"!',
                        get_class($interface),
                        $this->methodName
                    ),
                    'event_espresso'
                )
            );
        }
    }
}
