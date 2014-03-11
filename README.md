EE4 core
===================
Note: for non stable versions. We currently use minor versioning numbers such as (4.1.125) for rapid development occuring.  On stable branches, minor versions represent minor releases i.e. (4.1.1.reg) that typically don't include new features.  Releases including new features bump the secon number (i.e. 4.1.1 -> 4.2.0 ).  The string appended to the end of the version represents what major branch the code is based off.  In the list below we **do not** include minor version numbers.

***
**Current Stable Version:** 4.1.reg

**Current Beta Version:** (no beta currently)

**Current Alpha Version:** 4.2.alpha

**Current Development Version:** 4.3.dev
***

This is the Core for Event Espresso 4. This README.md file is targeted for display with our Github repo.  For detailed information via traditional readme, see the readme.txt file.

> Extra:  The code structure and phpdoc parsed documentation can be found at http://code.eventespresso.com


## Event Espresso Releases
At Event Espresso we follow a set pattern for releases:

1. Active development for new features happens on the **development** branch.  This branch will frequently break.
2. Internal testing (and invited testers) test upcoming versions on **alpha** branch. When a branch has been updated to alpha, there will be NO new features added.  From this point on, only bugfixes related to the current branch are worked on.
3. Public testing of upcoming release is done on **beta** branch.
4. Stable releases are on **master** branch.

> Note: While we do CURRENTLY have a stable branch (Master), we still consider this a late beta as EE4 gets exposed to a wider user base there are likely to be more fringe bugs uncovered that were dormant during our testing phase.

## Testing
For all testers on github, please take note of the following when reporting issues.

1. Know the difference between a feature and a bug. As has been stated already, no new features are considered for alpha/beta branches.  Also, github is not the place to suggest a new feature UNLESS you've already got a pull request to implement it (see pull requests section below).  Info on sponsoring new features can [be found here](http://eventespresso.com/rich-features/sponsor-new-features/)
2. UI/UX issues may be considered a bug but not if it requires a major change in design.  Feel free to report things you find confusing or needing improvement but if we consider it a feature we will not be "fixing" anything in alpha or beta.
3. Report your issue as clearly as possible.  By "clear" we mean:

	i. Specify the branch this occurred in.

	ii. Be specific about the steps you took to reproduce.

	iii. Feel free to use screenshots/screencasts to illustrate

	iv. Use url's for the page the issue to place on where possible.

4. Don't "bump" bug reports if we don't respond right away.  We see every report coming in, but we'll only reply if we need clarification or if we think its invalid.  Otherwise, we're likely working on a fix and the issue will be updated when the fix is complete.

## Pull Requests
One of the reasons we created this private repo on github is because we wanted to open up EE development to 3rd party developers who might want to contribute to the codebase. Github makes this really easy to do so via pull requests.  If you don't know what pull requests are, please read up on them via the github help/documentation.

Here's how we deal with pull requests for our repo:

1. Any new FEATURES in a pull request should be based off of the *development* branch. If your feature pull request is based off any other branch it will not be considered.
2. Any BUGFIX pull requests should be based off of the branch the bug was found.  Please note that we *may* decide that we don't want the bugfix in a particular branch (depending on how much verification via testing is needed), in which case we may ask for the pull-request to be made in a different branch.
3. We greatly appreciate any pull-requests submitted for consideration, but please understand we are very selective in what we decide to include in EE core.  If the "feature" is something that expands too much on our design decisions for EE core then we may suggest you develop your pull request into an addon for EE.

## Finally...

This is a private repo, and it will remain private even if you choose to fork it. 