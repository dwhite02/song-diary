# syntax=docker/dockerfile:1

# Use the .NET SDK image to build the application.
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

# Install Node.js (necessary for npm)
RUN apk add --no-cache nodejs npm

# Copy the project files and restore dependencies
WORKDIR /source
COPY SongDiary.csproj ./
RUN dotnet restore

# Copy the rest of the application files
COPY . ./

# Build the application and publish it to /app
RUN dotnet publish -c Release -o /app

# Create a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS final
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app .

# Expose the port
EXPOSE 80
EXPOSE 443
EXPOSE 5432

# Entry point to run the application
ENTRYPOINT ["dotnet", "SongDiary.dll"]
