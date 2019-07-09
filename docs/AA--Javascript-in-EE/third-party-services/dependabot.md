## Dependabot
[Dependabot](https://dependabot.com/) is a tool we use to manage our dependencies (both php and javascript).  I'm not going to go into details about how to set it up or configure it here as there's already fairly good documentation on that on their site (and it saves this becoming stale). Instead, the purpose of this doc is to outline the current process I take for dealing with pull requests created by dependabot.

### Current repos managed by dependabot

- [Event Espresso Core](https://github.com/eventespresso/event-espresso-core)

### Process

Generally, the javascript unit test coverage (executed on travis) will be sufficient to catch breakage with any package update.  But there are a few cases where updates require a closer look.  So if you see anything in the below packages you'll want to checkout the branch created by dependabot and do your own build on that branch to ensure things work as expected:

#### Packages updates requiring a closer look.
Usually I examine the changelog notes for the package in question and take a closer look if the changelog includes any breaking changes (for packages following semver) or things that might impact EE code.  In some cases, this might not be easy to spot in which case you'll want to check out the branch and run a build to do your own tests.

- @babel/core
- @babel/runtime-corejs3
- autoprefixer
- babel-runtime
- core-js
- css-loader
- cssnano
- postcss-loader
- webpack
- webpack-assets-manifest
- accounting-js
- classnames
- cuid
- decimal.js-light
- memize
- moment-duration-format
- moment-timezone
- pluralize
- react-select
- rememo

All other package updates would surface any issues in the js unit tests (particularly the `npm run build` job)

#### Build test

If you need to do manual verifications on a package update:

- Checkout the dependabot branch associated with the pull.
- run `npm install`
- do `npm run watch`
- Manually test any _released_ features to verify they have no problems (eventually with good `e2e` test coverage this step wouldn't be needed)

#### Merging pulls

Remember that dependabot pulls are based off of master and there is the possibility that conflicts could exist between package updates that _won't_ be detected until you merge an update in master into the pull.  Dependabot will _usually_ rebase master onto it's open pulls when master is updated (sometimes you may have to trigger it by just leaving a comment `@dependabot rebase` in the pull)

So generally what I do is:

- merge a dependabot pull.
- open [travis-ci.com pull requests view](https://travis-ci.com/eventespresso/event-espresso-core/pull_requests)
- As soon as I see builds from dependabot pulls I cancel all of them except the first one.
- When that first pull successfully passes tests and I've verified its ready for merge, I squash merge, assign it to the latest milestone, and dependabot will take care of deleting the branch.
-  Rinse and repeat the above steps until all @dependabot pulls are done.

## What happens when there's breakage on a package update.

This is where things get interesting and I can't really give any general instructions here because the fix will depend on what's broken and why it's broken.  General things to do are:

- Google the error (if there's an error message) and see what turns up (sometimes other project have experienced the same problem and I've sometimes found clues in their solutions/discussions)
- Read the actual code reported in the error message.
- Usually the change log will give you some clues as to what _might_ have broken things (especially if its a breaking change).
- If it's a package used by the Gutenberg project in their dependencies, it's possible they experienced the same breakage (in which case  you can research what the fix was there)
- Sometimes the breakage is caused by mismatched dependencies (can happen with babel, core-js etc).