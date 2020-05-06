using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Data {
    public class AppDbContext : DbContext {

        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<cFile> Files { get; set; }
    }
}
