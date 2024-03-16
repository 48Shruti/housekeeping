const category = require('../category/categoryModel')
const vendor = require('../vendor/vendorModel')
const customer = require('../customer/customerModel')

const dashboard = async (req, res) => {
    // let start = new Date()
    // start.setHours(0, 0, 0, 0)
    // let end = new Date()
    // end.setHours(23, 59, 59, 999)

    // let dateFilter = { createdAt: { $gt: start, $lt: end } }

    let totalCategories = await category.countDocuments()
    let totalVendors = await vendor.countDocuments()
    let totalCustomers = await customer.countDocuments()

    res.send({
        success: true,
        status: 200,
        message: "Dashboard loaded",
        data: {
            totalCategories: totalCategories,
            totalCustomers: totalCustomers,
            totalVendors: totalVendors
        }
    })
}

module.exports = { dashboard }
