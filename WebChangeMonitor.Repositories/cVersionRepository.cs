using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
			return _Context.Versions.Include(x=>x.Status).Select(x => new cVersion {
				Id = x.Id,
				Domain = x.Domain,
				Version = x.Version,
				Status=x.Status,

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
				.FirstOrDefault(x => x.Id == id);
		}
		public cVersion Get() {
			return _Context
				.Versions
				.OrderByDescending(x => EF.Property<DateTime>(x, "CreatedOn"))
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

		public dynamic GetAll(int userId) {
			return _Context
	.Versions.Include(x=>x.Status)
	.Where(x => EF.Property<int>(x, "CreatedBy") == userId)
	.OrderByDescending(x => EF.Property<DateTime>(x, "CreatedOn"))
	.Select(x => new {
		Id = x.Id,
		Domain = x.Domain,
		Version = x.Version,
		Status=x.Status,
		Date=EF.Property<DateTime>(x,"CreatedOn"),
		Review = _Context.AcceptanceStatuses.Where(a => a.Version.Id == x.Id && a.IsActive)
			.Select(a=>
				new { UserRole=_Context.UserRoles.Include(u=>u.User).Include(u=>u.Role)
						.FirstOrDefault(u=>u.User.Id== EF.Property<int>(a,"CreatedBy"))
						, a.Remarks
						, a.IsAccepted 
				}).ToList(),
		VersionFiles = x.VersionFiles.Select(vf => new cVersionFiles {
			VersionId = vf.VersionId,
			FileStatusId = vf.FileStatusId,
			FileStatus = vf.FileStatus
		})});
		}


		public new object GetList() {
			return _Context
			 .Versions
			 .OrderByDescending(x => EF.Property<DateTime>(x, "CreatedOn"))
			 .Select(x => new {
				 Id = x.Id,
				 Domain = x.Domain,
				 Version = x.Version,
				 CreatedBy =_Context.Users.FirstOrDefault(u=>u.Id== EF.Property<int>(x, "CreatedBy")).UserName,
				 CreatedOn =$"{ EF.Property<DateTime>(x, "CreatedOn").ToShortDateString()} { EF.Property<DateTime>(x, "CreatedOn").ToShortTimeString()}",
				 Status=x.Status.Name,
				 Review=_Context.AcceptanceStatuses.Where(a=>a.Version.Id==x.Id).ToList()
			 });
		}

		public cUser LastModifiedBy(int id) {
			int user = _Context.Versions.Where(x => x.Id== id).Select(x => EF.Property<int>(x, "LastUpdatedBy")).FirstOrDefault();
			return _Context.Users.FirstOrDefault(x => x.Id == user);
		}
	}
}
