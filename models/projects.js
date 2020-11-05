const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
  const get = async (slug = null) => {  
    if(!slug){
      const slugs = await   db.get(COLLECTION)
      return slugs;
    }
    const Slug = await db.get(COLLECTION, {
      Slug : Slug,
    });

    return slugs;
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