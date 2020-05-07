using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Mapper;

namespace WebChangeMonitor.Data {
    public class AppDbContext : DbContext {

        public AppDbContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new cFileMapper());
        }

        public DbSet<cFile> Files { get; set; }
    }
}
