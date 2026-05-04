const NewsEvent = require('../models/NewsEvent');

// @desc    Get all news and events
// @route   GET /api/news-events
// @access  Public
const getNewsEvents = async (req, res) => {
  try {
    const { category, isFeatured, status, limit } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (isFeatured) query.isFeatured = isFeatured === 'true';
    if (status) query.status = status;

    let newsEventsQuery = NewsEvent.find(query).sort({ publishDate: -1 });
    
    if (limit) {
      newsEventsQuery = newsEventsQuery.limit(parseInt(limit));
    }

    const newsEvents = await newsEventsQuery;
    res.status(200).json(newsEvents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news and events', error: error.message });
  }
};

// @desc    Get single news/event by slug
// @route   GET /api/news-events/:slug
// @access  Public
const getNewsEventBySlug = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findOne({ slug: req.params.slug });
    if (!newsEvent) {
      return res.status(404).json({ message: 'News or event not found' });
    }
    res.status(200).json(newsEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news/event', error: error.message });
  }
};

// @desc    Create a news/event
// @route   POST /api/news-events
// @access  Private (Admin)
const createNewsEvent = async (req, res) => {
  try {
    const { title, slug, shortDescription, content, category, publishDate, isFeatured, status, existingFeaturedImage, existingGalleryImages } = req.body;
    
    const slugExists = await NewsEvent.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ message: 'Slug already exists' });
    }

    let featuredImage = existingFeaturedImage || '';
    let galleryImages = existingGalleryImages ? JSON.parse(existingGalleryImages) : [];

    // Access uploaded files via Multer
    if (req.files) {
      if (req.files.featuredImage && req.files.featuredImage.length > 0) {
        featuredImage = `/uploads/${req.files.featuredImage[0].filename}`;
      }
      if (req.files.galleryImages && req.files.galleryImages.length > 0) {
        const newGalleryImages = req.files.galleryImages.map(file => `/uploads/${file.filename}`);
        galleryImages = [...galleryImages, ...newGalleryImages];
      }
    }

    const newEntity = new NewsEvent({
      title,
      slug,
      shortDescription,
      content,
      category,
      featuredImage,
      galleryImages,
      publishDate: publishDate || Date.now(),
      isFeatured: isFeatured === 'true' || isFeatured === true,
      status: status || 'published'
    });

    const savedEntity = await newEntity.save();
    res.status(201).json(savedEntity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news/event', error: error.message });
  }
};

// @desc    Update a news/event
// @route   PUT /api/news-events/:id
// @access  Private (Admin)
const updateNewsEvent = async (req, res) => {
  try {
    const { title, slug, shortDescription, content, category, publishDate, isFeatured, status, existingFeaturedImage, existingGalleryImages } = req.body;

    const slugExists = await NewsEvent.findOne({ slug, _id: { $ne: req.params.id } });
    if (slugExists) {
       return res.status(400).json({ message: 'Slug already exists' });
    }

    let featuredImage = existingFeaturedImage || '';
    let galleryImages = existingGalleryImages ? JSON.parse(existingGalleryImages) : [];

    // Check newly uploaded files
    if (req.files) {
      if (req.files.featuredImage && req.files.featuredImage.length > 0) {
        featuredImage = `/uploads/${req.files.featuredImage[0].filename}`;
      }
      if (req.files.galleryImages && req.files.galleryImages.length > 0) {
        const newGalleryImages = req.files.galleryImages.map(file => `/uploads/${file.filename}`);
        galleryImages = [...galleryImages, ...newGalleryImages];
      }
    }

    const updatedEntity = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        slug, 
        shortDescription, 
        content, 
        category, 
        featuredImage, 
        galleryImages, 
        publishDate: publishDate, 
        isFeatured: isFeatured === 'true' || isFeatured === true, 
        status 
      },
      { new: true }
    );

    if (!updatedEntity) {
      return res.status(404).json({ message: 'News or event not found' });
    }

    res.status(200).json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: 'Error updating news/event', error: error.message });
  }
};

// @desc    Delete a news/event
// @route   DELETE /api/news-events/:id
// @access  Private (Admin)
const deleteNewsEvent = async (req, res) => {
  try {
    const entity = await NewsEvent.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ message: 'News or event not found' });
    }

    await NewsEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'News/event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news/event', error: error.message });
  }
};

module.exports = {
  getNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent
};
