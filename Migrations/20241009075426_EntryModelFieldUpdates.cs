using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SongDiary.Migrations
{
    /// <inheritdoc />
    public partial class EntryModelFieldUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Artist",
                table: "Entries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Genre",
                table: "Entries",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Artist",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "Genre",
                table: "Entries");
        }
    }
}
