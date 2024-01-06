'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Barang', [
      {
        nama: 'Pensil',
        harga: 1000,
        createdAt: new Date()
      },
      {
        nama: 'Pulpen',
        harga: 1500,
        createdAt: new Date()
      },
      {
        nama: 'Penghapus',
        harga: 2000,
        createdAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('barang', null, {})
  }
};
