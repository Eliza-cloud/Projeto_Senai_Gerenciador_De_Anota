# Projeto do Senai
## Grupo
* Ruan
* Reinan
*  Carlos
*  Eliza

  # Projeto Gerenciador de Anotações 

  ## Descriação 

  O gerenciador de anotações é site educacional voltado para os estudantes a organizar suas tarefas, resumos e Datas de provas e trabalhos e metas a ser realizadas. Diferente de um simples bloco de notas, ele funciona como um "segundo cérebro", permitindo que você centralize ideias, documentos e tarefas em um só lugar.
  O objetivo central do nosso gerenciador de anotações não é apenas "guardar textos", mas sim atuar como um sistema de suporte cognitivo.

  # Funcionalidade
  
  * Organizações de Pastas e Cadernos: Permite agrupar notas por grandes temas (ex: Trabalho, Estudos, Vida Pessoal).
  * Sistema de Etiquetas (Tags): Crucial para organizar notas que pertencem a mais de um contexto sem precisar duplicá-las.
  * Exclução e salvar: O gerenciador permite o estudante excluir ou salvar as notas que não são mais úteis no dia a dia.

    ## Sistema de Login
     * cadastro e autenticação de usuários
     *  Integrado com o servidor e Banco de dados

    # Responsabilidades

    ## Carlos e Ruan Carlos
    Responsáveis pelo sistema de login (fron-end)

    * Index (estrutura HTML)
    * Style (CSS)
    * JavaScript (validação e lógica do login

    ## Eliza e Reinan

    Ficaram responsaveis  pela continuidade do login no servidor (back-end):
      * Banco de dados
      * Node.js
      * integração entre front-end e back-end
   
    #   Aplicações Utilizadas

    ## Front-end
     * HTML
     * CSS
     * JavaScript

    ## Back-end

     * Node.js

    ## Banco de Dados

    * Utilizamos o banco de dados relacional (Mysql)
   

# Testes de Sistema – Gerenciador de Anotações

# 1- Teste (login e senha)

## Componente Testado:

Função de validação de login (JavaScript – Front-end).

## Cenário de Teste:
O usuário informa email e senha no formulário de login.

## Procedimento:
Vai aparecer uma tela inicial do login, caso o usuário não tenha feito o cadastro, ele(a) vai
clicar em cadastrar o usuário, colocar nome, email, senha e confirmar senha. vai aparecer
uma mensagem usuário cadastrado redirecionado para tela principal. Na tela principal o
usuário vai inserir o:

● Inserir um email correto.

● Inserir uma senha correta.

● Clicar no botão “Entrar”.

## Resultado Esperado:
A função valida corretamente os campos e permite o envio dos dados ao servidor.

## Resultado Esperado em Caso de Erro:
Se o email ou senha estiverem inválidos, o sistema exibe uma mensagem de erro sem
enviar os dados.

# 2- Teste de Responsividade do Sistema

## Funcionalidade avaliada:
Comportamento e adaptação da interface do sistema em diferentes tamanhos de tela.

## Cenário de teste:
Usuário acessa o gerenciador de anotações a partir de diferentes dispositivos.

## Procedimento:
● Acessar o sistema em um computador (desktop).

● Acessar o sistema em um tablet.

● Acessar o sistema em um smartphone.

● Verificar o ajuste dos elementos da tela (menus, botões, formulários e textos).

● Testar login, criação e visualização de anotações em cada dispositivo.
 
 
## Resultado esperado:
O sistema se adapta corretamente a diferentes resoluções de tela, mantendo boa
usabilidade, legibilidade dos textos e funcionamento adequado de todas as funcionalidades.

## Resultado esperado em caso de erro:
Caso a interface não se ajuste corretamente, podem ocorrer sobreposição de elementos,
dificuldade de navegação ou impossibilidade de uso em determinados dispositivos,
indicando a necessidade de ajustes no layout responsivo.

# 3- Teste (Funcionalidade do sistema)

## Funcionalidade Testada:
Criação e salvamento de anotações.

## Cenário de Teste:
Usuário cria uma nova anotação e salva no sistema.

## Procedimento:
● Usuário faz login no sistema.

● Clica em “Nova Anotação”.

● Insere título e conteúdo.

● Salva a anotação.

## Resultado Esperado:
A anotação é salva corretamente e fica disponível para visualização posterior.

# 4- Teste (Avaliar o comportamento do sistema)

## Cenário de Teste:
Vários usuários acessam o sistema ao mesmo tempo.

## Procedimento:
● Simular múltiplos logins simultâneos.

● Criar, salvar e excluir anotações repetidamente.

● Monitorar o tempo de resposta do sistema.

## Resultado Esperado:
O sistema mantém um tempo de resposta aceitável, sem travamentos ou quedas do
servidor.

## Critério de Sucesso:
As páginas carregam corretamente e as ações são executadas sem atrasos excessivos.

# 5- Teste (sistema de etiquetas)

## Cenário de Teste:
Após adicionar o sistema de etiquetas (tags).

## Procedimento:
● Realizar login no sistema.

● Criar uma nova anotação.

● Adicionar etiquetas à anotação.

## Testar novamente:
● Login

● Salvar

● Excluir anotações

## Resultado Esperado:
Todas as funcionalidades antigas continuam funcionando corretamente após a
implementação das tags.
