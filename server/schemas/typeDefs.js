const typeDefs = `
type User {
_id: ID!
username: String!
email: String!

}
 type Query {
 user:[User]
 }

`;

module.exports = typeDefs;
