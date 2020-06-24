using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
	public class CreateAcceptanceStatusActionModel {
		public int VersionId { get; set; }
		public bool IsAccepted { get; set; }
		public string Remarks { get; set; }

	}
}
