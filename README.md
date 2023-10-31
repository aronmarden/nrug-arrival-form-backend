# Express API with New Relic Integration

This project is a simple Express API that integrates with the New Relic GraphQL API. It accepts a POST request and uses the data to make a GraphQL mutation to the New Relic API.

This is the backend to the this project: https://github.com/aronmarden/nrug-arrival-form-frontend 

## Features:

- CORS support for handling cross-origin requests
- Uses Axios for HTTP requests
- Parses external key file for storing the New Relic API key
- Serverless function integration using `serverless-http`

## Prerequisites:

- Node.js
- A `keys.json` file containing your New Relic API key and entity GUID. The format should be:

  ```json
  {
    "key": "YOUR_NEW_RELIC_API_KEY",
    "entityGuid": "YOUR_ENTITY_GUID"
  }
  ```

## How to use:

1. Clone the repository.
2. Install the necessary npm modules using `npm install`.
3. Ensure `keys.json` is populated with your New Relic details.
4. Start the server using `node yourfilename.js`.
5. Make a POST request to `/api` with a JSON body containing the `firstName` field.

## Endpoints:

### POST `/api`

**Payload**:

```json
{
  "firstName": "John"
}
```

**Response**:

- On successful New Relic API call, it returns the response from the New Relic API.
- On failure
