# Macra

Macra is a web application for booking tickets to live events and concerts. It allows users to browse events by city, view event details, book tickets, and view their order history. 

<img src="https://github.com/user-attachments/assets/54cb41d1-e9ad-4959-88c4-bc79c143d32b" width="100%" />

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse events by city
- View event details
- Book tickets for events
- Self hosted user authorization & authentication / Google sign-in
- Razorpay payment gateway integration
- View order history
- Responsive design

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/aadityamayankar/macra-fe.git
    cd macra
    ```

2. Install dependencies:

    ```sh
    yarn install
    ```
    *Or use a package manager of your choice.*

3. Create a `.env.local` file in the root directory and add the necessary environment variables:

    ```env
    NEXT_PUBLIC_API_URL_USER=<your_api_url_user>
    NEXT_PUBLIC_API_URL_AUTHN=<your_api_url_authn>
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your_google_client_id>
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI=<your_google_redirect_uri>
    NEXT_PUBLIC_GOOGLE_SCOPE=<your_google_scope>
    NEXT_PUBLIC_RAZORPAY_KEY=<your_razorpay_key>
    ```

## Usage

1. Start the development server:

    ```sh
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
macra/ 
├── .next/ 
├── src/ 
│ ├── app/ 
│ │ └── ...
│ ├── components/ 
│ │ ├── fe/ 
│ │ │ └── ...
│ │ ├── ui/ 
│ │ │ └── ...
│ ├── store/ 
│ │ └── useStore.js 
| ├── ...
└── README.md
```

## Scripts

- `yarn dev`: Start the development server
- `yarn build`: Build the application for production
- `yarn start`: Start the production server
- `yarn lint`: Lint the codebase
- `yarn format`: Format the codebase

## Environment Variables

The following environment variables are required:

- [NEXT_PUBLIC_API_URL_USER](): The base URL for user-related API endpoints
- [NEXT_PUBLIC_API_URL_AUTHN](): The base URL for authentication-related API endpoints
- [NEXT_PUBLIC_GOOGLE_CLIENT_ID](): The Google OAuth client ID
- [NEXT_PUBLIC_GOOGLE_REDIRECT_URI](): The Google OAuth redirect URI
- [NEXT_PUBLIC_GOOGLE_SCOPE](): The Google OAuth scope
- [NEXT_PUBLIC_RAZORPAY_KEY](): The Razorpay API key

## License

This project is licensed under the MIT License.
