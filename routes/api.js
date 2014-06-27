var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv');

var HOST = 'http://www.olx.pt/';
var OFFSET = 30;
var INITIAL_PAGE = 1;
var TIMEOUT = 15000; //ms

var PRICE_DECIMAL = ",";
var IMAGE_TAG = "img src";

var MAIN_CATEGORIES = { //http://www.olx.pt/{0}-cat-{1}
    'animais': '10',
    'desporto-e-lazer': '12',
    'moda': '14',
    'moveis-casa-e-jardim': '13',
    'tecnologia-e-informatica': '11',
    'telemoveis-e-tablets': '25',
    'lazer': '26',
    'carros-motos-e-barcos': '362',
    'imoveis': '16',
    'emprego': '190',
    'servicos': '191',
    'compra-venda': '185'
};

var ALL_CATEGORIES = { //http://www.olx.pt/{0}-cat-{1}
    'animais': '10',
    'animais-domesticos-estimacao': '312',
    'acessorios-animais': '18',
    'desporto-e-lazer': '12',
    'artigos-desportivos': '234',
    'bicicletas': '9',
    'surf-e-bodyboard': '205',
    'moda': '14',
    'roupa-moda': '217',
    'calcado': '22',
    'acessorios-bebes-criancas': '365',
    'joias-bijuteria-relogios': '229',
    'malas-e-acessorios': '23',
    'saude-beleza': '227',
    'moveis-casa-e-jardim': '13',
    'utilidades-e-decoracao': '599',
    'electrodomesticos': '20',
    'moveis-decoracao': '228',
    'jardim-e-bricolage': '21',
    'tecnologia-e-informatica': '11',
    'videojogos-consolas': '209',
    'computadores-informatica': '240',
    'electronica': '366',
    'fotografia-tv-som': '218',
    'telemoveis-e-tablets': '25',
    'telemoveis-acessorios': '219',
    'tablets': '598',
    'lazer': '26',
    'jogos-brinquedos': '211',
    'instrumentos-musicais': '243',
    'livros-revistas': '215',
    'coleccoes-antiguidades': '214',
    'bilhetes-espectaculos': '402',
    'dvd-filmes': '238',
    'discos-vinil-cds-musica': '364',
    'carros-motos-e-barcos': '362',
    'carros': '378',
    'motociclos-scooters': '379',
    'camioes-veiculos-comerciais': '416',
    'barcos-lanchas': '376',
    'autocaravanas-roulotes-reboques': '417',
    'outros-veiculos': '380',
    'pecas-e-acessorios-carros': '377',
    'salvados': '418',
    'imoveis': '16',
    'apartamento-casa-a-venda': '367',
    'casas-moradias-para-arrendar-vender': '363',
    'quartos-para-aluguer': '301',
    'casas-de-ferias': '388',
    'permutas': '567',
    'garagens-estacionamento': '302',
    'terrenos-quintas': '410',
    'escritorios-lojas': '368',
    'estabelecimentos-comerciais-para-alugar-vender': '415',
    'emprego': '190',
    'tecnicos': '373',
    'servicos': '596',
    'saude': '267',
    'domesticos': '414',
    'reparacoes-mudancas': '198',
    'explicacoes-tecnicos': '278',
    'eventos': '324',
    'compra-venda': '185',
    'comercio-industria': '594'
};

//kinds of transaction to query
var REAL_ESTATE_TRANSACTIONS = {
    'all': ',alltypes,1',
    'sell': ',type,0',
    'rent': ',type,2',
    'buy': ',type,3'
};

var SEARCH_BY_CATEGORY_AND_SUBJECT = 1;
var SEARCH_BY_CATEGORY_AND_PRICE = 2;
var SEARCH_BY_POST = 3;

exports.searchCategorySubject = function (req, res) {
    //search by Category and Subject
    searchOLX(req, res, SEARCH_BY_CATEGORY_AND_SUBJECT);

};

exports.searchCategoryPrice = function (req, res) {
    //search by Category and Price range
    searchOLX(req, res, SEARCH_BY_CATEGORY_AND_PRICE);
};

