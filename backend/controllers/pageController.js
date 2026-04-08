const Page = require('../models/Page');
const fs = require('fs');
const path = require('path');

// @desc    Get pages by section
// @route   GET /api/pages/:section
// @access  Public
const getPagesBySection = async (req, res) => {
  try {
    const pages = await Page.find({ section: req.params.section }).sort({ order: 1 });
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error: error.message });
  }
};

// @desc    Get page by slug
// @route   GET /api/pages/:section/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ section: req.params.section, slug: req.params.slug }).populate('parentId');
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page', error: error.message });
  }
};

// @desc    Create new page
// @route   POST /api/pages/:section
// @access  Private (Admin)
const createPage = async (req, res) => {
  try {
    const section = req.params.section;
    const { title, slug, heading, content, imagePosition, parentId, order } = req.body;
    
    let image = req.body.image;
    if (req.file) {
      image = req.file.filename;
    }

    const pageCount = await Page.countDocuments({ slug, section });
    if (pageCount > 0) {
      return res.status(400).json({ message: 'Slug already exists in this section' });
    }

    const newPage = new Page({
      title,
      slug,
      section,
      heading,
      content,
      imagePosition,
      parentId: parentId || null,
      order: order || 0,
      image
    });

    const savedPage = await newPage.save();
    res.status(201).json(savedPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error: error.message });
  }
};

// @desc    Update a page
// @route   PUT /api/pages/:section/:id
// @access  Private (Admin)
const updatePage = async (req, res) => {
  try {
    const { title, slug, heading, content, imagePosition, parentId, order } = req.body;
    
    let image = req.body.image;
    if (req.file) {
      image = req.file.filename;
      
      // We could optionally delete the old image here if we fetch the document first
      const existingPage = await Page.findById(req.params.id);
      if (existingPage && existingPage.image && typeof existingPage.image === 'string') {
        const oldImagePath = path.join(__dirname, '../uploads', existingPage.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    
    // Check if slug is taken by another entry
    const existingSlug = await Page.findOne({ slug, section: req.params.section, _id: { $ne: req.params.id } });
    if (existingSlug) {
      return res.status(400).json({ message: 'Slug already exists in this section' });
    }

    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        heading,
        content,
        imagePosition,
        parentId: parentId || null,
        order: order || 0,
        image
      },
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error: error.message });
  }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:section/:id
// @access  Private (Admin)
const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Check if it has children
    const childrenCount = await Page.countDocuments({ parentId: req.params.id });
    if (childrenCount > 0) {
      return res.status(400).json({ message: 'Cannot delete a page with subpages. Please delete or reassign subpages first.' });
    }

    await Page.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
};

module.exports = {
  getPagesBySection,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
};
