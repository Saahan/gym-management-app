# Gym Management App

This app provides a management solution to a small scale gym. There are features to facilitate the gym manager to manager users, payment receipts, user's diets and payment plans, as well as members to view their receipts, download receipts, view diet alloted by trainers, and view plans the gym offers.

The project is hosted live on: https://gym-management-app.onrender.com.

Admin Account: admin@admin.ca, password: sdsam123
Note: Admin account cannot be created from the sign-up page, it can only be assigned from the back-end by the developer currently. Please use the above account to check out the admin route of the app.

View the system architecture PDF here: https://drive.google.com/file/d/1bDX0uR_XUWBJk5P6BTfiHfNvZNBPtUkh/view?usp=drive_link

Note: Please wait for a minute or so for the site to load for the first time. Because they are hosted on a free account, the backend services dial down after 15 minutes of inactivity.

## Features

There are three types of accounts which give access to different types of priveleges. The "Admin" privelege would be that of a gym manager. Additonal privleges include "Member" and "User/Guest". When the user initially signs up for an account, they are given "Guest" priveleges. The "Admin" can then change the privileges of those "Guest" accounts to "Members" and also change them back. The Dashboard is rendered and split into different views depending on who has logged in.

### Admin Priveleges

An Admin can:

- View their profile, where they can check out their personal details like name, email and contact details. They can also upload or change their profile picture, which is hosted on Firebase Storage.

- View a list of all members of the gym. In this view, the admin can edit member details such as name and contact, and also change the type of plan they are on. The admin can also remove members from the gym, which will change their priveleges from "Member" to "Guest". This view does not list guest accounts, it only lists accounts with "Member" priveleges.

- Assign a membership to those users who are registered as guests. On intital sign up, all users are alloted guest privileges until the admin changes it to member.

- Create bill receipts for members. A list of member's email is shown in the select field, and then other details such as amount, payment date, invoice number and comments can be added through a form. The admin must make sure to keep the invoice number unique for a particular member. Creating a bill will send a notification to the member, with the time of creation noted down.

- Allocate diet to members. This form allows the admin to change the diet details of the user, or create one if it doesnt exist. Doing so will send a notification to the member, with the time of change noted down.

- Manage an online store, where they can add/remove items from the supplement store of the gym. Presently, this store is generated statically, but in a future update, I can implement a feature so that the admin has full control over the products in the online store.

### Member Priveleges

A Member can:

- View their profile, where they can check out their personal details like name, email and contact details. They can also upload or change their profile picture, which is hosted on Firebase Storage.

- Check notifications and how long ago they were posted. Notifications are generated when a payment receipt is created or when diet details are changed by the admin.

- Check payment receipts (bills). They can also save the receipts as a pdf file.

- View payment plans offered by the gym. Currently these plans have been statically generated, but in a future update, I can facilitate the admin to create those plans.

### Guest Priveleges

A Guest User can:

- View their profile, where they can check out their personal details like name, email and contact details. They can also upload or change their profile picture, which is hosted on Firebase Storage.

- View payment plans offered by the gym. Currently these plans have been statically generated, but in a future update, I can facilitate the admin to create those plans.

# Back-End Stuff

The details of the admin, members and guests are all stored in a MongoDB free tier database. Any changes to those are recorded in the database. An admin account can only be created by making a guest account and then changing their account type to "admin" through a database query. A feature to assign admin priveleges through the front-end by another admin can be implemented in the future. Payment receipts are also kept on record for all users in the database itself and cannot be erased from the front-end.

This app uses Firebase for authentication as well as for storage of product and profile photos.

This app used ExpressJS for API calls and the API is hosted on Render on the link: https://gym-management-app-api.onrender.com. This service dials down after 15 minutes of inacitivity because it is hosted on a free tier. So please be patient while loading the app for the first time (it takes a minute or so).

- Advisory: Do not use real emails and phone numbers to register when checking out the demo of the project. The "Forgot Password" link works perfectly with real emails, but you will have to trust me on it. Feel free to modify the products as you wish, but try not to overload the database with useless data. Thanks!
