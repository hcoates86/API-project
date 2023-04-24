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
    options.tableName = 'bookings';
    const date1 = new Date('01/01/2021');
    const date2 = new Date('01/02/2021');

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: date1,
        endDate: date2
      },
      {
        spotId: 3,
        userId: 1,
        startDate: Date('01/05/2021'),
        endDate: Date('01/09/2021')
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['01/01/2021'] }
    }, {});
  }
};
