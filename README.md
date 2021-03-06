# Recuperação de senha

**Requisitos Funcionais**
`Como vai funcionar`
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**
`Ferramentas, Bibliotecas e etc que será usada`
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails de ve acontecer em segundo plano (background job)

**Regras de Negócios**
`tratamento efeito colateral de uma funcionalidade`
- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização de perfil

**Requisitos Funcionais**
`Como vai funcionar`
- O usuário deve porder atualizar seu nome, e-mail e senha;

**Requisitos Não Funcionais**
`Ferramentas, Bibliotecas e etc que será usada`
- Nenhum

**Regras de Negócios**
`tratamento efeito colateral de uma funcionalidade`
- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador
**Requisitos Funcionais**
`Como vai funcionar`
- O usuário deve poder listar os seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**
`Ferramentas, Bibliotecas e etc que será usada`
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negócios**
`tratamento efeito colateral de uma funcionalidade`
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviço
**Requisitos Funcionais**
`Como vai funcionar`
- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos umhorário disponível de um prestador;
- O usuário deve poder listar horários dispoíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**
`Ferramentas, Bibliotecas e etc que será usada`
- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negócios**
`tratamento efeito colateral de uma funcionalidade`
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8h ás 18h (Primeiro ás 8h, Último ás 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
