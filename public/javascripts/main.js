$(function(){
    $("#base1").click(function(e){

        $('#results').html('');
        $('#resultsTable').html('');
        $('#container').show();

        var xmlHttpRequest;
        xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.onreadystatechange=function(){
            if(xmlHttpRequest.readyState==4){
                $('#container').hide();

                var resultsJSON = JSON.parse(xmlHttpRequest.responseText);
                var table = $('#resultsTable');

                var firstRow = true;
                var i = 0;

                for(var item in resultsJSON)
                {
                    i++;
                    var title = resultsJSON[item].title;
                    var url = resultsJSON[item].url;
                    var price = resultsJSON[item].price;
                    var dateAd = resultsJSON[item].dateAd;
                    var thumbnail = resultsJSON[item].thumbnail;

                    if (firstRow){
                        firstRow = false;
                        table.append('<tr><th>#</th><th>Date</th><th>Thumb</th><th>Item</th><th>Price</th></tr>');
                    }

                    table.append('<tr><td>' + i + '</td><td>' + dateAd + '</td><td><img src=\"' + thumbnail + '\"></td><td><a href=\"' + url + '\">' + title + '</a></td></td><td style="text-align:right">' + price + '</td></tr>');
                }

                $('#results').html(i + ' resultados para a sua pesquisa.');

            }
        };

        var errors = ' ';
        var subject = document.getElementsByName('subject')[0].value;
        var category = document.getElementsByName('category')[0].value;

        if (category==undefined || category=='--ALL CATEGORIES--'){
            errors=errors+'Category is mandatory!<br>';
        }
        if (subject==undefined || subject.trim()==''){
            errors=errors+'Subject is mandatory!<br>';
        }

        if (errors==' '){
            xmlHttpRequest.open("GET",'/search/' + category + '/' + subject, true);
            xmlHttpRequest.send(null);
        }else{
            $('#container').hide();
            $('#results').html(errors);
        }


    });
});


$(function(){
    $("#base2").click(function(e){

        $('#results').html('');
        $('#resultsTable').html('');
        $('#container').show();

        var xmlHttpRequest;
        xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.onreadystatechange=function(){
            if(xmlHttpRequest.readyState==4){
                $('#container').hide();


                var resultsJSON = JSON.parse(xmlHttpRequest.responseText);
                var table = $('#resultsTable');

                var firstRow = true;
                var i = 0;

                for(var item in resultsJSON)
                {
                    i++;
                    var title = resultsJSON[item].title;
                    var url = resultsJSON[item].url;
                    var price = resultsJSON[item].price;
                    var dateAd = resultsJSON[item].dateAd;
                    var thumbnail = resultsJSON[item].thumbnail;

                    if (firstRow){
                        firstRow = false;
                        table.append('<tr><th>#</th><th>Date</th><th>Thumb</th><th>Item</th><th>Price</th></tr>');
                    }

                    table.append('<tr><td>' + i + '</td><td>' + dateAd + '</td><td><img src=\"' + thumbnail + '\"></td><td><a href=\"' + url + '\">' + title + '</a></td></td><td style="text-align:right">' + price + '</td></tr>');
                }

                $('#results').html(i + ' resultados para a sua pesquisa.');

            }
        };

        var errors = ' ';
        var condition = document.getElementsByName('conditionPrice')[0].value;
        var priceFrom = document.getElementsByName('priceFrom')[0].value;
        var category = document.getElementsByName('category')[0].value;

        if (category==undefined || category=='--ALL CATEGORIES--'){
            errors=errors+'Category is mandatory!<br>';
        }
        if (priceFrom==undefined){
            errors=errors+'Price is mandatory!<br>';
        }

        if (errors==' '){
            xmlHttpRequest.open("GET",'/search/' + category + '/price/' + condition + '/' + price, true);
            xmlHttpRequest.send(null);
        }else{
            $('#container').hide();
            $('#results').html(errors);
        }

    });
});

