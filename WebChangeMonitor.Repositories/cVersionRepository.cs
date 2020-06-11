using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Data;
using WebChangeMonitor.Data.Migrations;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cVersionRepository : cRepository<cVersion>, iVersionRepository {
		//private AppDbContext _Context;
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
		public cVersion Get() {
			return _Context
				.Versions
				.OrderByDescending(x=>EF.Property<DateTime>(x,"CreatedOn"))
				.Select(x => new cVersion {
					Id = x.Id,
					Domain = x.Domain,
					Version = x.Version,
					VersionFiles = x.VersionFiles.Select(vf => new cVersionFiles {
						Id = vf.Id,
						VersionId = vf.VersionId,
						FileId = vf.FileId,
						//CreatedBy = vf.CreatedBy,
						//CreatedOn = vf.CreatedOn,
						File = vf.File,
						FileStatusId = vf.FileStatusId,
						FileStatus = vf.FileStatus
					}).ToList()
				})
				.Take(1).SingleOrDefault();
		}
	}
}
