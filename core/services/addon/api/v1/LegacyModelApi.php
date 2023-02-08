<?php

namespace EventEspresso\core\services\addon\api\v1;

class LegacyModelApi
{
    /**
     * @var string path to EE_* entity classes
     */
    private $entity_classes;

    /**
     * @var string path to EEM_* entity model classes
     */
    private $entity_models;

    /**
     * @var string path to EEE_* entity class extensions
     */
    private $entity_class_extensions;

    /**
     * @var string path to EEME_* entity model class extensions
     */
    private $entity_model_extensions;


    /**
     * @return string
     */
    public function entityClasses()
    {
        return $this->entity_classes;
    }


    /**
     * @param string $entity_classes
     * @return void
     */
    public function addEntityClasses($entity_classes)
    {
        $this->entity_classes = $entity_classes;
    }


    /**
     * @return string
     */
    public function entityModels()
    {
        return $this->entity_models;
    }


    /**
     * @param string $entity_models
     * @return void
     */
    public function addEntityModels($entity_models)
    {
        $this->entity_models = $entity_models;
    }


    /**
     * @return string
     */
    public function entityClassExtensions()
    {
        return $this->entity_class_extensions;
    }


    /**
     * @param string $entity_class_extensions
     * @return void
     */
    public function addEntityClassExtensions($entity_class_extensions)
    {
        $this->entity_class_extensions = $entity_class_extensions;
    }


    /**
     * @return string
     */
    public function entityModelExtensions()
    {
        return $this->entity_model_extensions;
    }


    /**
     * @param string $entity_model_extensions
     * @return void
     */
    public function addEntityModelExtensions($entity_model_extensions)
    {
        $this->entity_model_extensions = $entity_model_extensions;
    }
}
