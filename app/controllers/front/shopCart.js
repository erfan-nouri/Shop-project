const productModel = require('../../models/product.js')

/* shopcart page*/
exports.index = async (req, res) => {
    /* auth for create  shopcart*/
    if (req.session.user) {
        //* calc total price in basket
        let totalPrice = 0;
        for (let i = 0; i < req.session.basket.length; i++) {
            totalPrice += req.session.basket[i].sumPrice;
        }
        req.session.basket.totalPrice = totalPrice;

        return res.frontRender('front/shopCart.handlebars', {
            pageTitle:'عرفشاپ | سبدخرید', successMsg: req.flash('success'), shopCartItem: req.session.basket, itemCount: req.session.basket.length,
            helpers: {
                successMsg: (value, options) => {
                    return value.length > 0 ? `<div class="alert alert-success" role="alert">
                    کالای مورد نظر با موفقیت به سبد خرید افزوده شد.
                </div>`: ''
                }
            }
        })

    }
    return res.redirect('/auth/login')
}

/* add item in shopcart handler */
exports.store = async (req, res) => {
    //* auth for shopCart & add item in shopcart
    if (req.session.user) {
        //* for increase count shop cart item
        if (req.session.basket.length > 0) {
            for (let i = 0; i < req.session.basket.length; i++) {
                //*for check quantity of product 
                if (req.session.basket[i].productId == req.query.productId) {

                    const productData = await productModel.showProduct(req.query.productId)
                    if (req.session.basket[i].count + parseInt(req.body.count) > productData.quantity - productData.saled) {
                        req.flash('error', 'تعداد کالای مورد نیاز شما در فروشگاه موجود نمیباشد.')
                        return res.redirect(`/product/${req.query.productId}/${productData.slug}`);

                    } else {

                        req.session.basket[i].count = parseInt(req.body.count) + parseInt(req.session.basket[i].count)
                        req.session.basket[i].sumPrice = parseInt(req.query.productPrice) * parseInt(req.session.basket[i].count)
                        req.flash('success', 'کالای مورد نظر با موفقیت به سبد خرید افزوده شد')
                        return res.redirect('/shopcart')

                    }
                }
            }
            //* for add new item in shopcart 
            req.session.basket.push(
                {
                    productId: req.query.productId,
                    productTitle: req.query.productTitle,
                    productPrice: req.query.productPrice,
                    count: parseInt(req.body.count),
                    sumPrice: req.query.productPrice * req.body.count,
                    img: req.query.img
                });
            req.flash('success', 'کالای مورد نظر با موفقیت به سبد خرید افزوده شد')
            return res.redirect('/shopcart')
        }
        //* for add first item in shopcart
        else {
            req.session.basket.push(
                {
                    productId: req.query.productId,
                    productTitle: req.query.productTitle,
                    productPrice: req.query.productPrice,
                    count: parseInt(req.body.count),
                    sumPrice: req.query.productPrice * req.body.count,
                    img: req.query.img
                });
        }

        req.flash('success', 'کالای مورد نظر با موفقیت به سبد خرید افزوده شد')
        return res.redirect('/shopcart')

    } else {

        return res.redirect('/auth/login')

    }
}


/* delete shopcart item */
exports.delete = async (req, res) => {

    for (let i = 0; i < req.session.basket.length; i++) {

        if (req.session.basket[i].productId == req.query.productId && req.session.basket[i].count == req.query.count) {
            req.session.basket.splice(i, 1);
        }

    }
    
    res.redirect('/shopcart')
}