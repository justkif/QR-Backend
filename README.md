QR
==
    
The backend service for project QR.

Table of Contents
=================

- [Overview](#overview)
- [Dependencies](#dependencies)
- [Backend Design](#backend-design)
    - [System Diagram](#system-diagram)
    - [Feature Diagram](#feature-diagram)
    - [Database Diagram](#database-diagram)
    - [Use Case Diagram](#use-case-diagram)
- [Deployment](#deployment)
- [Links](#links)

Overview
========

This backend system powers a Check-In Web Application designed for managing event participants through secure role-based access and QR code-based attendance tracking. Built with Express.js and JWT authentication, the system provides APIs for managing users and runners, with distinct roles and permissions to ensure operational control and data integrity.

Dependencies
============

## Backend Framework
- `Node.js` – JavaScript runtime used for building the backend server.
- `Express.js` – Web framework for building the API, handling routing, and middleware.

## Authentication & Security
- `JWT (JSON Web Tokens)` – For secure, stateless authentication and role-based access control (jsonwebtoken package).
- `bcryptjs` – For hashing and securing passwords.

## Database
- `MongoDB` – NoSQL database for managing user and runner data (mongoose ORM for MongoDB).

## QR Code Generation
- `qrcode` – Used for generating and managing QR codes for runner check-in.

## Data Export
- `ExcelJS` – To export runner data in .xlsx format for reporting.

## Utilities & Environment Management
- `dotenv` – To manage environment variables securely.
- `CORS` – To enable Cross-Origin Resource Sharing (CORS) for secure API access across domains.

Backend Design
==============

## System Diagram
![System Diagram](./public/System%20Diagram.png)

The system architecture consists of a front-end application and a back-end server both hosted on Vercel, and a cloud-hosted MongoDB database on MongoDB Atlas. Users interact with the front-end through their web browsers, which provides a responsive interface and communicates with the back-end via secure HTTPS API requests. The back-end server handles the core application logic, processes client requests, and interacts with the MongoDB Atlas database to store and retrieve data.

## Feature Diagram
![Feature Diagram](./public/Feature%20Diagram.png)

The feature diagram highlights the core functionalities of the system by focusing on the final function names, which represent specific actions or capabilities. For users, these include `getAll`, `getScan`, `getScanned`, `createAll`, `createOne`, `loginUser`, `updatePasswordAdmin`, `updatePassword`, `updateRole`, and `updateScan`. For runners, the features are `getAll`, `getOne`, `generateQR`, `exportExcel`, `createOne`, `scanQR`, and `reset`. These function names reflect the system’s primary operations, such as data retrieval, creation, authentication, updates, and scanning activities.

## Database Diagram
![Database Diagram](./public/Database%20Diagram.png)

The database diagram is designed with four main tables: `Runner`, `Scan`, `Scanned`, and `User`. The `Runner` table stores individual information such as `ordinalNumber`, `fullName`, `gender`, `area`, `isPresent`, `timePresent`, `whoScan`, and `imageLink`, and has a unique `_id`. The `Scan` table includes `_id` and a boolean field `isScan` to indicate whether a scan is allow. The `Scanned` table keeps track of scan events with `id`, a reference to a user, and the runners have been scanned through `scanned`. The `User` table holds authentication and authorization data, including `_id`, `username`, `password`, and `role`.

## Use Case Diagram
![Use Case Diagram](./public/Use%20Case%20Diagram.png)

The use case diagram shows four primary user roles: `Runner`, `Scanner`, `Manager`, and `Admin`, with each higher-level role inheriting the permissions of the roles below it. The `Runner` can perform the `loginUser` use case, which *includes* the `generateQR` functionality and *extends* the `changePassword` use case. The `Scanner` can execute `getScanned` and `runnerGetOne`, and `runnerGetOne` *includes* the `scanQR` use case. The `Manager` has access to `runnerGetAll`, `runnerCreateOne`, and `exportExcel`, leveraging capabilities from both the Runner and Scanner roles. The highest role, `Admin`, can perform `reset`, `createAll`, `userCreateOne`, and `getScan`, where `getScan` *extends* `updateScan`. Additionally, Admin can execute `userGetAll`, which *extends* both `updatePasswordAdmin` and `updateRole`.

Deployment
==========

The backend service is deployed through Vercel.

Links
=====

Backend Web-Link: https://qr-backend-adidas.vercel.app

API Doc: https://qr-api-docs-adidas.vercel.app