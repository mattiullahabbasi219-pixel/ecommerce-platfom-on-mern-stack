const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

const makeAdmin = async () => {
    try {
        // 1. Connect to Database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 2. Get email from command line argument
        const targetEmail = process.argv[2];

        if (!targetEmail) {
            console.log('❌ Please provide an email address.');
            console.log('Usage: node make-admin.js <email>');
            process.exit(1);
        }

        // 3. Find the user
        const user = await User.findOne({ email: targetEmail });

        if (!user) {
            console.log(`❌ User with email "${targetEmail}" not found.`);
            console.log('Please register this user on the website first!');
            process.exit(1);
        }

        // 4. Update Role
        if (user.role === 'admin') {
            console.log(`⚠️  ${user.name} (${user.email}) is ALREADY an admin.`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`🎉 Success! ${user.name} (${user.email}) is now an ADMIN.`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

makeAdmin();