$(function(){
    $("#base3").click(function(e){

        $('#results').html('');
        $('#resultsTable').html('');
        $('#container').show();

        var xmlHttpRequest;
        xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.onreadystatechange=function(){
            if(xmlHttpRequest.readyState==4){
                $('#container').hide();


                var resultsJSON = JSON.parse(xmlHttpRequest.responseText);
                var table = $('#resultsTable');

                var firstRow = true;
                var i = 0;

                for(var item in resultsJSON)
                {
                    i++;
                    var title = resultsJSON[item].title;
                    var url = resultsJSON[item].url;
                    var price = resultsJSON[item].price;
                    var dateAd = resultsJSON[item].dateAd;
                    var thumbnail = resultsJSON[item].thumbnail;

                    if (firstRow){
                        firstRow = false;
                        table.append('<tr><th>#</th><th>Date</th><th>Thumb</th><th>Item</th><th>Price</th></tr>');
                    }

                    table.append('<tr><td>' + i + '</td><td>' + dateAd + '</td><td><img src=\"' + thumbnail + '\"></td><td><a href=\"' + url + '\">' + title + '</a></td></td><td style="text-align:right">' + price + '</td></tr>');
                }

                $('#results').html(i + ' resultados para a sua pesquisa.');

            }
        };

        var category = document.getElementsByName('category')[0].value;
        var subject = document.getElementsByName('subject')[0].value;
        var priceFrom = document.getElementsByName('priceFrom')[0].value;
        var priceTo = document.getElementsByName('priceTo')[0].value;
        var city = document.getElementsByName('city')[0].value;

        if (category=='--ALL CATEGORIES--'){
            category='';
        }
        if (city=='--ALL CITIES--'){
            city='';
        }

        xmlHttpRequest.open("POST",'/search/', true);
        xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttpRequest.send('category='+category+'&subject='+subject+'&priceFrom='+priceFrom+'&priceTo='+priceTo+'&city='+city);

    });
});

$(function(){
    $("#intermediate").click(function(e){

        $('#results').html('');
        $('#resultsTable').html('');
        $('#container').show();

        var xmlHttpRequest;
        xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.onreadystatechange=function(){
            if(xmlHttpRequest.readyState==4){
                $('#container').hide();


                var resultsJSON = JSON.parse(xmlHttpRequest.responseText);
                var table = $('#resultsTable');

                var firstRow = true;
                var i = 0;

                for(var item in resultsJSON)
                {
                    i++;
                    var title = resultsJSON[item].title;
                    var url = resultsJSON[item].url;
                    var price = resultsJSON[item].price;
                    var dateAd = resultsJSON[item].dateAd;
                    var thumbnail = resultsJSON[item].thumbnail;
                    var realEstate = '';

                    if (ami=='ami'){
                        realEstate = resultsJSON[item].realEstate;
                    }

                    if (firstRow){
                        firstRow = false;

                        if (ami=='ami'){
                            table.append('<tr><th>#</th><th>Date</th><th>Thumb</th><th>Item</th><th>Price</th><th>AMI</th></tr>');
                        }else{
                            table.append('<tr><th>#</th><th>Date</th><th>Thumb</th><th>Item</th><th>Price</th></tr>');
                        }
                    }


                    if (ami=='ami'){
                        table.append('<tr><td>' + i + '</td><td>' + dateAd + '</td><td><img src=\"' + thumbnail + '\"></td><td><a href=\"' + url + '\">' + title + '</a></td></td><td style="text-align:right">' + price + '</td><td>' + realEstate + '</td></tr>');
                    }else{
                        table.append('<tr><td>' + i + '</td><td>' + dateAd + '</td><td><img src=\"' + thumbnail + '\"></td><td><a href=\"' + url + '\">' + title + '</a></td></td><td style="text-align:right">' + price + '</td></tr>');
                    }


                }

                $('#results').html(i + ' resultados para a sua pesquisa.');

            }
        };

        var category = document.getElementsByName('category')[0].value;
        var subject = document.getElementsByName('subject')[0].value;
        var priceFrom = document.getElementsByName('priceFrom')[0].value;
        var priceTo = document.getElementsByName('priceTo')[0].value;
        var city = document.getElementsByName('city')[0].value;
        var categoryAll = document.getElementsByName('categoryAll')[0].value;
        var sort = document.getElementsByName('sort')[0].value;

        var transaction = document.getElementsByName('transaction')[0].value;
        var a2 = document.getElementsByName('a2')[0].value;
        var ami = document.getElementsByName('ami')[0].value;

        if(category!='imoveis'){
            var transaction = '';
            var a2 = '';
            var ami = '';
        }

        if (category=='--ALL CATEGORIES--'){
            category='';
        }
        if (categoryAll=='--ALL CATEGORIES--' || categoryAll=='Please choose from above'){
            categoryAll='';
        }
        if (city=='--ALL CITIES--'){
            city='';
        }


        xmlHttpRequest.open("POST",'/search/', true);
        xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttpRequest.send('category='+category+'&subject='+subject+'&priceFrom='+priceFrom+'&priceTo='+priceTo+'&city='+city+'&categoryAll='+categoryAll+'&transaction='+transaction+'&a2='+a2+'&sort='+sort+'&ami='+ami);

    });
});

