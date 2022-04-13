const dateService = require('../../../services/dateService.js')
const categoryModel = require('../../../models/category.js');

/*get all category */
exports.showCategory = async (req, res, next) => {
    try {

        const categoryData = await categoryModel.showAll();

        /* convert date ro persian date*/
        const categoryDataPresented = categoryData.map(data => {
            data.created_at = dateService.toPersianDate(data.created_at)
            return data;
        })

        /* render */
        res.adminRender('admin/product/category/index.handlebars', { categoryData: categoryDataPresented })
    } catch (error) {
        next(error)
    }
}

/*edit category page*/
exports.edit = async (req, res, next) => {

    try {
        /*get category data*/
        const categoryData = await categoryModel.show(req.query.categoryId);

        /* render */
        res.adminRender('admin/product/category/edit.handlebars', { categoryData });
    } catch (error) {
        next(error)
    }

}

/*edit category */
exports.update = async (req, res, next) => {
    try {

        const categoryData = {
            id: req.query.productId,
            title: req.body.title,
            description: req.body.description
        };
        const result = await categoryModel.update(categoryData);

        if (result.affectedRows) {
            return res.redirect('/admin/product/category')
        }
        return res.redirect('/admin/product/category')

    } catch (error) {
        next(error)
    }
}