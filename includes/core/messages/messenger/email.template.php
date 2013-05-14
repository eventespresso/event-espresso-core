<?php 
$_subject = 'Super Catchy Subject Line'; 
$_uploads_dir = 'http://localhost/EE_3-2/wp-content/uploads/espresso/templates/email/';
$_venue_address = '
Awesome Venue<br/>
123 Onna Windy Rd<br/>
Inna City,<br/>
SW, 54321';
$_content1 = '<p><strong>Senectus et netus et malesuada fames ac turpis egestas. </strong>Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>';

$_content2 = '
<h4>Other Important Info</h4>

<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>


<ul>
   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
   <li>Aliquam tincidunt mauris eu risus.</li>
</ul>
'; 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<!-- Facebook sharing information tags -->
<meta property="og:title" content="<?php echo $_subject; ?>" />

<title><?php echo $_subject; ?></title>
<style type="text/css">
	/* Client-specific Styles */
	#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
	body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
	body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */

	/* Reset Styles */
	body{margin:0; padding:0;}
	img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
	table td{border-collapse:collapse;}
	#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

	/* Template Styles */

	/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */

	/**
	* @tab Page
	* @section background color
	* @tip Set the background color for your email. You may want to choose one that matches your company's branding.
	* @theme page
	*/
	body, #backgroundTable{
		/*@editable*/ background-color:#383739;
	}

	/**
	* @tab Page
	* @section email border
	* @tip Set the border for your email.
	*/
	#templateContainer{
		/*@editable*/ border: 20px solid #FFFFFF;
	}

	/**
	* @tab Page
	* @section heading 1
	* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	* @style heading 1
	*/
	h1, .h1{
		/*@editable*/ color:#383739;
		display:block;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:34px;
		/*@editable*/ font-weight:bold;
		/*@editable*/ line-height:100%;
		margin-top:0;
		margin-right:0;
		margin-bottom:10px;
		margin-left:0;
		/*@editable*/ text-align:left;
	}

	/**
	* @tab Page
	* @section heading 2
	* @tip Set the styling for all second-level headings in your emails.
	* @style heading 2
	*/
	h2, .h2{
		/*@editable*/ color:#383739;
		display:block;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:30px;
		/*@editable*/ font-weight:bold;
		/*@editable*/ line-height:100%;
		margin-top:0;
		margin-right:0;
		margin-bottom:10px;
		margin-left:0;
		/*@editable*/ text-align:left;
	}

	/**
	* @tab Page
	* @section heading 3
	* @tip Set the styling for all third-level headings in your emails.
	* @style heading 3
	*/
	h3, .h3{
		/*@editable*/ color:#2A292A;
		display:block;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:26px;
		/*@editable*/ font-weight:bold;
		/*@editable*/ line-height:100%;
		margin-top:0;
		margin-right:0;
		margin-bottom:10px;
		margin-left:0;
		/*@editable*/ text-align:left;
	}

	/**
	* @tab Page
	* @section heading 4
	* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	* @style heading 4
	*/
	h4, .h4{
		/*@editable*/ color:#2A292A;
		display:block;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:22px;
		/*@editable*/ font-weight:bold;
		/*@editable*/ line-height:100%;
		margin-top:0;
		margin-right:0;
		margin-bottom:10px;
		margin-left:0;
		/*@editable*/ text-align:left;
	}

	/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: PREHEADER /\/\/\/\/\/\/\/\/\/\ */

	/**
	* @tab Header
	* @section preheader style
	* @tip Set the background color for your email's preheader area.
	* @theme page
	*/
	#templatePreheader{
		/*@editable*/ background-color:#383739;
	}

	/**
	* @tab Header
	* @section preheader text
	* @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
	.preheaderContent div{
		/*@editable*/ color:#FFFFFF;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:12px;
		/*@editable*/ line-height:100%;
		/*@editable*/ text-align:right;
	}

	/**
	* @tab Header
	* @section preheader link
	* @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
	.preheaderContent div a:link, .preheaderContent div a:visited, /* Yahoo! Mail Override */ .preheaderContent div a .yshortcuts /* Yahoo! Mail Override */{
		/*@editable*/ color:#2FBCFE;		/*		2FBCFE	C56CFC	*/
		/*@editable*/ font-weight:normal;
		/*@editable*/ text-decoration:underline;
	}

	/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */

	/**
	* @tab Header
	* @section header style
	* @tip Set the background color and border for your email's header area.
	* @theme header
	*/
	#templateHeader{
		/*@editable*/ background-color:#FFFFFF;
		/*@editable*/ border-bottom:0;
	}

	/**
	* @tab Header
	* @section header text
	* @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
	.headerContent{
		/*@editable*/ color:#2A292A;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:34px;
		/*@editable*/ font-weight:bold;
		/*@editable*/ line-height:100%;
		/*@editable*/ padding:0;
		/*@editable*/ text-align:center;
		/*@editable*/ vertical-align:middle;
	}

	/**
	* @tab Header
	* @section header link
	* @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
	.headerContent a:link, 
	.headerContent a:visited, 
	/* Yahoo! Mail Override */ 
	.headerContent a .yshortcuts {
		/*@editable*/ color:#006AA8; 
		/*@editable*/ font-weight:normal;
		/*@editable*/ text-decoration:underline;
	}

	#headerImage{
		height:auto;
		max-width:600px !important;
	}

	/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */

	/**
	* @tab Body
	* @section body style
	* @tip Set the background color for your email's body area.
	*/
	#templateContainer, .bodyContent{
		/*@editable*/ background-color:#FFFFFF;
	}
	
	#sidebar { background-color:#B6CBD8; }
	#sidebar p { color: #2A292A; }
	#sidebar img { border-width:10px; border-style: solid; border-color: #FFFFFF; }

	/**
	* @tab Body
	* @section body text
	* @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
	* @theme main
	*/
	.bodyContent div{
		/*@editable*/ color:#504F51;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:14px;
		/*@editable*/ line-height:150%;
		/*@editable*/ text-align:left;
	}
	
	.table-wrap { border-width:1px; border-style: solid; border-color: #C7C4C9; margin:0 0 20px;  }
	#price-table { border-width:1px; border-style: solid; border-color: #C7C4C9; margin:1%; background:#f8f8f8; color: #2A292A; }
	#price-table .first .alpha, #price-table .alpha { border-left-width:0px; }
	#price-table .first td { border-width:0px; border-left-width:1px; border-style: solid; border-color: #C7C4C9; }
	#price-table td { border-width:0px; border-top-width: 1px; border-left-width: 1px; border-style: solid; border-color: #C7C4C9; text-align: right; }

	/**
	* @tab Body
	* @section body link
	* @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
	*/
	.bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{
		/*@editable*/ color:#006AA8;
		/*@editable*/ font-weight:normal;
		/*@editable*/ text-decoration:underline;
	}

	.bodyContent img{
		display:inline;
		height:auto;
	}

	/* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */

	/**
	* @tab Footer
	* @section footer style
	* @tip Set the background color and top border for your email's footer area.
	* @theme footer
	*/
	#templateFooter{
		/*@editable*/ background-color:#FFFFFF;
		/*@editable*/ border-top:0;
	}

	/**
	* @tab Footer
	* @section footer text
	* @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	* @theme footer
	*/
	.footerContent div{
		/*@editable*/ color:#7D7B7E;
		/*@editable*/ font-family:Arial;
		/*@editable*/ font-size:12px;
		/*@editable*/ line-height:125%;
		/*@editable*/ text-align:left;
	}

	/**
	* @tab Footer
	* @section footer link
	* @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
	.footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{
		/*@editable*/ color:#2FBCFE;			/*		2FBCFE	C56CFC	*/
		/*@editable*/ font-weight:normal;
		/*@editable*/ text-decoration:underline;
	}

	.footerContent img{
		display:inline;
	}

	/**
	* @tab Footer
	* @section social bar style
	* @tip Set the background color and border for your email's footer social bar.
	* @theme footer
	*/
	#social{
		/*@editable*/ background-color:#383739;
		/*@editable*/ border:0;
	}

	/**
	* @tab Footer
	* @section social bar style
	* @tip Set the background color and border for your email's footer social bar.
	*/
	#social div{
		/*@editable*/ text-align:center;
	}

	/**
	* @tab Footer
	* @section utility bar style
	* @tip Set the background color and border for your email's footer utility bar.
	* @theme footer
	*/
	#utility{
		/*@editable*/ background-color:#FFFFFF;
		/*@editable*/ border:0;
	}

	/**
	* @tab Footer
	* @section utility bar style
	* @tip Set the background color and border for your email's footer utility bar.
	*/
	#utility div{
		/*@editable*/ text-align:center;
	}

