describe('CSV', () => {

    beforeEach(() => {
        cy.start()
    })

    it.only('Deve logar com sucesso', () => {
        cy.readFile('D:\\QA\\programacao\\ninja-do-cypress\\webdojo\\web\\cypress\\fixtures\\test.csv').then(
            (data) => {
                // console.info(data); // Exibir todo o arquivo csv
                // console.info(data.split('\n')[0]); // Exibir apenas uma linha
                // Exibir apenas a coluna de email
                const lines = data.split('\n');
                const header = lines[0].split(',');

                // Exibir dados de uma coluna
                const emailIndex = header.indexOf('email');
                if (emailIndex !== -1) {
                    lines.slice(1).forEach(line => {
                        const cols = line.split(',');
                        if (cols[emailIndex]) {
                            console.info(cols[emailIndex]);
                        }
                    });
                } else {
                    console.warn('Coluna "email" não encontrada.');
                }

                // Exibir dados de duas colunas
                const expectedResultIndex = header.indexOf('expected-result');
                if (emailIndex !== -1 && expectedResultIndex !== -1) {
                    lines.slice(1).forEach(line => {
                        const cols = line.split(',');
                        if (cols[emailIndex] && cols[expectedResultIndex]) {
                            console.info(`Email: ${cols[emailIndex]}, Expected Result: ${cols[expectedResultIndex]}`);
                        }
                    });
                } else {
                    console.warn('Colunas "email" ou "expected-result" não encontradas.');
                }
            }
        )
    })
})