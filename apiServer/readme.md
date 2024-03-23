# BMR Generator Middleware

## Overview
This repository contains the middleware for the BMR (Batch Manufacturing Record) Generator web application. The middleware is responsible for handling server-side logic and providing APIs for client interaction.

## Features
- **Express Server:** Utilizes Express.js to create a robust server for handling HTTP requests.
- **Mock API Endpoints:** Implements mock API endpoints to simulate data retrieval, such as equipment types.
- **JWT Token Handling:** Integrates JWT (JSON Web Token) authentication for secure communication between client and server.
- **CORS Support:** Enables CORS (Cross-Origin Resource Sharing) to allow requests from different origins.
- **Client Interaction:** Provides endpoints for client-side interaction, such as fetching equipment types.

## Installation
1. Clone the repository: `git clone https://github.com/your_username/BMR_Generator_Middleware.git`
2. Navigate to the project directory: `cd BMR_Generator_Middleware`
3. Install dependencies: `npm install`

## Usage
1. Start the server: `npm start`
2. Access the API endpoints from the client application.

## API Endpoints
- **GET /equipment_list:** Retrieves a list of equipment types.
- **POST /login:** Authenticates users and generates a JWT token for subsequent requests.

## Dependencies
- Express.js
- Axios
- CORS
- JSONwebtoken
- Body-parser
- Crypto

## Contributors
- John Doe
- Jane Smith

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
