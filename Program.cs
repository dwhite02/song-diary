﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SongDiary.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = bool.Parse(builder.Configuration["Identity:PasswordOptions:RequireDigit"] ?? "false");
    options.Password.RequiredLength = int.Parse(builder.Configuration["Identity:PasswordOptions:RequiredLength"] ?? "6"); // Default to 6
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Seed service
builder.Services.AddScoped<SeedService>();

// Add HttpClientFactory
builder.Services.AddHttpClient();  // This allows for easy management of HttpClient instances

// Swagger setup
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var seedService = scope.ServiceProvider.GetRequiredService<SeedService>();
    await seedService.SeedDataAsync();  // Ensure this is asynchronous
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Add authentication and authorization middleware
app.UseAuthentication(); // Ensure authentication middleware is added
app.UseAuthorization();   // Keep authorization if you need it for other purposes

// Add endpoint mapping after routing
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

await app.RunAsync(); // Ensure the application runs asynchronously
