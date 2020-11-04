const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
  const get = async (slug = null) => {
    const singlSlug = await db.get(COLLECTION, {
      slug: slug,
    });

    return singlSlug;
  };

  const add = async (slug, name, description) => {
    const results = await db.add(COLLECTION, {
      slug,
      name,
      description,
    });

    return results.result;
  };

  return {
    get,
    add,
  };
};