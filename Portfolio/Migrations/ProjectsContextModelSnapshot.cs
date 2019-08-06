﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Portfolio.Models;

namespace Portfolio.Migrations
{
    [DbContext(typeof(ProjectsContext))]
    partial class ProjectsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Portfolio.Models.Project", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("DateEnd");

                    b.Property<DateTime>("DateStart");

                    b.Property<string>("Header");

                    b.Property<string>("Stack");

                    b.HasKey("ID");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Portfolio.Models.ProjectPhotos", b =>
                {
                    b.Property<int>("PhotoID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PhotoName");

                    b.Property<string>("PhotoRef");

                    b.Property<int>("ProjectID");

                    b.HasKey("PhotoID");

                    b.ToTable("ProjectPhotos");
                });

            modelBuilder.Entity("Portfolio.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Email");

                    b.Property<string>("Login")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Stack");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Portfolio.Models.UserProjects", b =>
                {
                    b.Property<int>("IdProject")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("IdUser");

                    b.HasKey("IdProject");

                    b.ToTable("UserProjects");
                });
#pragma warning restore 612, 618
        }
    }
}
