# Colab Counters

A web application for managing shared counters. This came about when wanting to track how many bags of chips each member of the dev team could eat in a certain period of time. It started as an application one would use in application and was named Counters (and a perfect fit for a NoSQL). After its initial version was complete, a coworker thought that being able to share counters would be great. And Colab Counters was born. This was no longer a good fit for a NoSQL model as data either had to be replicated or janky joins were done. This was deemed acceptable and will work well at a small scale.

## Features

### Firebase

- Authentication via Google or email/password
- Storage using Cloud Firestore

### Dashboard capabilities

- Display Google photo
- Switch between sort types
- Hide counter names

### Counter interactions

- Create (up to 10) counters
- Increment/decrement a counter
- Alter name of counter
- Edit counter name

### Collaboration

- Share a counter through an autocompleted list of all users
- Edit privileges of a collaborator
- Restrict collaborator abilities based on privileges

### Statistics

Show stats for each counter

- A cumulative count over time
- The daily cumulative count
- The cumulative count per user

[Change log](CHANGELOG.md)
