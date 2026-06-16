const mongoose = require('mongoose');
const User = require('./server/models/User');
const dotenv = require('dotenv');

dotenv.config({ path: './server/.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kautilyadaily')
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const admins = await User.find({ role: 'admin' });

            if (admins.length === 0) {
                console.log('No admin accounts found.');
            } else {
                console.log('Admin Accounts:');
                admins.forEach(admin => {
                    console.log(`- ${admin.firstName} ${admin.lastName} (${admin.emailOrMobile})`);
                });
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });
