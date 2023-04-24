'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'spotimages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'img.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'img.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'img.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'img.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'img.png',
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'spotimages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: 'img.png'
    }, {});
  }
};
