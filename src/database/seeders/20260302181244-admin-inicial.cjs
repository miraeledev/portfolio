'use strict';
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

module.exports = {
  async up(queryInterface) {
    const senhaHash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('usuario', [{
      id: randomUUID(),
      nome: 'Admin Sistema',
      senha: senhaHash,
      email: 'admin@exemplo.com',
      perfil: 'admin',
      criado_em: new Date(),
      atualizado_em: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuario', {
      email: 'admin@exemplo.com'
    });
  }
};