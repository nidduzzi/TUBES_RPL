# TUBES_RPL

REPO: [Github](https://github.com/nidduzzi/TUBES_RPL)  

Created by:  
Ahmad Izzuddin (1908918)  
Fajar Zuliansyah Trihutama (1905394)  
Nenden Citra Softwatul Ningrum (1908589)  
Yudi Prasetyo (1905348)  

## Setup Database

Create a database named `tiketin` or modify `/server/.env` `DATABASE_URL` property to suit your database url address, eg. "mysql://root:@localhost:3306/tiketin?socket_timeout=30".  

Then go inside /server:  

```shell
cd server
```

Then install the required packages by executing:  

```shell
npm i
```

and execute the following commands:  

```shell
npm run setupDB
```

Incase it doesn't work, make sure you have the correct DATABASE_URL property and database name.  

## Run Backend

Install the required packages by executing:  

```shell
npm i
```

To run the backend server in dev mode execute:  

```shell
npm run dev
```

To run the backend server in dev debug mode execute:  

```shell
npm run dev:debug
```

To compile the backend server to javascript execute:  

```shell
npm run compile
```

To run the compiled backend server execute:  

```shell
npm start
```

## Run Frontend

Configure `/client/.env` parameters such that `VUE_APP_BASE_API` points to the running backend server's public address and `VUE_APP_BASE_URL` points to the client's public address.

Go inside /client:  

```shell
cd client
```

Then install the required packages by executing:  

```shell
npm i
```

To run in dev mode execute:  

```shell
npm run serve
```

To create production buid execute:  

```shell
npm run build
```

To run production build execute:  

```shell
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```
