const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    url: { type: String }, // url on the server to access the image
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});

mongoose.model('picture', PictureSchema);