<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use Exception;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class NodeGroupDao
 *
 * Used to store, retrieve, and delete a group of ModelObjNodes.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class NodeGroupDao
{
    /**
     * @since $VID:$
     * @return mixed|void
     */
    public function generateGroupCode()
    {
        return wp_generate_password(6, false);
    }

    /**
     * Gets the string we put in front of the WP Option name used to store the jobs.
     * @since $VID:$
     * @return string
     */
    private function getOptionPrefix()
    {
        return 'ee_deletion_';
    }

    /**
     * @since $VID:$
     * @param $code
     * @return ModelObjNode[]
     * @throws UnexpectedEntityException
     */
    public function getModelObjNodesInGroup($code)
    {
        if (! $code) {
            throw new Exception(esc_html__('We aren’t sure which job you are performing. Please press back in your browser and try again.', 'event_espresso'));
        }
        $deletion_data = get_option($this->getOptionPrefix() . $code, []);
        foreach ($deletion_data as $root) {
            if (! $root instanceof ModelObjNode) {
                throw new UnexpectedEntityException($root, 'ModelObjNode');
            }
        }
        return $deletion_data;
    }

    /**
     * Gets an array indicating what database rows are contained in the job.
     * Each top-level key is a model name, and its value is an array of IDs.
     * @since $VID:$
     * @param ModelObjNode[] $model_obj_nodes
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function getModelsAndIdsContainedIn($model_obj_nodes)
    {
        $models_and_ids_to_delete = [];
        foreach ($model_obj_nodes as $root) {
            $models_and_ids_to_delete = array_replace_recursive($models_and_ids_to_delete, $root->getIds());
        }
        return $models_and_ids_to_delete;
    }

    /**
     * Gets an array indicating what database rows are contained in the job.
     * Each top-level key is a model name, and its value is an array of IDs.
     * @since $VID:$
     * @param string $code
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UnexpectedEntityException
     */
    public function getModelsAndIdsFromGroup($code)
    {
        $model_obj_nodes = $this->getModelObjNodesInGroup($code);
        return $this->getModelsAndIdsContainedIn($model_obj_nodes);
    }

    /**
     * Persists the ModelObjNodes for future requests, using the code for reference.
     * @since $VID:$
     * @param ModelObjNode[] $model_obj_nodes
     * @param string $code
     * @return bool
     */
    public function persistModelObjNodesGroup($model_obj_nodes, $code)
    {
        return add_option(
            $this->getOptionPrefix() . $code,
            $model_obj_nodes,
            null,
            'no'
        );
    }

    /**
     * Forgets about the group of ModelObjNodes. Doesn't delete the rows in the database they reference though.
     * @since $VID:$
     * @param $code
     * @return bool
     */
    public function deleteModelObjNodesInGroup($code)
    {
        return delete_option($this->getOptionPrefix() . $code);
    }
}
// End of file NodeGroupDao.php
// Location: EventEspresso\core\services\orm\tree_traversal/NodeGroupDao.php
