import neo4j from 'neo4j-driver';

// const uri = "neo4j+s://<your-auradb-instance-uri>";
// const user = "<your-username>";
// const password = "<your-password>";
// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export async function createEmployee(employeeName, companyName) {
    // Implementation
}

export async function createPartner(partnerName) {
    // Implementation
}

export async function createCompany(companyName, session) {
    try {
        const result = await session.run(
          "MERGE (n:Company {name: $companyName}) RETURN n",
          { companyName }
        );
    
        console.log("Node created:", result.records[0].get("n"));
      } catch (error) {
        console.error("Error creating node:", error);
      }
}

export async function createContact(employeeName, partnerName, contactType) {
    // Implementation
}

export async function viewAllNodes(session) {
    try {
      const result = await session.run(
        'MATCH (n) RETURN n'
      );
  
      const r = result.records.map(r => r.get('n').properties.name);
      return r;
    } catch (error) {
      console.error('Error retrieving nodes:', error);
    } finally {
      await session.close();
    }
  }