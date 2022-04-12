const productModel = require('../../models/front/product.js')
const categoryModel = require('../../models/category.js')

/* home page & show all product*/
exports.index = async (req, res) => {
    /*get all product */
    const products = await productModel.showProducts();
    /*get off product */
    const offProduct = await productModel.offProduct();
    /* get category */
    const category = await categoryModel.showAll();

    /* render */
    res.frontRender('front/index.handlebars', {
        pageTitle: 'عرفشاپ | خانه', products, offProduct, category, helpers: {

            /* check discunt product */
            haveOff: (value1, value2, options) => {
                return value1 > 0 ? `<del class="text-muted mr-2"><span class="font-size-14 h6">${value2} تومان</span></del>
                <span class="h6">${value1} تومان</span>` : `<span class="font-size-14 h6">${value2} تومان</span>`
            },

            /* show offtitle */
            offTitle: (value1, options) => {
                return value1 > 0 ? `<div class="ft-tag ft-inside-tr">تخفیف</div>` : ''
            },

            /* show discount percent */
            offPersent: (value1, value2, options) => {
                return `<div class="ft-tag ft-inside-tr">${parseInt((value2 - value1) / value2 * 100)}٪ تخفیف</div>`
            }
        }
    })

}