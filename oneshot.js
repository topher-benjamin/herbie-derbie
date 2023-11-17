const fs = require('fs');

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, new Set());
        }
    }

    addEdge(node1, node2) {
        this.addNode(node1);
        this.addNode(node2);
        this.nodes.get(node1).add(node2);
        this.nodes.get(node2).add(node1);
    }

    getConnections(node) {
        return this.nodes.get(node);
    }
}

function processInputData(data) {
    const lines = data.split('\n');
    const graph = new Graph();
    let companies = new Set();
    let partners = new Set();

    lines.forEach(line => {
        const parts = line.split(' ');
        const type = parts[0];
        const name = parts[1];

        if (type === 'Partner') {
            partners.add(name);
        } else if (type === 'Company') {
            companies.add(name);
        } else if (type === 'Employee') {
            const company = parts[2];
            graph.addEdge(company, name);
        } else if (type === 'Contact') {
            const employee = parts[1];
            const partner = parts[2];
            graph.addEdge(partner, employee);
        }
    });

    outputResults(companies, partners, graph);
}

function outputResults(companies, partners, graph) {
    companies.forEach(company => {
        let maxConnections = 0;
        let mostConnectedPartner = '';

        partners.forEach(partner => {
            const partnerConnections = graph.getConnections(partner);
            console.log('partnerconnections',partnerConnections)
            let connections = 0;

            // instead change this to a for of loop
            for(let connection of partnerConnections){
                if(graph.getConnections(company).has(connection)){
                    connections++;
                }
            }
            // partnerConnections.forEach(connection => {
            //     if (graph.getConnections(company).has(connection)) {
            //         connections++;
            //     }
            // });

            if (connections > maxConnections) {
                maxConnections = connections;
                mostConnectedPartner = partner;
            }
        });

        console.log(`${company}: ${mostConnectedPartner}`);
    });
}

fs.readFile('testData/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    processInputData(data);
});
