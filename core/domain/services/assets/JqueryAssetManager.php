<?php

namespace EventEspresso\core\domain\services\assets;

use EventEspresso\core\services\assets\AssetManager;

class JqueryAssetManager extends AssetManager
{
    const JS_HANDLE_JQUERY = 'jquery';

    const JS_HANDLE_JQUERY_COOKIE = 'jquery-cookie';

    const JS_HANDLE_JQUERY_VALIDATE = 'jquery-validate';

    const JS_HANDLE_JQUERY_VALIDATE_EXTRA = 'jquery-validate-extra-methods';

    const JS_HANDLE_JQUERY_UI_DATEPICKER = 'jquery-ui-datepicker';

    const JS_HANDLE_JQUERY_UI_DRAGGABLE = 'jquery-ui-draggable';

    const JS_HANDLE_JQUERY_UI_SLIDER = 'jquery-ui-slider';

    const JS_HANDLE_JQUERY_UI_SORTABLE = 'jquery-ui-sortable';

    const JS_HANDLE_JQUERY_UI_TIMEPICKER_ADDON = 'jquery-ui-timepicker-addon';



    /**
	 * @inheritDoc
	 */
	public function addAssets()
	{
        // register cookie script for future dependencies
        $this->addJavascript(
            JqueryAssetManager::JS_HANDLE_JQUERY_COOKIE,
            EE_THIRD_PARTY_URL . 'joyride/jquery.cookie.js',
            ['jquery'],
            true,
            '2.1'
        );

        $this->addJavascript(
            JqueryAssetManager::JS_HANDLE_JQUERY_VALIDATE,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js',
            array(JqueryAssetManager::JS_HANDLE_JQUERY),
            true,
            '1.15.0'
        )->setEnqueueImmediately();

        $this->addJavascript(
            JqueryAssetManager::JS_HANDLE_JQUERY_VALIDATE_EXTRA,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.additional-methods.min.js',
            array(JqueryAssetManager::JS_HANDLE_JQUERY_VALIDATE),
            true,
            '1.15.0'
        );

        $this->addJavascript(
            JqueryAssetManager::JS_HANDLE_JQUERY_UI_TIMEPICKER_ADDON,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery-ui-timepicker-addon.js',
            [
                JqueryAssetManager::JS_HANDLE_JQUERY_UI_DATEPICKER,
                JqueryAssetManager::JS_HANDLE_JQUERY_UI_SLIDER
            ]
        );
	}
}