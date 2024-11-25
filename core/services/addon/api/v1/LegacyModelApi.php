<?php

namespace EventEspresso\core\services\addon\api\v1;

class LegacyModelApi
{
    /**
     * path to EE_* entity classes
     */
    private string $entity_classes = '';

    /**
     * path to EEM_* entity model classes
     */
    private string $entity_models = '';

    /**
     * path to EEE_* entity class extensions
     */
    private string $entity_class_extensions = '';

    /**
     * path to EEME_* entity model class extensions
     */
    private string $entity_model_extensions = '';


    public function entityClasses(): string
    {
        return $this->entity_classes;
    }


    public function addEntityClasses(string $entity_classes): void
    {
        $this->entity_classes = $entity_classes;
    }


    public function entityModels(): string
    {
        return $this->entity_models;
    }


    public function addEntityModels(string $entity_models): void
    {
        $this->entity_models = $entity_models;
    }


    public function entityClassExtensions(): string
    {
        return $this->entity_class_extensions;
    }


    public function addEntityClassExtensions(string $entity_class_extensions): void
    {
        $this->entity_class_extensions = $entity_class_extensions;
    }


    public function entityModelExtensions(): string
    {
        return $this->entity_model_extensions;
    }


    public function addEntityModelExtensions(string $entity_model_extensions): void
    {
        $this->entity_model_extensions = $entity_model_extensions;
    }
}
