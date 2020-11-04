const db = require('../db')();
const COLLECTION = 'users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = () => {
  
  const get = async (email = null) => {
    if (!email) {
      const allUsers = await db.get(COLLECTION);
      return allUsers;
    }

    const singlUser = await db.get(COLLECTION, {
      email: email,
    });

    return singlUser;
  };

  const add = async (name, email, usertype, userKey) => {
    const key = bcrypt.hashSync(userKey, salt);
    const results = await db.add(COLLECTION, {
      name,
      email,
      usertype,
      key,
    });
    return results.result;
  };

  const getByKey = async (email, supliedKey) => {
    if (!supliedKey || !email) {
      return {
        error: 'No key or email address',
      };
    }

    try {
      const user = await db.get(COLLECTION, {
        email: email,
      });
      const verify = bcrypt.compareSync(supliedKey, user[0].key);
      if (!verify) {
        return {
          error: 'Password not correct',
        };
      }
      return user[0];
    } catch (e) {
      return {
        error: e.message,
      };
    }
  };
  return {
    get,
    add,
    getByKey,
  };
};