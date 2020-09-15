<?php

namespace EventEspresso\core\services\assets;


/**
 * Class for loading parsing and retrieving data from an asset manifest file
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface AssetManifestInterface
{
	/**
	 * @return void
	 */
	public function initialize();


	/**
	 * @param string $manifest_path
	 */
	public function setManifestFilepath($manifest_path = '');


	/**
	 * @return array
	 */
	public function getAssetFiles();


	/**
	 * @return array
	 */
	public function getEntryPoints();


	/**
	 * @param string $entry_point
	 * @param string $type
	 * @return array
	 */
	public function getAssetDependencies($entry_point, $type = AssetManifest::ASSET_EXT_JS);


	/**
	 * @param string $entry_point
	 * @return array
	 */
	public function getAssetDetails($entry_point);


	/**
	 * @param string $entry_point
	 * @return string|int|false
	 */
	public function getAssetHandle($entry_point);


	/**
	 * @param string $entry_point
	 * @param string $type
	 * @return string
	 */
	public function getAssetPath($entry_point, $type = AssetManifest::ASSET_EXT_JS);


	/**
	 * @param string $entry_point
	 * @param string $type
	 * @return string
	 */
	public function getAssetUrl($entry_point, $type = AssetManifest::ASSET_EXT_JS);


	/**
	 * @param string $entry_point
	 * @param string $type
	 * @return string|int|false
	 */
	public function getAssetVersion($entry_point, $type = AssetManifest::ASSET_EXT_JS);


	/**
	 * @param string $entry_point
	 * @param string $type
	 * @return string
	 */
	public function hasAsset($entry_point, $type = AssetManifest::ASSET_EXT_JS);
}