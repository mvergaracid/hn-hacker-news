### MEAN STACK TUTORIAL

Hi, this tutorial cover the implemetation of a backend connected to a local monngo and a front (all pieces inside Docker) to check hacker news. 

Please, check this steps to run the project (you 'll need docker-compose on your 'computadora')

1. Clone the repo

2. Go to hn-backend directory:
cd hn-backend

3. Make a .env file with:

NODE_PORT=3500
MONGO_HOSTNAME=127.0.0.1
MONGO_PORT=27017
MONGO_USERNAME=your-user
MONGO_PASSWORD=your-password
MONGO_PORT=27017
MONGO_DB=hn-news
MONGO_COLLECTION=last-news
NEWS_URL=https://hn.algolia.com/api/v1/search_by_date?query=nodejs

3. Execute with docker-compose

$ > docker-compose up

4. Go to http://localhost:3000

If you need run front on another port, please update:
-.env: 
    NODE_PORT=<INTERNAL_PORT>
- docker-compose.yml:
     ports:
      - '<ESPOSED_PORT>:<INTERNAL_PORT>'    

5. To run test

npm run test

