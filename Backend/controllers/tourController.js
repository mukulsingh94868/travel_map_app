import Tour from '../models/Tour.js';

// create tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: 'Created Successfully', data: savedTour })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ success: false, message: 'Failed to Create, Try again' })
    }
};

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Updated Successfully', data: updatedTour })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Updated, Try again' })
    }
};

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Deleted Successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Delete, Try again' })
    }
};

// get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({ success: true, message: 'Successfully Data found', data: tour })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Data not found, Try again' })
    }
};

// get all tour
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8);
        res.status(200).json({ success: true, count: tours?.length, message: 'get Successfully', data: tours })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Failed to Create, Try again' })
    }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews');
        res.status(200).json({ success: true, message: 'Successfully', data: tours });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
};

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
        res.status(200).json({ success: true, message: 'Successfully', data: tours })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not Found' })
    }
}

//Get tour count 
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({ success: true, data: tourCount })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch" })
    }
}