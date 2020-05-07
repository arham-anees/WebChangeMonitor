using System;
using System.Collections.Generic;
using System.Text;

namespace WebChangeMonitor.Domain {
    public class cFile {
        public int Id { get; set; }
        public string LocalName { get; set; }
        public string LocalRelativePath { get; set; }
        public string ServerPath { get; set; }
        public int Length { get; set; }
        public string EncodedName { get; set; }
        public DateTime UploadDateTime { get; set; }
        public string HashedContent { get; set; }
    }
}
