using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
	public class IndexVersionPostActionModel {
		/// <summary>
		/// this indicates uniques identifiers of files uploaded for current version
		/// </summary>
		public List<int> Files { get; set; }

	}
}
