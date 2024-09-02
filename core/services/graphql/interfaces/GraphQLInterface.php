<?php

namespace EventEspresso\core\services\graphql\interfaces;

use RuntimeException;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\domain\services\graphql\resolvers\FieldResolverV2;

abstract class GraphQLInterface implements GraphQLInterfaceInterface
{
    protected string $namespace = 'Espresso';

    protected string $name;

    protected FieldResolverV2 $resolver;

    /**
     * @var GraphQLFieldInterface[]
     */
    protected array $fields;

    public function __construct()
    {
        $this->name = $this->namespace . $this->getShortName();

        $this->validateFields($this->getArrayOfFields());

        $this->fields = $this->getArrayOfFields();

        $this->resolver = new FieldResolverV2($this->getArrayOfFields());
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
                throw new RuntimeException(esc_html__(sprintf('GraphQL interface %1$s expects its fields to be instance of %2$s', $this->name, GraphQLFieldInterface::class), 'event_espresso'));
            }
        }

        return $array;
    }

    public function resolveField($source, array $args, AppContext $context, ResolveInfo $info)
    {
        return $this->resolver->resolve($source, $args, $context, $info);
    }
}
