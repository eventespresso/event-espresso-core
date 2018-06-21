# Event Espresso Changelog

Beginning with 4.9.64, Event Espresso has started documenting changes within a `CHANGELOG.md` file.  The format of this file is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

Here's some guidelines on how we use the change log.

## Sections and headings

The changelog is sectioned by version in the format `## [version]`. For example: `## [4.9.64.p]`.  However, non-released changes use `## [$VID:$]` and this is automatically replaced with the correct version number by our grunt buildmachine when a release is built.

The headings used for the changelog are:

- Added (new features)
- Changed (changes in existing functionality)
- Deprecated (soon to be removed features)
- Removed (removed features)
- Fixed (bug fixes)
- Security (vulnerability fixes)

**Only add a heading when its used**

## Every Pull Request requires a changelog entry.

Before a pull request can be merged, it must have a changelog entry describing what has changed in the pull request.

## Tips on writing good changelog entries

- Use declarative instead of imperative voice (i.e. 'Add project changelog' is imperative.  `Adds project changelog` is declarative.
- Link to the pull request the changelog was made using the format `[123](https://github.com/eventespresso/event-espresso-core/pull/123)`
- Keep the changelog to one sentence so it can be quickly reviewed and has enough info to describe what was changed in the code.

## Changelogs for add-ons

Currently we've only started a changelog for EE core.  However, whenever an add-on is worked on, its expected that a changelog will be started for it following the same process as core.

