﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cFileStatusMapper : IEntityTypeConfiguration<cFileStatus> {
		public void Configure(EntityTypeBuilder<cFileStatus> builder) {
			builder.ToTable("FileStatuses");

			var datetime = DateTime.MinValue;
			builder.HasData(new { 
				Id = 1, 
				Name = "Added",
				CreatedBy = 0,
				CreatedOn = datetime,
				LastUpdatedOn = datetime,
				LastUpdatedBy = 0 
			});
			builder.HasData(new { 
				Id = 2, 
				Name = "Updated",
				CreatedBy = 0,
				CreatedOn = datetime, 
				LastUpdatedOn = datetime,
				LastUpdatedBy = 0 
			});
			builder.HasData(new { 
				Id = 3, 
				Name = "Deleted",
				CreatedBy = 0,
				CreatedOn = datetime, 
				LastUpdatedOn = datetime,
				LastUpdatedBy = 0 
			});
			builder.HasData(new { 
				Id = 4, 
				Name = "Unmodified",
				CreatedBy = 0,
				CreatedOn = datetime, 
				LastUpdatedOn = datetime,
				LastUpdatedBy = 0 
			});
	

		}
	}

}
