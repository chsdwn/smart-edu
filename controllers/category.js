const Category = require('../models/category')

exports.create = async (req, res) => {
  try {
    await Category.create(req.body)
    req.flash('success', 'Category has been created successfully.')
    res.status(201).redirect('/dashboard')
  } catch {
    req.flash('error', 'An error occured.')
    res.status(400).redirect('/dashboard')
  }
}

exports.delete = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id)
    req.flash('success', 'Category has been deleted successfully.')
    res.status(201).redirect('/dashboard')
  } catch {
    req.flash('error', 'An error occured.')
    res.status(400).redirect('/dashboard')
  }
}
