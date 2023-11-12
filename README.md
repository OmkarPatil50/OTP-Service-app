```markdown
# OTP Service App

Welcome to the OTP Service App! This application allows you to generate and verify OTPs using the provided API.

## Table of Contents

- [OTP Service API](#otp-service-api)
- [Technology Stack](#technology-stack)
- [Functionality](#functionality)
- [API Interaction](#api-interaction)
- [Design](#design)
- [Deployment](#deployment)

## OTP Service API

OTP Service API used : [https://otp-service-beta.vercel.app](https://otp-service-beta.vercel.app).

### Technology Stack

- React.js
- MUI (Material UI)
- useContext API

### Functionality

The application consists of two sections: one for generating OTPs and another for verifying OTPs. The state management is handled using React hooks.

### API Interaction

The application interacts with the provided `/api/otp/generate` and `/api/otp/verify` endpoints. Appropriate measures have been taken to handle errors gracefully.

### Design

The interface is designed to be responsive and visually appealing.

### Deployment

The frontend is deployed on Vercel. You can access it through the provided deployment link.


## Local Setup

1. Clone the repository.
   ```bash
   git clone <https://github.com/OmkarPatil50/OTP-Service-app>
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Start the development server.
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


