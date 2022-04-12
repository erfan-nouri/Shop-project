const productModel = require('../../../models/front/product.js')

/* single product page*/
exports.single = async (req, res) => {
    const productData = await productModel.product(req.params.productId);
    productData.quantity = productData.quantity - productData.saled

    /*render*/
    res.frontRender('front/product/single.handlebars', {
        pageTitle: 'عرفشاپ | محصول', error: req.flash('error'), productData, helpers: {
            
            /* check discunt product*/
            haveOff: (value1, value2, options) => {
                return value1 > 0 ? `<del class="text-muted mr-2"><span class="h6">${value2} تومان</span></del>
                <span class="h5">${value1} تومان</span>` : `<span class="h6">${value2} تومان</span>`
            },

            /* finally price */
            buyPrice: (value1, value2, options) => {
                return value1 > 0 ? value1 : value2
            },
            
            haveError: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-secondary" role="alert">
                 <a class="alert-link" href="#">${value}</a>    
            </div>`: ''
            }
        }
    });

}