<?php

/**
 *
 * renamer
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
//go into each subfolder
//find all the files
//rename the files; and the content of the files
if( ! isset( $_GET['addon_name' ] ) ){
	echo "You must pass in the name of your addon using the GET parameter 'addon_name'. This name should have the first letter of each word capitalized and use underscores instead of spaces. Eg 'Calendar' or 'Monkey' instead of 'calendar' or 'monkey'.";
}else{


	recursively_rename( dirname( __FILE__  ). "/*", 'New_Addon', $_GET[ 'addon_name' ] );
	unlink( __FILE__ );
	replace_in_path( 'New_Addon', 'ee4-'.$_GET[ 'addon_name' ], dirname( __FILE__ ) );
	echo "<br><hr>ok folders renamed! and this renamer.php file has been deleted for security reasons";


}
function recursively_rename( $folder_path, $old_string, $new_string ){
	echo "<br>recursively rename: looking in ".$folder_path;
	//recurse into subfolders and rename them
	foreach( glob( $folder_path, GLOB_ONLYDIR ) as $subfolder ){
		recursively_rename( $subfolder . "/*", $old_string, $new_string);
		replace_in_path( $old_string, $new_string, $subfolder );
	}
	//ok now rename all the files in here
	foreach( glob ($folder_path . ".*") as $file ){
		replace_in_path( $old_string, $new_string, $file );
	}
}

/**
 * REplaces $old_string with $new_string in both the path $file_or_folder_paht
 * and, if its a file, its contents
 * @param string $file_or_folder_path
 * @param string $old_string
 * @param string $new_string
 */
function replace_in_path( $old_string, $new_string, $file_or_folder_path ){
	//check for lower-case replacement too
	$new_file_name = replace_variations( $old_string, $new_string, basename( $file_or_folder_path ) );
	$new_file_path = dirname( $file_or_folder_path ) . "/" . $new_file_name;
	$success = rename( $file_or_folder_path, $new_file_path );
	if( $success ){
		echo "<br>successfully renamed $file_or_folder_path to $new_file_path";
	}
	//if it's a file, open its contents and replace them too
	if( is_file( $new_file_path ) ){
		$old_content = file_get_contents( $new_file_path );
		$new_content = replace_variations($old_string, $new_string, $old_content );
		$bytes_written = file_put_contents($new_file_path, $new_content );
		if( $bytes_written ){
			echo " and replaced its content too";
		}else{
			echo " but COULD NOT update its content";
		}
	}

}

function replace_variations( $old_string, $new_string, $content ){
	$old_string_with_spaces = str_replace( "_", " ", $old_string );
	$new_string_with_spaces = str_replace( "_", " ", $new_string );
	$lower_old_string = strtolower( $old_string );
	$lower_new_string = strtolower( $new_string );
	$lower_old_dashed_string = str_replace( "_", "-", $lower_old_string );
	$lower_new_dashed_string = str_replace( "_", "-", $lower_new_string );
	$upper_old_string = strtoupper( $old_string );
	$upper_new_string = strtoupper( $new_string );
	return str_replace(
				array( $old_string, $old_string_with_spaces, $lower_old_string, $lower_old_dashed_string, $upper_old_string ),
				array( $new_string, $new_string_with_spaces, $lower_new_string, $lower_new_dashed_string, $upper_new_string ),
				$content );
}



// End of file renamer.php