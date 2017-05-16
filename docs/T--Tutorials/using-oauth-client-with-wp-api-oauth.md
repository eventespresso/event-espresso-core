# Using WordPress REST API oAuth Client and oAuth Server
If you're interested in using WP API and its oAuth Server (which, besides Cookie Authentication, is the only recommended way of interacting with the WP API),
then [you should use the WP API oAuth Server.](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)

You can download the GitHub version of the oAuth Server here, 
and there's also a [handy oAuth Server client application](https://github.com/WP-API/example-client) which is really nice for those unfamiliar with oAuth.

Although each has documentation, I personally still found myself getting rather lost the first time I used them (and the next time I tried to use them again 6 months later, which is why I'm writing this).

So here's how to install both quite easily and get the oAuth client to work.
For this tutorial I'm going to assume it's in `http://src.wordpress-develop.dev` (the VVV default).

1. Install the WP API oAuth Server plugin and activate it as normal on your site. Also, make sure you DON'T have the WP API Basic Auth plugin active (or a version of Event Espresso 4 which bundles it). It conflicts with the WP API oAuth Server. 
2. Download the API client application, and put it somewhere in your site's wp-content folder.
For this tutorial I'm going to assume you put it in /wp-content/plugins and named the folder "wp-api-oauth-client". Save it. Take note of the "Client Key" and "Client Secret", you'll need them soon.
3. In the WP Admin Dashboard, go to Users -> Applications, then "Add new".
4. Use any "Consumer Name" and "Description" you want.
5. For "Callback", use `{yoursite}/{path-to-wp-api-oauth-client}/www?step=authorize`.
  So if your site lives at `http://src.wordpress-develop.dev` and you placed the client application in the folder
  `wp-content/plugins/wp-api-oauth-client`, the url should be `http://src.wordpress-develop.dev/wp-content/plugins/wp-api-oauth-client/www/?step=authorize`. See [this screenshot](https://drive.google.com/file/d/0B2KCao4zFjaxQU5aaTFjWUZ1bTg/view?usp=drivesdk)
6. Now direct your browser to `http://src.wordpress-develop.dev/wp-content/plugins/wp-api-oauth-client/www`.
7. Enter `http://src.wordpress-develop.dev` in the "Address to start discovery", [like this](https://drive.google.com/file/d/0B2KCao4zFjaxMHFfTkNicFdLOXc/view?usp=drivesdk).
8. [Enter the "Client Key" and "Client Secret"](https://drive.google.com/file/d/0B2KCao4zFjaxQXpSbWRydmJqRm8/view?usp=drivesdk) you noted earlier and submit the form. (This step won't work if you have Basic Auth or the current version of Event Espresso 4 active)
9. [Authorize!](https://drive.google.com/file/d/0B2KCao4zFjaxRVh3VjZ5UWV2aE0/view?usp=drivesdk).
10.[Bask in how it's working](https://drive.google.com/file/d/0B2KCao4zFjaxWDloV2MyaWRtUEU/view?usp=drivesdk).



