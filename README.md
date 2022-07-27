# mern-social-app-with-auth
Mern App with Auth Management


#### Step-1: Create a project folder
> cmd: npm init -y   // generate package.json file /n
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

#### Step-2: create api folder(this folder means backend folder). Under api folder create server.js file.
#### Step-3: create .env file in root folder.
#### Step-4: create a react app in root folder.

> cmd: npx create-react-app social    // here socail is a react app name
>

#### Step-5: install all packages in root folder.
cmd: npm install express nodemon dotenv colors mongoose multer jsonwebtoken bcryptjs

#### step-6: setup .env file. Under env file write
> SERVER_PORT = 5050

#### Step-7: Setup server.js file. In server.js file write
    import express from "express";
    import colors from "colors";
    import dotenv from "dotenv";

    // initialize express
    const app = express();
    dotenv.config();

    // initialize enviornment variable
    const PORT = process.env.SERVER_PORT || 5000;

    //listen server
    app.listen(PORT, () => {
        console.log(`server running on port ${ PORT }`.bgGreen.black);  
    });


#### Step-8: install concurrently package for many project run at a time
> cmd: npm install concurrently -D

#### Step-9: Root folder package.json folder write new script
> "start": "concurrently \"npm run server\" \"npm run social\"",   \\here social is a react app name
#### Step-10: Now run server
> npm run start
