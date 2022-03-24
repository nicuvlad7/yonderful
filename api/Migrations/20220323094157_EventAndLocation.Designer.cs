﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YonderfulApi.Data;

namespace YonderfulApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220323094157_EventAndLocation")]
    partial class EventAndLocation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("YonderfulApi.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DefaultBackgroundId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("IconId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("YonderfulApi.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("AutoJoin")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Autocancel")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BackgroundId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ContactEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactPhone")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndingDate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("EventLocationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Fee")
                        .HasColumnType("INTEGER");

                    b.Property<int>("HostId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("JoinDeadline")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaximumParticipants")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MinimumParticipants")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartingDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tags")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("EventLocationId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("YonderfulApi.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Province")
                        .HasColumnType("TEXT");

                    b.Property<string>("Street")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("YonderfulApi.Models.Picture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Pictures");
                });

            modelBuilder.Entity("YonderfulApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNo")
                        .HasMaxLength(10)
                        .HasColumnType("TEXT");

                    b.Property<string>("Position")
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("YonderfulApi.Models.Event", b =>
                {
                    b.HasOne("YonderfulApi.Models.Location", "EventLocation")
                        .WithMany()
                        .HasForeignKey("EventLocationId");

                    b.Navigation("EventLocation");
                });
#pragma warning restore 612, 618
        }
    }
}
