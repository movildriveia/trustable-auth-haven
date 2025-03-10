import React, { useState, useEffect } from "react";
import { uploadDocument, deleteDocument, getUserDocuments } from "@/lib/supabase"; // Adjust the import path

const DocumentSection = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch user documents
  const fetchDocuments = async () => {
    const { documents: userDocuments, error } = await getUserDocuments();
    if (error) {
      console.error("Error fetching documents:", error);
    } else {
      setDocuments(userDocuments);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (file) {
      const { success, error } = await uploadDocument(file);
      if (success) {
        await fetchDocuments(); // Refetch documents after upload
      } else {
        console.error("Error uploading document:", error);
      }
    }
  };

  // Handle file deletion
  const handleDelete = async (id) => {
    const { success, error } = await deleteDocument(id);
    if (success) {
      await fetchDocuments(); // Refetch documents after deletion
    } else {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.name}
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSection;
