using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SongDiary.Migrations
{
    /// <inheritdoc />
    public partial class InitialIdentityMigrationUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Entries",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Entries");
        }
    }
}
