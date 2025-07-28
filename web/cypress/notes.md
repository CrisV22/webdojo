## Boas práticas
1. Não clique em cima de textos, clique em cima de botões;
2. Timeout explicito;
3. Testes não devem ter dependência;
4. Massa de teste constante;

## Más práticas

1. Nunca use `cy.wait(5000)` para esperar por elementos.
2. Não simule polling manualmente, a menos que seja absolutamente necessário — o Cypress já faz isso automaticamente.

### Seletores

1. Não utilize classes de estilização como seletor;
2. Cypress não precisa e não aceita de Xpath;
3. 

#### Campos de texto/email/ (validando)

    id
    Se id dinâmico:
        data-cy
        css selector nome orientado ao comportamento ex: txt-nome...
        placeholder
        .contains
    
    Cuidado:
        xPath (Cypress não suporta)
        type

#### Caixa de seleção

    Selecionar o campo
    Selecionar opções por:
        value
        label
        texto da opção

        Obs: Opções não fazem parte do DOM

#### Campo de radio


#### Campo de upload
    
    div: botão estilizado
    input: escondido e dificil de estilizar

    testes com document.querySelector()

    

## Limitações
1. Sem suporte a Xpath;
2. Não suporta mouseHover; -> npm install cypress-real-events
3. Interagir com nova guia/janela
4. iFrames
5. 

## Utils
Folder: npx cypress run --spec "cypress/e2e/s6-ganchos-helpers/*.cy.js"
File: npx cypress run --spec "cypress/e2e/s3/spec.cy.js"

rm -rf dist

## Outros
npx cypress run --headed - apresentação de execução assistida para o cliente/time
npx cypress run - pipeline