</style>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
<center>
    	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable">
        	<tr>
            	<td align="center" valign="top">
				
					
					<!--TODO: this could be an option in the template?  We could have view in browser links-->
                    <!-- // Begin Template Preheader \\ -->
                    <table border="0" cellpadding="5" cellspacing="0" width="720" id="templatePreheader">
                        <tr>
                            <td valign="top" class="preheaderContent">
                            
                            	<!-- // Begin Module: Standard Preheader \ -->
                                <table border="0" cellpadding="5" cellspacing="0" width="100%">
                                	<tr>
                                        <!-- *|IFNOT:ARCHIVE_PAGE|* -->
										<td valign="top" width="190">
                                        	<div class="std_preheader_links">
                                            	Email not displaying correctly?  <a href="*|ARCHIVE|*" target="_blank">View it in your browser</a>.
                                            </div>
                                        </td>
										<!-- *|END:IF|* -->
                                    </tr>
                                </table>
                            	<!-- // End Module: Standard Preheader \ -->
                            
                            </td>
                        </tr>
                    </table>
                    <!-- // End Template Preheader \\ --> 
					
					
					
                	<table border="0" cellpadding="0" cellspacing="0" width="720" id="templateContainer">
					
						
						<!--TODO:  this is another area that could be made a template field -->
                    	<tr>
                        	<td align="center" valign="top">
                                <!-- // Begin Template Header \\ -->
                            	<table border="0" cellpadding="0" cellspacing="0" width="720" id="templateHeader">
                                    <tr>
                                        <td class="headerContent">
                                        	
                                        	<!-- // Begin Module: Standard Header Image \\ -->
                                        	<img src="<?php echo $_uploads_dir; ?>LlamaRama500.jpg" style="width:720px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                        	<!-- // End Module: Standard Header Image \\ -->
                                        
                                        </td>
                                    </tr>
                                </table>
                                <!-- // End Template Header \\ --> 
                            </td>
                        </tr>
                    	<tr>
                        	<td align="center" valign="top">
                                <!-- // Begin Template Body \\ -->
                            	<table border="0" cellpadding="0" cellspacing="0" width="720" id="templateBody">
                                	<tr>
                                        <td valign="top" class="bodyContent">
                            
                                            <!-- // Begin Module: Standard Content \\ -->
                                            <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                <tr>
                                                    <td valign="top" colspan="2">
                                                        <div>
															<h3>Registration Confirmation for</h3>
															<h1>The LlamaRama 500 Race</h1>
                                                            <?php echo $_content1; ?>
                                                        </div>
													</td>
                                                </tr>
                                                 <tr>
                                                    <td valign="top" width="440">
															<h2>Your Registration Details:</h2><br/>
															<h3>The LlamaRama 500 Race </h3>
															<h4>Ticket Prices</h4>
															<div class="table-wrap">
																<table id="price-table" border="0" cellpadding="5" cellspacing="0" width="98%">
																	<tr class="first">
																		<td class="alpha" valign="top">
																			General Admission: 
																		</td>
																		<td valign="top">
																			$ 100.00
																		</td>
																	</tr>
																	<tr>
																		<td class="alpha" valign="top">
																			Tax:
																		</td>
																		<td valign="top">
																			$ 7.00
																		</td>
																	</tr>
																	<tr>
																		<td class="alpha" valign="top">
																			Total Cost:
																		</td>
																		<td valign="top">
																			$ 107.00
																		</td>
																	</tr>
																</table>
															</div>

															<h4>Attendees</h4>
															<ol>
																<li>Darren Ethier</li>
																<li>Michael Nelson</li>
																<li>Garth Shoultes</li>
															</ol>
															
													</td>
                                                   <td id="sidebar" valign="top" width="200">
                                                        <div>
															<h4>Venue Address</h4>
                                                            <p><?php echo $_venue_address; ?></p>
															<p><img width="180px" src="<?php echo $_uploads_dir; ?>sample-map.jpg" alt="" /></p>
                                                        </div>
													</td>
                                                </tr>
                                             	<tr>
                                                    <td valign="top" colspan="2">
                                                        <div>
                                                            <?php echo $_content2; ?>
                                                        </div>
													</td>
                                                </tr>
                                           </table>
                                            <!-- // End Module: Standard Content \\ -->
                                            
                                        </td>
                                    </tr>
                                </table>
                                <!-- // End Template Body \\ -->
                            </td>
                        </tr>


						<!--TODO: This is another template field that could possible be created?-->
                    	<tr>
                        	<td align="center" valign="top">	                            		
                                <!-- // Begin Template Footer \\ -->
                            	<table border="0" cellpadding="10" cellspacing="0" width="720" id="templateFooter">
                                	<tr>
                                    	<td valign="top" class="footerContent">
                                        
                                            <!-- // Begin Module: Standard Footer \\ -->
                                            <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                <tr>
                                                    <td colspan="2" valign="middle" id="social">
                                                        <div mc:edit="std_social">
                                                            &nbsp;<a href="*|TWITTER:PROFILEURL|*">follow on Twitter</a> | <a href="*|FACEBOOK:PROFILEURL|*">friend on Facebook</a> | <a href="*|FORWARD|*">forward to a friend</a>&nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="350">
                                                        <div mc:edit="std_footer">
															<em>Copyright &copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
															<br />
															*|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*
															<br />
															<strong>Our mailing address is:</strong>
															<br />
															*|HTML:LIST_ADDRESS_HTML|**|END:IF|* 
                                                        </div>
                                                    </td>
                                                    <td valign="top" width="190" id="monkeyRewards">
                                                        <div mc:edit="monkeyrewards">
                                                            *|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" valign="middle" id="utility">
                                                        <div mc:edit="std_utility">
                                                            &nbsp;<a href="*|UNSUB|*">unsubscribe from this list</a> | <a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // End Module: Standard Footer \\ -->
                                        
                                        </td>
                                    </tr>
                                </table>
                                <!-- // End Template Footer \\ --> 
                            </td>
                        </tr>
						
						
                    </table>
                    <br />
                </td>
            </tr>
        </table>
    </center>
</body>
</html>