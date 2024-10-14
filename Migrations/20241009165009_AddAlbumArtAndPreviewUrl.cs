using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SongDiary.Migrations
{
    /// <inheritdoc />
    public partial class AddAlbumArtAndPreviewUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AlbumArt",
                table: "Entries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreviewUrl",
                table: "Entries",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumArt",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "PreviewUrl",
                table: "Entries");
        }
    }
}
