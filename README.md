# bekome.

## Description

_Duration: 2 Week Sprint with 1 Week Scoping_

Finding a therapist that you gel with isn't easy. It's a long process that usually involves a lot of trial and error and persistence. Many people seeking therapy give up before they even start.

bekome aims to make the act of matching therapists to clients a painless process. The app is set up similarly to a dating app, such as Hinge. Clients and providers respectively set up their profiles with personal info, preferences, profile picture, and more. Then clients are able to browse and filter through providers and communicate with the ones who seem like a good fit.

## Screen Shots

### Explore View:
![explore](documentation/images/explore-view.png)

### In-App Messaging:
![messaging](documentation/images/messaging.png)

### Provider Introduction Video
![video](documentation/images/video.png)

### Provider Edit Profile
![edit](documentation/images/edit-questions.png)



### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Create a database named `bekome`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries
3. Create `.env` file. Add secret key as well as the following keys from your AWS bucket
  - `AWS_SECRET_ACCESS_KEY=`
  - `AWS_ACCESS_KEY_ID=`
  - `AWS_S3_BUCKET=` /* name of bucket */
  - `AWS_S3_REGION=` /* i.e. us-east-2 */
  - `REACT_APP_AWS_S3_URL=` /* url of your bucket, i.e. `https://<bucketname>.s3.amazonaws.com` */
  You'll also need a key for the socket.io client origin:
  - `SOCKET_ORIGIN=http://localhost:3000` (if running locally)
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

### If you are a client
1. Create account
2. Enter personal info and preferences
3. Explore providers and filter by preference
4. View providers, add them to 'saved providers'
5. Message your saved providers in order to form a connection for further communication

### If you are a provider
1. Create account
2. Enter personal info and credentials
3. Answer questions to reveal detail about personality, approach, etc.
4. Edit profile and tailor-make it to attract clients
5. Wait for clients to save your profile in order to interact
6. Once a client saves your profile, you may wait for a message from them, or message them yourself to form a connection


## Built With

- React
- Node.js
- Redux
- Sagas
- PostgreSQL


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.
