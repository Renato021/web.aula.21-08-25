# Usado Mix

## Overview
Usado Mix is a Portuguese-language e-commerce platform for buying and selling used items with donation features. The application allows users to browse products, manage categories, place orders, and donate items through designated delivery points.

**Current State**: Fully configured and running on Replit with all dependencies installed and deployment settings configured.

## Recent Changes
- **November 25, 2025**: Initial project import and Replit environment setup
  - Updated server.js to bind to 0.0.0.0:5000 for Replit compatibility
  - Installed all Node.js dependencies
  - Configured workflow to run the application
  - Set up autoscale deployment configuration

## Project Architecture

### Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Database**: JSON file-based storage
- **Port**: 5000 (frontend and backend combined)

### Project Structure
```
/
├── db/                   # JSON database files
│   ├── produtos.json     # Products data
│   ├── usuarios.json     # Users data
│   ├── categorias.json   # Categories data
│   ├── pedidos.json      # Orders data
│   ├── comentarios.json  # Comments data
│   ├── pontos.json       # Delivery points data
│   └── doacoes.json      # Donations data
├── public/               # Static frontend files
│   ├── auth/            # Authentication pages
│   ├── categorias/      # Categories pages
│   ├── comentarios/     # Comments pages
│   ├── css/             # Stylesheets
│   ├── doacoes/         # Donations pages
│   ├── js/              # JavaScript files
│   ├── pedidos/         # Orders pages
│   ├── pontos/          # Delivery points pages
│   ├── produtos/        # Products pages
│   ├── index.html       # Login page
│   └── home.html        # Home page
├── server.js            # Express server (main entry point)
└── package.json         # Node.js dependencies
```

### Key Features
1. **User Authentication**: Login and registration system with localStorage-based sessions
2. **Product Management**: CRUD operations for products with categories
3. **Order System**: Create and manage orders
4. **Comments**: User comments and reviews
5. **Donation System**: Donate items through designated delivery points
6. **Delivery Points**: Manage pickup/delivery locations

### API Endpoints
All endpoints are prefixed with `/api`:

**Products**: `/api/produtos` (GET, POST, PUT, DELETE)
**Users**: `/api/usuarios` (GET, POST, DELETE), `/api/login` (POST)
**Categories**: `/api/categorias` (GET, POST, PUT, DELETE)
**Orders**: `/api/pedidos` (GET, POST, PUT, DELETE)
**Comments**: `/api/comentarios` (GET, POST, PUT, DELETE)
**Delivery Points**: `/api/pontos` (GET, POST, PUT, DELETE)
**Donations**: `/api/doacoes` (GET, POST, PUT, DELETE)

## Running the Project

### Development
The application runs automatically when the repl starts via the configured workflow.
- Workflow: "Start application" (configured in `.replit`)
- Command: `npm start`
- Server runs on: `0.0.0.0:5000`
- The workflow automatically restarts after installing dependencies

### Deployment
- Deployment target: **autoscale** (configured in `.replit`)
- Production command: `node server.js`
- To publish: Click the "Publish" button in the Replit interface
- The deployment configuration is located in the `.replit` file under the `[deployment]` section

## Database

### JSON File-Based Storage
The application uses a JSON file-based database stored in the `/db` directory:
- **No additional database setup required**
- Data is automatically loaded and saved via the readDB/writeDB functions
- Each entity type has its own JSON file

### Data Management
- **Initial State**: JSON files may contain empty arrays `[]` on first run
- **Data Persistence**: All changes are saved immediately to the respective JSON files
- **Manual Editing**: You can manually edit JSON files in the `/db` directory if needed
- **Backup Recommendation**: Consider backing up the `/db` directory regularly

### Database Files
Each file serves a specific purpose:
- `produtos.json` - Product listings with name, price, description, category, and image
- `usuarios.json` - User accounts with email and password (plain text - see security notes)
- `categorias.json` - Product categories
- `pedidos.json` - Customer orders
- `comentarios.json` - User comments and reviews
- `pontos.json` - Delivery/pickup point locations
- `doacoes.json` - Donation items

## Security Notes
- User passwords are currently stored in plain text in the JSON files
- Authentication is handled via localStorage on the client side
- Consider implementing proper password hashing and JWT tokens for production use

## Language
The application is entirely in Portuguese (Brazil).
