
# Weather Website

This is a simple weather website built using NestJS and Tailwind CSS. It uses the OpenWeatherMap API to fetch the weather information of different cities.

## Prerequisites

Before running this project, you need to have the following software installed on your machine:

* Node.js (v14 or higher)
* npm or yarn

## Installation

Follow the below steps to install and run this project on your local machine:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/weather-website.git
   ```
2. Install the dependencies:

   ```
   npm install
   ```
3. Create a `.env` file and add your OpenWeatherMap API key or use mine from the `.env.example`:

   ```
   NEXT_PUBLIC_OPEN_WEATHER_API_KEY = 
   ```
4. Start the development server:

   ```
   npm run dev
   ```
5. Open your browser and visit `http://localhost:3000` to see the weather website.

## How to Use

Enter the name of a city in the search bar to view the current weather of that city or use your current location. The website also displays a three-day forecast of the selected city.

## Technologies Used

* NestJS (Node.js framework)
* Tailwind CSS
* OpenWeatherMap API
* Luxon
* React Toastify
