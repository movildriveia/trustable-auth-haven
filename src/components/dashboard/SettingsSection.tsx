
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface AIServiceSettings {
  google: boolean;
  aws: boolean;
  azure: boolean;
}

const SettingsSection = () => {
  const [settings, setSettings] = useState<AIServiceSettings>({
    google: false,
    aws: false,
    azure: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          toast.error("Unable to load settings: No active session");
          setIsLoading(false);
          return;
        }
        
        const userId = sessionData.session.user.id;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('google, aws, azure')
          .eq('id', userId)
          .single();
        
        if (error) {
          toast.error(`Failed to load settings: ${error.message}`);
        } else if (data) {
          setSettings({
            google: data.google || false,
            aws: data.aws || false,
            azure: data.azure || false
          });
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);

  const handleToggle = async (setting: keyof AIServiceSettings) => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast.error("Unable to update settings: No active session");
        return;
      }
      
      const userId = sessionData.session.user.id;
      const newValue = !settings[setting];
      
      // Update in the database
      const { error } = await supabase
        .from('profiles')
        .update({ [setting]: newValue })
        .eq('id', userId);
      
      if (error) {
        toast.error(`Failed to update ${setting}: ${error.message}`);
        return;
      }
      
      // Update the state if the database update was successful
      setSettings({
        ...settings,
        [setting]: newValue,
      });
      
      toast.success(`${setting} ${newValue ? 'enabled' : 'disabled'}`);
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-custom-dark mb-6">AI Service Settings</h2>
        <div className="text-center py-6">Loading settings...</div>
      </div>
    );
  }

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
            checked={settings.google} 
            onCheckedChange={() => handleToggle('google')} 
            id="google-vertex-ai"
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">AWS SageMaker</h3>
            <p className="text-sm text-gray-500">Integrate with AWS SageMaker for machine learning solutions</p>
          </div>
          <Switch 
            checked={settings.aws} 
            onCheckedChange={() => handleToggle('aws')} 
            id="aws-sagemaker"
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Azure Machine Learning</h3>
            <p className="text-sm text-gray-500">Connect to Microsoft's Azure ML services</p>
          </div>
          <Switch 
            checked={settings.azure} 
            onCheckedChange={() => handleToggle('azure')} 
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
