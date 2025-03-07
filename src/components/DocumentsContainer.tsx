import React, { useEffect, useState } from "react";
import { useDashboard } from "@/lib/dashboard";
import { toast } from "sonner";

const DocumentsContainer = () => {
  const { getUserDocuments, uploadDocument, deleteDocument } = useDashboard();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const { documents, error } = await getUserDocuments();
        if (error) {
          toast.error("Failed to fetch documents");
        } else {
          setDocuments(documents || []);
        }
      } catch (err) {
        toast.error("Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleUpload = async (file: File) => {
    try {
      const { success, error } = await uploadDocument(file);
      if (success) {
        toast.success("Document uploaded successfully");
        const { documents } = await getUserDocuments();
        setDocuments(documents || []);
      } else {
        toast.error(`Failed to upload document: ${error?.message}`);
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { success, error } = await deleteDocument(id);
      if (success) {
        toast.success("Document deleted successfully");
        const { documents } = await getUserDocuments();
        setDocuments(documents || []);
      } else {
        toast.error(`Failed to delete document: ${error?.message}`);
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-custom-dark mb-6">Documents</h2>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center mb-2">
              <span>{doc.name}</span>
              <button
                onClick={() => handleDelete(doc.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentsContainer;
