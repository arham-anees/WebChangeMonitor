using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Mapper {
	public class cFileStatusMapper : IEntityTypeConfiguration<cFileStatus> {
		public void Configure(EntityTypeBuilder<cFileStatus> builder) {
			builder.ToTable("FileStatus");


			builder.HasData(
				new List<cFileStatus>{
					new cFileStatus{Id=1,Name="Added"},
					new cFileStatus{Id=1,Name="Updated"},
					new cFileStatus{Id=1,Name="Deleted"}
				});
		}
	}

}
