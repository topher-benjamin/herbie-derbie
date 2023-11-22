# Christopher Benjamin - Drive Capital Code Assesment

## Setup

### Installation
in repo root folder run

```
npm install
``` 

### Run
```
node index.js input.txt
```


## Approach
Upon first read of the problem, I immediately thought this would be a great use case for graph dbs. Something I had absolutely no experience with, but was intersted in learning.

But, after a few more read throughs, I decided I should really focus on getting something working even if it used a sub-optimal approach.

I chose NodeJS for my application. NestJS is more to my comfortability, and would have been my choice for a production build, but felt a bit heavy for this task. As it was, I spent a lot more time wrangling types and fighting the spaghetti tendencies of Node and vanilla JS while doing this. Oh well.


When it came to how to input and analyze the data, I had 3 approaches that I weighed.
1. Array/map solution
2. SQL or similar relational database
3. Graph DB

In an effort to get something working before getting something optimized, I went with approach 1. You'll see this in the main branch. Despite being able to get the correct outpuut from the input, the triple loop required to get the results quickly bottlenecks the approach. 

Approach 2 was considered, and might not be the worst solution available, but I didn't have the desire to code it fully. If I had, it would have used SQLlite for the database, and separate tables for PARTNER, COMPANY, EMPLOYEE, and CONTACT. It would mostly revolve around the CONTACT table which would relate all the Employees, Companies, and Partners together. To get the output data, I would run one big SQL query, joining the tables and counting the number of connections per partner per company.

However, I think this would be a rather inefficient lookup. Indexing the greatest number of connections per partner, per company could be leveraged to save a bit of time, but there would still be a huge scale issue for the CONNECTIONS table itself.

That's where I landed on approach 3. GraphDB. Admittedly, I didn't know much at all about how to implement one, but it really felt like the best solution. At the risk of spending too much time for a coding-assesment, I chose to learn a fun new thing and implement this solution.

Advantages of this approach are numerous. The entire point of a GraphDB is to show relationships, so it fits the problem much better than a SQL database. Relationship strength could be further defined by weighted values for each type of connection (Coffee = 10, Email = 1, Friend = 100, etc). 


## Assumptions
Along with those outlined in the requirements, I did make a few assumptions of my own:
Requirement assumptions:
- File data is well formed
- Employee names are universally unique. 
- 

My own assumptions:
- This program should be able to scale to thousands of companies and tens of thousands of connections.
- This program should be modular and able to handle additional requirements without massive refactor.
- Running the program via command line is less important than ability to scale
- The time consideration for completing this assesment allows for me to be deliberate


Thanks for the fun problem. I've enjoyed learning about Graph dbs either way.




