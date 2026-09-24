const express = require('express');
const router = express.Router();
const Banquet = require('../models/Banquet');

// Route to create or update a banquet listing
router.post('/createOrUpdateUser', async (req, res) => {
    const { email, Address, Banquet: banquetName, City, Details, Price, State, imagePreviewUrl } = req.body;

    try {
        let existingListing = await Banquet.findOne({ email });
        if (existingListing) {
            existingListing.Address = Address;
            existingListing.Banquet = banquetName;
            existingListing.City = City;
            existingListing.Details = Details;
            existingListing.Price = Price;
            existingListing.State = State;
            existingListing.imagePreviewUrl = imagePreviewUrl;

            await existingListing.save();
            return res.json({ success: true, message: "User data updated", user: existingListing });
        } else {
            const newListing = await Banquet.create({
                email,
                Address,
                Banquet: banquetName,
                City,
                Details,
                Price,
                State,
                imagePreviewUrl,
            });

            return res.json({ success: true, message: "New user created", user: newListing });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to process request", error: error.message });
    }
});

module.exports = router;