exports.searchParams = function (req, res) {
    //search by Post
    searchOLX(req, res, SEARCH_BY_POST);

};


function searchOLX(req, res, searchType){

    res.setHeader('Content-Type', 'application/json');

    var results = [];
    var resultsCount = 0;
    var offset = 0;

    var reqParameters = new parameters(req, searchType);

    validateInput(reqParameters);

    //create URL base
    var url = getInitialURL(reqParameters);
    console.log('Initial URL: '+ url);
    var options = getOptions(url);

    try {

        //gets result number
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
                var buf = ic.convert(body);
                body = buf.toString('utf-8');

                $ = cheerio.load(body);

                //results for the requested query
                resultsTag = $('#listingTitle').text().match('([0-9\.]+)');

                //has results matching
                if (resultsTag != null && resultsTag.length > 0){
                    resultsCount = parseInt(resultsTag[1].replace('.',''));
                    //pages to query
                    offset = Math.floor(((resultsCount-1)/OFFSET)+1);
                }

                console.log("Resultados: " + resultsCount);
                console.log("Offset: " + offset );

                for (var i = 1; i<=offset;i++){

                    url = getSearchPageURL(reqParameters, i);
                    options = getOptions(url);

                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {

                            //converts charset=ISO-8859-1" to UTF8
                            buf = ic.convert(body);
                            body = buf.toString('utf-8');

                            $ = cheerio.load(body);

                            //$('div.ti').each(function() {
                            $('div.results').each(function() {
                                var ti = $(this).find('div.ti');
                                var time = $(this).find('div.time');
                                var pic = $(this).find('div.pic');

                                var childURL = ti.find('a').attr('href');
                                var title = ti.find('.ti a').html();
                                var priceTag = ti.find('.price').html();

                                var price = getPrice(priceTag);
                                var dateAd = time.find('.date').html().replace('\n','').trim();
                                var thumbnail = getThumbnail(pic.html());

                                var realEstate = '';
                                //ami
                                if(reqParameters.ami=='ami'){
                                    options = getOptions(childURL);

                                    request(options, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {

                                            $ = cheerio.load(body);

                                            realEstate = $('div#description').text().match('\\: (.*? - AMI [0-9]{4})');
                                        }
                                    });
                                    //realEstate = getAMIfromURL(childURL);
                                    results.push({title: title, url: childURL, price: price, dateAd: dateAd, thumbnail: thumbnail, realEstate: realEstate});
                                }else{

                                    results.push({title: title, url: childURL, price: price, dateAd: dateAd, thumbnail: thumbnail});
                                }
                            });
                        }
                    });
                }
            }
        });
        //returns results
        setTimeout((function() {res.send(JSON.stringify(results))}), TIMEOUT);

    } catch (e) {
        console.log("ERROR --> searchCategorySubject()");
        console.log(e);
    }
}

function getInitialURL(reqParameters) {
    return getSearchPageURL(reqParameters, INITIAL_PAGE);
}

function getSearchPageURL(reqParameters, offset) {
    //price_from,10,price_to,300
    var result = HOST + 'nf/' ;

    //category
    if (reqParameters.categoryAll!=undefined && reqParameters.categoryAll!=''){
        result = result + reqParameters.categoryAll + '-cat-' + ALL_CATEGORIES[reqParameters.categoryAll];
    }else if (reqParameters.category!=undefined && reqParameters.category!=''){
        result = result + reqParameters.category + '-cat-' + MAIN_CATEGORIES[reqParameters.category];
    }

    result= result + '-p-' + offset + '/';

    //subject
    if (reqParameters.subject != undefined && reqParameters.subject!=''){
        result = result + reqParameters.subject + '/';
    }
    //price
    if (reqParameters.searchType == SEARCH_BY_CATEGORY_AND_PRICE){
        if (reqParameters.condition == 'smaller'){
            result = result + ',price_to,';
        }else{
            result = result + ',price_from,';
        }
        result = result + reqParameters.price;
    }else{
        if (reqParameters.priceFrom != undefined && reqParameters.priceFrom!=''){
            result = result + ',price_from,'+ reqParameters.priceFrom;
        }
        if (reqParameters.priceTo != undefined && reqParameters.priceTo!=''){
            result = result + ',price_to,'+ reqParameters.priceTo;
        }
    }

    if (reqParameters.transaction != undefined && reqParameters.transaction!=''){
        result = result + REAL_ESTATE_TRANSACTIONS[reqParameters.transaction];
    }

    if (reqParameters.a2 != undefined && reqParameters.a2!=''){
        result = result + ',a2,' + reqParameters.a2;
    }

    if (reqParameters.sort != undefined && reqParameters.sort!='undefined'){
        result = result + reqParameters.sort;
    }

    //'http://www.olx.pt/';
    if (reqParameters.city!=undefined && reqParameters.city!=''){
        result = 'http://' + reqParameters.city + result.substring(10);
    }

    return result.replace('/,','/');
}


