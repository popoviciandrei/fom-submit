const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const Picture = mongoose.model('picture');
const Company = mongoose.model('company');

const ProductType = require('./product_type');
const PictureType = require('./picture_type');
const CompanyType = require('./company_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLString },
                person: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                www: { type: GraphQLString },
                wechat: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, { name, person, email, phone, www, wechat, description }) {
                return (new Company({ name, person, email, phone, www, wechat, description })).save()
            }
        },
        // addProduct: {
        //     type: ProductType,
        //     args: {
        //         name: { type: GraphQLString },
        //         description: { type: GraphQLString }
        //     },
        //     resolve(parentValue, { name, description }) {
        //         return (new Product({ name, description })).save()
        //     }
        // },
        addProductToCompany: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                companyId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { name, description, companyId }) {
                return Company.addProduct(companyId, name, description);
            }
        },
        addPictureToProduct: {
            type: ProductType,
            args: {
                url: { type: GraphQLString },
                productId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { url, productId }) {
                return Product.addPicture(productId, url);
            }
        }
    }
})

module.exports = mutation;
