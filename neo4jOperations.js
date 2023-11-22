import neo4j from "neo4j-driver";

let driver;
let session;

export async function connectToDb() {
  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USER;
  const password = process.env.NEO4J_PASSWORD;
  driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  session = driver.session();
}

export async function closeDbConnection() {
    await nukeDb();
    await session.close();
    await driver.close();
}


export async function createEmployee(employeeName, companyName) {
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

export async function createPartner(partnerName) {
  try {
    const result = await session.run(
      "MERGE (n:Partner {name: $partnerName}) RETURN n",
      { partnerName }
    );
  } catch (error) {
    console.error("Error creating node:", error);
  }
}

export async function createCompany(companyName) {
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
  contactType
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

export async function analyzeNetwork() {
  try {
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
  } catch (error) {
    console.error("Error retrieving nodes:", error);
  }
}

export async function nukeDb() {
  try {
    const result = await session.run(`
        MATCH (n)
        DETACH DELETE n
        `);
  } catch (error) {
    console.error("Error nuking db:", error);
  }
}


