
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, Upload, File, Trash2, Presentation, X } from "lucide-react";
import { useDashboard } from "@/lib/dashboard";
import { toast } from "sonner";

// Allowed file extensions
const ALLOWED_EXTENSIONS = ['.pdf', '.xlsx', '.doc', '.pptx', '.zip'];
const MAX_FILES = 20;

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [documentCount, setDocumentCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getUserDocuments, uploadDocument, deleteDocument, formatFileSize, getUserProfile } = useDashboard();

  // Load documents and user profile on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Load documents
      const { documents, error } = await getUserDocuments();
      
      if (error) {
        toast.error("Failed to load documents");
      } else if (documents) {
        setDocuments(documents);
        setDocumentCount(documents.length);
      }
      
      // Load user profile to get doc_count
      const { profile } = await getUserProfile();
      if (profile && profile.doc_count !== undefined) {
        setDocumentCount(profile.doc_count);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Handle file selection from the input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    
    if (documents.length + files.length > MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files`);
      return;
    }
    
    // Check file extensions
    const invalidFiles = files.filter(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return !ALLOWED_EXTENSIONS.includes(ext);
    });
    
    if (invalidFiles.length > 0) {
      toast.error(
        `Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}. 
        Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`
      );
      return;
    }
    
    // Upload each file
    setUploadLoading(true);
    
    for (const file of files) {
      const { success, document, error } = await uploadDocument(file);
      
      if (success && document) {
        setDocuments(prev => [...prev, document]);
        setDocumentCount(prev => prev + 1);
        toast.success(`Uploaded: ${file.name}`);
      } else {
        toast.error(`Failed to upload ${file.name}: ${error?.message || 'Unknown error'}`);
      }
    }
    
    setUploadLoading(false);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle document deletion
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const { success, error } = await deleteDocument(id);
      
      if (success) {
        setDocuments(documents.filter(doc => doc.id !== id));
        setDocumentCount(prev => prev - 1);
        toast.success(`Deleted: ${name}`);
      } else {
        toast.error(`Failed to delete ${name}: ${error?.message || 'Unknown error'}`);
      }
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <File className="text-red-500" />;
    if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('xlsx')) 
      return <File className="text-green-600" />;
    if (fileType.includes('document') || fileType.includes('word') || fileType.includes('doc')) 
      return <File className="text-blue-600" />;
    if (fileType.includes('presentation') || fileType.includes('powerpoint') || fileType.includes('pptx')) 
      return <Presentation className="text-orange-500" />;
    if (fileType.includes('zip') || fileType.includes('compressed')) 
      return <File className="text-purple-500" />;
    return <File className="text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-custom-dark">Your Documents</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 border border-gray-200 px-3 py-1 rounded-md bg-gray-50">
            Documents: <span className="font-medium">{documentCount}</span>/{MAX_FILES}
          </div>
          <input
            type="file"
            accept={ALLOWED_EXTENSIONS.join(',')}
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            multiple
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadLoading || documents.length >= MAX_FILES}
            className="flex items-center"
            variant="yellowGradient"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadLoading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </div>
      
      {documents.length >= MAX_FILES && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          You have reached the maximum limit of {MAX_FILES} documents.
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No documents yet</h3>
          <p className="text-gray-500 mb-4">Upload documents to get started</p>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            Upload your first document
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="mr-3">
                    {getFileIcon(doc.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(doc.file_size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(doc.id, doc.name)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;
