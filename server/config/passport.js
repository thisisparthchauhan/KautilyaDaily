const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback',
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists with Google ID
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        return done(null, user);
                    }

                    // Check if user exists with same email
                    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

                    if (email) {
                        user = await User.findOne({ emailOrMobile: email });

                        if (user) {
                            // Link Google account to existing user
                            user.googleId = profile.id;
                            await user.save();
                            return done(null, user);
                        }
                    }

                    // Create new user
                    user = await User.create({
                        googleId: profile.id,
                        firstName: profile.name.givenName || 'User',
                        lastName: profile.name.familyName || '',
                        emailOrMobile: email || `google_${profile.id}@placeholder.com`,
                        password: Math.random().toString(36).slice(-8), // Random password (not used for Google login)
                    });

                    done(null, user);
                } catch (err) {
                    console.error('Google OAuth error:', err);
                    done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
