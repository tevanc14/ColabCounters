# Changelog

## [0.10.0] - 2019-01-24

Added

- Add a `countersCreated` property to the user
- Limit the number of counters you may create to 10 (for now)

Changed

- Database field name changes as the fields get used in many places and could be confused:
  - `users/uid` -> `users/userId`
  - `counters/id` -> `counters/counterId`

## [0.9.0] - 2019-01-23

Changed

- Disable collaboration permission switches as editing a collaborator is broken

## [0.8.0] - 2019-01-23

Added

- Add a collaborator (very sloppily for now)

Changed

- Refactored data structures for collaborative usage
- Moved card actions into a menu

## [0.7.1] - 2019-01-22

Changed

- Daily count stats take type into consideration so it shows
  the net change on a day as opposed to total interactions
- Taskbar doesn't have whitespace when on different views

## [0.7.0] - 2019-01-22

Added

- Graphs
  - Line graph for cumulative counts
  - Bar graph for daily counts

Changed

- Material icons

## [0.6.2] - 2019-01-21

Removed

- Firebase config to take it out of source control

## [0.6.1] - 2019-01-21

Changed

- Fixed bug where refreshing the page would not retrieve
  counters from Firestore

## [0.6.0] - 2019-01-21

Changed

- Have all appropriate colors be linked to the theme
- Defaulting to dark theme
- Deployment settings to be deployable
- Database settings to be restricted

## [0.5.0] - 2019-01-21

Added

- Sort counters by name

Changed

- Ran formatter on all files

## [0.4.0] - 2019-01-21

Added

- Get counters for the authenticated user

## [0.3.0] - 2019-01-21

Added

- Authentication
  - Log in (Google or email/password)
  - Sign up (Google or email/password)
  - Password reset
  - Email verification
  - Log out button

## [0.2.2] - 2019-01-20

Changed

- Reorganize component structure
- Separate counter dashboard components into own module
- Moved all dashboard logic into own component and out of
  app component
- Keep create FAB at bottom when scrolling

## [0.2.1] - 2019-01-20

Added

- Not allow a counter to decrement below zero

## [0.2.0] - 2019-01-20

Added

- Delete a counter

## [0.1.0] - 2019-01-19

Added

- Create new counters

## [0.0.3] - 2019-01-19

Changed

- Quickly show shadow on card when mousing over
  (although it blinks when you click a button, which could work)

Removed

- Zoom effect as moving UI that you can interact with
  seems not great

## [0.0.2] - 2019-01-19

Added

- Zoom effect on card hover

## [0.0.1] - 2019-01-19

Added

- First working version

Changed

- Separated counter into its own component
