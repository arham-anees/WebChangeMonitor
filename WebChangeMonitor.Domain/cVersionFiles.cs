using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
	public class cVersionFiles {
		/// <summary>
		/// this uniquely identifies each versionedFile
		/// </summary>
		public int Id { get; set; }
		/// <summary>
		/// this is version of file
		/// </summary>
		public cVersion Version { get; set; }
		/// <summary>
		/// this is unique identifier of version of file
		/// </summary>
		public int VersionId { get; set; }
		/// <summary>
		/// this is file versioned
		/// </summary>
		public cFile File { get; set; }
		/// <summary>
		/// this is file versioned
		/// </summary>
		public int FileId { get; set; }
		/// <summary>
		/// this indicates status of file where it is added or updated or deleted
		/// </summary>
		public cFileStatus FileStatus { get; set; }
		/// <summary>
		/// this is foreign key of filestatus
		/// </summary>
		public int FileStatusId { get; set; }
	}
}
