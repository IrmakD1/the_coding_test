# THE Coding Test

This is a simple Node.js Api allowing user to GET and POST instution data to a mongo db. The type of data returned is what I'd expect for a react UI to consume.

## Overview

The focus of this task was not to provide extensive functionality for the API and data manipulation, but to provide a well-tested, standalone app that utilises multiple different technologies including MongoDb and docker to run it. 

## Installation and Running

The app is written with Node.js and runs with a docker-compose.yaml file to spin up and maintain the MongoDb and Mongo UI

Step 1.

```bash
npm install
```

Step 2. Run the App with:

```bash
docker-compose up
```
or

```bash
npm run start:docker
```

This will spin up the app with the docker-compose.yaml and run the app's start command, which will connect to the MongoDb and and upload the institution and submission data found in the ./data folder.

```bash
docker-compose down
```

At any time to stop the application and all running containers


## API Endpoints and Requests
* **URL**

  /

* **Method:**
 

  `GET` | `POST`

**Get:**

Will return a list of all the institutions and their top level data.

* **Success Response:**
  
    **Content:** 
```javascript
[{
    "name": "Prestigious Science University",
    "address": "P.O. Box 114, 6922 Volutpat. Ave",
    "country": "Jordan",
    "region": "Metropolitana de Santiago",
    "id": "EA8BBED7-4106-94AF-48DD-A1414E386AFB"
  },
  {
    "name": "Top University of Mathematics",
    "address": "380-7690 Sem Rd.",
    "country": "Heard Island and Mcdonald Islands",
    "region": "LAL",
    "id": "DEA4606B-4A21-D497-40E9-A5FB7589B536"
  }
  ]`
```

**URL Query Params**


   **Optional:**
 
   `/?complete=true`

   This will return a list of all of all the institutions data with a join on the submission.json data to return the base institution data with the most up to date submission entry for each institution.

* **Success Response:**
  
    **Content:** 
```javascript
[
    {
        "_id": "60c73e5b6e2880001411d096",
        "name": "Top University of Mathematics",
        "address": "380-7690 Sem Rd.",
        "country": "Heard Island and Mcdonald Islands",
        "region": "LAL",
        "id": "DEA4606B-4A21-D497-40E9-A5FB7589B536",
        "latestSubmission": {
            "year": 2019,
            "students_total": 9087,
            "undergraduates_total": 7921,
            "postgraduates_total": 1137,
            "staff_total": 178,
            "academic_papers": 5883,
            "institution_income": 15018544,
            "subjects": [
                {
                    "name": "Maths",
                    "academic_papers": 5136,
                    "students_total": 8122,
                    "student_rating": 4.4
                },
                {
                    "name": "Chemistry",
                    "academic_papers": 653,
                    "students_total": 1320,
                    "student_rating": 3.7
                }
            ]
        }
    }
]
```

**Post:**

Post a json of a single institution's data (following the same format as what is in ./data/institutions.json)

There is middleware schema validation that ensures that the data conforms to the correct format.
    **Example Body:** 


```javascript
  {
    "name": "Prestigious Science University",
    "address": "P.O. Box 114, 6922 Volutpat. Ave",
    "country": "Jordan",
    "region": "Metropolitana de Santiago",
    "id": "Kevin-Bacon"
  }
```

* **URL**

  /:id

* **Method:**
 

  `GET` | `POST`

**Get:**

Will return a single institution matching the id provided and its top level data.

* **Success Response:**
  
    **Content:** 

```javascript
  {
    "name": "Prestigious Science University",
    "address": "P.O. Box 114, 6922 Volutpat. Ave",
    "country": "Jordan",
    "region": "Metropolitana de Santiago",
    "id": "Kevin-Bacon"
  }
```

**Post:**

Post submission data for a university matching the id provided. 

There is middleware schema validation that ensures that the data conforms to the correct format. 

    **Example Body:** 


```javascript
  {
    "id": "8F4B12A9-4D4C-C7FB-F9EC-EBDF75AB3933",
    "institution_id": "EA8BBED7-4106-94AF-48DD-A1414E386AFB",
    "year": 2017,
    "students_total": 6043,
    "undergraduates_total": 5672,
    "postgraduates_total": 371,
    "staff_total": 77,
    "academic_papers": 7880,
    "institution_income": 1738388,
    "subjects": [
      {
        "name": "Chemistry",
        "academic_papers": 3267,
        "students_total": 2598,
        "student_rating": 4.1
      },
      {
        "name": "Biology",
        "academic_papers": 2342,
        "students_total": 1873,
        "student_rating": 3.9
      }
    ]
  }
```
 


## Testing

Run
```bash
npm run test:coverage
```
To see all tests and coverage report.

## Areas for improvement
Due to the time restrictions and prioritisation there are a few areas that given more time I would like to improve:
- Put and delete endpoints
- Endpoint to return best ranked university by subject
- Error Handling: Usually have a bespoke module written but due to time constraints was unable to replicate (instead used winston which I did not find too satisfactory)
- Auth middleware to restrict users based on apiKey or JWT sent in requests  