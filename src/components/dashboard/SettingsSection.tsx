
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AIServiceSettings {
  googleVertexAI: boolean;
  awsSagemaker: boolean;
  azureML: boolean;
}

const SettingsSection = () => {
  const [settings, setSettings] = useState<AIServiceSettings>({
    googleVertexAI: false,
    awsSagemaker: false,
    azureML: false,
  });

  const handleToggle = (setting: keyof AIServiceSettings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
    
    toast.success(`${setting} ${!settings[setting] ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-custom-dark mb-6">AI Service Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Google Vertex AI</h3>
            <p className="text-sm text-gray-500">Enable Google's advanced AI capabilities for your documents</p>
          </div>
          <Switch 
            checked={settings.googleVertexAI} 
            onCheckedChange={() => handleToggle('googleVertexAI')} 
            id="google-vertex-ai"
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">AWS SageMaker</h3>
            <p className="text-sm text-gray-500">Integrate with AWS SageMaker for machine learning solutions</p>
          </div>
          <Switch 
            checked={settings.awsSagemaker} 
            onCheckedChange={() => handleToggle('awsSagemaker')} 
            id="aws-sagemaker"
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Azure Machine Learning</h3>
            <p className="text-sm text-gray-500">Connect to Microsoft's Azure ML services</p>
          </div>
          <Switch 
            checked={settings.azureML} 
            onCheckedChange={() => handleToggle('azureML')} 
            id="azure-ml"
          />
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-500">
          Note: Enabling these services may require additional configuration in your account settings.
        </p>
      </div>
    </div>
  );
};

export default SettingsSection;
