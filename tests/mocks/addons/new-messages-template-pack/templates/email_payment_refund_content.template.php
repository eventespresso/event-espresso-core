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
<h2><?php printf( esc_html__('Hello, %s:', 'ee-new-messages-template-pack-test'),  '[PRIMARY_REGISTRANT_FNAME] [PRIMARY_REGISTRANT_LNAME]' ); ?></h2>
<p class="lead"><?php esc_html_e("We're just notifying you of a refund issued for the following transaction and tickets:", 'ee-new-messages-template-pack-test'); ?></p>
<h3><?php esc_html_e('Refund Details:', 'ee-new-messages-template-pack-test'); ?></h3>
<ul>
	<li><strong><?php esc_html_e('This is just a test to verify the template pack works as expected', 'ee-new-messages-template-pack-test'); ?></strong></li>
	<li><strong><?php esc_html_e('Payment Status:', 'ee-new-messages-template-pack-test'); ?></strong> [PAYMENT_STATUS]</li>
	<li><strong><?php esc_html_e('Transaction ID:', 'ee-new-messages-template-pack-test'); ?></strong> [TXN_ID]</li>
	<li><strong><?php esc_html_e('Total Cost:', 'ee-new-messages-template-pack-test'); ?></strong> [TOTAL_COST]</li>
	<li><strong><?php esc_html_e('Refund Amount:', 'ee-new-messages-template-pack-test'); ?></strong> [AMOUNT_PAID]</li>
</ul>
[EVENT_LIST]
</td>
</tr>
</tbody>
</table>
</div></td>
<td></td>
</tr>
</tbody>
</table>
<!-- END BODY -->

<!-- FOOTER -->
<table class="footer-wrap">
<tbody>
<tr>
<td class="container">
<table class="social" width="100%">
<tbody>
<tr>
<td><!-- column 1 -->
<table class="column" align="left">
<tbody>
<tr>
<td>
<h3><?php esc_html_e('Connect with Us:', 'ee-new-messages-template-pack-test'); ?></h3>
<a class="soc-btn fb" href="[CO_FACEBOOK_URL]"><?php esc_html_e('Facebook', 'ee-new-messages-template-pack-test'); ?></a> <a class="soc-btn tw" href="[CO_TWITTER_URL]"><?php esc_html_e('Twitter', 'ee-new-messages-template-pack-test'); ?></a></td>
</tr>
</tbody>
</table>
<!-- /column 1 -->

<!-- column 2 -->
<table class="column" align="left">
<tbody>
<tr>
<td>
<h3><?php esc_html_e('Contact Info:', 'ee-new-messages-template-pack-test'); ?></h3>
<?php esc_html_e('Phone:', 'ee-new-messages-template-pack-test'); ?> <strong>[CO_PHONE]</strong>

<?php esc_html_e('Email:', 'ee-new-messages-template-pack-test'); ?> <strong><a href="mailto:[CO_EMAIL]" target="_blank">[CO_EMAIL]</a></strong></td>
</tr>
</tbody>
</table>
<!-- /column 2 -->

&nbsp;</td>
</tr>
</tbody>
</table>
<!-- end social table --></td>
<td></td>
</tr>
</tbody>
</table>
<!-- /FOOTER -->