//validates requested category
function isValidCategory(category){
    result = true;
    if (category!=undefined && category!=''){
        result = MAIN_CATEGORIES[category]!=undefined;
    }

    return result;
}

//validates requested category
function isValidCategoryAll(categoryAll){
    result = true;
    if (categoryAll!=undefined && categoryAll!=''){
        result = ALL_CATEGORIES[categoryAll]!=undefined;
    }

    return result;
}


function getOptions(url) {
    var options =  {
        url: url,
        //proxy: 'http://wknbgo10:808',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
        }
    };

    return options;
}

//returns price
function getPrice(priceTag){
    //exemplos:
    // € 25,00
    // € 7.300,00 - Negociável
    // Sob orçamento
    // Troca
    // Grátis
    var result;

    try {

        //has ammount
        if (priceTag.indexOf(PRICE_DECIMAL) > -1){
            result = priceTag.match(' ([0-9\.,]+)')[1].replace('.','').replace(' ', '');
        } else{
            result = priceTag;
        }

    } catch (e) {
        console.log("ERROR --> getPrice(): " + priceTag);
        console.log(e);
    }

    return result;
}


function getThumbnail(pic){

    var result = "";

    try {

        if (pic.indexOf(IMAGE_TAG) > -1){
            result = pic.match('img src=\"(.*?)\"')[1];
        }

    } catch (e) {
        console.log("ERROR --> getThumbnail(): " + pic);
        console.log(e);
    }

    return result;
}

function validateInput(reqParameters) {
    if(!isValidCategory(reqParameters.category)){
        throw new Error('The Category "' + parameters.category + '" is invalid!');
    }
    if(!isValidCategoryAll(reqParameters.categoryAll)){
        throw new Error('The Category "' + parameters.categoryAll + '" is invalid!');
    }
}

function getAMIfromURL(childURL) {

    var result = '';
    //create URL base
    var options = getOptions(childURL);

    try {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                $ = cheerio.load(body);

                result = $('div#description').text().match('\\: (.*? - AMI [0-9]{4})');

            }
        });
    } catch (e) {
        console.log("ERROR --> getAMIfromURL()");
        console.log(e);
    }


    return result;
}

function parameters(req, searchType)
{
    if (searchType == SEARCH_BY_POST){
        this.subject=req.body.subject;
        this.priceFrom=req.body.priceFrom;
        this.priceTo=req.body.priceTo;
        this.price=req.body.price;
        this.condition=req.body.condition; //smaller, bigger
        this.category=req.body.category;
        this.city=req.body.city;
        this.categoryAll=req.body.categoryAll;
        this.transaction=req.body.transaction;
        this.a2=req.body.a2;
        this.sort=req.body.sort;
        this.ami=req.body.ami;
    } else{
        this.subject=req.params.subject;
        this.priceFrom=req.params.priceFrom;
        this.priceTo=req.params.priceTo;
        this.price=req.params.price;
        this.condition=req.params.condition; //smaller, bigger
        this.category=req.params.category;
        this.city=req.params.city;
        this.categoryAll=req.params.categoryAll;
    }

    this.searchType=searchType;

}