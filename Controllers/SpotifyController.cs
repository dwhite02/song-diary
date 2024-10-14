using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Collections.Generic;

namespace SongDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public SpotifyController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        // Method to fetch access token using Client Credentials Flow
        private async Task<string> GetAccessTokenAsync()
        {
            var client = _httpClientFactory.CreateClient();
            var clientId = _configuration["Spotify:ClientId"];
            var clientSecret = _configuration["Spotify:ClientSecret"];

            // Form the token request
            var request = new HttpRequestMessage(HttpMethod.Post, "https://accounts.spotify.com/api/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}")));
            request.Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException("Unable to retrieve access token from Spotify.");
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonSerializer.Deserialize<JsonElement>(content);
            return json.GetProperty("access_token").GetString();
        }

        // Example endpoint to search for songs
        [HttpGet("search")]
        public async Task<IActionResult> SearchSongs(string query)
        {
            var accessToken = await GetAccessTokenAsync(); // Fetch token here

            var client = _httpClientFactory.CreateClient();

            // Setting up the request
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/search?q={query}&type=track");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            // Send the request
            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from Spotify.");
            }

            // Read and return response from Spotify
            var content = await response.Content.ReadAsStringAsync();
            return Ok(content); // Returns the JSON from Spotify
        }

        // New endpoint to get available genres
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var accessToken = await GetAccessTokenAsync(); // Fetch token here

            var client = _httpClientFactory.CreateClient();

            // Setting up the request for genres
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.spotify.com/v1/recommendations/available-genre-seeds");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            // Send the request
            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch genres from Spotify.");
            }

            // Read and return response from Spotify
            var content = await response.Content.ReadAsStringAsync();
            var genres = JsonSerializer.Deserialize<JsonElement>(content);
            return Ok(genres.GetProperty("genres")); // Returns only the genres array
        }
    }
}
