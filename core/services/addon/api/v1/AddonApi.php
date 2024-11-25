<?php

namespace EventEspresso\core\services\addon\api\v1;

use EventEspresso\core\Psr4Autoloader;
use EventEspresso\core\services\addon\api\AddonApiVersion;
use EventEspresso\core\services\addon\api\AddonRoutes;
use EventEspresso\core\services\addon\api\DependencyHandlers;

class AddonApi extends AddonApiVersion
{
    private DataMigrationApi $data_migration_api;

    private LegacyModelApi $legacy_model_api;


    /**
     * Bootstrap constructor.
     *
     * @param AddonRoutes        $addon_routes
     * @param DependencyHandlers $dependency_handlers
     * @param Psr4Autoloader     $psr4_loader
     * @param DataMigrationApi $data_migration_api
     * @param LegacyModelApi $legacy_model_api
     */
    public function __construct(
        AddonRoutes $addon_routes,
        DependencyHandlers $dependency_handlers,
        Psr4Autoloader $psr4_loader,
        DataMigrationApi $data_migration_api,
        LegacyModelApi $legacy_model_api
    ) {
        $this->data_migration_api = $data_migration_api;
        $this->legacy_model_api   = $legacy_model_api;
        parent::__construct($addon_routes, $dependency_handlers, $psr4_loader, AddonApiVersion::V1);
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
