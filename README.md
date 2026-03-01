<img width="359" height="160" alt="trama-banner" src="https://github.com/user-attachments/assets/cf85f7ea-2933-403e-b727-a0befd58ad48" />

<br>
<br>

# 💡 Sobre

O Trama foi desenvolvido para solucionar um problema comum no comércio local: a falta de análise de dados. Mais do que apenas registrar vendas, o sistema permite que o lojista entenda o comportamento de compra dos clientes e tenha clareza sobre a saúde financeira do negócio. O projeto foi estruturado especialmente para atender lojas de roupas, embora também possa ser adaptado para outros segmentos comerciais.

<img width="3600" height="1540" alt="demo" src="https://github.com/user-attachments/assets/e77cd226-20fa-4c8e-94c0-d6e59b8ea2aa" />

## 🖥️ Demonstração

Você pode testar o projeto já hospedado [através desse link](https://tramaerp.vercel.app).

> [!NOTE]
> A versão hospedada é apenas uma demonstração, não use credenciais reais na autenticação. Os dados do painel são compartilhados entre todos os usuários que decidirem testar a aplicação e são resetados periodicamente.

## ✨ Principais funcionalidades

- **Gestão de Produtos:** Categorização de produtos e modelos.
- **Controle de Vendas:** Listagem e registro de vendas à vista ou parceladas.
- **CRM Básico:** Histórico de compras e preferências dos clientes.
- **Fluxo de Caixa:** Registro financeiro de entradas e saídas.
- **Dashboard:** Métricas essenciais para o funcionamento do comércio e tomada de decisões.

## 📚 Stack

- [ReactJS](https://reactjs.org/)
- [Vite](https://vitejs.dev/guide/)
- [TailwindCSS](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Back-end (repositório)](https://github.com/guh-rodr/trama-api)

## ⚙️ Como rodar o projeto

### 1. Pré-requisitos:

- Node.js (18.0 ou superior)
- pnpm

> [!WARNING]
> Se não tiver o pnpm instalado, use o seguinte comando antes de prosseguir: `npm install -g pnpm`

### 2. Clonar o repositório

```bash
git clone https://github.com/guh-rodr/trama-erp.git
```

### 3. Instalar as dependências

```bash
cd trama-erp
pnpm install
```

### 4. Iniciar o projeto

```
pnpm dev
```

> [!NOTE]
> Para iniciar o projeto completo localmente, você precisa configurar o [back-end](https://github.com/guh-rodr/trama-api) e em seguida adaptar o valor da variável `VITE_API_BASE_URL` (no arquivo .env) para a url da API
