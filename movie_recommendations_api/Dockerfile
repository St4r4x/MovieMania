# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /opt/recos_api

# Copy the current directory contents into the container at /app
COPY . /opt/recos_api

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 8880 available to the world outside this container
EXPOSE 8880

# Run app.py when the container launches
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8880", "--log-level", "debug", "--access-log"]