# Batch Jobs Library Overview

Most HTTP requests can be served within 30 seconds or less, but sometimes there are jobs that will take longer. That's a problem when you don't have control over the server and php settings, and the request is set to timeout after 30 seconds. For example, when you're processing images or lots of data, or generating a large report file.

If you can't make the job go faster, then the only alternative to fix this problem is to distribute the job across multiple HTTP requests. The typical approach is to:

1. send the user to a page for performing a batched job, (it's courteous to provide a progress bar showing how the job is going)
2. from this page, send AJAX requests to the server to do the job is small pieces (and update the progress bar accordingly)
3. handle the AJAX requests server side and do the job in batches
4. once the job is done, notify the user the job is done (and possibly redirect the user)

Solving this problem is the purpose of the EE Batch Jobs library (added in EE 4.8.26), and the corresponding EE admin routes. The library is in`event-espresso-core-reg/core/libraries/batch`, and the admin pages are in `event-espresso-core-reg/admin_pages/support/Support_Admin_Page.core.php`. For a basic job, the library, and the corresponding admin routes, can handle most of the boilerplate coding for you, so that all you'll need to do is:

1. Create a job handler (PHP class implementing `JobHandlerInterface`) which will take care of doing the work you really wanted to do
2. Direct users to the batch processing page and instruct the system which job handler you want to run, and where to send the user when the job is complete

For a more advanced job, where you want to run the batch jobs from a different page, or you want custom javascript to be invoked when the job is done, you also need to:

1. Create a page where the job is to be started from
2. Enqueue the library's javascript and css
3. Add your custom javascript and hook it into when the job is completed

## Related Docs

- [Implementing a Basic Batch Job](implementing-a-basic-batch-job.md)
- [Implementing an Advanced Batch Job](implementing-an-advanced-batch-job.md)



