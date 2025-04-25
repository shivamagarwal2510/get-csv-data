# CSV Data API

A simple Express API to retrieve CSV data from MongoDB.

## Setup

1. Make sure MongoDB is installed and running
2. Create a `.env` file with your MongoDB connection string:
   ```
   MONGO_CONNECTION_STRING=mongodb://localhost:27017/your_database
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
   
## API Endpoints

### GET /api/csv-data
Returns all data from the `csv_data` collection in MongoDB.

Response format:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
``` 