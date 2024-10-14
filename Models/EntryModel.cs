using System;

namespace SongDiary.Models
{
    public class EntryModel
    {
        public int Id { get; set; }
        public string? SongTitle { get; set; }
        public string? Artist { get; set; }
        public string? Genre { get; set; }
        public string? Description { get; set; }
        public string? Mood { get; set; }
        public string? Emoji { get; set; }
        public DateTime Date { get; set; }
        public string? AlbumArt { get; set; } // Property for album cover art
        public string? PreviewUrl { get; set; } // Property for audio preview

        // Foreign key for User
        public string? UserId { get; set; } // Assuming you are using string for user IDs

        // Navigation property for the user
        public ApplicationUser? User { get; set; } // Link to the ApplicationUser
    }
}


