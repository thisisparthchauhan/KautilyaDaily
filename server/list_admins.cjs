const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kautilyadaily')
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const admins = await User.find({ role: 'admin' });

            if (admins.length === 0) {
                console.log('No admin accounts found.');

                // List some users to help the user choose
                const users = await User.find({}).limit(5);
                if (users.length > 0) {
                    console.log('\nHere are some existing users you can promote:');
                    users.forEach(user => {
                        console.log(`- ${user.firstName} ${user.lastName} (${user.emailOrMobile})`);
                    });
                } else {
                    console.log('\nNo users found in the database. Please sign up first.');
                }
            } else {
                console.log('Admin Accounts:');
                admins.forEach(admin => {
                    console.log(`- ${admin.firstName} ${admin.lastName} (${admin.emailOrMobile})`);
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });
