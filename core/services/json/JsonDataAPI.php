<?php

namespace EventEspresso\core\services\json;

/**
 * Class JsonDataAPI
 * A class for accessing data nested within a JSON object
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\json
 * @since   $VID:$
 */
class JsonDataAPI
{
    /**
     * @var int
     */
    protected $drill_down_depth;

    /**
     * @var array
     */
    protected $json_data;

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;


    /**
     * @param string $json_data JSON
     */
    public function __construct(string $json_data, $drill_down_depth = 24)
    {
        $this->json_data_handler = new JsonDataHandler();
        $this->json_data_handler->configure(JsonDataHandler::DATA_TYPE_ARRAY);
        $this->json_data        = $this->json_data_handler->decodeJson($json_data);
        $drill_down_depth       = absint($drill_down_depth);
        $this->drill_down_depth = $drill_down_depth ?: 24;
    }


    /**
     * @param string $path dot separated path (like object dot notation) ex: "path.to.deeply.nested.data"
     * @return mixed|null
     */
    public function get(string $path)
    {
        return $this->drillDown(explode('.', $path), $this->json_data, $this->drill_down_depth);
    }


    /**
     * recursively drills directly down through the array until the target is found, else null is returned
     *
     * @param array $keys path as an array of keys, ex: ["path", "to", "deeply", "nested", "data"]
     * @param array $data the data array at the current path position
     * @return mixed|null
     */
    private function drillDown(array $keys, array $data, $depth)
    {
        $depth--;
        $key = array_shift($keys);
        if ($key === null || ! array_key_exists($key, $data)) {
            return null;
        }
        return $depth > 0 && count($keys)
            ? $this->drillDown($keys, $data[ $key ], $depth)
            : $data[ $key ];
    }


    /**
     * @return array
     */
    public function jsonData(): array
    {
        return $this->json_data;
    }
}
