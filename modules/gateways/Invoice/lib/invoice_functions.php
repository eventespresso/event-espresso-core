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
    $files = [];
    // read our template dir and build an array of files
    $directory_handle = opendir(dirname($class_file) . '/lib/templates/css/');
    //if we managed to open the directory
    if ($directory_handle) {
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $skip = [
            '.',
            '..',
            '.DS_Store',
            '.svn',
            'images',
            'index.php',
            'print',
            basename($request->getServerParam('PHP_SELF')),
        ];
        // loop through all of the files
        while (false !== ($fname = readdir($directory_handle))) {
            // if the file is not this file, and does not start with a '.' or '..',
            // then store it for later display
            if (! in_array($fname, $skip, true)) {
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
    }
    return '';
}