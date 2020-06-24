﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cAcceptanceStatusRepository :cRepository<cAcceptanceStatus>,  iAcceptanceStatusRepository{
		public cAcceptanceStatusRepository(AppDbContext context):base(context) {}

		public cAcceptanceStatus Get(cUser user) {
			return _Context.AcceptanceStatuses
				.Where(x => EF.Property<int>(x, "CreatedBy") == user.Id)
				.OrderBy(x => EF.Property<DateTime>(x, "LastUpdatedOn"))
				.FirstOrDefault();
		}


		public object Get(cVersion version) {
			return _Context.AcceptanceStatuses.Select(x => new {
				x.Id,
				x.IsAccepted,
				x.Remarks,
				x.Version,
				User = EF.Property<int>(x, "CreatedBy"),
				Role=_Context.UserRoles.FirstOrDefault(ur=>ur.User.Id== EF.Property<int>(x, "CreatedBy")).Id
			}).Where(x => x.Version == version).ToList();
		}

		public new cAcceptanceStatus Set(cAcceptanceStatus acceptanceStatus) {
			_Context.Entry(acceptanceStatus.Version).State = EntityState.Unchanged;
			_Context.AcceptanceStatuses.Add(acceptanceStatus);
			return acceptanceStatus;
		}
	}
}