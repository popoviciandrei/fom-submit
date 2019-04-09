const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: { type: String },
    person: { type: String },
    email: { type: String },
    phone: { type: String },
    www: { type: String },
    wechat: { type: String },
    description: { type: String },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

CompanySchema.statics.findProducts = function (id) {
    return this.findById(id)
        .populate('products')
        .then(company => company.products)
}
CompanySchema.statics.addProduct = function (id, name, description) {
    const Product = mongoose.model('product');
    return this.findById(id).
        then(company => {
            const product = new Product({ name, description, company: id });
            company.products.push(product);
            return Promise.all([product.save(), company.save()])
                .then(([product, company]) => product);
        })
}

mongoose.model('company', CompanySchema);