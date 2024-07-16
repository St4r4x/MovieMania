FROM python:3.11-slim

ARG CONFIG

ARG APP_NAME="users_api"
ENV PYTHONPATH="/opt/$APP_NAME"

RUN mkdir -p /opt/$APP_NAME /var/log/$APP_NAME

WORKDIR /opt/$APP_NAME

# Install curl and Poetry
RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./pyproject.toml ./poetry.lock* /opt/$APP_NAME

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --only main ; fi"

COPY . .

RUN chown -R www-data:www-data /opt/$APP_NAME /var/log/$APP_NAME

EXPOSE 8888

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8888", "--log-level", "debug", "--access-log"]