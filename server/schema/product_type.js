const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ImageType = require('./picture_type');
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
        images: {
            type: new GraphQLList(ImageType),
            resolve(parentValue) {
                return Product.findImages(parentValue.id)
            }
        }

    })
});

module.exports = ProductType;