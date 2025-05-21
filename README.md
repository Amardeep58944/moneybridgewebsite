# MoneyBridge

A financial services website that helps consumers compare and apply for various loan products from multiple banks.

## Project Structure

The project is divided into two main parts:
1. Frontend - HTML, CSS, and TypeScript
2. Backend - Java-based servlet application

## Frontend

The frontend is a static website built with:
- HTML5
- CSS3
- TypeScript

### Running the Frontend

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

This will start the development server on http://localhost:5173.

## Backend

The backend is built with Java and uses:
- Servlet API
- Maven for dependency management
- Tomcat for deployment

### Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project with Maven:
```bash
mvn clean package
```

3. Run the backend using Tomcat Maven Plugin:
```bash
mvn tomcat7:run
```

This will start the backend server on http://localhost:8080/moneybridge.

## Features

- Compare loan products from different banks
- Apply for loans online
- Calculate EMIs and loan details
- Browse various financial products including:
  - Personal Loans
  - Home Loans
  - Car Loans
  - Gold Loans
  - Business Loans
  - Education Loans

## Color Scheme

The site uses a red and white color scheme:
- Primary Color: #8a0d0d (Red)
- Secondary Color: #ffffff (White)

## Contact

For more information, contact:
- Email: booking@moneybridge.com
- Phone: 9878981166