$("#category").change(function() {

    var $dropdown = $(this);

    var subcategories = {
        "animais": "animais-domesticos-estimacao,acessorios-animais",
        'desportoelazer': "artigos-desportivos,bicicletas,surf-e-bodyboard",
        'moda': "roupa-moda, calcado,acessorios-bebes-criancas,joias-bijuteria-relogios,malas-e-acessorios,saude-beleza",
        'moveiscasaejardim': "utilidades-e-decoracao,electrodomesticos,moveis-decoracao,jardim-e-bricolage",
        'tecnologiaeinformatica':'videojogos-consolas,computadores-informatica,electronica,fotografia-tv-som',
        'telemoveisetablets': 'telemoveis-acessorios,tablets',
        'lazer':'jogos-brinquedos,instrumentos-musicais,livros-revistas,coleccoes-antiguidades,bilhetes-espectaculos,dvd-filmes,discos-vinil-cds-musica',
        'carrosmotosebarcos':'carros,motociclos-scooters,camioes-veiculos-comerciais,barcos-lanchas,autocaravanas-roulotes-reboques,outros-veiculos,pecas-e-acessorios-carros,salvados',
        'imoveis':'apartamento-casa-a-venda,casas-moradias-para-arrendar-vender,quartos-para-aluguer,casas-de-ferias,permutas,garagens-estacionamento,terrenos-quintas,escritorios-lojas,estabelecimentos-comerciais-para-alugar-vender',
        'emprego':'tecnicos',
        'servicos':'saude,servicos,domesticos,reparacoes-mudancas,explicacoes-tecnicos,saude-beleza,eventos',
        'compravenda':'comercio-industria'
    };

    var key = $dropdown.val().replace(/-/g,'');

    var vals = [];

    switch(key) {
        case 'animais':
            vals = subcategories.animais.split(",");
            break;
        case 'desportoelazer':
            vals = subcategories.desportoelazer.split(",");
            break;
        case 'moda':
            vals = subcategories.moda.split(",");
            break;
        case 'moveiscasaejardim':
            vals = subcategories.moveiscasaejardim.split(",");
            break;
        case 'tecnologiaeinformatica':
            vals = subcategories.tecnologiaeinformatica.split(",");
            break;
        case 'telemoveisetablets':
            vals = subcategories.telemoveisetablets.split(",");
            break;
        case 'imoveis':
            vals = subcategories.imoveis.split(",");
            break;
        case 'emprego':
            vals = subcategories.emprego.split(",");
            break;
        case 'servicos':
            vals = subcategories.servicos.split(",");
            break;
        case 'compravenda':
            vals = subcategories.compravenda.split(",");
            break;
        case 'carrosmotosebarcos':
            vals = subcategories.carrosmotosebarcos.split(",");
            break;
        case 'lazer':
            vals = subcategories.lazer.split(",");
            break;
        case '--ALL CATEGORIES--':
            vals = ['Please choose from above'];
    }

    if (key=='imoveis'){
        $('#realEstateDiv').show();
    }else{
        $('#realEstateDiv').hide();
    }

    var $categoryAll = $("#categoryAll");
    $categoryAll.empty();
    if (key!='--ALL CATEGORIES--'){
        $categoryAll.append('<option>' + '--ALL CATEGORIES--' + '</option>');
    }

    $.each(vals, function(index, value) {
        $categoryAll.append('<option>' + value + '</option>');
    });

});