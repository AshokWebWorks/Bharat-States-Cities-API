# Bharat States Cities API

Bharat States Cities API is a RESTful API that provides comprehensive information about states and cities in India. It offers an easy-to-use interface to access a curated list of Indian states and their respective cities, making it a valuable resource for applications requiring location-based data within the Indian subcontinent.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Examples](#examples)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Retrieve a list of all Indian states.
- Get detailed information about a specific state by its ID.
- Fetch cities associated with a particular state.
- Obtain a list of all cities across India.
- Support for pagination and query parameters for flexible data retrieval.
- Rate limiting to prevent abuse and ensure fair usage.

## Getting Started

### Prerequisites

- Node.js (version 18.x recommended)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AshokWebWorks/Bharat-States-Cities-API.git
   cd bharat-states-cities-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your PostgreSQL database and configure the connection details in `db.js`.
4. Start the server:
   ```bash
   npm start
   ```

### Usage

#### Endpoints

<li>
<b>/v1/api/states:</b> Get a list of all Indian states.
</li>
<li>
<b>/v1/api/states/:id:</b> Get details of a specific state by ID.</li>

<li>
<b>/v1/api/states/:id/cities:</b> Get cities associated with a specific state.</li>
<li>
<b>/v1/api/cities:</b> Get a list of all cities across India.</li>

#### Examples

<li>Get all states</li>

```bash
GET http://localhost:3000/v1/api/states
```

<li>Get details of a specific state (e.g., state with ID 1):</li>

```bash
GET http://localhost:3000/v1/api/states/1
```

<li>Get cities associated with a specific state (e.g., state with ID 1):</li>

```bash
GET http://localhost:3000/v1/api/states/1/cities
```

<li>Get a list of all cities across India:</li>

```bash
GET http://localhost:3000/v1/api/cities
```

### Documentation
For detailed information on available endpoints, query parameters, and response formats, refer to the [API Documentation](http://localhost:3000/).
### Contributing

`Contributions are welcome! If you have any improvements, bug fixes, or feature requests, please submit an issue or a pull request.`

### License
This project is licensed under the MIT License.


