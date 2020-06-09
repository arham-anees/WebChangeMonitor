using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Data.Migrations;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cVersionRepository :cRepository<cVersion>, iVersionRepository {
		private AppDbContext _Context;
		public cVersionRepository(AppDbContext context) : base(context) {
			_Context = context;
		}

		public new cVersion Get(int id) {
			return _Context.Versions.Select(x => new cVersion() {
				Id = x.Id,
				Domain = x.Domain,
				Version = x.Version,
				VersionFiles = _Context.VersionFiles.Where(vf => vf.VersionId == x.Id)
			})
				.FirstOrDefault();
		}
	}
}
