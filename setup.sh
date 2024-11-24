# Copies .env.example and changes it to .env so that future commands can find the env file
cp .env.example .env

# Start PostgreSQL container
docker-compose up -d

# Wait for the PostgreSQL container to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Install dependencies
npm install

# Run Prisma migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Start the development server
npm run dev