<?php

namespace EventEspresso\core\domain\services\graphql\data\loaders;

use EE_Error;
use EEM_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use Exception;
use InvalidArgumentException;
use WPGraphQL\Data\Loader\AbstractDataLoader;

/**
 * Class AbstractLoader
 */
abstract class AbstractLoader extends AbstractDataLoader
{
    protected $primaryKey;

    /**
     * @return EEM_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    abstract protected function getQuery(): EEM_Base;

    /**
     * @param array $keys
     * @return array
     */
    abstract protected function getWhereParams(array $keys): array;

    /**
     * Given array of keys, loads and returns a map consisting of keys from `keys` array and loaded
     * values
     *
     * Note that order of returned values must match exactly the order of keys.
     * If some entry is not available for given key - it must include null for the missing key.
     *
     * For example:
     * loadKeys(['a', 'b', 'c']) -> ['a' => 'value1, 'b' => null, 'c' => 'value3']
     *
     * @param array $keys
     *
     * @return array
     * @throws Exception
     */
    public function loadKeys(array $keys): array
    {
        if (empty($keys)) {
            return $keys;
        }

        $args = [
            $this->getWhereParams($keys),
        ];

        $query = $this->getQuery();
        $result = $query->get_all($args);

        $loadedItems = [];

        /**
         * Loop over the items and return an array of loaded items,
         * where the key is the ID and the value is the Object passed through
         * the model layer.
         */
        foreach ($keys as $key) {
            if (isset($result[ $key ])) {
                $loadedItems[ $key ] = $result[ $key ];
            } else {
                $loadedItems[ $key ] = null;
            }
        }
        return $loadedItems;
    }
}
