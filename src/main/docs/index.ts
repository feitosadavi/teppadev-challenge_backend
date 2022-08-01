import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Cardappio - Cardapio eletrico para restaurantes',
    description: 'Esta é a documentação da API do Cardappio, aqui você encontrará a referência completa para todas as rotas utilizadas na aplicação',
    version: '1.0.0',
    contact: {
      name: 'Davi Feitosa',
      email: 'davifeitosa.dev@protonmail.com',
      url: 'https://www.linkedin.com/in/feitosadavi'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
      name: 'Conta',
      description: 'APIs relacionadas a Conta'
  }],
  paths,
  schemas,
  components
}