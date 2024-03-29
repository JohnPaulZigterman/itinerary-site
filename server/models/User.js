const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');
const tripSchema = require('./Trip');

// Schema for our User Model
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, },
        email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Please enter valid email address'], },
        password: { type: String, required: true, },
        trips: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Trip',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('validate', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.isFriendWith = function(friendId) {
    return this.friends.some(id => id.equals(friendId));
};

userSchema.virtual('tripCount').get(function () {
    return this.trips.length;
});

const User = model('User', userSchema);

module.exports = User;