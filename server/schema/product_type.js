const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PictureType = require('./picture_type');
const Product = mongoose.model('product');

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        company: {
            type: require('./company_type'),
            resolve(parentValue) {
                return Product.findById(parentValue).populate('company')
                    .then(product => {
                        return product.company
                    })
            }
        },
        pictures: {
            type: new GraphQLList(PictureType),
            resolve(parentValue) {
                return Product.findPictures(parentValue.id)
            }
        }

    })
});

module.exports = ProductType;