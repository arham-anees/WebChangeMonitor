using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
    public class cFile {
        /// <summary>
        /// this is unique identifier of files
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// this is local name of file on client machine
        /// </summary>
        public string LocalName { get; set; }
        /// <summary>
        /// this is local file path on client machine of user
        /// </summary>
        public string LocalRelativePath { get; set; }
        /// <summary>
        /// this is server path of file uploaded to
        /// </summary>
        public string ServerPath { get; set; }
        /// <summary>
        /// this indicates length of content of file
        /// </summary>
        public long Length { get; set; }
        /// <summary>
        /// this is random generated name of file to avoid conflict between name
        /// </summary>
        public string EncodedName { get; set; }
        /// <summary>
        /// this indicates initialization of upload time
        /// </summary>
        public DateTime UploadDateTime { get; set; }
        /// <summary>
        /// this is indicates completion of upload time
        /// </summary>
        public DateTime UploadCompleteDateTime { get; set; }
        /// <summary>
        /// this indicates computed hash of file content to detect changes in file content
        /// </summary>
        //public string HashedContent { get; set; }
        /// <summary>
        /// this indicates type of file uploaded
        /// </summary>
        public string ContentType { get; set; }

    /// <summary>
    /// this indicates last modification date of file on local machine
    /// </summary>
    //public DateTime LastLocalModifiedDate { get; set; }

    public List<cVersionFiles> VersionFiles { get; set; }
  }
}
