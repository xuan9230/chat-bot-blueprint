FROM python:3.11-slim
RUN apt-get update && apt-get install -y \
    # build-essential \
    # python3-dev \
    # python3-pip \
    # python3-setuptools \
    # python3-wheel \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT ["python3"]
CMD ["server.py"]
