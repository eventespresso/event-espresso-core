<div id="taxonomy-espresso_event_type" class="categorydiv">
	<ul id="espresso_event_type-tabs" class="category-tabs">
		<li class="tabs"><a href="#espresso_event_type-all"><?php _e('All Event Types', 'event_espresso') ?></a></li>
	</ul>
	<div id="espresso_event_type-all" class="tabs-panel">
		<?php
        $name = 'tax_input[espresso_event_type]';
        echo "<input type='hidden' name='{$name}[]' value='0' />"; // Allows for an empty term set to be sent. 0 is an invalid Term ID and will be ignored by empty() checks.
        ?>
		<ul id="espresso_event_typechecklist" data-wp-lists="list:espresso_event_type" class="categorychecklist form-no-clear">
			<?php echo $radio_list; ?>
		</ul>
	</div>
</div>
<?php
/**
 * Template vars in use:
 *
 * $radio_list;
 */