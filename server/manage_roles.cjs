const mongoose = require('mongoose');
const User = require('./models/User'); // Adjusted path
const dotenv = require('dotenv');

dotenv.config(); // Defaults to .env in current directory (server/)

const validRoles = ['user', 'admin', 'blogs', 'news'];

const usage = () => {
    console.log('Usage: node manage_roles.cjs <email> <role>');
    console.log(`Valid roles: ${validRoles.join(', ')}`);
    process.exit(1);
};

const email = process.argv[2];
const role = process.argv[3];

if (!email || !role) {
    usage();
}

if (!validRoles.includes(role)) {
    console.error(`Invalid role: ${role}`);
    usage();
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kautilyadaily')
    .then(async () => {
        console.log('Connected to MongoDB');

        const user = await User.findOne({ emailOrMobile: email });

        if (!user) {
            console.error(`User not found with email: ${email}`);
            process.exit(1);
        }

        user.role = role;
        await user.save();

        console.log(`Successfully updated role for ${user.firstName} ${user.lastName} (${email}) to '${role}'`);
        process.exit(0);
    })
    .catch(err => {
        console.error('Database Error:', err);
        process.exit(1);
    });
