<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;


/**
 * Returns an array of available template files
 *
 * @param $class_file
 * @return array
 * @deprecated 4.9.13
 */
function espresso_invoice_template_files($class_file)
{
    // read our template dir and build an array of files
    $directory_handle = opendir(dirname($class_file) . '/lib/templates/css/');

    /** @var RequestInterface $request */
    $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);

    $files = [];
    if ($directory_handle) { //if we managed to open the directory
        // loop through all of the files
        while (false !== ($fname = readdir($directory_handle))) {
            // if the file is not this file, and does not start with a '.' or '..',
            // then store it for later display
            if ($fname !== '.'
                && $fname !== 'index.php'
                && $fname !== '..'
                && $fname !== '.svn'
                && $fname !== basename($request->getServerParam('PHP_SELF'))
                && $fname !== '.DS_Store'
                && $fname !== 'images'
                && $fname !== 'print') {
                // store the filename
                $files[] = $fname;
            }
        }
        // close the directory
        closedir($directory_handle);
    }

    return $files;
}


/**
 * Checks to see if the invoice is selected
 *
 * @param        $input_item
 * @param string $selected
 * @return string
 * @deprecated 4.9.13
 */
function espresso_invoice_is_selected($input_item, $selected = '')
{
    if ($input_item === $selected) {
        return 'selected="selected"';
    } else {
        return '';
    }
}