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
        $slug,
        $name,
        $namespace,
        $version,
        $min_core_version,
        $main_file
    ) {
        $slug = (string) $slug;
        $name = (string) $name;
        $namespace = (string) $namespace;
        $version = (string) $version;
        $min_core_version = (string) $min_core_version;
        $main_file = (string) $main_file;
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
    public function dataMigrationScripts()
    {
        return $this->data_migration_api->dataMigrationScripts();
    }


    /**
     * @param string $data_migration_scripts
     * @return void
     */
    public function addDataMigrationScripts($data_migration_scripts)
    {
        $this->data_migration_api->addDataMigrationScripts($data_migration_scripts);
    }


    /**
     * @return string
     */
    public function entityClasses()
    {
        return $this->legacy_model_api->entityClasses();
    }


    /**
     * @param string $entity_classes
     * @return void
     */
    public function addEntityClasses($entity_classes)
    {
        $this->legacy_model_api->addEntityClasses($entity_classes);
    }


    /**
     * @return string
     */
    public function entityModels()
    {
        return $this->legacy_model_api->entityModels();
    }


    /**
     * @param string $entity_models
     * @return void
     */
    public function addEntityModels($entity_models)
    {
        $this->legacy_model_api->addEntityModels($entity_models);
    }


    /**
     * @return string
     */
    public function entityClassExtensions()
    {
        return $this->legacy_model_api->entityClassExtensions();
    }


    /**
     * @param string $entity_class_extensions
     * @return void
     */
    public function addEntityClassExtensions($entity_class_extensions)
    {
        $this->legacy_model_api->addEntityClassExtensions($entity_class_extensions);
    }


    /**
     * @return string
     */
    public function entityModelExtensions()
    {
        return $this->legacy_model_api->entityModelExtensions();
    }


    /**
     * @param string $entity_model_extensions
     * @return void
     */
    public function addEntityModelExtensions($entity_model_extensions)
    {
        $this->legacy_model_api->addEntityModelExtensions($entity_model_extensions);
    }
}
