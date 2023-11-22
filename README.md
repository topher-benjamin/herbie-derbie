# Christopher Benjamin - Drive Capital Code Assessment

## Setup

### Installation
In repo root folder run

```
npm install
``` 

### Run
1. create a `.env` file in the root directory using the values from my email.
2. Run the following command in the root of this project
```
node index.js input.txt
```

*** Note: This program does require a connection to an instance of Neo4j. For ease of use, I have included connection details to a free AuraDB instance. Let me know if these do not work and I can help troubleshoot either the hosted instance or setting up a local one. ***

## Approach
Upon first read of the problem, I immediately thought this would be a great use case for graph dbs. Something I had absolutely no experience with, but was interested in learning.

I chose NodeJS for my application. NestJS is more to my comfortability, and would have been my choice for a production build, but felt a bit heavy for this particular task. As it was, I spent a lot more time wrangling types and fighting the spaghetti tendencies of Node and vanilla JS while doing this. Oh well.


When it came to how to input and analyze the data, I had 3 approaches that I weighed.
1. Array/map solution
2. SQL or similar relational database
3. Graph DB

In an effort to get something working before getting something optimized, I initially went with approach 1. While successful, this approach is something in the realm of O(n^3+) in complexity, requiring loops over the list of companies, partners, and contacts. It gets the job done, but it quickly runs into scaling issues.

Approach 2 was considered, and might not be the worst solution available. Had I implemented it, it would have used SQLlite for the database, and separate tables for PARTNER, COMPANY, EMPLOYEE, and CONTACT. It would mostly revolve around the CONTACT table which would relate all the Employees, Companies, and Partners together. To get the output data, I would run one big SQL query, joining the tables and counting the number of connections per partner per company.

However, I think this would be a rather inefficient lookup. Indexing the greatest number of connections per partner, per company could be leveraged to save a bit of time, but there would still be a huge scale issue for the CONNECTIONS table itself.

That left me with approach 3. GraphDB. Admittedly, I didn't know much at all about how to implement one, but it really felt like the best solution. At the risk of spending significantly more time for a coding assessment than you felt comfortable, I chose to learn a new thing and implement this solution as well.

Advantages of this approach are numerous. The entire point of a GraphDB is to show relationships, so it fits the problem much better than a SQL database. Relationship strength could be further defined by weighted values for each type of connection (Coffee = 10, Email = 1, Friend = 100, etc). 

Should this program be tested at scale, I would expect it to start to falter either in the line processing or the analysis query. On the former, creating promises for every line of the file could cause it to slow as Promises in Node are inherently leaky and creation of so many might be a recipe for disaster. Either handling in a framework with better multithreading, or batching the read/write process might be wise. On the latter, I readily admit to not being a DBA with GraphDB experience. This query achieves the intended results but could be going about it poorly.  


## Assumptions
Along with those outlined in the requirements, I did make a few assumptions of my own:
Requirement assumptions:
- File data is well formed
- All names are universally unique

My own assumptions:
- This program should be able to scale to thousands of companies and tens of thousands of connections.
- This program should be modular and able to handle additional requirements without a massive refactor.
- Running the program via command line is less important than ability to scale



Thanks for the fun problem. I've enjoyed learning about Graph dbs either way.
