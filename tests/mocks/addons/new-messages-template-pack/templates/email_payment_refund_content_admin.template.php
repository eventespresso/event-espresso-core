<!-- HEADER -->
<table class="head-wrap" bgcolor="#999999">
<tbody>
<tr>
<td></td>
<td class="header container">
<div class="content">
<table bgcolor="#999999">
<tbody>
<tr>
<td>[CO_LOGO]</td>
<td align="right">
<h6 class="collapse">[COMPANY]</h6>
</td>
</tr>
</tbody>
</table>
</div></td>
<td></td>
</tr>
</tbody>
</table>
<!-- END HEADER -->
<!-- BODY -->
<table class="body-wrap">
<tbody>
<tr>
<td></td>
<td class="container" bgcolor="#FFFFFF"><!-- content -->
<div class="content">
<table>
<tbody>
<tr>
<td>
<h1><?php esc_html_e('Refund Notification', 'ee-new-messages-template-pack-test'); ?></h1>
<?php esc_html_e('The following message was sent to the Primary Registrant of this transaction:', 'ee-new-messages-template-pack-test'); ?>
<h3><?php esc_html_e('Refund Details:', 'ee-new-messages-template-pack-test'); ?></h3>
<ul>
	<li><strong><?php esc_html_e('This is just a test to verify the template pack works as expected', 'ee-new-messages-template-pack-test'); ?></strong></li>
	<li><strong><?php esc_html_e('Payment Status:', 'ee-new-messages-template-pack-test'); ?></strong> [PAYMENT_STATUS]</li>
	<li><strong><?php esc_html_e('Transaction ID:', 'ee-new-messages-template-pack-test'); ?></strong> <a href="[TRANSACTION_ADMIN_URL]">[TXN_ID]</a></li>
	<li><strong><?php esc_html_e('Payment Gateway:', 'ee-new-messages-template-pack-test'); ?></strong> [PAYMENT_GATEWAY]</li>
	<li><strong><?php esc_html_e('Total Cost:', 'ee-new-messages-template-pack-test'); ?></strong> [TOTAL_COST]</li>
	<li><strong><?php esc_html_e('Refund Amount:', 'ee-new-messages-template-pack-test'); ?></strong> [AMOUNT_PAID]</li>
</ul>
</td>
</tr>
</tbody>
</table>
</div>
<div class="content">
	<h2><?php esc_html_e('Registrant Details:', 'ee-new-messages-template-pack-test'); ?></h2>
	<p class="callout"><strong>[PRIMARY_REGISTRANT_FNAME] [PRIMARY_REGISTRANT_LNAME]:</strong> <a href="mailto:[PRIMARY_REGISTRANT_EMAIL]">[PRIMARY_REGISTRANT_EMAIL]</a></p>
</div>
</td>
<td></td>
</tr>
</tbody>
</table>
<!-- END BODY -->
