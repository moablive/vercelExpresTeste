## Configuração do Banco de Dados

Para configurar o banco de dados para o projeto, execute o seguinte script SQL:

```sql
CREATE DATABASE controle_atendimento;

USE controle_atendimento;

CREATE TABLE IF NOT EXISTS atendimentos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DATA DATE,
    Hora TIME,
    servico VARCHAR(255),
    cliente VARCHAR(255),
    STATUS ENUM('ATIVO', 'REALIZADO', 'CANCELADO') DEFAULT 'ATIVO'
);
