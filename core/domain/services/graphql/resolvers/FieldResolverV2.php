<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Base_Class;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;
use EventEspresso\core\services\graphql\resolvers\ResolverBase;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

class FieldResolverV2 extends ResolverBase
{
    /**
     * @var GraphQLFieldInterface[]
     */
    protected array $fields;

    use StatelessResolver;

    /**
     * @param GraphQLFieldInterface[] $fields
     */
    public function __construct(array $fields)
    {
        $this->fields = $this->fieldsToArray($fields);
    }

    /**
     * @param GraphQLFieldInterface[] $fields
     */
    protected function fieldsToArray(array $fields): array
    {
        $array = [];
        foreach ($fields as $f) {
            $array[ $f->name() ] = $f;
        }
        return $array;
    }

    public function resolve(
        $source,
        array $args,
        AppContext $context,
        ResolveInfo $info
    ) {
        $field = $this->findField($info);

        if (! $field || ! $field->shouldResolve()) {
            return null;
        }

        if ($field->hasInternalResolver()) {
            return $field->resolve($source, $args, $context, $info);
        }

        if (! ($source instanceof EE_Base_Class)) {
            return null;
        }

        if (! is_null($field->key())) {
            return $field->mayBeFormatValue($source->{$field->key()}(), $source);
        }

        switch ($field->name()) {
            case 'id':
                return $this->resolveId($source);
            case 'cacheId':
                return $this->resolveCacheId($source);
            case 'parent':
                return $this->resolveParent($source);
            case 'event':
                return $this->resolveEvent($source, $context);
            case 'wpUser':
            case 'manager':
                return $this->resolveWpUser($source, $context);
            case 'userId';
                return $this->resolveUserId($source);
            case 'state':
                return $this->resolveState($source);
            case 'country':
                return $this->resolveCountry($source);
        }

        return null;
    }

    protected function findField(ResolveInfo $info)
    {
        $key = $info->fieldName;

        if (! isset($this->fields[ $key ])) {
            return false;
        }

        return $this->fields[ $key ];
    }
}
