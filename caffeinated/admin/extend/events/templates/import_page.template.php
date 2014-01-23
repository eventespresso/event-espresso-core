<div class="import-area">
<?php echo $form?>
</div>
<div class="sample-import-area">
	<h3><?php _e("Sample Import File", "event_espresso");?></h3>
	<p><?php _e("If you think you could save time entering data into a CSV file, you can use this sample import file. Note that creating your own CSV file is more complicated than in Event Espresso 3.1 because of the more complicated data structure, and so we recommend creating/editing your events using the normal web-interface.", "event_espresso");?></p>
	<p><?php _e("The export file is just an export of an event, or if you do not have any events in your system, it will only contain column headers. Do not change those column headers. Add as many rows as you like. ", "event_espresso");?></p>
	<p><?php _e("In the ID columns (columns ending in '_ID'), you should enter 'temporary IDs', which are unique numbers/words that identify that item, which can be used later when you want to refer to that item. (For example,
		if you assign an event's EVT_ID to be a temporary id of 'my-event-1', then use that same phrase 'my-event-1' to refer to that event in the Datetime model's EVT_ID column)", "event_espresso");?></p>
	<p><?php _e("Also note, you do NOT have to enter info in for each model. (You can, for example, only enter in Term_Taxonomies and Term model data)", "event_espresso");?></p>
	<a class="button-primary" href="<?php echo $sample_file_link?>"><?php _e("Download Sample File", "event_espresso");?></a>
</div>