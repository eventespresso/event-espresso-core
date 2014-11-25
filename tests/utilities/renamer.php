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
?>
<h1>EE4 Addon Renamer</h1>
<p>And general renamer in file and folder names, and file content.</p>
<p>The original usage of this script is to place the script in the ROOT of a copy of  "eea-new-addon" (found in event-espresso-core/tests/mocks/addons), and then access the script directly using your browser to rename the addon and its files etc.</p
<h4>GET parameters accepted:</h4>
<ul>
	<li>replace: REQUIRED string, the new name of the addon, with the first letter of each word capitalized and words separated by underscores (eg, "Calendar" or "Monkey_Wrench"). The addon's directory name and main file will be intelligently derived from what you provide here (eg "eea-calendar" or "eea-monkey-wrench").</li>
	<li>search: OPTIONAL string, default is "New_Addon"</li>
	<li>rename_parent_directory: OPTIONAL int, 1 (default) or 0. Whether to rename the parent directory (the directory that contains this script) in the normal eea-addon-fashion.</li>
	<li>folder_path: OPTIONAL string, by default uses the current folder, but if you want you can provide the FULL path to a specific folder you want to rename. Do not provide a trailing slash.</li>
	<li>delete_script_when_finished: OPTIONAL int, 1 (default) or 0. Whether or not to delete this script when finished renaming
</ul>

<?php
//go into each subfolder
//find all the files
//rename the files; and the content of the files
if( ! isset( $_GET['replace' ] ) ){
	echo "You must pass in the name of your addon using the GET parameter 'replace'. This name should have the first letter of each word capitalized and use underscores instead of spaces. Eg 'Calendar' or 'Monkey_Power' instead of 'calendar' or 'monkey power'.";
	die;
}
$replace = $_GET['replace' ];
$search = isset( $_GET['search'] ) ? $_GET['search'] : 'New_Addon';
$rename_parent_directory = isset( $_GET['rename_parent_directory'] ) ? intval( $_GET['rename_parent_directory'] ) : 1;
$folder_path = isset( $_GET['folder_path'] ) ? $_GET['folder_path'] : dirname( __FILE__ );
$delete_script_when_finished = isset( $_GET['delete_script_when_finished'] ) ? intval( $_GET['delete_script_when_finished'] ) : 1;

recursively_rename( $folder_path . "/*", $search, $replace );
if( $delete_script_when_finished ){
	unlink( __FILE__ );
}
if( $rename_parent_directory ){
	replace_in_path( 'New_Addon', $replace, $folder_path );
}
echo "<br><hr>ok folders renamed!";
if( $delete_script_when_finished ){
	echo "and this renamer.php file has been deleted for security reasons";
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
	if( $file_or_folder_path != $new_file_path && $file_or_folder_path != __FILE__ ){
		$success = rename( $file_or_folder_path, $new_file_path );
		if( $success ){
			echo "<hr>successfully renamed <br>$file_or_folder_path to <br>$new_file_path";
		}else{
			echo "<hr><mark>ERROR</mark>could not rename <br>$file_or_folder_path to <br>$new_file_path. Permissions issue?";
		}
	}
	//if it's a file, open its contents and replace them too
	if( is_file( $new_file_path ) ){
		$old_content = file_get_contents( $new_file_path );
		$new_content = replace_variations($old_string, $new_string, $old_content );
		if( $old_content != $new_content ){
			$bytes_written = file_put_contents($new_file_path, $new_content );
			if( $bytes_written ){
				echo " <hr>successfully replaced $old_string with $new_string in $new_file_path";
			}else{
				echo " <hr> <mark>ERROR</mark> replacing $old_string with $new_string in $new_file_path";
			}
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