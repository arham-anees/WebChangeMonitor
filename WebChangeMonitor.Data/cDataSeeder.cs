using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Internal;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Data {
	public class cDataSeeder {
		public cDataSeeder(AppDbContext context) {

			if (context == null)
				throw new NullReferenceException();

			//for file status
			if(!context.FileStatuses.Any()) {
				context.FileStatuses.AddRange(
				new List<cFileStatus>{
					new cFileStatus{Id=1,Name="Added"},
					new cFileStatus{Id=1,Name="Updated"},
					new cFileStatus{Id=1,Name="Deleted"}
				});
			}
		}
	}
}
