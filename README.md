# New York City Traffic Analysis Project 2020/04

This project focuses on analyzing and visualizing traffic congestion patterns in New York City. Through an interactive web-based dashboard, users can explore traffic volume data collected between 2014-2018, with a specific focus on the 2017 dataset due to its completeness. The visualization tools help identify peak congestion times, high-traffic areas, and potential solutions to alleviate traffic problems in one of the world's busiest urban centers.

The application is built with HTML, CSS, JavaScript, and the D3.js visualization library. This research tool aims to provide valuable insights for urban planners, transportation authorities, and the general public interested in understanding NYC's traffic patterns.

Youtube introduction: https://www.youtube.com/watch?v=ueHrYtJkv3o

## Directory Structure

```
.
├── Dockerfile
├── README.md
├── README.txt
├── data-visualization.js
├── dataset
│   ├── 2017TVC.csv
│   ├── hourly_TVC.csv
│   └── rdTotal_TVC.csv
├── img-intro.jpg
├── img-question.jpg
├── index.html
├── server.js
└── styles.css
```

### Data Files

- `dataset/2017TVC.csv` - Primary 2017 NYC traffic volume dataset
- `dataset/hourly_TVC.csv` - Hourly traffic volume statistics
- `dataset/rdTotal_TVC.csv` - Road total traffic volume statistics

## Requirements

- [Docker](https://www.docker.com/) - Make sure Docker is installed and running on your system

**For Windows/Mac**:

- Download and install Docker Desktop from the [official website](https://www.docker.com/products/docker-desktop)
- Start Docker Desktop application

**For Linux**:

```bash
# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Start Docker service
sudo systemctl start docker

# Verify Docker is running
sudo docker --version
```

## Installation Steps

### Using Docker

1. Build Docker image

   ```bash
   docker build -t nyc-traffic-app .
   ```

2. Run Docker container

   ```bash
   docker run -p 3000:3000 -d nyc-traffic-app
   ```

3. Open your browser and visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `PORT` - Server listening port (default: 3000)

## Development Guide

For development or modifications, you can edit the following files:

- `index.html` - Modify page structure
- `data-visualization.js` - Update JavaScript functionality
- `styles.css` - Adjust styles
- `server.js` - Change server configuration
