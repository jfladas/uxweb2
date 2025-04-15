# sweet

✨ Welcome to this sweet project! ✨

## Project Structure

This workspace contains the following key components:

- **Frontend**: An Angular-based application located in `apps/frontend`.
- **Backend**: A NestJS-based application located in `apps/backend`.
- **Shared Library**: A library for shared utilities and components located in `libs/shared`.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Nx CLI (optional, but recommended)

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd uxweb2
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Applications

#### Frontend

To serve the frontend application:

```sh
npx nx serve frontend
```

The application will be available at `http://localhost:4200`.

#### Backend

To serve the backend application:

```sh
npx nx serve backend
```

The backend will run on `http://localhost:3000`.
