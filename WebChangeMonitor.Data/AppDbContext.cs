using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Mapper;
using WebChangeMonitor.Shared;

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
				.ApplyConfiguration(new cFileStatusMapper())
				.ApplyConfiguration(new cDomainMapper())
				.ApplyConfiguration(new cUserMapper())
				.ApplyConfiguration(new cRoleMapper())
				.ApplyConfiguration(new cUserRoleMapper())
				.ApplyConfiguration(new cVersionStatusMapper());

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
				entry.Property("LastUpdatedBy").CurrentValue = cShared.UserId;
				if (entry.State == EntityState.Added) {
					entry.Property("CreatedOn").CurrentValue = timeStamp;
					entry.Property("CreatedBy").CurrentValue = cShared.UserId;

				}

			}
			return base.SaveChanges();
		}

		#endregion

		#region PROPERTIES

		public DbSet<cFile> Files { get; set; }
		public DbSet<cVersion> Versions { get; set; }
		public DbSet<cFileStatus> FileStatuses { get; set; }
		public DbSet<cVersionFiles> VersionFiles { get; set; }
		public DbSet<cDomain> Domains { get; set; }
		public DbSet<cUser> Users { get; set; }
		public DbSet<cRole> Roles { get; set; }
		public DbSet<cUserRole> UserRoles { get; set; }
		public DbSet<cVersionStatus> VersionStatuses { get; set; }
		public DbSet<cAcceptanceStatus> AcceptanceStatuses { get; set; }
		#endregion
	}
}
