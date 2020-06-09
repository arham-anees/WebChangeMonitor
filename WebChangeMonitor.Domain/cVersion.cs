using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cVersion {
		/// <summary>
		/// this indicates unique record in table
		/// </summary>
		public int Id { get; set; }
		/// <summary>
		/// this is domain of website
		/// </summary>
		public string Domain { get; set; }
		/// <summary>
		/// this is version of website
		/// </summary>
		public string Version { get; set; }


		/// <summary>
		/// this stores all files of current version of website 
		/// </summary>
		public IEnumerable<cVersionFiles> VersionFiles { get; set; }
	}
}
