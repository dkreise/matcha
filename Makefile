NAME = matcha
DC = docker-compose

# Main commands
all: up

up:
	@echo "Starting $(NAME) containers..."
	$(DC) up -d --build

down:
	@echo "Stopping $(NAME) containers..."
	$(DC) down

clean:
	@echo "Removing stopped containers and networks..."
	$(DC) down

fclean: clean
	@echo "Removing volumes..."
	$(DC) down -v

re: fclean all

logs:
	@echo "Showing logs..."
	$(DC) logs -f

ps:
	@echo "Listing containers..."
	$(DC) ps

build:
	@echo "Building $(NAME) images..."
	$(DC) build

restart:
	@echo "Restarting $(NAME)..."
	$(DC) down
	$(DC) up -d --build

.PHONY: all up down clean fclean re logs ps build restart
