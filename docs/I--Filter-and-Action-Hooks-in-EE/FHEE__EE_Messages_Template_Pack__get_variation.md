# FHEE__EE_Messages_Template_Pack__get_variation

This filter is used for filtering a template variation (usually css file).

`FHEE__EE_Messages_Template_Pack__get_variation`

## Usage Example:

```php
function ee_modify_html_variation( $variation_path, $messenger, $message_type, $type, $variation, $file_extension, $url, EE_Messages_Template_Pack $template_pack ) {
	if ( $messenger != 'html' ) {
		return $variation_path;
	}

	//for this example we'll just filter the wpeditor for this variation
	if ( $type != 'wpeditor' ) {
		return $variation_path;
	}

	$new_url = get_stylesheet_directory_uri() . '/new_html_variation.css';
	return $new_url;
}
add_filter( 'FHEE__EE_Messages_Template_Pack__get_variation', 'ee_modify_html_variation', 10, 8 );
```


