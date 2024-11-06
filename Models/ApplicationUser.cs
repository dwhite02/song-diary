using Microsoft.AspNetCore.Identity;
using SongDiary.Models;

public class ApplicationUser : IdentityUser
{

    // Constructor to initialize the Entries collection
    // public ApplicationUser()
    // {
    //     Entries = new List<EntryModel>();
    // }
    // You can add additional properties here if needed
    public ICollection<EntryModel> Entries { get; set; } = new List<EntryModel>(); // Navigation property for user's entries
}
