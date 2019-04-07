const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const ProductType = require('./product_type')

//const ProductType = 
const Company = mongoose.model('company');

const CompanyType = new GraphQLObjectType({
    name: 'CompanyType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        person: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        www: { type: GraphQLString },
        wechat: { type: GraphQLString },
        description: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue) {
                return Company.findProducts(parentValue.id);
            }
        }
    })
});

module.exports = CompanyType;