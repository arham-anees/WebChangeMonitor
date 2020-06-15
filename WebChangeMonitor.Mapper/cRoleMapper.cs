using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cRoleMapper : IEntityTypeConfiguration<cRole> {
		public void Configure(EntityTypeBuilder<cRole> builder) {
			builder.Property(x => x.RoleName).HasMaxLength(30).IsRequired();

			builder.HasData(new {
				Id = 1,
				RoleName = "CEO",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				IsActive=true
			});
			builder.HasData(new {
				Id = 2,
				RoleName = "Manager",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				IsActive = true
			});
			builder.HasData(new {
				Id = 3,
				RoleName = "TeamLead",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				IsActive = true
			});
			builder.HasData(new {
				Id = 4,
				RoleName = "Developer",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				IsActive = true
			});
			builder.HasData(new {
				Id = 5,
				RoleName = "Admin",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				IsActive = true
			});
		}
	}
}
