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
            // Comment out these lines
            // ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            // ChangeTracker.LazyLoadingEnabled = false;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            // Enable sensitive data logging
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public DbSet<StudentModule> StudentModule { get; set; }
        public DbSet<Activity> Activity { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
          
            /*
            modelBuilder.Entity<StudentModule>()
                .HasData(
                new
                {
                    ModuleID = 1,
                    ModuleName = "Test Module",
                    UserID = "224retgg55482fewf"
                }
                );
            */
        }

    }
}
