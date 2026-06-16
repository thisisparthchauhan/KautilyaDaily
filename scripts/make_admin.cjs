import mongoose from '../server/node_modules/mongoose/index.js';
import User from '../server/models/User.js';
import dotenv from '../server/node_modules/dotenv/lib/main.js';
dotenv.config({ path: '../server/.env' });

const email = process.argv[2];

if (!email) {
    console.log('Please provide an email address. Usage: node scripts/make_admin.js <email>');
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
