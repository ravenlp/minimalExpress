# Minimal Express example

An example of a (pretty mutch) minimal implementarion of an NodeJs server, using Express, a db layer using MongoDb and a simple UI built using React.

## How to run production build

To run the production build just fire up docker-compose as follows: 

(NOTE: The lastest build is included in the repo just to make it easier to dive in and test the server without needing to run npm install.)

```bash
docker-compose -f "docker-compose.yml" up --build
```

After a short while the project should be available throu http://localhost:3000/ 

## How to develop using this example

First of all you'll need the dependencies: 
```bash
npm install
```
After that you can run the same `docker-compose` command form above (to get the mongoDb server runnig) and run in another terminal 

```bash
npm run dev
```

To get a new build for production try

```bash
npm run build
```

## The exposed API

The server exposes a really simple api.

### healthcheck

To test server availability 

* **URL**

    /api/healthcheck

* **Method:**

    `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ status : "success" }`


### Track new url

To send a new url to the server to be stored

* **URL**

    /api/track

* **Method:**

    `POST`

* **Data Params**

    `url: URL_TO_TRACK`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** `{ status : "success", data { url: URL_SENT } }`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ {status: 'error', message: 'Invalid payload'} }`
