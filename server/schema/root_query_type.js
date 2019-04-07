const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;
const CompanyType = require('./company_type');
const Company = mongoose.model('company');

const ProductType = require('./product_type');
const Product = mongoose.model('product');

const PictureType = require('./picture_type');
const Picture = mongoose.model('picture');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        companies: {
            type: new GraphQLList(CompanyType),
            resolve() {
                return Company.find({});
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Company.findById(id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find({});
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Product.findById(id);
            }
        },
        pictures: {
            type: new GraphQLList(PictureType),
            resolve() {
                return Picture.find({});
            }
        },
        picture: {
            type: PictureType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Picture.findById(id);
            }
        }
    })
});

module.exports = RootQuery;