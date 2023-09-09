using PlanUP.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Drawing.Printing;

namespace PlanUP.DbContext
{
    public class DataContext : IdentityDbContext<AppUser>
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.LazyLoadingEnabled = false;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            // Enable sensitive data logging
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<StudentModule> StudentModule { get; set; }
        public DbSet<Activity> Activity { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
    
    
            /*
            modelBuilder.Entity<TutorialType>()
                .HasData(
                new
                {
                    TutorialTypeID = 1,
                    TutorialTypeName = "Tutorial Video"
                }
                );
            */

        }

    }
}
