'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('usuario', [{
      id: require('crypto').randomUUID(),
      nome: 'Administrador',
      matricula: '00001',
      telefone: null,
      senha: '$2b$10$bcBRJTIGZ5pQEZXe57HLOeYoYNFwVHqzL7Ei1HUwFQabh/cZp7QiS',
      email: 'admin@sistema.com',
      perfil: 'admin',
      criado_em: new Date(),
      atualizado_em: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuario', {
      email: 'admin@sistema.com'
    });
  }
};

