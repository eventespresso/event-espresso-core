<?php

namespace EventEspresso\core\services\graphql\interfaces;

use EE_Error;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

abstract class GraphQLInterface implements GraphQLInterfaceInterface
{
    protected string $namespace = 'Espresso';

    protected string $name;

    /**
     * @var GraphQLFieldInterface[]
     */
    protected array $fields;

    public function __construct()
    {
        $this->name = $this->namespace . $this->getShortName();

        $this->fields = $this->validateFields($this->getArrayOfFields());
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return '';
    }

    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    /**
     * Get GraphQL interface name *without* namespace prefix
     */
    abstract protected function getShortName(): string;

    /**
     * @return GraphQLFieldInterface[]
     */
    abstract protected function getArrayOfFields(): array;


    /**
     * @param mixed[] $array
     * @return GraphQLFieldInterface[]
     */
    protected function validateFields(array $array): array
    {
        foreach ($array as $field) {
            if (! ($field instanceof GraphQLFieldInterface)) {
                throw new EE_Error(esc_html__(sprintf('GraphQL interface %1$s expects its fields to be instance of %2$s', $this->name, GraphQLFieldInterface::class), 'event_espresso'));
            }
        }

        return $array;
    }
}
