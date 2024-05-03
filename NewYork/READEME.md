# New York!

My Home 🏠

I have been living in New York for the past 5 years and there is not other place I would call home.

## Setup and Run

1. Glitch Website: https://newyorksubscribe.glitch.me/NewYork/public/subscribe.html
2. Glitch Code: https://glitch.com/edit/#!/newyorksubscribe
3. Clone Github Repository: https://github.com/TammyJain1998/Web-Dev.git

4. Figma: https://www.figma.com/file/bCkNNDRf5OY5X0oyxNQ1Ye/Untitled?type=design&node-id=0%3A1&mode=design&t=TzfpFXVK1OUwANIZ-1

Open the Folder "New York" to access the html and css files.

## Concept and Steps

For this website, I developed a single page layout based on the same design concepts of 'Swiss Poster Design'.
I started by designing wireframes and then converted it to a high fidelity layout on figma. This also included coming up with a stylesheet with the fonts and color details.
I chose the color yellow, for my background to relate it to the yello taxis of NewYork.

## HTML and CSS Code

The project is made entirely using CSS and HTML code since we did not cover javaScript yet.

1. I added all the DOm elements using HTML and separated the main vreakdowns using the <div></div> finction.
2. All the styles have been added using CSS.

## Weather API from OpenWeather

I enhanced my project by integrating real-time weather data through the OpenWeather API, starting by obtaining a complimentary API key. Initially, there was a waiting period of two hours for the activation of the key, during which I utilized the time effectively by diving into CodinTrain's informative videos on API usage. These tutorials were instrumental in familiarizing myself with JSON file handling. Once the key was activated, I began harvesting essential weather parameters such as temperature, humidity, and wind speed. To enrich the user experience and make the data more intuitive, I carefully selected and assigned relevant icons that accurately reflect the weather conditions described in the data. This step not only made the information more accessible but also visually engaging.

## Creating an email API for subscription

For my website, I recently implemented a subscription feature, allowing visitors to submit their email addresses. Utilizing a basic email API, the server collects this data and responds with a confirmation message, including the submitted email address. As a novice in backend development, this project presented some initial challenges, but it served as a valuable learning experience. Moving forward, I'm eager to explore more complex APIs and further enhance my backend development skills.

## Connecting to MongoDB to add data for Places in New York

For this website, I enhanced the user experience by incorporating a dedicated page that showcases a curated list of must-visit places in New York. This was achieved by integrating MongoDB Atlas for database connectivity. I created a places.js file, which serves as a central repository for all the key details of each location. These entries can be dynamically added to the database and are displayed on the webpage in a visually appealing grid layout, accommodating four places per row.