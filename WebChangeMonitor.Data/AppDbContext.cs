using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Mapper;

namespace WebChangeMonitor.Data {
	public class AppDbContext : DbContext {
		#region METHODS

		public AppDbContext(DbContextOptions options) : base(options) { }

		public AppDbContext() {
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			base.OnModelCreating(modelBuilder);
			modelBuilder
				.ApplyConfiguration(new cFileMapper())
				.ApplyConfiguration(new cVersionMapper())
				.ApplyConfiguration(new cVersionFilesMapper())
				.ApplyConfiguration(new cFileStatusMapper());

			foreach (var modelType in modelBuilder.Model.GetEntityTypes()) {
				modelBuilder.Entity(modelType.Name).Property<DateTime>("CreatedOn");
				modelBuilder.Entity(modelType.Name).Property<int>("CreatedBy");
				modelBuilder.Entity(modelType.Name).Property<DateTime>("LastUpdatedOn");
				modelBuilder.Entity(modelType.Name).Property<int>("LastUpdatedBy");
			}
		}
		public override int SaveChanges() {
			ChangeTracker.DetectChanges();
			var timeStamp = DateTime.Now;
			var entries = ChangeTracker.Entries().Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
			foreach (var entry in entries) {
				entry.Property("LastUpdatedOn").CurrentValue = timeStamp;
				entry.Property("LastUpdatedBy").CurrentValue = 1;//TODO: change this to logged in user id
				if (entry.State == EntityState.Added) {
					entry.Property("CreatedOn").CurrentValue = timeStamp;
					entry.Property("CreatedBy").CurrentValue = 1;//TODO: change this to logged in user id

				}

			}
			return base.SaveChanges();
		}

		#endregion

		#region PROPERTIES

		public DbSet<cFile> Files { get; set; }
		public DbSet<cVersion> Versions { get; set; }
		public DbSet<cFileStatus> FileStatuses { get; set; }

		#endregion
	}
}
