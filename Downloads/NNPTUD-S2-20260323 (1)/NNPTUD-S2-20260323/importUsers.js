const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const userController = require('./controllers/users');
const mailHandler = require('./utils/mailHandler');
const roleModel = require('./schemas/roles');

async function importUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/NNPTUD-S2');
        console.log('Connected to MongoDB');

        // Find or create default role
        let defaultRole = await roleModel.findOne({ name: 'user' });
        if (!defaultRole) {
            defaultRole = new roleModel({ name: 'user', description: 'Default user role' });
            await defaultRole.save();
            console.log('Created default role "user"');
        }

        // Read CSV file
        const csvPath = path.join(__dirname, 'users.csv');
        const csvData = fs.readFileSync(csvPath, 'utf8');
        const lines = csvData.split('\n').slice(1); // Skip header

        for (const line of lines) {
            if (!line.trim()) continue;
            const [username, email] = line.split(',').map(s => s.trim());

            // Generate random password (16 characters)
            const password = crypto.randomBytes(8).toString('hex'); // 16 hex chars

            console.log(`Creating user: ${username}, email: ${email}, password: ${password}`);

            // Create user
            await userController.CreateAnUser(username, password, email, defaultRole._id, '', '', true);

            // Send email
            await mailHandler.sendPasswordMail(email, password);

            console.log(`User ${username} created and email sent.`);
        }

        console.log('Import completed.');
    } catch (error) {
        console.error('Error importing users:', error);
    } finally {
        await mongoose.disconnect();
    }
}

importUsers();