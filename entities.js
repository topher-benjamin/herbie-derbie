// entities.js

class Partner {
  constructor(name) {
    this.name = name;
  }
}

class Company {
  constructor(name) {
    this.name = name;
  }
}

class Employee {
  constructor(name, company) {
    this.name = name;
    this.company = company;
  }
}

class Contact {
  constructor(employeeName, partnerName, method) {
    this.employeeName = employeeName;
    this.partnerName = partnerName;
    this.method = method; // e.g., 'email', 'call', 'coffee'
  }
}

module.exports = {
  Partner,
  Company,
  Employee,
  Contact
};
