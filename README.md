# time_managment_tool

This project is for managing the time and prioritizing the task

### Setup Instructions

#### 1. Fork & clone the Repository.

Fork the [repository](https://github.com/AthenaFoss/time_managment_tool) & clone the repository using -

```bash
git clone https://github.com/{your_github_username}/time_managment_tool.git
```

#### Instant Docker Setup

> Note -
> Your docker-deamon should be online

```bash
docker-compose up
```

### Traditional Setup

#### 2. Install Dependencies

Open the `time_management_tool` directory in your preferred code editor or IDE.

Open a terminal for the directory, then run the following command in the terminal to install all the dependencies.

```bash
npm install
```

#### 3. Configure Environment Variables

In the root of the directory, create a `.env` file by copying the `.env.example` file.

```bash
cp .env.example .env
```

In the `.env` file, set up the application environment and authentication routes.

```
NODE_ENV=development
```

#### 4. Set Up Database (PostgreSQL)

You can use a cloud service like Neon or Supabase, or run a local instance with Docker -

- Local PostgreSQL with Docker:

```bash
docker run -d \
--name cms-db \
-e POSTGRES_PASSWORD=password_db \
-e  POSTGRES_DB=time_management  \
-p 5432:5432 \
postgres
```

Update the `.env` file with your PostgreSQL connection details -

- Local instance -

```bash
DATABASE_URL=postgresql://postgres:password_db@localhost:5432/time_management
```

- Cloud instance: Set the `DATABASE_URL` to your cloud provider's URL.

#### 5. Generate the prisma client

```bash
npm run db:generate
```

#### 6. Start the Application

Run the application in development mode -

```bash
npm run dev
```

Visit the application at -

```bash
http://localhost:3000
```

### Other instructions

#### 1. To add a new shadcn component, use the below command -

```bash
  npm run ui:add
```
