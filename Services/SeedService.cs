using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SongDiary.Models;

namespace SongDiary.Data
{
    public class SeedService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager; // Change to ApplicationUser
        private readonly RoleManager<IdentityRole> _roleManager;

        public SeedService(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager; // This should be of type ApplicationUser
            _roleManager = roleManager;
        }

        public async Task SeedDataAsync()
        {
            // Seed roles
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }

            // Seed demo user
            ApplicationUser demoUser = null; // Change to ApplicationUser

            if (_userManager.Users.All(u => u.UserName != "demouser"))
            {
                demoUser = new ApplicationUser
                {
                    UserName = "demouser",
                    Email = "demouser@example.com",
                    EmailConfirmed = true
                };

                var createResult = await _userManager.CreateAsync(demoUser, "Password123!");

                if (createResult.Succeeded)
                {
                    await _userManager.AddToRoleAsync(demoUser, "User");
                    await _userManager.AddToRoleAsync(demoUser, "Admin");
                    Console.WriteLine($"Demo User ID: {demoUser.Id}"); // Log for debugging
                }
                else
                {
                    // Log errors from createResult.Errors
                    Console.WriteLine("Error creating demo user:");
                    foreach (var error in createResult.Errors)
                    {
                        Console.WriteLine(error.Description);
                    }
                    return; // Exit if user creation failed
                }
            }

            // Check if the demo user was created successfully
            if (demoUser != null)
            {
                // Seed entries if none exist
                if (!_context.Entries.Any())
                {
                    _context.Entries.AddRange(new List<EntryModel>
                    {
                        new EntryModel
                        {
                            SongTitle = "Imagine",
                            Description = "A song that promotes peace and unity.",
                            Mood = "Reflective",
                            Emoji = "🕊️",
                            Date = DateTime.UtcNow,
                            UserId = demoUser.Id // Now this will work
                        },
                        new EntryModel
                        {
                            SongTitle = "Shape of You",
                            Description = "A catchy pop song about love and attraction.",
                            Mood = "Happy",
                            Emoji = "😍",
                            Date = DateTime.UtcNow.AddDays(-1),
                            UserId = demoUser.Id // Now this will work
                        },
                        new EntryModel
                        {
                            SongTitle = "Blinding Lights",
                            Description = "An upbeat synth-pop song with a retro vibe.",
                            Mood = "Energetic",
                            Emoji = "🎉",
                            Date = DateTime.UtcNow.AddDays(-2),
                            UserId = demoUser.Id // Now this will work
                        }
                    });

                    await _context.SaveChangesAsync(); // Save the new entries
                }

                // Update existing entries without UserId
                var entriesWithoutUser = _context.Entries.Where(e => e.UserId == null).ToList();
                foreach (var entry in entriesWithoutUser)
                {
                    entry.UserId = demoUser.Id; // Assign demo user to these entries
                }

                await _context.SaveChangesAsync(); // Save updates
            }
        }
    }
}
