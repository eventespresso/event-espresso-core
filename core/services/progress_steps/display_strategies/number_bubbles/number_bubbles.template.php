<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * This is the template for the "Number Bubbles" Progress Steps
 * Template args available for this template are listed below
 *
 * @since 4.9.0
 * @var \EventEspresso\core\services\progress_steps\ProgressStepInterface[] $progress_steps  array of progress step objects
 */
?>

<!-- progress step display -->
<div class="ee-progress-step-main-container">
	<div class="progress-step-container number-bubbles-container">
		<?php foreach ( $progress_steps as $progress_step ) : ?>
		<div data-step-nmbr="<?php echo $progress_step->order();?>" id="progress-step-<?php echo $progress_step->id(); ?>" class="progress-step-number <?php echo $progress_step->htmlClass(); ?>">
			<div class="progress-step-line"></div>
			<div class="progress-step-bubble"><p><?php echo $progress_step->order(); ?></p></div>
			<span class="progress-step-text"><?php echo $progress_step->text(); ?></span>
		</div>
		<?php endforeach;?>
	</div>
</div>


<?php

// End of file number-bubbles.php
// Location: core/services/progress_steps/display_strategies/number_bubbles/number-bubbles.template.php