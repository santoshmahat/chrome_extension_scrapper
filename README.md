## Description
This is a fullstack application for scrapping ecommerce websites. It is build on react js for
building chrome extension which scraps data from ecommerce site and sent it to server, which is build on nest js for storing scrapped data. 
  - Add new source information into the SCRAPPING_SOURCE constant variable and add regex expression accordingly in REGEX_PATTERN constants varaible when you want to scrap data from new source. 

## Running the app

```bash
  # client which is chrome extension
  $ cd client
  $ npm install
  $ npm run build
  # upload this build folder into the extension tab of chrome
```

```bash
  # server which store data into our database
  $ cd server
  $ docker-compose up --build
```

## Database overview
  - Sequelize as an orm on the top of mysql is used as database.
  - No need to worry about setting up database locally, docker will do that for you :)
  - Product table
    - name
    - description
    - price
    - source - which helps in visualization and analysis of data 
    - image_url
    - entity - There might be various entity like product, order, shipments etc later on, from a single source

## Chrome extension popup

<img width="380" alt="Screenshot 2024-05-11 at 9 13 37 pm" src="https://github.com/santoshmahat/chrome_extension_scrapper/assets/26522839/61d3e4ef-2f5b-41ed-91ac-43c0d40f0c89">
      
