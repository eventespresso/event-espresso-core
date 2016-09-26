<?php


/**
 * Returns an array of available template files
 *
 * @deprecated 4.9.13
 * @param $class_file
 * @return array
 */
function espresso_invoice_template_files( $class_file) {
	// read our template dir and build an array of files
	$dhandle = opendir(dirname($class_file) . '/lib/templates/css/'); //If the template files have been moved to the uploads folder
	//} else return FALSE;

	$files = array();

	if ($dhandle) { //if we managed to open the directory
// loop through all of the files
		while (false !== ($fname = readdir($dhandle))) {
// if the file is not this file, and does not start with a '.' or '..',
// then store it for later display
			if ($fname !== '.'
							&& $fname !== 'index.php'
							&& $fname !== '..'
							&& $fname !== '.svn'
							&& $fname !== basename($_SERVER['PHP_SELF'])
							&& $fname !== '.DS_Store'
							&& $fname !== 'images'
							&& $fname !== 'print') {
// store the filename
				$files[] = $fname;
			}
		}
// close the directory
		closedir($dhandle);
	}

	return $files;
}




/**
 * Checks to see if the invoice is selected
 *
 * @deprecated 4.9.13
 * @param        $input_item
 * @param string $selected
 * @return string
 */
function espresso_invoice_is_selected( $input_item, $selected='') {
	if ( $input_item === $selected ) {
		return 'selected="selected"';
	} else {
		return '';
	}
}