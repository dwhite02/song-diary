using Microsoft.AspNetCore.Identity;
using SongDiary.Models;

public class ApplicationUser : IdentityUser
{
    // You can add additional properties here if needed
    public ICollection<EntryModel> Entries { get; set; } = new List<EntryModel>(); // Navigation property for user's entries
}
