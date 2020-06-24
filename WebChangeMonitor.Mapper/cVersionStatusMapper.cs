using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cVersionStatusMapper : IEntityTypeConfiguration<cVersionStatus> {
		public void Configure(EntityTypeBuilder<cVersionStatus> builder) {
			builder.HasData(new[] {
				new {
				Id = 1,
				Name = "Pending",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				},
				new {
				Id = 2,
				Name = "Uploaded",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				},
				new {
				Id = 3,
				Name = "Reverted",
				CreatedOn = DateTime.MinValue,
				CreatedBy = 0,
				LastUpdatedBy = 0,
				LastUpdatedOn = DateTime.MinValue,
				},
			});
		}
	}
}
