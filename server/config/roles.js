const AccessControl = require('accesscontrol');

const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

const grantsObject = {
    admin: {
        profile: allRights,
        articles: allRights
    },
    user: {
        // test: {'read:any': ['*']},
        profile: {
            'read:own': ['*', '!password'],
            'update:own': ['*']
        },
        articles: {
            'read:any': ['*']
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = roles;