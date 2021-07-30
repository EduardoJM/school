FROM python:3.6

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --no-cache --upgrade pip setuptools

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache -r requirements.txt

COPY . /app/
