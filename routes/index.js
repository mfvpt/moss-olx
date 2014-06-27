/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
      title: 'MOSS OLX Scraper',
      realEstateTransactions: [
          'all',
          'sell',
          'rent',
          'buy'
      ],
      categories: [
          '--ALL CATEGORIES--',
          'imoveis',
          'animais',
          'desporto-e-lazer',
          'moda',
          'moveis-casa-e-jardim',
          'tecnologia-e-informatica',
          'telemoveis-e-tablets',
          'lazer',
          'carros-motos-e-barcos',
          'emprego',
          'servicos',
          'compra-venda'
      ],
      cities: [
          '--ALL CITIES--',
          'acores',
          'aveiro',
          'beja',
          'braga',
          'braganca',
          'castelobranco',
          'coimbra',
          'evora',
          'faro',
          'guarda',
          'leiria',
          'lisboa',
          'madeira',
          'portalegre',
          'porto',
          'santarem',
          'setubal',
          'vianadocastelo',
          'vilareal',
          'viseu'
      ]
  });
};