const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const email = process.argv[2];

if (!email) {
    console.log('Please provide an email address. Usage: node server/make_admin.cjs <email>');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kautilyadaily')
    .then(async () => {
        console.log('MongoDB connected');

        const user = await User.findOne({ emailOrMobile: email });

        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`User ${user.firstName} ${user.lastName} (${email}) is now an Admin.`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
