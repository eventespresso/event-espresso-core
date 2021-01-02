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
    public function entityClasses(): string
    {
        return $this->entity_classes;
    }


    /**
     * @param string $entity_classes
     */
    public function addEntityClasses(string $entity_classes): void
    {
        $this->entity_classes = $entity_classes;
    }


    /**
     * @return string
     */
    public function entityModels(): string
    {
        return $this->entity_models;
    }


    /**
     * @param string $entity_models
     */
    public function addEntityModels(string $entity_models): void
    {
        $this->entity_models = $entity_models;
    }


    /**
     * @return string
     */
    public function entityClassExtensions(): string
    {
        return $this->entity_class_extensions;
    }


    /**
     * @param string $entity_class_extensions
     */
    public function addEntityClassExtensions(string $entity_class_extensions): void
    {
        $this->entity_class_extensions = $entity_class_extensions;
    }


    /**
     * @return string
     */
    public function entityModelExtensions(): string
    {
        return $this->entity_model_extensions;
    }


    /**
     * @param string $entity_model_extensions
     */
    public function addEntityModelExtensions(string $entity_model_extensions): void
    {
        $this->entity_model_extensions = $entity_model_extensions;
    }
}
