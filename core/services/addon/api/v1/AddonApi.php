<?php

namespace EventEspresso\core\services\addon\api\v1;

use EventEspresso\core\services\addon\api\AddonApiVersion;

class AddonApi extends AddonApiVersion
{

    /**
     * @var DataMigrationApi
     */
    private $data_migration_api;

    /**
     * @var LegacyModelApi
     */
    private $legacy_model_api;


    /**
     * Bootstrap constructor.
     *
     * @param string $slug
     * @param string $name
     * @param string $namespace
     * @param string $version
     * @param string $min_core_version
     * @param string $main_file
     */
    public function __construct(
        string $slug,
        string $name,
        string $namespace,
        string $version,
        string $min_core_version,
        string $main_file
    ) {
        parent::__construct(
            $slug,
            $name,
            $namespace,
            $version,
            $min_core_version,
            $main_file,
            AddonApiVersion::V1
        );
        $this->legacy_model_api = new LegacyModelApi();
        $this->data_migration_api = new DataMigrationApi();
    }


    /**
     * @return string
     */
    public function dataMigrationScripts(): string
    {
        return $this->data_migration_api->dataMigrationScripts();
    }


    /**
     * @param string $data_migration_scripts
     */
    public function addDataMigrationScripts(string $data_migration_scripts): void
    {
        $this->data_migration_api->addDataMigrationScripts($data_migration_scripts);
    }


    /**
     * @return string
     */
    public function entityClasses(): string
    {
        return $this->legacy_model_api->entityClasses();
    }


    /**
     * @param string $entity_classes
     */
    public function addEntityClasses(string $entity_classes): void
    {
        $this->legacy_model_api->addEntityClasses($entity_classes);
    }


    /**
     * @return string
     */
    public function entityModels(): string
    {
        return $this->legacy_model_api->entityModels();
    }


    /**
     * @param string $entity_models
     */
    public function addEntityModels(string $entity_models): void
    {
        $this->legacy_model_api->addEntityModels($entity_models);
    }


    /**
     * @return string
     */
    public function entityClassExtensions(): string
    {
        return $this->legacy_model_api->entityClassExtensions();
    }


    /**
     * @param string $entity_class_extensions
     */
    public function addEntityClassExtensions(string $entity_class_extensions): void
    {
        $this->legacy_model_api->addEntityClassExtensions($entity_class_extensions);
    }


    /**
     * @return string
     */
    public function entityModelExtensions(): string
    {
        return $this->legacy_model_api->entityModelExtensions();
    }


    /**
     * @param string $entity_model_extensions
     */
    public function addEntityModelExtensions(string $entity_model_extensions): void
    {
        $this->legacy_model_api->addEntityModelExtensions($entity_model_extensions);
    }
}
