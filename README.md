# Sprint9 - Travel Agency Frontend part with React

## About the project

- This is final project i made while studying at Baltic Institute of Technology.
- It's an application created with PHP **Laravel** framework as Backend part and JavaScript **React** library as Frontend part.
- For database i used **MySQL Workbench**.
- Main styling was made with **Bootstrap** framework and a bit of raw **CSS**.

## Features

- This Travel Agency app is connected with MySQL Workbench. All the changes made in the application change data in the database too, and the other way around. I used 1:M relation to link Countries - Hotels and Hotels - Customers. It means one Country can have many hotels and one hotel can have many customers.
- Application has login and register forms. For authentication i used JWT. Once you are logged in, you can see all the data and make changes like:
  - Add new country, hotel or custumer. Assign country to a hotel or hotel to a customer.
  - Update countries, hotels and customers;
  - Delete countries (only if there are no hotels assigned), hotels (only if there are no customers assigned), customers;
- If you are not logged in you can only:
  - See hotels and its information ordered by price;
  - Search for a hotel by its name;

## Launch procedure

To run this project follow the steps below:

1. First follow the launch procedure in backend part to get the API https://github.com/IevaBa/Sprint9-TravelAgency-backend .
2. Navigate to the folder where you want to have this project saved. Open your terminal and type `git clone https://github.com/IevaBa/Sprint9-TravelAgency-frontend.git`.
3. Open cloned project in VScode.
4. To see the application in browser you still need node_modules and other ignored files. Run `npm install` in terminal to get that.
5. One final thing - run `npm start` and you are done !!!

## Author

This project was created by me - Ieva Baltriukaite.

Find me on [LinkedIn](https://www.linkedin.com/in/ieva-baltriukaite-59038755/)
