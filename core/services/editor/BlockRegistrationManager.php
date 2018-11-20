<?php

namespace EventEspresso\core\services\editor;

use EventEspresso\core\domain\entities\editor\BlockCollection;
use EventEspresso\core\domain\entities\editor\BlockInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\BlockAssetManagerCollection;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\route_match\RouteMatchSpecificationManager;
use Exception;
use WP_Block_Type;

/**
 * Class BlockRegistrationManager
 * Loads BlockInterface classes into the injected BlockCollection,
 * which can be used in other classes by retrieving it from EE's Loader.
 * After loading, the BlockManager gets each Block to register
 * its block type and ensures assets are enqueued at the appropriate time
 *
 * @package EventEspresso\core\domain\services\editor
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class BlockRegistrationManager extends BlockManager
{

    /**
     * @var BlockAssetManagerCollection $block_asset_manager_collection
     */
    protected $block_asset_manager_collection;

    /**
     * @var RouteMatchSpecificationManager $route_manager
     */
    protected $route_manager;

    /**
     * array for tracking asset managers required by blocks for the current route
     *
     * @var array $block_asset_managers
     */
    protected $block_asset_managers = array();


    /**
     * BlockRegistrationManager constructor.
     *
     * @param BlockAssetManagerCollection    $block_asset_manager_collection
     * @param BlockCollection                $blocks
     * @param RouteMatchSpecificationManager $route_manager
     * @param RequestInterface               $request
     */
    public function __construct(
        BlockAssetManagerCollection $block_asset_manager_collection,
        BlockCollection $blocks,
        RouteMatchSpecificationManager $route_manager,
        RequestInterface $request
    ) {
        $this->block_asset_manager_collection = $block_asset_manager_collection;
        $this->route_manager = $route_manager;
        parent::__construct($blocks, $request);
    }


    /**
     *  Returns the name of a hookpoint to be used to call initialize()
     *
     * @return string
     */
    public function initHook()
    {
        return 'AHEE__EE_System__initialize';
    }


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     * @throws Exception
     */
    public function initialize()
    {
        $this->initializeBlocks();
        add_action('AHEE__EE_System__initialize_last', array($this, 'registerBlocks'));
        add_action('wp_loaded', array($this, 'unloadAssets'));
        add_filter('block_categories', array($this, 'addEspressoBlockCategories'));
    }


    /**
     * @param array $categories
     * @since 4.9.71.p
     * @return array
     */
    public function addEspressoBlockCategories(array $categories)
    {
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => 'event-espresso',
                    'title' => esc_html__('Event Espresso', 'event_espresso'),
                ),
            )
        );
    }


    /**
     * @return CollectionInterface|BlockInterface[]
     * @throws CollectionLoaderException
     * @throws CollectionDetailsException
     */
    protected function populateBlockCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
                // collection name
                'editor_blocks',
                // collection interface
                'EventEspresso\core\domain\entities\editor\BlockInterface',
                // FQCNs for classes to add (all classes within each namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_editor_BlockManager__populateBlockCollection__collection_FQCNs',
                    array('EventEspresso\core\domain\entities\editor\blocks')
                ),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            ),
            $this->blocks
        );
        return $loader->getCollection();
    }


    /**
     * populates the BlockCollection and calls initialize() on all installed blocks
     *
     * @return void
     * @throws Exception
     */
    public function initializeBlocks()
    {
        try {
            $this->populateBlockCollection();
            // cycle thru block loaders and initialize each loader
            foreach ($this->blocks as $block) {
                $block->initialize();
                $this->trackAssetManagersForBlocks($block);
                if (! $this->block_asset_manager_collection->has($block->assetManager())) {
                    $this->block_asset_manager_collection->add($block->assetManager());
                    $block->assetManager()->setAssetHandles();
                }
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * track blocks with routes that match the current request
     *
     * @param BlockInterface $block
     * @throws InvalidClassException
     */
    private function trackAssetManagersForBlocks(BlockInterface $block)
    {
        $supported_routes = $block->supportedRoutes();
        foreach ($supported_routes as $supported_route) {
            if ($this->route_manager->routeMatchesCurrentRequest($supported_route)) {
                $this->block_asset_managers[ $block->blockType() ] = $block->assetManager()->assetNamespace();
            }
        }
    }


    /**
     * returns true if the block should be registered for the current request
     * else removes block from block_routes array and returns false
     *
     * @param BlockInterface $block
     * @return boolean
     * @throws InvalidClassException
     */
    public function matchesRoute(BlockInterface $block)
    {
        if (isset($this->block_asset_managers[ $block->blockType() ])) {
            return true;
        }
        unset($this->block_asset_managers[ $block->blockType() ]);
        return false;
    }


    /**
     * calls registerBlock() and load assets for all installed blocks
     *
     * @return void
     * @throws Exception
     */
    public function registerBlocks()
    {
        try {
            // cycle thru block loader folders
            foreach ($this->blocks as $block) {
                if (! $this->matchesRoute($block)) {
                    continue;
                }
                // perform any setup required for the block
                $block_type = $block->registerBlock();
                if (! $block_type instanceof WP_Block_Type) {
                    throw new InvalidEntityException($block_type, 'WP_Block_Type');
                }
                do_action(
                    'FHEE__EventEspresso_core_services_editor_BlockManager__registerBlocks__block_type_registered',
                    $block,
                    $block_type
                );
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }

    public function unloadAssets()
    {
        $assets = array_flip($this->block_asset_managers);
        foreach ($this->block_asset_manager_collection as $asset_manager) {
            // if there are no longer any blocks that require these assets,
            if (! isset($assets[ $asset_manager->assetNamespace() ])) {
                // then unset asset enqueueing and bail
                remove_action('wp_enqueue_scripts', array($asset_manager, 'addManifestFile'), 0);
                remove_action('admin_enqueue_scripts', array($asset_manager, 'addManifestFile'), 0);
                remove_action('wp_enqueue_scripts', array($asset_manager, 'addAssets'), 2);
                remove_action('admin_enqueue_scripts', array($asset_manager, 'addAssets'), 2);
            }
        }
    }
}
