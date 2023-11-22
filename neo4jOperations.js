import neo4j from "neo4j-driver";

// const uri = "neo4j+s://<your-auradb-instance-uri>";
// const user = "<your-username>";
// const password = "<your-password>";
// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


export async function createEmployee(employeeName, companyName, session) {
  try {
    const result = await session.run(
      `
            MATCH (c:Company {name: $companyName})
            MERGE (e:Employee {name: $employeeName})-[:WORKS_FOR]->(c)
            RETURN e`,
      { employeeName, companyName }
    );

  } catch (error) {
    console.error("Error creating node:", error);
  }
}

export async function createPartner(partnerName, session) {
  try {
    const result = await session.run(
      "MERGE (n:Partner {name: $partnerName}) RETURN n",
      { partnerName }
    );

  } catch (error) {
    console.error("Error creating node:", error);
  }
}

export async function createCompany(companyName, session) {
  try {
    const result = await session.run(
      "MERGE (n:Company {name: $companyName}) RETURN n",
      { companyName }
    );

  } catch (error) {
    console.error("Error creating node:", error);
  }
}

export async function createContact(
  employeeName,
  partnerName,
  contactType,
  session
) {
  try {
    const query = `
            MATCH (e:Employee {name: $employeeName}), 
                  (p:Partner {name: $partnerName})
            MERGE (e)-[r:CONTACT {type: $contactType}]->(p)
            RETURN e, p, r
        `;

    const result = await session.run(query, {
      employeeName,
      partnerName,
      contactType,
    });

    return result.records;
  } catch (error) {
    console.error("Error creating contact: ", error);
  }
}

export async function analyzeNetwork(session){
    try{
        const result = await session.run(`
        MATCH (c:Company)
        OPTIONAL MATCH (c)<-[:WORKS_FOR]-(e:Employee)-[contact:CONTACT]->(p:Partner)
        WITH c, p, COUNT(contact) AS totalContacts
        ORDER BY totalContacts DESC
        WITH c, COLLECT({partner: p, contactStrength: totalContacts})[0] AS strongestRelation
        RETURN c.name AS CompanyName, strongestRelation.partner.name AS PartnerName, strongestRelation.contactStrength AS RelationshipStrength
        ORDER BY c.name
`);
        return result.records;

    } catch (error){
        console.error("Error retrieving nodes:", error);
    }
}

export async function nukeDb(session){
    try{
        const result = await session.run(`
        MATCH (n)
        DETACH DELETE n
        `);
    } catch (error){
        console.error("Error nuking db:", error);
    }
}

export function displayResults(results) {
    const output = results.map(record => {
        const companyName = record.get('CompanyName');
        const partnerName = record.get('PartnerName');
        const relationshipStrength = record.get('RelationshipStrength');
  
        // Format the output for each company
        if (partnerName && relationshipStrength > 0) {
          return `${companyName}: ${partnerName} (${relationshipStrength})`;
        } else {
          return `${companyName}: No current relationship`;
        }
      });

  console.log(output.join("\n"));
}
