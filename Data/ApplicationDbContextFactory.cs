// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Design;
// using Microsoft.Extensions.Configuration;
// using System.IO;

// namespace SongDiary.Data
// {
//     public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
//     {
//         public ApplicationDbContext CreateDbContext()
//         {
//             return CreateDbContext(null);
//         }

//         public ApplicationDbContext CreateDbContext(string[] args)
//         {
//             // Set up configuration to read the connection string
//             IConfiguration configuration = new ConfigurationBuilder()
//                 .SetBasePath(Directory.GetCurrentDirectory()) // Ensures the base path is correct
//                 .AddJsonFile("appsettings.json") // Reads the appsettings.json file
//                 .Build();

//             // Create options for the DbContext
//             var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
//             var connectionString = configuration.GetConnectionString("DefaultConnection");
//             optionsBuilder.UseNpgsql(connectionString); // Use PostgreSQL provider

//             return new ApplicationDbContext(optionsBuilder.Options);
//         }
//     }
// }

