
# Datalous (D3-ImageMap) MERN Application

This web application showcases my skills in developing and designing applications with the MERN stack, as well as my capabilities with the D3-ImageMap library, a sophisticated tool for creating and managing interactive SVG maps. Constructed using MongoDB, Express, React, Node.js (MERN), and Docker for containerization, it lays the foundation for a SaaS platform. This platform will eventually support the integration of dynamic image maps as either I-Frame or React Components. It includes features such as clickable markers, tooltips, zoom, and pan functionalities.

Currently, the web application supports HTTP breaker token authorization and comprehensive user account management, ensuring secure and personalized user experiences. The project is actively being developed, with new features for the maps anticipated to be added soon.


Update 04/30/24

This App now uses S3 storage and reilies on an uncommitted .env file so map uploads will not work unless new s3 credintals are provided

## Features For The Map

- **Interactive Image Maps**: Create and interact with SVG-based image maps.
- **Clickable Markers**: Add markers on the map that users can click for more details.
- **Tooltips**: Display tooltips with additional information when hovering over markers.
- **Multi-Selection**: Support for selecting multiple markers simultaneously.
- **Zoom and Pan**: Explore maps in detail with intuitive zoom and panning.
- **HTTP Breaker Token Authorization**: Enhance security with token-based access control.
- **User Account Management**: Manage user profiles, authentication, and access rights.
- **Active Development**: New features for maps are being developed and will be released soon.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Docker
- Node.js
- MongoDB

### Installing

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/d3-imagemap-application.git
cd d3-imagemap-application
```

2. **Build and Run the Docker Container**

```bash
docker-compose up --build
```

This command builds the application and starts all services defined in `docker-compose.yml`, including the web server, database, and any other required services.

### Usage

- Navigate to `http://localhost:5173/` in your web browser to view the application. Explore the interactive maps and utilize the tool's features.
- Submit queries to `http://localhost:3000/` in your http or web browser to submit 
  
If you run this please do not reuse any shared passwords or credentials 

## Development
- **Container**: This App is currently contained within a two Docker containers linked with Docker compose 
- **Client**: The client-side is built with React, and Vite providing a dynamic user interface for interacting with the maps.
- **Server**: The server-side runs on Node.js and Express, handling API requests and serving the client files.
- **Database**: MongoDB is used for storing information about the maps and markers.

## License

This project is fully copyrighted. All rights reserved.

## Acknowledgments

- Thanks to the creators and contributors of the D3.js library for making interactive data visualization possible.
