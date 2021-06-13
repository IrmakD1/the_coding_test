/* eslint-disable */
db.auth('admin', 'pass')

db = db.getSiblingDB('universities')

db.createUser({
  user: 'admin',
  pwd: 'pass',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});