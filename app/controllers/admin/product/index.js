const productModel = require('../../../models/product.js')
const dateService = require('../../../services/dateService.js')
const quantityModel = require('../../../models/quantity.js');
const categoryModel = require('../../../models/category.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path');


/* get all product*/
exports.showAll = async (req, res) => {
    const products = await productModel.showProducts();
    /* convert date tp persian date*/
    const productPeresented = products.map((product) => {
        product.isActive = product.quantity - product.saled,
            product.created_at = dateService.toPersianDate(product.created_at)
        return product;
    })
    /* render*/
    res.adminRender('admin/product/manage.handlebars', {
        products: productPeresented, error: req.flash('error'), success: req.flash('success'), helpers: {
            /* check active status*/
            isActive: (value, option) => {
                return value > 0 ? 'badge badge-success' : 'badge badge-danger';
            },
            /* set status text*/
            isActiveText: (value, option) => {
                return value > 0 ? 'موجود' : 'اتمام موجودی';
            },

            /* check errorMessage*/
            hasError: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-danger" role="alert">
                ${value}
            </div>`: ''
            },

            /* check successMessage*/
            hasSuccess: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-success" role="success">
                ${value}
            </div>`: ''
            }
        }
    });

}

/* add product page*/
exports.add = async (req, res) => {

    /* get category*/
    const category = await categoryModel.showAll();

    /* render */
    res.adminRender('admin/product/add.handlebars', { category });
}

/* store product's data to database*/
exports.store = async (req, res) => {

    /* set random name for picture*/
    const fileExt = req.files.thumbnail.name.split('.')[1];
    const newFileName = `${uuidv4()}.${fileExt}`;

    const productData = {
        title: req.body.title,
        category_id: req.body.category,
        slug: req.body.slug,
        description: req.body.description,
        sale_price: req.body.sale_price,
        off_price: req.body.off_price == "" ? 0 : req.body.off_price,
        img: newFileName
    }

    const resultProduct = await productModel.add(productData)

    /* move picture*/
    const thumbnailAddress = `public/uploads/thumbnails/${newFileName}`;
    req.files.thumbnail.mv(thumbnailAddress, error => {

    })

    /* add product quantity*/
    const quantityData = {
        product_id: resultProduct.insertId,
        quantity: parseInt(req.body.quantity)
    }
    const resultQuantity = await quantityModel.store(quantityData);

    /* render*/
    if (resultProduct && resultQuantity) {
        req.flash('success', 'محصول با موفقیت افزوده شد.')
        return res.redirect('/admin/product/manage')
    }

    req.flash('error', 'افزودن محصول با مشکل مواجه شد.')
    return res.redirect('/admin/product/manage')


}

/* edit product page*/
exports.edit = async (req, res) => {
    /* get product data*/
    const productData = await productModel.showProduct(parseInt(req.query.productId))
    productData.isActive = productData.quantity - productData.saled;
    productData.created_at = dateService.toPersianDate(productData.created_at);
    const quantityData = await quantityModel.getData(productData.id);
    const category = await categoryModel.showAll();

    /* render*/
    res.adminRender('admin/product/edit.handlebars', {
        productData, quantityData, category, helpers: {
            // isActive: (value, options) => {
            //     return value == 0 ? options.fn(this) : options.inverse(this);
            // },
            category: (value, options) => {
                return productData.categoryid == value ? options.fn(this) : options.inverse(this)
            }
        }
    });

}

/* update product*/
exports.updateProduct = async (req, res) => {
    /* set random name for picture*/
    const fileExt = req.files.thumbnail.name.split('.', [1])
    const newFileName = `${uuidv4()}.${fileExt}`

    const productData = {
        id: req.query.productId,
        category_id: req.body.category,
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        sale_price: req.body.sale_price,
        off_price: req.body.off_price,
        img: newFileName
    }
    /* move picture*/
    const thumbnailAddress = `public/uploads/thumbnails/${newFileName}`;
    req.files.thumbnail.mv(thumbnailAddress, error => {
        console.log(error);
    })
    const resultProduct = await productModel.updateProduct(productData)

    const quantityData = {
        quantity: req.body.quantity,
        product_id: req.query.productId
    }
    await quantityModel.update(quantityData)
    /* render*/
    if (resultProduct) {
        return res.redirect('/admin/product/manage')
    }
    return res.redirect('/admin/product/edit')
}

/* delete product*/
exports.delete = async (req, res) => {
    /* delete product's picture*/
    const productData = await productModel.showProduct(parseInt(req.query.productId))
    const pathFile = path.join(__dirname, `../../../../public/uploads/thumbnails/${productData.img}`);
    fs.unlinkSync(pathFile)

    /* delete product*/
    const resultDeleteProduct = await productModel.delete(parseInt(req.query.productId))
    const resultDeleteQuantity = await quantityModel.delete(parseInt(req.query.productId))
    
    /* render*/
    if (resultDeleteProduct && resultDeleteQuantity) {
        return res.redirect('/admin/product/manage')
    }
    return res.redirect('/admin/product/manage')

}
