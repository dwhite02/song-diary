using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SongDiary.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeedInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: -1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "Description", "Emoji", "Mood", "SongTitle" },
                values: new object[,]
                {
                    { -3, new DateTime(2024, 10, 1, 9, 40, 12, 910, DateTimeKind.Utc).AddTicks(590), "An upbeat synth-pop song with a retro vibe.", "🎉", "Energetic", "Blinding Lights" },
                    { -2, new DateTime(2024, 10, 2, 9, 40, 12, 910, DateTimeKind.Utc).AddTicks(580), "A catchy pop song about love and attraction.", "😍", "Happy", "Shape of You" },
                    { -1, new DateTime(2024, 10, 3, 9, 40, 12, 910, DateTimeKind.Utc).AddTicks(580), "A song that promotes peace and unity.", "🕊️", "Reflective", "Imagine" }
                });
        }
    }
}
