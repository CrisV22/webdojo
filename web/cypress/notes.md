## Boas práticas
1. Não clique em cima de textos, clique em cima de botões;

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
1. Sem suporte a Xpath
