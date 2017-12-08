# Vitta JSCard #

Essa biblioteca tem como objetivo encriptar os dados de cartão de crédito ou debito de um cliente que serão enviado para a API do Vitta Pagamentos para processamento da transação.

### Como utilizar essa biblioteca? ###
Paga utilizar esta biblioteca faça da seguinte maneira:

* Primeiro importe-a em seu arquivo js.

```
#!javascript

var VittaCard = require('vitta-js-card');
```

* Depois crie um novo cartão passando os parâmetros.

```
#!javascript

let card = new VittaCard({
        cardNumber: '5899161750380548',
        cardHolderName: 'GILSON F B SOUZA',
        cardExpirationMonth: '08',
        cardExpirationYear: '23',
        cardCVV: '515'
    });
```

* Apos isso, solicite a geração do card_hash. A função retornará uma promisse.

```
#!javascript

card.generateCardString().then(s => console.log(s));
```

* Você pode alterar o endpoint default da api encadeando o método `setApiEndPoint` da seguinte maneira.

```
#!javascript

card.setApiEndPoint("http://pagamentos.vitta.dev/api/").generateCardString().then(s => console.log(s));
```

* Alem disso, caso a api exija o uso de um Token de acesso, você pode setá-lo encadeando o método `setApiToken` da seguinte maneira.

```
#!javascript

card.setApiToken("5MGWost3OWsk24G").generateCardString().then(s => console.log(s));
```

### Organização de pastas e arquivos ###

O arquivo em ES6 pode ser encontrado em */src/nodenab.js*, já a versão "babelificada" em ES2015 pode ser encontrada em */dist/src/nodenab.js* bem como seu source-map. Alguns exemplos de como utilizar a biblioteca podem ser vistos em */tests/unit/*