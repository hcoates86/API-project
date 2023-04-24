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
    options.tableName = 'spots';
    return queryInterface.bulkInsert(options, [
      { ownerId: 1,
        address: '555 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 252.5,
        lng: 3344.3,
        name: 'Beautiful Household',
        description: "It's a house. It has beds.",
        price: 555
      },
      { ownerId: 2,
        address: 'Highway 88, Apt. 12',
        city: 'Springfield',
        state: 'OH',
        country: 'United States',
        lat: 2552.5,
        lng: 373.3,
        name: 'Beautiful Household',
        description: "It's a house. It has beds.",
        price: 555
      },
      { ownerId: 3,
        address: '666 Iced Ave.',
        city: 'Jupiter',
        state: 'Texas',
        country: 'United States',
        lat: 772.87875,
        lng: 773.793,
        name: 'Orange Bedroom',
        description: "One bed in a very orange room. No bathroom.",
        price: 55
      },
      { ownerId: 2,
        address: '123 Riverside Road',
        city: 'Rio',
        state: 'Brazil',
        country: 'Brazil',
        lat: -220.5268,
        lng: -303.3246,
        name: 'Beautiful House',
        description: "One house, everything you need.",
        price: 77
      },
      { ownerId: 1,
        address: '557 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 232.524564,
        lng: -333.33765,
        name: 'Mansion',
        description: "You have to clean up after yourself, please be respectful.",
        price: 5899
      },
      { ownerId: 1,
        address: '558 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 272.524564,
        lng: -373.33765,
        name: 'Mansion for two',
        description: "You have to clean up after yourself, please be respectful.",
        price: 899
      },
      { ownerId: 1,
        address: '559 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 283.524564,
        lng: -380.33765,
        name: 'Mansion',
        description: "You have to clean up after yourself, please be respectful.",
        price: 4899
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
    options.tableName = 'spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['559 Fake St.', '558 Fake St.', '557 Fake St.', '555 Fake St.', 'Highway 88, Apt. 12', '666 Iced Ave.', '123 Riverside Road'] }
    }, {});
  }
};
