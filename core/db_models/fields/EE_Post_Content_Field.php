<?php
/**
 * Field to only allow tags that are normally allowed on post_content:
 * address,a,abbr,acronym,area,article,aside,b,big,blockquote,br,button,caption,cite,code,col,del,dd,dfn,details,div,dl,dt,em,fieldset,figure,figcaption,font,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,i,img,ins,kbd,label,legend,li,map,mark,menu,nav,p,pre,q,s,samp,span,section,small,strike,strong,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,title,tr,tt,u,ul,ol,var
 */
class EE_Post_Content_Field extends EE_Text_Field_Base{
	/**
	 * removes all tags which a WP Post wouldn't allow in its content normally
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		$value_with_select_tags =  wp_kses("$value_inputted_for_field_on_model_object",wp_kses_allowed_html( 'post' ));
		return parent::prepare_for_set($value_with_select_tags);
	}
	
}