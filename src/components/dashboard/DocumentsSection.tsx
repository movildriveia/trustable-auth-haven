
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Trash2, FileText, FileSpreadsheet, FilePresentation, Archive } from "lucide-react";
import { useDashboard } from "@/lib/dashboard";

const ALLOWED_EXTENSIONS = [
  '.pdf', '.xlsx', '.doc', '.docx', '.pptx', '.zip'
];

const MAX_FILES = 20;

const DocumentsSection = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getUserDocuments, uploadDocument, deleteDocument, formatFileSize } = useDashboard();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const { documents, error } = await getUserDocuments();
    if (error) {
      toast.error("Failed to load documents");
      return;
    }
    setFiles(documents || []);
  };

  const handleUploadClick = () => {
    if (files.length >= MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const fileExtension = `.${selectedFile.name.split('.').pop()?.toLowerCase()}`;
    
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      toast.error(`Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed`);
      return;
    }

    if (files.length >= MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files`);
      return;
    }

    setUploading(true);
    
    try {
      const { success, document: uploadedDoc } = await uploadDocument(selectedFile);
      if (success && uploadedDoc) {
        setFiles([uploadedDoc, ...files]);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      const { success } = await deleteDocument(id);
      if (success) {
        setFiles(files.filter(file => file.id !== id));
      }
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="text-red-500" />;
    if (fileType.includes('xlsx') || fileType.includes('sheet')) return <FileSpreadsheet className="text-green-500" />;
    if (fileType.includes('ppt') || fileType.includes('presentation')) return <FilePresentation className="text-orange-500" />;
    if (fileType.includes('zip') || fileType.includes('archive')) return <Archive className="text-purple-500" />;
    return <FileText className="text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-custom-dark">Documents</h2>
        <Button 
          onClick={handleUploadClick} 
          disabled={uploading || files.length >= MAX_FILES}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={ALLOWED_EXTENSIONS.join(',')}
        />
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        Upload up to {MAX_FILES} files ({ALLOWED_EXTENSIONS.join(', ')})
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      {getFileIcon(file.file_type)}
                      <span className="ml-2 truncate max-w-xs">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{file.file_type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{formatFileSize(file.file_size)}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(file.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;
