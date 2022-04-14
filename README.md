# miniblog

Simple mini-blog application with back-end server, and front-end.

This is a blog application that allows a user to post blog entrie, go back and edit existing entries, or delete them. They may read other user's blog entries but can only edit or delete their own. The authorization is controled by the client's JWT login credential, which is given to them by the server at the time of authentication. The back-end of the application is implemented in the Spring framework for Java, and uses a PostgreSQL database. The front end is implemented by React framework for Javascript to create a single page application in which most of the HTML is rendered on the client side. The build and runtime deployment is controlled by the Apache Maven tool.

## How to Run and Test the Application

After you pull the code from Github, you will need to set up a database instance on PostgreSQL. This was developed and tested using a locally installed instance of PostgreSQL. If you don't have an instance installed you may download the installation for your OS from https://www.postgresql.org/download/ or use Docker.

Once PostgreSQL is installed you can use their admin tool to create a user account. Once you have the account, you can use command line to set up the database. Make sure the bin directory of the PostgreSQL installation is in your PATH. Then you can type `createdb miniblog` to create a database called miniblog.

In the application code, edit the file `src/main/resources/application.properties`. You will need to modify the following lines:

```
spring.datasource.username=<username>
spring.datasource.password=<password>
```

Replace your PostgreSQL username and password here and save the file.

Also, in case you wanted to use a different database name you would need to modify `application.properties` on this line:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/<database_name>
```

Now you are ready to build and run the application. On command line from the `miniblog` directory, type the following:

```
./mvnw spring-boot:run
```

You will see messages indicating the build and then deployment to an internal instance of Apache Tomcat. If it runs correctly you will see a message, `Started MiniblogApplication`.

Now you can open your browser with the following URL:

```
localhost:8080
```

You should see the miniblog web application.

You can also confirm the application is writing to your database. Type the following PostgreSQL command:

```
psql miniblog
```

You will get a psql prompt, from which you can type SQL queries against the miniblog database. You can type `\dt` to list all the tables. There should be two tables, `app_user` and `card`. Once you start generating data with the application, you can view the contents of the tables by typing `select * from app_user;` and `select * from card;`. To quit psql, type `\q`.

## Design of Back-end Server

The server is built using the Spring framework for Java.

Database interaction goes through JPA/Hibernate which is an object-relational management system. The Java application code provide the data domain definition using JPA annotations on domain classes, and data interaction methods on data repository interfaces, while Hibernate generates all the SQL queries to create tables and perform needed CRUD operations. This allows the application an object oriented interaction with the data, and avoids any application code specific to the DBMS implementation.

REST services and web are handled by Spring Web Controllers, which manage HTTP requests and responses and URL endpoints.

Spring security manages authentication and authorization, as well as security settings for HTTP. The specific credential system JWT is used by calls to the io.jsonwebtoken package.

The REST service URLs on this server are:

- `/api/auth/register`
- `/api/auth/signin`
- `/api/card/get`
- `/api/card/add`
- `/api/card/edit`
- `/api/card/delete`

## Front-End

The front-end is mostly based on Javascript. The Maven front-end plugin internally installs Node JS and npm, then uses npm to download dependencies. It then uses Webpack to compile all the Javascript into a single `bundle.js` file to be used by the client. This is referenced by `src/main/resources/templates/index.html`, which is the only HTML page rendered by the server. Javascript uses the `root` element to render the entire web application using the React framework. REST calls are made using Javascript `fetch` calls passing data as JSON.
